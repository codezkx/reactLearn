import { scheduleMicroTask } from 'hostConfig';
import { beginWork } from './beginWork';
import { commitMutationEffects } from './commitWork';
import { completeWork } from './completeWork';

import {
	createWorkInProgress,
	FiberNode,
	FiberRootNode
	// PendingPassiveEffects
} from './fiber';
import { MutationMask, NoFlags } from './fiberFlags';
import {
	getHighestPriorityLane,
	Lane,
	Lanes,
	markRootFinished,
	mergeLanes,
	NoLane,
	NoLanes,
	SyncLane
} from './fiberLanes';
import { flushSyncCallbacks, scheduleSyncCallback } from './syncTaskQueue';
import { HostRoot } from './workTags';

// 权限指针指向全局正在工作的fiberNode
let workInProgress: FiberNode | null = null;
// 本次更新的lane
let wipRootRenderLane: Lanes = NoLanes;

// 初始化  把workInProgress指向第一个需要处理的fiberNode
function prepareFreshStack(fiber: FiberRootNode, lane: Lane) {
	workInProgress = createWorkInProgress(fiber.current, {});
	wipRootRenderLane = lane;
}

// 在Fiber中调度Update
export function scheduleUpdateOnFiber(fiber: FiberNode, lane: Lane) {
	const root = markUpdateLaneFromFiberToRoot(fiber);
	markRootUpdated(root, lane);
	ensureRootIsScheduled(root);
	// performSyncWorkOnRoot(root, lane);
}

// schedule 阶段 入口
function ensureRootIsScheduled(root: FiberRootNode) {
	// 获取优先级最高的lane
	const updateLane = getHighestPriorityLane(root.pendingLanes);
	if (updateLane === NoLane) {
		return;
	}
	if (updateLane === SyncLane) {
		// 同步优先级 用微任务执行
		// React调度
		if (__DEV__) {
			console.log('在微任务中调度执行，优先级：', updateLane);
			// 存储 render 任务队列
			scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root, updateLane));
			// 异步执行
			scheduleMicroTask(flushSyncCallbacks);
		}
	} else {
		// 其他优先级 用宏任务执行
	}
}

function markRootUpdated(root: FiberRootNode, lane: Lane) {
	root.pendingLanes = mergeLanes(root.pendingLanes, lane);
}

function markUpdateLaneFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;

	// 注意 只能是普通的 fiberNode, 因为node 指向 FiberRootNode的指针是stateNode, 而不是return
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	// 是根fiberNode时处理,  具体看笔记 “如何触发更新” 图
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
}

// renderRoot
function performSyncWorkOnRoot(root: FiberRootNode, lane: Lane) {
	const nextLane = getHighestPriorityLane(root.pendingLanes);
	if (nextLane !== SyncLane) {
		// 其他比SyncLean优先级低的 或者 NoLane 这时是不需要重新执行渲染函数的
		// 注意目的是防止, syncQueue队列中存在多个 render 函数执行, 因为渲染是异步的而更新一般是同步的, 异步函数执行总是在所有更新后执行
		ensureRootIsScheduled(root);
		return;
	}

	if (__DEV__) {
		console.warn('render 阶段开始');
	}

	// 初始化
	prepareFreshStack(root, lane);

	do {
		try {
			workLoop();
			break;
		} catch (e) {
			if (__DEV__) {
				console.warn('workLoop 发生错误', e);
			}
			workInProgress = null;
		}
	} while (true);

	// root.current.alternate -> createWorkInProgress 创建的
	// workInProgress 中是一颗完整的DOM树, 其中包含类需要更新的副作用节点 Placement
	const finisheWork = root.current.alternate;
	//
	root.finishedWork = finisheWork;
	root.finishedLanes = lane;
	wipRootRenderLane = NoLane; // 初始化

	// wip fiberNode树 树中的flags
	commitRoot(root); // commit阶段入口
}

function commitRoot(root: FiberRootNode) {
	// 获取更新后的fiberNode
	const finishedWork = root.finishedWork;
	if (finishedWork === null) {
		return;
	}
	if (__DEV__) {
		console.warn('commit阶段开始', finishedWork);
	}
	const lane = root.finishedLanes;
	if (lane === NoLane && __DEV__) {
		console.warn('commit阶段的finishedLanes不应该是NoLane');
	}

	// 移除对应的lane
	markRootFinished(root, lane);

	// 重制
	root.finishedWork = null;
	root.finishedLanes = NoFlags;

	// 判断是否存在3个子阶段需要执行的操作
	// root flags root subtreeFlags
	// 判断subtree是否被标记
	const subtreeHasEffect =
		(finishedWork.subtreeFlags & MutationMask) !== NoFlags;

	// 判断root是否被标记
	const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;

	// 处理存在标记的节点
	if (subtreeHasEffect || rootHasEffect) {
		// beforeMutation
		// mutation 处理 Placement
		commitMutationEffects(finishedWork);

		// 将 finishedWork(workInProgress)树赋值给current
		root.current = finishedWork;
		// latouy
	} else {
		root.current = finishedWork;
	}
}

//JSX 消费的顺序 递归处理
function workLoop() {
	while (workInProgress !== null) {
		preformUnitOfWork(workInProgress);
	}
}

// 预制工作单元
function preformUnitOfWork(fiber: FiberNode) {
	// next 可能是子fiber 或者 null
	const next = beginWork(fiber, wipRootRenderLane); // 开始处理fiber
	// 执行完beginWork后，pendingProps 变为 memoizedProps
	fiber.memoizedProps = fiber.pendingProps;
	// 表明已经 “递” 过程已经完成; 没有子节点了
	if (next === null) {
		// 如果没有子节点, 遍历兄弟节点;
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		const next = completeWork(node);

		if (next !== null) {
			workInProgress = next;
			return;
		}

		const sibling = node.sibling;
		if (sibling) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}

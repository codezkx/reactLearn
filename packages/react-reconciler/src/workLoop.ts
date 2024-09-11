import { beginWork } from './beginWork';
import { completeWork } from './completeWork';

import {
	createWorkInProgress,
	FiberNode,
	FiberRootNode
	// PendingPassiveEffects
} from './fiber';
import { HostRoot } from './workTags';

// 权限指针指向全局正在工作的fiberNode
let workInProgress: FiberNode | null = null;

// 初始化  把workInProgress指向第一个需要处理的fiberNode
function prepareFreshStack(fiber: FiberRootNode) {
	workInProgress = createWorkInProgress(fiber.current, {});
}

// 在Fiber中调度Update
export function scheduleUpdateOnFiber(fiber: FiberNode) {
	const root = markUpdateLaneFromFiberToRoot(fiber);
	renderRoot(root);
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

function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareFreshStack(root);

	do {
		try {
			workLoop();
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

	// wip fiberNode树 树中的flags
	// commitRoot(root);
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
	const next = beginWork(fiber); // 开始处理fiber

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
		completeWork(node);
		const sibling = node.sibling;

		// 是否有兄弟节点
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		// 获取父fiberNode
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}

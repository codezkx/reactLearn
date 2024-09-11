import { mountChildFibers, reconcileChildFibers } from './childFiber';
import { FiberNode } from './fiber';
import { UpdateQueue, processUpdateQueue } from './updateQueue';
import { HostRoot, HostComponent, HostText } from './workTags';
import { ReactElementType } from 'shared/ReactTypes';
// 递归中的递阶段
export function beginWork(wip: FiberNode) {
	switch (wip.tag) {
		case HostRoot:
			return updateHostRoot(wip);
		case HostComponent:
			return updateHostComponent(wip);
		case HostText:
			return null; // 没有用子节点, 需要在“归”中处理
		default:
			if (__DEV__) {
				console.warn('beginWork 未实现的类型');
				break;
			}
	}
	return null;
}

// 处理跟节点
// 1. 计算状态的最新值
// 2. 创造子fiberNode
function updateHostRoot(wip: FiberNode) {
	// 获取 baseState 状态
	const baseState = wip.memoizedState; // memoizedState 更新后的状态
	const updateQueue = wip.updateQueue as UpdateQueue<Element>; // 获取当前更新执行存储的state(函数/基本类型)
	const pending = updateQueue.shared.pending; // 获取存储(state) pending
	updateQueue.shared.pending = null; // 更新前完需要设置为空
	// 获取更新后的 memoizedState (子 react Element)
	const { memoizedState } = processUpdateQueue(baseState, pending);
	wip.memoizedState = memoizedState;
	// 子元素节点
	const nextChildren = wip.memoizedState;
	// 创建子 fiberNode
	reconcileChildren(wip, nextChildren);
	return wip.child;
}

// 处理根组件
// 1. 创造子fiberNode
function updateHostComponent(wip: FiberNode) {
	const nextProps = wip.pendingProps;
	const nextChildren = nextProps.children;
	reconcileChildren(wip, nextChildren);
	return wip.child;
}

// 创造子fiberNode
// 通过子节点的current fiberNode 与 子节点的reactElement 比较 生成子fiberNode
function reconcileChildren(wip: FiberNode, children: ReactElementType) {
	const currentFiber = wip.alternate;
	if (currentFiber !== null) {
		// update  HostRootFiber 初始化使用current 和 workInProgress, 而组件初始化是没有的; ( 具体 prepareFreshStack)
		wip.child = reconcileChildFibers(wip, currentFiber?.child, children);
	} else {
		// mount 需要做 beginWork 性能优化策略
		wip.child = mountChildFibers(wip, null, children);
	}
}

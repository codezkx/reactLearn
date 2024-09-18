/**
 *
 * @description 主要处理常用的hooks
 *
 * **/

import { Action, ReactElementType } from 'shared/ReactTypes';
import { FiberNode } from './fiber';
import sharedInternals from 'shared/internals';
import {
	createUpdateQueue,
	UpdateQueue,
	type Update,
	createUpdate,
	enqueueUpdate
} from './updateQueue';
import { Dispatcher, Dispatch } from 'react/src/currentDispatcher';
import { scheduleUpdateOnFiber } from './workLoop';
interface Hook {
	// 指向hook得state(数据)
	memoizedState: any;
	// 对于state，保存update相关数据
	updateQueue: unknown;
	// 对于state，保存开始更新前就存在的updateList（上次更新遗留）
	baseQueue: Update<any> | null;
	// 对于state，基于baseState开始计算更新，与memoizedState的区别在于上次更新是否存在跳过
	baseState: any;
	// 指向下一个hook
	next: Hook | null;
}

// 用于存储hook的Fiber
let currentlyRenderingFiber: FiberNode | null = null;

// 正在处理hook
let workInProgressHook: Hook | null = null;

const { currentDispatcher } = sharedInternals;

// 获取函数组件的返回值
export function renderWithHooks(wip: FiberNode): ReactElementType {
	// 赋值操作
	currentlyRenderingFiber = wip;
	wip.memoizedState = null;

	const current = wip.alternate;

	if (current !== null) {
		// update
	} else {
		// mount
		currentDispatcher.current = HooksDispatcherOnMount;
	}

	const Component = wip.type;
	const props = wip.pendingProps;
	const children = Component(props);

	// 重制操作
	currentlyRenderingFiber = null;
	return children;
}

const HooksDispatcherOnMount: Dispatcher = {
	useState: mounteState
};

function mounteState<State>(
	initialState: State | (() => State)
): [State, Dispatch<State>] {
	const hook = mountWorkInProgressHook();
	let memoizedState;
	if (initialState instanceof Function) {
		memoizedState = initialState();
	} else {
		memoizedState = initialState;
	}

	// useState 是用更新流程的, 要创建一个更新队列
	const queue = createUpdateQueue<State>();
	hook.updateQueue = queue;
	hook.memoizedState = memoizedState;

	// @ts-ignore
	const dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
	// 将dispatch 存入到更新队列中
	queue.dispatch = dispatch;
	return [memoizedState, dispatch];
}

function dispatchSetState<State>(
	fiber: FiberNode,
	updateQueue: UpdateQueue<State>,
	action: Action<State>
) {
	const update = createUpdate(action);
	enqueueUpdate(updateQueue, update);
	scheduleUpdateOnFiber(fiber);
}

function mountWorkInProgressHook(): Hook {
	const hook = {
		memoizedState: null,
		updateQueue: null,
		baseQueue: null,
		// 对于state，基于baseState开始计算更新，与memoizedState的区别在于上次更新是否存在跳过
		baseState: null,
		next: null
	};

	if (workInProgressHook === null) {
		// mount 第一个hook
		if (currentlyRenderingFiber === null) {
			throw new Error(
				'currentlyRenderingFiber为 null, 请在函数组件中执行Hooks'
			);
		} else {
			workInProgressHook = hook;
			currentlyRenderingFiber.memoizedState = hook;
		}
	} else {
		// mount 后续hook
		workInProgressHook.next = hook;
		workInProgressHook = hook;
	}
	return workInProgressHook;
}

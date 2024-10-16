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
	enqueueUpdate,
	processUpdateQueue
} from './updateQueue';
import { Dispatcher, Dispatch } from 'react/src/currentDispatcher';
import { scheduleUpdateOnFiber } from './workLoop';
import { Lane, NoLane, requestUpdateLane } from './fiberLanes';
import { Flags, PassiveEffect } from './fiberFlags';
import { HookHasEffect, Passive } from './hookEffectTags';

type EffectCallback = () => void;
type EffectDeps = any[] | null;
export interface Effect {
	tag: Flags;
	create: EffectCallback | void;
	destroy: EffectCallback | void;
	deps: EffectDeps;
	// 环状链表; 指向useEffect 的memoizedState
	next: Effect | null;
}

export interface FCUpdateQueue<State> extends UpdateQueue<State> {
	// 指向useEffect环状链表中的最后一个, lastEffect.next指向的是第一个
	lastEffect: Effect | null;
}

interface Hook {
	// 指向hook得state(数据)
	memoizedState: any;
	// 对于state，保存update相关数据
	updateQueue: unknown;
	// 对于state，保存开始更新前就存在的updateList（上次更新遗留）
	baseQueue?: Update<any> | null;
	// 对于state，基于baseState开始计算更新，与memoizedState的区别在于上次更新是否存在跳过
	baseState?: any;
	// 指向下一个hook
	next: Hook | null;
}

// 用于存储hook的Fiber
let currentlyRenderingFiber: FiberNode | null = null;

// 正在处理hook
let workInProgressHook: Hook | null = null;

// update 阶段处理的hook
let currentHook: Hook | null = null;

let renderLane: Lane = NoLane;

const { currentDispatcher } = sharedInternals;

// 获取函数组件的返回值
export function renderWithHooks(wip: FiberNode, lean: Lane): ReactElementType {
	// 赋值操作
	currentlyRenderingFiber = wip;
	// 保存的是 hooks 的链表
	wip.memoizedState = null;

	renderLane = lean;

	const current = wip.alternate;

	if (current !== null) {
		// update
		currentDispatcher.current = HooksDispatcherOnUpdateMount;
	} else {
		// mount
		currentDispatcher.current = HooksDispatcherOnMount;
	}

	const Component = wip.type;
	const props = wip.pendingProps;
	// FC render
	const children = Component(props);

	// 重制操作
	currentlyRenderingFiber = null;
	workInProgressHook = null;
	currentHook = null;
	renderLane = NoLane;
	return children;
}

const HooksDispatcherOnMount: Dispatcher = {
	useState: mounteState,
	useEffect: mountEffect
};

const HooksDispatcherOnUpdateMount: Dispatcher = {
	useState: updateState,
	useEffect: updateEffect
};
function updateEffect(create: EffectCallback | void, deps: EffectDeps | void) {
	const hook = mountWorkInProgressHook();
}

function mountEffect(create: EffectCallback | void, deps: EffectDeps | void) {
	const hook = mountWorkInProgressHook();
	const nextDeps = deps === undefined ? null : deps;
	// 注意区分PassiveEffect与Passive，PassiveEffect是针对fiber.flags
	// Passive是effect类型，代表useEffect。类似的，Layout代表useLayoutEffect
	(currentlyRenderingFiber as FiberNode).flags = PassiveEffect;
	hook.memoizedState = pushEffect(
		Passive | HookHasEffect,
		create,
		undefined,
		nextDeps
	);
}

function pushEffect(
	hookFlags: Flags,
	create: EffectCallback | void,
	destroy: EffectCallback | void,
	deps: EffectDeps
): Effect {
	const effect: Effect = {
		tag: hookFlags,
		create,
		destroy,
		deps,
		next: null
	};
	const fiber = currentlyRenderingFiber!;
	const updateQueue = fiber.updateQueue as FCUpdateQueue<any>;
	if (updateQueue === null) {
		const updateQueue = createFCUpdateQueue();
		fiber.updateQueue = updateQueue;
		effect.next = effect; // 形成环状链表
		updateQueue.lastEffect = effect;
	} else {
		// 插入effect
		const lastEffect = updateQueue.lastEffect;
		if (lastEffect === null) {
			effect.next = effect;
			updateQueue.lastEffect = effect;
		} else {
			const firstEffect = lastEffect.next;
			lastEffect.next = effect; // 指针指向最后一个指针对象
			effect.next = firstEffect; // 指针指向第一个指针对象
			updateQueue.lastEffect = effect; // 更新lastEffect对象, 保持始终是最后一个元素
		}
	}
	return effect;
}

function createFCUpdateQueue<State>() {
	const updateQueue = createUpdateQueue<State>() as FCUpdateQueue<State>;
	updateQueue.lastEffect = null;
	return updateQueue;
}

function updateState<State>(): [State, Dispatch<State>] {
	const hook = updateWorkInProgressHook();

	// 计算新的state逻辑
	const queue = hook.updateQueue as UpdateQueue<State>;
	const padding = queue.shared.pending;
	// 需要设置为null, 防止保留上一次的状态
	queue.shared.pending = null;

	if (padding !== null) {
		const { memoizedState } = processUpdateQueue(
			hook.memoizedState,
			padding,
			renderLane
		);
		hook.memoizedState = memoizedState;
	}
	const dispatch = queue.dispatch as Dispatch<State>;
	return [hook.memoizedState, dispatch];
}

function updateWorkInProgressHook(): Hook {
	// TODO render阶段触发的更新

	let nextCurrentHook: Hook | null;

	if (currentHook === null) {
		// 这是 FC update 时的第一个hook
		const current = currentlyRenderingFiber?.alternate;
		// 第一次更新时
		if (current !== null) {
			// 赋值链表
			nextCurrentHook = current?.memoizedState;
		} else {
			nextCurrentHook = null;
		}
	} else {
		// 这个FC Update 时 后续的hook
		nextCurrentHook = currentHook.next;
	}
	// 处理边界情况
	if (nextCurrentHook === null) {
		// mount/update u1 u2 u3
		// update u1 u2 u3 u4   注意u4不是在顶层函数作用域中执行的, 所以要报错
		throw new Error(
			`组件${currentlyRenderingFiber?.type} 本次执行时的 Hook 比上一次多`
		);
	}

	currentHook = nextCurrentHook;
	const newHook: Hook = {
		memoizedState: currentHook?.memoizedState,
		updateQueue: currentHook?.updateQueue,
		next: null
	};

	if (workInProgressHook === null) {
		// mount 第一个hook
		if (currentlyRenderingFiber === null) {
			throw new Error(
				'currentlyRenderingFiber为 null, 请在函数组件中执行Hooks'
			);
		} else {
			workInProgressHook = newHook;
			currentlyRenderingFiber.memoizedState = newHook;
		}
	} else {
		// mount 后续hook
		workInProgressHook.next = newHook;
		workInProgressHook = newHook;
	}
	return workInProgressHook;
}

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
	const lane = requestUpdateLane();
	const update = createUpdate(action, lane);
	enqueueUpdate(updateQueue, update);
	scheduleUpdateOnFiber(fiber, lane);
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

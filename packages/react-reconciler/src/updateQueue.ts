import { Dispatch } from 'react/src/currentDispatcher';
import { Lane } from './fiberLanes';

export type Action<State> = State | ((prevState: State) => State);

export interface Update<State> {
	action: Action<State>;
	// lane: Lane;
	next: Update<any> | null;
	lane: Lane;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
	dispatch: Dispatch<State> | null;
}

// 创建一个Update实例
export const createUpdate = <State>(
	action: Action<State>,
	lane: Lane
): Update<State> => {
	return {
		action,
		lane,
		next: null
	};
};

// 创建一个UpdateQueue实例
export const createUpdateQueue = <Action>() => {
	return {
		shared: {
			pending: null
		},
		dispatch: null
	} as UpdateQueue<Action>;
};

// 将update插入到updateQueue中   update是最新的
export const enqueueUpdate = <Action>(
	updateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	if (__DEV__) {
		console.log('将update插入更新队列：', update);
	}
	const pending = updateQueue.shared.pending;
	if (pending === null) {
		// pending = a -> a
		update.next = update;
	} else {
		// 形成传入闭环
		// pending = b -> a -> b
		// pending = c -> a -> b -> c
		update.next = pending.next;
		pending.next = update;
	}
	updateQueue.shared.pending = update;
};

// 消费update
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null,
	renderLane: Lane
): {
	memoizedState: State;
} => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	// update消费过程
	if (pendingUpdate !== null) {
		// 第一个update   注意pending是一个闭环链表 :  c -> a -> b -> c  这也是为什么下面取的是next
		const first = pendingUpdate.next;
		let pending = pendingUpdate.next!;
		do {
			const updateLane = pending.lane;
			// renderLane渲染期间的lane 一定为SyncLane
			if (updateLane === renderLane) {
				const action = pending.action;
				/* 
					this.setState(1)
					this.setState((x) => x)
					这两个种形式
				*/
				if (action instanceof Function) {
					// baseState 1 update (x) => 4x -> memoizedState 4x
					baseState = action(baseState);
				} else {
					// baseState 1 update 2 -> memoizedState 2
					// 这里也是为什么 批量更新时 只能取到最后一个值
					/* 				number = 0
							        setNumber(number + 1);
									setNumber(number + 2);
									setNumber(number + 3);
									渲染结果: 3
					*/
					baseState = action;
				}
			} else {
				if (__DEV__) {
					console.error('不应该进入update Lane !== renderLane逻辑');
				}
			}
			pending = pending.next!;
		} while (pending !== first);
	}
	result.memoizedState = baseState;
	return result;
};

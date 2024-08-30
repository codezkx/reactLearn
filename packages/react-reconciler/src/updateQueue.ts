export type Action<State> = State | ((prevState: State) => State);

export interface Update<State> {
	action: Action<State>;
	// lane: Lane;
	// next: Update<any> | null;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
	// dispatch: Dispatch<State> | null;
}

// 创建一个Update实例
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

// 创建一个UpdateQueue实例
export const createUpdateQueue = <Action>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<Action>;
};

// 将update插入到updateQueue中
export const enqueueUpdate = <Action>(
	updateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	updateQueue.shared.pending = update;
};

// 消费update
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): {
	memoizedState: State;
} => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	// 消费过程
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		/* 
            this.setState(1)
            this.setState((x) => x)
            这两个种形式
        */
		if (action instanceof Function) {
			// baseState 1 update (x) => 4x -> memoizedState 4x
			result.memoizedState = action(baseState);
		} else {
			// baseState 1 update 2 -> memoizedState 2
			result.memoizedState = action;
		}
	}
	return result;
};

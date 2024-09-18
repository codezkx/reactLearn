/**
 *
 * @description 内部数据共享层: 文件处理的是当前Hook的集合
 * **/

import { Action } from 'shared/ReactTypes';

export type Dispatch<State> = (action: Action<State>) => void;

export interface Dispatcher {
	// const [num, setNum] = useState(0)   0 -> initialState;   [T, Dispatch<T>] -> [num, setNum]
	// const [num, setNum] = useState((num) => num + 1)   ((num) => num + 1) -> initialState;   [T, Dispatch<T>] -> [num, setNum]
	useState: <T>(initialState: T | (() => T)) => [T, Dispatch<T>];
}

const currentDispatcher: { current: Dispatcher | null } = {
	current: null
};

export const resolveDispatcher = (): Dispatcher => {
	const dispatcher = currentDispatcher.current;

	// hook 只能在FC组件中使用
	if (dispatcher === null) {
		throw new Error('Hook 只能在组件函数中调用');
	}
	return dispatcher;
};

export default currentDispatcher;

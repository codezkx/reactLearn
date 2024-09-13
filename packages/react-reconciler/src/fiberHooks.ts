/**
 *
 * @description 主要处理常用的hooks
 *
 * **/

import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode } from './fiber';

// 获取函数组件的返回值
export function renderWithHooks(wip: FiberNode): ReactElementType {
	const Component = wip.type;
	const props = wip.pendingProps;
	const children = Component(props);
	return children;
}

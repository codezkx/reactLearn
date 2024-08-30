import { type Container } from 'hostConfig';
import { ReactElement, ReactElementType } from 'shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
import { scheduleUpdateOnFiber } from './workLoop';
import {
	createUpdate,
	enqueueUpdate,
	createUpdateQueue,
	UpdateQueue
} from './updateQueue';
import { SyncLane } from './fiberLanes';

/* 
	实现 mount 时调用的 API
*/
// 调用ReactDom.createRoot时执行createContainer(
export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();
}

// 调用render方法后 执行updateContainer
export function updateContainer(
	element: ReactElement | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	// 首屏渲染与更新机制联系起来
	const update = createUpdate<ReactElementType | null>(element);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElement | null>,
		update
	);
	// 把根节点参入到render中进行处理以及渲染
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}

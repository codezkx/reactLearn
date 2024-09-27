import { type Container } from 'hostConfig';
import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
import { scheduleUpdateOnFiber } from './workLoop';
import {
	createUpdate,
	enqueueUpdate,
	createUpdateQueue,
	UpdateQueue
} from './updateQueue';
import { requestUpdateLane } from './fiberLanes';
// import { SyncLane } from './fiberLanes';

/* 
	实现 mount 时调用的 API
*/
// 调用ReactDom.createRoot时执行createContainer(
export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue<ReactElementType>();
	return root;
}

// 调用render方法后 执行updateContainer
export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	const lane = requestUpdateLane();
	// 首屏渲染与更新机制联系起来
	const update = createUpdate<ReactElementType | null>(element, lane);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	// 把根节点参入到render中进行处理以及渲染
	scheduleUpdateOnFiber(hostRootFiber, lane);
	return element;
}

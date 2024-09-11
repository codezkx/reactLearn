import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode, createFiberFromElement } from './fiber';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { HostText } from './workTags';
import { Placement } from './fiberFlags';

/**
 * @param  {boolean} shouldTrackEffects: 是否追踪副作用
 *
 * **/
function ChildReconciler(shouldTrackEffects: boolean) {
	/**
	 * @param  {FiberNode} returnFiber: 父fiber
	 * @param  {FiberNode | null} currentFiber: 当前fiber
	 * @param  {ReactElementType} element: 当前元素
	 * @returns { FiberNode }
	 * **/
	function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElementType
	) {
		// 更具element 创建一个fiber
		const fiber = createFiberFromElement(element);
		fiber.return = returnFiber; // 子fiber的 return 指向 returnFiber(父fiber)
		return fiber;
	}

	/**
	 * @param  {FiberNode} returnFiber: 父fiber
	 * @param  {FiberNode | null} currentFiber: 当前fiber
	 * @param  {string | number} content: 文本类容
	 * @returns { FiberNode }
	 * **/
	function reconcileSingleTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number // 文本类容
	) {
		// content
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber; // 子fiber的 return 指向 returnFiber(父fiber)
		return fiber;
	}

	// 插入单一节点
	function placeSingleChild(fiber: FiberNode) {
		// 初次渲染时 fiber.alternate = current, 单current的值为null, 故判断当前是初始化渲染
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags |= Placement; // 标识为需要构建 「离屏DOM」 的fiberNode
		}
		return fiber;
	}

	return function reconcileChildFiber(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		newChild?: ReactElementType
	) {
		// 判断当前fiber的类型
		if (typeof newChild === 'object' && newChild !== null) {
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(
						reconcileSingleElement(returnFiber, currentFiber, newChild)
					);
				default:
					if (__DEV__) {
						console.warn('未实现的reconcile类型', newChild);
					}
			}
		}
		// TODO 多节点的情况 ul>li * 3

		// 文本节点
		if (typeof newChild === 'string' && typeof newChild === 'number') {
			return placeSingleChild(
				reconcileSingleTextNode(returnFiber, currentFiber, newChild)
			);
		}
		if (__DEV__) {
			console.warn('未实现的reconcile类型', newChild);
		}
		return null;
	};
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);

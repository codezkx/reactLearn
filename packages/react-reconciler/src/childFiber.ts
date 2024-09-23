import { Props, ReactElementType } from 'shared/ReactTypes';
import {
	FiberNode,
	createFiberFromElement,
	createWorkInProgress
} from './fiber';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { HostText } from './workTags';
import { ChildDeletion, Placement } from './fiberFlags';

/**
 * @param  {boolean} shouldTrackEffects: 是否追踪副作用
 *
 * **/
function ChildReconciler(shouldTrackEffects: boolean) {
	// 对需要删除的子fiber 做对应的标记, 并生成deletions 来存储需要删除的fiberNode
	function deleteChild(returnFiber: FiberNode, childToDelete: FiberNode) {
		if (!shouldTrackEffects) {
			return;
		}
		const deletions = returnFiber.deletions;
		// 初始化时需要设置成数组
		if (deletions === null) {
			// mount
			returnFiber.deletions = [childToDelete];
			returnFiber.flags |= ChildDeletion;
		} else {
			// update
			deletions.push(childToDelete);
		}
	}

	/**
	 * @param  {FiberNode} returnFiber: 父fiber
	 * @param  {FiberNode | null} currentFiber: 当前fi ber
	 * @param  {ReactElementType} element: 当前元素
	 * @returns { FiberNode }
	 * **/
	function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElementType
	) {
		const key = element.key;
		work: if (currentFiber !== null) {
			if (key === currentFiber.key) {
				// key相同
				if (element.$$typeof === REACT_ELEMENT_TYPE) {
					if (element.type === currentFiber.type) {
						// type相同
						const existing = useFiber(currentFiber, element.props);
						existing.return = returnFiber;
						return existing;
					}
					// type不相同 删除旧的FiberNode
					deleteChild(returnFiber, currentFiber);
					break work;
				} else {
					if (__DEV__) {
						console.warn('还未实现的react类型', element);
						break work;
					}
				}
			} else {
				// key不相同 删除旧的FiberNode
				deleteChild(returnFiber, currentFiber);
			}
		}
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
		if (currentFiber !== null) {
			if (currentFiber.tag === HostText) {
				// type相同
				const existing = useFiber(currentFiber, { content });
				existing.return = returnFiber;
				return existing;
			}
			// 处理 div 更新成 ‘text ’
			deleteChild(returnFiber, currentFiber);
		}

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
						console.warn('未定义的element.$$typeof', newChild);
					}
			}
		}
		// TODO 多节点的情况 ul>li * 3

		// 文本节点 HostText
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(
				reconcileSingleTextNode(returnFiber, currentFiber, newChild)
			);
		}

		if (currentFiber) {
			deleteChild(returnFiber, currentFiber);
		}
		// 兜底删除

		if (__DEV__) {
			console.warn('未实现的reconcile类型', newChild);
		}
		return null;
	};

	function useFiber(fiber: FiberNode, pendingProps: Props): FiberNode {
		const clone = createWorkInProgress(fiber, pendingProps);
		clone.index = 0;
		clone.sibling = null;
		return clone;
	}
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);

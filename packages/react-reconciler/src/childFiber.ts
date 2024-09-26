import { Props, ReactElementType } from 'shared/ReactTypes';
import {
	FiberNode,
	createFiberFromElement,
	createWorkInProgress
} from './fiber';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { HostText } from './workTags';
import { ChildDeletion, Placement } from './fiberFlags';

type ExistingChildren = Map<string | number, FiberNode>;

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

	function deleteRemainingChildren(
		returnFiber: FiberNode,
		currentFirstChild: FiberNode | null
	) {
		if (!shouldTrackEffects) {
			return;
		}
		let childToDelete = currentFirstChild;
		if (childToDelete !== null) {
			deleteChild(returnFiber, childToDelete);
			// 赋值兄弟元素
			childToDelete = childToDelete.sibling;
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
		while (currentFiber !== null) {
			if (key === currentFiber.key) {
				// key相同
				if (element.$$typeof === REACT_ELEMENT_TYPE) {
					if (element.type === currentFiber.type) {
						// type相同
						const existing = useFiber(currentFiber, element.props);
						existing.return = returnFiber;

						// 当前节点可以复用, 删除剩下的节点   A1B2C3 -> A1。
						deleteRemainingChildren(returnFiber, currentFiber.sibling);
						return existing;
					}
					// key 相同,  type不相同. 删除所有旧的node
					deleteRemainingChildren(returnFiber, currentFiber);
					break;
				} else {
					if (__DEV__) {
						console.warn('还未实现的react类型', element);
						break;
					}
				}
			} else {
				// key不相同 删除旧的FiberNode
				deleteChild(returnFiber, currentFiber);
				currentFiber = currentFiber.sibling;
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
		while (currentFiber !== null) {
			if (currentFiber.tag === HostText) {
				// type相同
				const existing = useFiber(currentFiber, { content });
				existing.return = returnFiber;
				// 当前节点可以复用, 删除剩下的节点   A1B2C3 -> A1。
				deleteRemainingChildren(returnFiber, currentFiber.sibling);
				return existing;
			}
			// 处理 div 更新成 ‘text ’
			deleteChild(returnFiber, currentFiber);
			currentFiber = currentFiber.sibling;
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

	function reconcileChildrenArray(
		returnFiber: FiberNode,
		currentFirstChild: FiberNode | null,
		newChild: any[]
	) {
		// 遍历到的最后一个可复用fiber在before中的index
		let lastPlacedIndex = 0;
		// 创建的最后一个fiber
		let lastNewFiber: FiberNode | null = null;
		// 创建的第一个fiber
		let firstNewFiber: FiberNode | null = null;

		// 1. 将current中所有同级fiber保存在Map中
		const existingChildren: ExistingChildren = new Map();
		let current = currentFirstChild;
		while (current !== null) {
			const keyToUse = current.key !== null ? current.key : current.index;
			existingChildren.set(keyToUse, current);
			current = current.sibling;
		}

		for (let i = 0, len = newChild.length; i < len; i++) {
			// 2. 遍历newChild数组,  寻找是否可复用
			const after = newChild[i];
			const newFiber = updateFromMap(returnFiber, existingChildren, i, after);

			// div -> null 情况
			if (newFiber === null) {
				continue;
			}

			// 3. 判断是插入还是移动
			newFiber.index = i;
			newFiber.return = returnFiber;
			if (lastNewFiber === null) {
				lastNewFiber = newFiber;
				firstNewFiber = newFiber;
			} else {
				lastNewFiber.sibling = newFiber;
				lastNewFiber = lastNewFiber.sibling;
			}

			if (!shouldTrackEffects) {
				continue;
			}
			const current = newFiber.alternate;
			if (current !== null) {
				const oldIndex = current.index;
				if (oldIndex < lastPlacedIndex) {
					// 移动
					newFiber.flags |= Placement;
				} else {
					// 不移动
					lastPlacedIndex = oldIndex;
				}
			} else {
				// mount
				newFiber.flags |= Placement;
			}
		}

		// 4. 最后Map中剩下的都标记删除
		existingChildren.forEach((fiber) => {
			deleteChild(returnFiber, fiber);
		});
		return firstNewFiber;
	}

	function updateFromMap(
		returnFiber: FiberNode,
		existingChildren: ExistingChildren,
		index: number,
		element: any
	): FiberNode | null {
		const keyToUse = element.key !== null ? element.key : index;
		const before = existingChildren.get(keyToUse);

		// HostText
		if (typeof element === 'string' || typeof element === 'number') {
			if (before) {
				// 是否可以复用
				if (before.tag === HostText) {
					existingChildren.delete(keyToUse);
					return useFiber(before, { content: element + '' });
				}
			}
			return new FiberNode(HostText, { content: element + '' }, null);
		}

		// ReactElementType
		if (typeof element === 'object' && element !== null) {
			switch (element.$$typeof) {
				case REACT_ELEMENT_TYPE:
					if (before) {
						if (before.tag === element.type) {
							existingChildren.delete(keyToUse);
							return useFiber(before, element.props);
						}
					}
					return createFiberFromElement(element);
			}
		}

		// TODO 数组类型
		if (Array.isArray(element) && __DEV__) {
			console.warn('还未实现数组类型的child');
		}
		return null;
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
			// TODO 多节点的情况 ul>li * 3
			// 第一层数组直接遍历，嵌套数组作为Fragment处理
			// 如： <ul><li/>{[<li/>, <li/>]}</ul>
			if (Array.isArray(newChild)) {
				return reconcileChildrenArray(returnFiber, currentFiber, newChild);
			}
		}

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

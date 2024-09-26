import {
	Container,
	Instance,
	appendChildToContainer,
	commitUpdate,
	insertChildToContainer,
	removeChild
} from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import {
	ChildDeletion,
	MutationMask,
	NoFlags,
	Placement,
	Update
} from './fiberFlags';
import {
	FunctionComponent,
	HostComponent,
	HostRoot,
	HostText
} from './workTags';

let nextEffect: FiberNode | null = null;

// DFS(深度优先)
export function commitMutationEffects(finishedWork: FiberNode) {
	nextEffect = finishedWork;

	// 这里nextEffect是根节点, 所以需要递归子节点
	// 递归过程中需要判断, 哪些节点subtreeFlags是否需要更新处理
	while (nextEffect !== null) {
		// 向下遍历
		const child: FiberNode | null = nextEffect.child;
		if (
			(nextEffect.subtreeFlags & MutationMask) !== NoFlags &&
			child !== null
		) {
			nextEffect = child; // 查看子节点是否存在需要处理的flags
		} else {
			// 向上遍历
			up: while (nextEffect !== null) {
				commitMutationEffectsOnFiber(nextEffect);
				const sibling: FiberNode | null = nextEffect.sibling;
				if (sibling !== null) {
					nextEffect = sibling; // 先遍历兄弟节点
					break up;
				}
				nextEffect = nextEffect.return; // 遍历父节点
			}
		}
	}
}

// 处理flags 需要更新节点操作
const commitMutationEffectsOnFiber = (finishedWork: FiberNode) => {
	const flags = finishedWork.flags;

	if ((flags & Placement) !== NoFlags) {
		// 插入/移动
		commitPlacement(finishedWork);
		// 0b0001(flags) & 0b0001(Placement) ~ 0b0000
		finishedWork.flags &= ~Placement;
	}

	if ((flags & Update) !== NoFlags) {
		// 插入/移动
		commitUpdate(finishedWork);
		finishedWork.flags &= ~Update;
	}

	if ((flags & ChildDeletion) !== NoFlags) {
		const deletions = finishedWork.deletions;
		if (deletions !== null) {
			deletions.forEach((childToDelete) => {
				commitDeletion(childToDelete);
			});
		}
	}
};

function recordHostChildrenToDelete(
	hostChildrenToDelete: FiberNode[],
	unmountFiber: FiberNode
) {
	// 1. 找到第一个 root host 节点
	let lastOne = hostChildrenToDelete[hostChildrenToDelete.length - 1];
	// 当前没有存在要删除的Host节点
	if (!lastOne) {
		hostChildrenToDelete.push(unmountFiber);
	} else {
		// 当前存在要删除的Host节点
		let node = lastOne.sibling;
		while (node !== null) {
			if (unmountFiber === node) {
				hostChildrenToDelete.push(unmountFiber);
			}
			node = node.sibling;
		}
	}
	// 2. 每找到一个host节点, 判断下这个节点是不是 第一个 找到的那个节点的兄弟节点
}

function commitDeletion(childToDeletion: FiberNode) {
	// 在Fragment之前，只需删除子树的根Host节点，但支持Fragment后，可能需要删除同级多个节点
	let hostChildrenToDelete: FiberNode[] = [];

	// 递归子树
	commitNestedComponent(childToDeletion, (unmountFiber) => {
		switch (unmountFiber.tag) {
			case HostComponent:
				if (hostChildrenToDelete === null) {
					recordHostChildrenToDelete(hostChildrenToDelete, unmountFiber);
					// hostChildrenToDelete = unmountFiber;

					// TODO 解绑ref
				}
				return;
			case HostText:
				if (hostChildrenToDelete === null) {
					recordHostChildrenToDelete(hostChildrenToDelete, unmountFiber);
					// hostChildrenToDelete = unmountFiber;
				}
				return;
			case FunctionComponent:
				// TODO useEffect unmount
				return;
			default:
				if (__DEV__) {
					console.log('未处理的unmount类型', unmountFiber);
				}
				break;
		}
	});

	// 移除rootHostComponent DOM
	if (hostChildrenToDelete.length) {
		const hostParent = getHostParent(childToDeletion);
		if (hostParent !== null) {
			hostChildrenToDelete.forEach((node) => {
				removeChild(node.stateNode, hostParent);
			});
		}
	}
	childToDeletion.return = null;
	childToDeletion.child = null;
}

function commitNestedComponent(
	root: FiberNode,
	onCommitUnmount: (fiber: FiberNode) => void
) {
	let node = root;
	while (true) {
		onCommitUnmount(node);

		if (node.child !== null) {
			node.child.return = node;
			node = node.child;
			continue;
		}
		if (node === root) {
			return;
		}

		while (node.sibling === null) {
			if (node.return === null || node.return === root) {
				return;
			}
			// 向上递归
			node = node.return;
		}
		node.sibling.return = node.return;
		node = node.sibling;
	}
}

// 插入/移动
function commitPlacement(finishedWork: FiberNode) {
	if (__DEV__) {
		console.warn('执行Placement操作 -> 插入、移动DOM', finishedWork);
	}
	// 获取其父节点
	const hostParent = getHostParent(finishedWork);

	// host sibling
	const sibling = getHostSibling(finishedWork);

	if (hostParent) {
		// 获取 finishedWork 对应的节点  并添加到父节点中
		insertOrAppendPlacementNodeIntoContainer(finishedWork, hostParent, sibling);
	}
}

/**
 * 难点在于目标fiber的hostSibling可能并不是他的同级sibling
 * 比如： <A/><B/> 其中：function B() {return <div/>} 所以A的hostSibling实际是B的child
 * 实际情况层级可能更深
 * 同时：一个fiber被标记Placement，那他就是不稳定的（他对应的DOM在本次commit阶段会移动），也不能作为hostSibling
 */
function getHostSibling(fiber: FiberNode) {
	let node: FiberNode = fiber;
	findSibling: while (true) {
		// 向上遍历
		while (node.sibling === null) {
			// 如果当前节点没有sibling，则找他父级sibling
			const parent = node.return;

			// 没有找到对应的节点
			if (
				parent === null ||
				parent.tag === HostComponent ||
				parent.tag === HostRoot
			) {
				return null;
			}
			node = parent;
		}
		node.sibling.return = node.return;
		// 向同级sibling寻找
		node = node.sibling;

		// 向下遍历
		while (node.tag !== HostText && node.tag !== HostComponent) {
			// 找到一个非Host fiber，向下找，直到找到第一个Host子孙
			if ((node.flags & Placement) !== NoFlags) {
				// 这个fiber不稳定，不能用
				continue findSibling;
			}
			if (node.child === null) {
				continue findSibling;
			} else {
				node.child.return = node;
				node = node.child;
			}
		}

		// 找到最有可能的fiber
		if ((node.flags & Placement) === NoFlags) {
			// 这是稳定的fiber，就他了
			return node.stateNode;
		}
	}
}

function getHostParent(fiber: FiberNode): Container | null {
	let parent = fiber.return;
	while (parent) {
		const parentTag = parent.tag;
		if (parentTag === HostComponent) {
			return parent.stateNode as Container;
		}
		if (parentTag === HostRoot) {
			return (parent.stateNode as FiberRootNode).container;
		}
		parent = parent.return;
	}
	if (__DEV__) {
		console.warn('未找到 host parent');
	}
	return null;
}

function insertOrAppendPlacementNodeIntoContainer(
	finishedWork: FiberNode,
	hostParent: Container,
	before?: Instance
) {
	if (finishedWork.tag === HostComponent || finishedWork.tag === HostText) {
		if (before) {
			insertChildToContainer(finishedWork.stateNode, hostParent, before);
		} else {
			appendChildToContainer(hostParent, finishedWork.stateNode);
		}
		return;
	}

	const child = finishedWork.child;
	if (child !== null) {
		insertOrAppendPlacementNodeIntoContainer(child, hostParent);
		let sibling = child.sibling;

		while (sibling !== null) {
			insertOrAppendPlacementNodeIntoContainer(sibling, hostParent);
			sibling = sibling.sibling;
		}
	}
}

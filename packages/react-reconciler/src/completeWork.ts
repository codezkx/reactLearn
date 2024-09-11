import {
	appendInitialChildren,
	createInstance,
	createTextInstance
} from 'hostConfig';
import { FiberNode } from './fiber';
import { HostRoot, HostComponent, HostText } from './workTags';
import { NoFlags } from './fiberFlags';

export function completeWork(wip: FiberNode) {
	const newProps = wip.pendingProps;
	const current = wip.alternate;
	switch (wip.tag) {
		case HostComponent:
			if (current !== null && wip.stateNode) {
				// update
			} else {
				// 1. 构建DOM
				const instance = createInstance(wip.type, newProps);
				// 2. 将DOM插入到DOM树中
				appendAllChildren(instance, wip);
				wip.stateNode = instance;
			}
			bubbleProperties(wip);
			return;
		case HostText:
			// 1. 构建DOM
			const instance = createTextInstance(newProps.content);
			// 2. 将DOM插入到DOM树中
			wip.stateNode = instance;
			bubbleProperties(wip);
			return null; // 没有用子节点, 需要在“归”中处理
		case HostRoot:
			bubbleProperties(wip);
			return;
		default:
			if (__DEV__) {
				console.warn('');
				break;
			}
	}
}

// 在parent 中插入 wip    ???
function appendAllChildren(parent: FiberNode, wip: FiberNode) {
	let node = wip.child;
	// 存在兄弟节点
	while (node !== null) {
		if (node.tag === HostComponent || node.tag === HostRoot) {
			appendInitialChildren(parent, node?.stateNode);
		} else if (node.child !== null) {
			node.child.return = node;
			node = node.child;
			continue;
		}

		if (node === wip) {
			return;
		}

		// 处理兄弟节点, 并向上递归
		while (node.sibling === null) {
			if (node.return === null || node.return === wip) {
				return;
			}
			node = node?.return;
		}
		node.sibling.return = node.return;
		node = node.sibling;
	}
}

// 利用completeWork向上遍历(归)的流程, 将子fiberNode的flags冒泡到父fiberNode
function bubbleProperties(wip: FiberNode) {
	let subtreeFlags = NoFlags;
	let child = wip.child;
	while (child !== null) {
		subtreeFlags |= child.subtreeFlags;
		subtreeFlags |= child.flags;

		child.return = wip;
		child = child.sibling;
	}
	wip.subtreeFlags = subtreeFlags;
}

import { FiberNode } from 'react-reconciler/src/fiber';
import { HostText } from 'react-reconciler/src/workTags';
import { type DOMElement, updateFiberProps } from './SyntheticEvent';

export type Container = Element;
export type Instance = Element;
export type TextInstance = Text;

// 创建一个元素节点
export const createInstance = (type: string, props: any): Instance => {
	// TODO 处理 props;
	const element = document.createElement(type) as unknown as DOMElement;
	updateFiberProps(element, props);
	return element;
};

// 添加子节点
export const appendInitialChildren = (
	parent: Instance | Container,
	child: Instance
) => {
	parent.appendChild(child);
};

// 创建一个文本节点
export const createTextInstance = (content: string) => {
	return document.createTextNode(content);
};

export const appendChildToContainer = appendInitialChildren;

export function commitUpdate(fiber: FiberNode) {
	switch (fiber.tag) {
		case HostText:
			const text = fiber.memoizedProps.content;
			return commitTextUpdate(fiber.stateNode, text);
		default:
			if (__DEV__) {
				console.warn('未实现的Update类型', fiber);
			}
			break;
	}
}

export function commitTextUpdate(textInstance: TextInstance, content: string) {
	textInstance.textContent = content;
}

export function removeChild(
	child: Instance | TextInstance,
	container: Container
) {
	container.removeChild(child);
}

export const insertChildToContainer = (
	child: Instance,
	container: Container,
	before: Instance
) => {
	container.insertBefore(child, before);
};

export const scheduleMicroTask =
	typeof queueMicrotask === 'function'
		? queueMicrotask
		: typeof Promise === 'function'
		? (callback: (...args: any) => void) => Promise.resolve(null).then(callback)
		: setTimeout;

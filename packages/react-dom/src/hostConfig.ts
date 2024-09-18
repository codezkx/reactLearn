export type Container = Element;
export type Instance = Element;

// 创建一个元素节点
export const createInstance = (type: string, props: any): Instance => {
	// TODO 处理 props;
	const element = document.createElement(type);
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

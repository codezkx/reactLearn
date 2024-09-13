export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText
	| typeof Fragment;

export const FunctionComponent = 0; // 组件节点

/**
 * @description 根节点 rootElement  FiberRootNode
 * **/
export const HostRoot = 3;

/**
 * @description 根组件节点   HostRootFiber
 * **/
export const HostComponent = 5;

export const HostText = 6; // 文本及诶单
export const Fragment = 7; // 空节点

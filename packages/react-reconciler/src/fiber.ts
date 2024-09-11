import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import {
	Fragment,
	FunctionComponent,
	HostComponent,
	type WorkTag
} from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	// 需要改变的props
	pendingProps: Props;
	// 元素的key
	key: Key;
	// 如果类型HostComponent 是 <div> 那么stateNode是div元素的DOM节点
	stateNode: any;
	// FunctionComponent => type 函数本身
	type: any;
	ref: Ref;
	// 节点类型 (一般由元素节点, 组件节点等)
	tag: WorkTag;
	flags: Flags;
	// 子树中的flags
	subtreeFlags: Flags;

	// 指向父fiberNode
	return: FiberNode | null;
	// 兄弟fiberNode
	sibling: FiberNode | null;
	// 子 fiberNode
	child: FiberNode | null;
	// 同级fiberNode 的索引
	index: number;

	memoizedProps: Props | null; // 更新后的
	// 在current 和 workInProgress 之间切换; 当alternate= current时, 更新后为alternate= workInProgress, 反之亦然
	alternate: FiberNode | null;
	updateQueue: unknown; // 更新的数据结构 存储state的
	memoizedState: any; // 最终状态  更新后的

	/**
	 * @param {WorkTag} tag
	 * @param {Props} pendingProps
	 * @param {Key} key
	 * **/
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.pendingProps = pendingProps;
		this.key = key;
		this.stateNode = null;
		this.type = null;

		// 结构树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps; // 记录刚才的未处理的Props
		this.memoizedProps = null; // 记录处理后的Props
		this.updateQueue = null;
		this.memoizedState = null;

		// 在current 和 workInProgress 之间切换; 当alternate= current时, 更新后为alternate= workInProgress, 反之亦然
		this.alternate = null;
		// 副作用
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
	}
}

// 执行ReactDom.createRoot时实例化, container就是rootElement
export class FiberRootNode {
	// 容器
	container: Container;
	// 指向当前的 FiberNode
	current: FiberNode;
	// 指向更新完成后的FiberNode
	finishedWork: FiberNode | null;

	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;

	if (wip === null) {
		// mount  首次的 current 就是 hostRootFiber
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.type = current.type;
		wip.stateNode = current.stateNode; // FiberRootNode

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
		// wip.deletions = null;
		wip.type = current.type;
	}
	wip.updateQueue = current.updateQueue;
	wip.flags = current.flags;
	wip.child = current.child;

	// 数据
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	// wip.lanes = current.lanes;

	return wip;
};

// 更具element 创建一个fiber
export function createFiberFromElement(element: ReactElementType): FiberNode {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;

	if (typeof type === 'string') {
		// <div /> type: "div"  根元素  render(<div/>)
		fiberTag = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的type类型', element);
	}
	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}

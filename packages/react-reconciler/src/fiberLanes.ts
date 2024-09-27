import { FiberRootNode } from './fiber';

export type Lane = number;
export type Lanes = number;

/* 批量更新优先级 */

export const NoLane = /*               */ 0b0000000000000000000000000000000; // 没有优先级
export const NoLanes = /*              */ 0b0000000000000000000000000000000; //
export const SyncLane = /*             */ 0b0000000000000000000000000000001; // 同步，ex：onClick
export const InputContinuousLane = /*  */ 0b0000000000000000000000000000010; // 连续触发，ex：onScroll
export const DefaultLane = /*          */ 0b0000000000000000000000000000100; // 默认，ex：useEffect回调
export const IdleLane = /*             */ 0b1000000000000000000000000000000; // 空闲

export function mergeLanes(laneA: Lane, laneB: Lane): Lane {
	return laneA | laneB;
}

export function requestUpdateLane(): Lane {
	// TODO render阶段触发更新
	// TODO Transition
	// 从当前上下文中获取优先级信息
	// const currentSchedulerPriorityLevel = getCurrentSchedulerPriorityLevel();
	// const updateLane = schedulerPriorityToLane(currentSchedulerPriorityLevel);
	// console.warn('updateLane!', updateLane);
	// return updateLane;
	return SyncLane;
}

// 判断优先级最高的lane  二进制越小优先级越高
export function getHighestPriorityLane(lanes: Lanes): Lane {
	return lanes & -lanes;
}

// 移除对应的lane
export function markRootFinished(root: FiberRootNode, lanes: Lanes) {
	root.pendingLanes &= ~lanes;
}

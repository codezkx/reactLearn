export type Flags = number;

// 当前没有标记
export const NoFlags = 0b00000000000000000000000000;
// 初始化  结构变化相关的flags
export const Placement = 0b00000000000000000000000010;
// 更新节点  属性相关的flags
export const Update = 0b00000000000000000000000100;
// 删除子节点  结构变化相关的flags
export const ChildDeletion = 0b00000000000000000000010000;

// useEffect
export const PassiveEffect = 0b00000000000000000000100000;

// 需要更新节点操作
export const MutationMask = Placement | Update | ChildDeletion;

// 删除子节点可能触发useEffect destroy
export const PassiveMask = PassiveEffect | ChildDeletion;

export type Flags = number;

// 当前没有标记
export const NoFlags = 0b00000000000000000000000000;
// 初始化
export const Placement = 0b00000000000000000000000010;
// 更新节点
export const Update = 0b00000000000000000000000100;
// 删除子节点
export const ChildDeletion = 0b00000000000000000000010000;

// useEffect
export const PassiveEffect = 0b00000000000000000000100000;

export const MutationMask = Placement | Update | ChildDeletion;

// 删除子节点可能触发useEffect destroy
export const PassiveMask = PassiveEffect | ChildDeletion;

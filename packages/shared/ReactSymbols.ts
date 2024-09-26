// React element 属性

// 判断symbol是否存在
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// 创建一个symbol  确保类型唯一
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;

export const REACT_FRAGMENT_TYPE = supportSymbol
	? Symbol.for('react.fragment')
	: 0xeacb;

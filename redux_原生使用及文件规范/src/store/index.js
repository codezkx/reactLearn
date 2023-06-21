const { createStore } = require('redux'); // 老的写法  一般老项目还在使用

// 定义初始化数据
// const initialState = {
//     name: 'uzi',
//     age: 26,
// };

// function reducer(state, action) {
//     // if (action.type === 'change_name') {
//     //     return {...state, name: action.name}
//     // } else if (action.type === 'change_age') {
//     //     return {...state, age: action.age}
//     // }
//     switch (action.type) {
//         case 'change_name':
//             return {...state, name: action.name};
//         case 'change_age':
//             return {...state, age: action.age}
//         default:
//             return false
//     }
//     return initialState;
// };

const reducer = require('./reducer');

const store = createStore(reducers);

module.exports = store;

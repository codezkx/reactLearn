const store = require('./store');

console.log(store.getState()); // { name: 'uzi', age: 26 }

// 修改store中的数据
const nameAction = { type: 'change_name', name: '简自豪' }; // { name: '简自豪', age: 26 }
store.dispatch(nameAction);
console.log(store.getState());

const ageAction = { type: 'change_age', age: 22}
store.dispatch(ageAction);
console.log(store.getState());


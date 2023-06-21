const {
    CHANGE_NAME,
    CHANGE_AGE
} = require('./constants');

// 定义初始化数据
const initialState = {
    name: 'uzi',
    age: 26,
};

const reducer = (state, action) => {
    // if (action.type === 'change_name') {
    //     return {...state, name: action.name}
    // } else if (action.type === 'change_age') {
    //     return {...state, age: action.age}
    // }
    switch (action.type) {
        case CHANGE_NAME:
            return {...state, name: action.name};
        case CHANGE_AGE:
            return {...state, age: action.age}
        default:
            return initialState;
    }
};

module.exports = {
    reducer
}

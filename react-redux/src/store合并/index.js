import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './counter';
import homeReducer from './hone';

const reducer = combineReducers({
    counter: counterReducer,
    category: homeReducer,
});

// redux-devtools
// 把redux中的状态数据展示在浏览器控制台的redux的action，方便调试代码   
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
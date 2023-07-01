import axios from 'axios';

import * as actionTypes from './constants';

// 执行异步操作
export const fetchHomeMultidataAction = () => {
    // 返回一个函数 在组件调用
    return function (dispatch, getState) {
        console.log('axios')
        axios.get("http://123.207.32.32:8000/home/multidata")
            .then(res => {
                const banners = res.data.data.banner.list;
                const recommends = res.data.data.recommend.list;
                dispatch({ type: actionTypes.CHANGE_BANNERS, banners });
                dispatch({ type: actionTypes.CHANGE_RECOMMENDS, recommends });
            })
    }
    // 如果返回的是一个函数, 那么redux是不支持的  需要redux-thunk 中间件来处理不能返回除对象意外的类型
    // return foo
};

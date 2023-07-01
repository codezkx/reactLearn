import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// createAsyncThunk 创建一个异步
export const fetchHomeMultidataAction = createAsyncThunk(
    "fetch/homemultidata",
    async (
        extraInfo, 
        {abort, dispatch, extra, fulfillWithValue, getState, rejectWithValue, requestId, signal}
    ) => {
        // 1.发送网络请求, 获取数据
        const res = await axios.get("http://123.207.32.32:8000/home/multidata");
        const banners = res.data.data.banner.list;
        const recommends = res.data.data.recommend.list;
        // console.log(extraInfo, 'extraInfo'); // message: "用户自己传入的参数，比如id"
        
        // 2.取出数据, 并且在此处直接dispatch操作(可以不做，可以在下面的extraReducers中执行)
        dispatch(changeBanners(banners))
        dispatch(changeRecommends(recommends))
        // 3.返回结果, 那么action状态会变成fulfilled状态
        // return res.data
    }
)

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        banners: [],
        recommends: []
    }, 
    reducers: {
        changeBanners(state, { payload }) {
            state.banners = payload
        },
        changeRecommends(state, { payload }) {
            state.recommends = payload
        }
    },
    // 对象形式写法
    // extraReducers: {
    //     // 执行操作
    //     [fetchHomeMultidataAction.pending](state, action) {
    //         // 数据正在加载
    //         console.log(action)
    //     },
    //     /* 
    //         meta：用户从组件中传入的extraInfo  及一些对应的唯一id和状态（extraReducers的生命周期）
    //         payload： fetchHomeMultidataAction 回调函数返回的值
    //         type：action type 及拼接的状态
    //     */
    //     [fetchHomeMultidataAction.fulfilled](state, {meta , payload, type}) {
    //         state.banners = payload.data.banner.list;
    //         state.recommends = payload.data.recommend.list;
    //     },
    //     [fetchHomeMultidataAction.rejected](state, action) {
    //         // 执行错误
    //         console.log("fetchHomeMultidataAction rejected")
    //     }
    // },
    // 函数写法
    // extraReducers: (builder) => {
    //     builder.addCase(fetchHomeMultidataAction.pending, (state, action) => {
    //     console.log("fetchHomeMultidataAction pending")
    //     }).addCase(fetchHomeMultidataAction.fulfilled, (state, { payload }) => {
    //     state.banners = payload.data.banner.list
    //     state.recommends = payload.data.recommend.list
    //     })
    // }
});

export const { changeBanners, changeRecommends } = homeSlice.actions
export default homeSlice.reducer

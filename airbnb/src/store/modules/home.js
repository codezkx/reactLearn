import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { 
	getHomeGoodPriceData,
	getHomeHighScoreData,
	getHomeDiscountData,
} from '@/services/modules/home';

export const fetchHomeDataAction = createAsyncThunk('fetchdata', async (payload, { dispatch }) => {
		getHomeGoodPriceData().then(res => dispatch(changeGoodPriceInfoAction(res)))
		getHomeHighScoreData().then(res => dispatch(changeHomeHighScoreInfoAction(res)))
		getHomeDiscountData().then(res => dispatch(changeHomeDiscountInfoAction(res)))
});

const homeSlice = createSlice({
	name: 'home',
	initialState: {
			goodPriceInfo: {},
			highScoreInfo: {},
			discountInfo: {},
	},
	reducers: {
		changeGoodPriceInfoAction(state, { payload }) {
			state.goodPriceInfo = payload;
		},
		changeHomeHighScoreInfoAction(state, {payload}) {
			state.highScoreInfo = payload;
		},
		changeHomeDiscountInfoAction(state, { payload }) {
			state.discountInfo = payload;
		},
	},
	
	// extraReducers: {
  //   [fetchHomeDataAction.fulfilled](state, { payload }) {
  //     state.goodPriceInfo = payload;
  //   }
	// }
});

export const { 
	changeGoodPriceInfoAction,
	changeHomeHighScoreInfoAction,
	changeHomeDiscountInfoAction,
 } = homeSlice.actions

export default homeSlice.reducer

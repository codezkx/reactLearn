import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { 
	getHomeGoodPriceData,
	getHomeHighScoreData,
	getHomeDiscountData,
	getHomeHotRecommendData,
	getHomeLongforData,
	getHomePlusData,
} from '@/services/modules/home';

export const fetchHomeDataAction = createAsyncThunk('fetchdata', async (payload, { dispatch }) => {
	getHomeDiscountData().then(res => dispatch(changeHomeDiscountInfoAction(res)));
	getHomeHotRecommendData().then(res => dispatch(changeHomeHotRecommendInfoAction(res)));
	getHomeGoodPriceData().then(res => dispatch(changeGoodPriceInfoAction(res)));
	getHomeHighScoreData().then(res => dispatch(changeHomeHighScoreInfoAction(res)));
	getHomeLongforData().then(res => dispatch(changeLongforInfoAction(res)));
	getHomePlusData().then(res => dispatch(changePlusInfoAction(res)))
});

const homeSlice = createSlice({
	name: 'home',
	initialState: {
			goodPriceInfo: {},
			highScoreInfo: {},
			discountInfo: {},
			recommendInfo: {},
			longforInfo: {},
			plusInfo: {},
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
		changeHomeHotRecommendInfoAction(state, { payload }) {
			state.recommendInfo = payload;
		},
		changeLongforInfoAction(state, { payload }) {
			state.longforInfo = payload;
		},
		changePlusInfoAction(state, { payload }) {
			state.plusInfo = payload;
		}
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
	changeHomeHotRecommendInfoAction,
	changeLongforInfoAction,
	changePlusInfoAction,
 } = homeSlice.actions

export default homeSlice.reducer

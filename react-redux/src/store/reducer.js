import * as actionTypes from './constants';

const initialState = { 
    counter: 100,
    banners: [],
    recommends: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COUNTER:
            return { ...state, counter: state.counter + action.counter };
        case actionTypes.SUB_COUNTER:
            return { ...state, counter: state.counter - action.counter };
        case actionTypes.CHANGE_BANNERS:
            return { ...state, banners: action.banners };
        case actionTypes.CHANGE_RECOMMENDS:
            return { ...state, recommends: action.recommends };
        default:
            return state
    }
}

export default reducer
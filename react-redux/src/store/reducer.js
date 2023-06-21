
import * as actionTypes from './constants';

const initialState = { 
    counter: 100,
};

const reducer = (state, action) => {
    console.log(action, action)
    switch (action.type) {
        case actionTypes.ADD_COUNTER:
            return { ...state, counter: action.counter };
        case actionTypes.SUB_COUNTER:
            return { ...state, counter: action.counter };
        default:
            return initialState
    }
}

export default reducer
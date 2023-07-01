
import * as actionTypes from './constants';

export const addCounterAction = (counter) => ({
    type: actionTypes.ADD_COUNTER,
    counter: counter,
});

export const subCounterAction = (counter) => ({
    type: actionTypes.SUB_COUNTER,
    counter: counter,
});

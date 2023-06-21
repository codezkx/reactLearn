import * as actionType from './constants';
import store from './index';

export const addCounterAction = (counter) => ({
    type: actionType.ADD_COUNTER,
    counter: store.getState().counter + counter,
});

export const subCounterAction = (counter) => ({
    type: actionType.SUB_COUNTER,
    counter: store.getState().counter - counter,
})
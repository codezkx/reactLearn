import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 888,
    },
    reducers: {
        /* 
            payload： 数据
            type： action types
        */
        addCounterAction(state, {payload, type}) {
            state.counter += payload;
        },
        subCounterAction(state, {payload, type}) {
            state.counter -= payload;
        }
    }
});

export const { addCounterAction, subCounterAction } = counterSlice.actions;
export default counterSlice.reducer

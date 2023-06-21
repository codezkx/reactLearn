import { useState } from "react";
import store from '../../store';
import { addCounterAction } from '../../store/actionCreators';

const Home = (props) => {
    const [counter, setCounter] = useState(store.getState().counter)
    // 订阅store
    store.subscribe(() => {
        setCounter(store.getState().counter)
    })
    return (
        <div>
            <h2>HomeCounter: { counter }</h2>
            <button onClick={() => store.dispatch(addCounterAction(5))}>+5</button>
            <button onClick={() => store.dispatch(addCounterAction(10))}>+10</button>
            <button onClick={() => store.dispatch(addCounterAction(15))}>+15</button>
        </div>
    )
}

export default Home
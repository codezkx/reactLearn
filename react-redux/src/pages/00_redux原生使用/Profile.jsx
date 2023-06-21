import { useState } from "react";
import store from '../../store';
import { subCounterAction } from '../../store/actionCreators';


const Profile = (props) => {
    const [counter, setCounter] = useState(store.getState().counter)
    store.subscribe(() => {
        setCounter(store.getState().counter)
    })
    return (
        <div>
            <h2>ProfileCounter: { counter }</h2>
            <button onClick={() => store.dispatch(subCounterAction(5))}>-5</button>
            <button onClick={() => store.dispatch(subCounterAction(10))}>-10</button>
            <button onClick={() => store.dispatch(subCounterAction(15))}>-15</button>
        </div>
    )
}

export default Profile

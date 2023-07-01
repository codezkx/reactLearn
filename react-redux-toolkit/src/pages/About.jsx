// import { connect } from 'react-redux';

import { connect } from '../hoc';

import { addCounterAction, subCounterAction } from '../store/features/counter';

const About = (props) => {
    console.log(props, 'About');
    const counterChange = (num, isAdd) => {
        if (isAdd) {
            props.addCounter(num)
        } else {
            props.subCounter(num)
        }
    }
    return (
        <div>
            <h2>使用合并的storeAbout Page: { props.counter.counter }</h2>
            <button onClick={() => counterChange(5, true)}>+5</button>
            <button onClick={() => counterChange(10, false)}>-10</button>
        </div>
    )
};

//  注意函数命名规范
const mapStateToProps = (state) => {
    return {
        counter: state.counter.counter // 使用合并后的counter
    }
}

const mapDispatchToProps = (dispatch) => ({
    addCounter(num) {
        dispatch(addCounterAction(num));
    },
    subCounter(num) {
        dispatch(subCounterAction(num));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
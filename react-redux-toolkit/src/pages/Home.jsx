import { useEffect } from 'react'
// import { connect } from 'react-redux';

import { connect } from '../hoc';

import { fetchHomeMultidataAction } from '../store/features/home';

const Category = (props) => {
    
    const { banners, recommends, counter } = props
    useEffect(() => {
        props.fetchHomeMultidata()
    }, [])

    return (
        <div>
            <h2>Category Counter: { counter }</h2>
            <div className='banner'>
                <h2>轮播图数据:</h2>
                <ul>
                    {
                        banners.map((item, index) => {
                            return <li key={index}>{item.title}</li>
                        })
                    }
                </ul>
            </div>
            <div className='recommend'>
                <h2>推荐数据:</h2>
                <ul>
                    {
                        recommends.map((item, index) => {
                            return <li key={index}>{item.title}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

//  注意函数命名规范
const mapStateToProps = (state) => ({
    counter: state.counter.counter,
    banners: state.category.banners,
    recommends: state.category.recommends,
});

const mapDispatchToProps = (dispatch) => ({
    fetchHomeMultidata() {
        dispatch(fetchHomeMultidataAction({message: '用户自己传入的参数，比如id'}));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)

import { useEffect } from 'react'
import { connect } from 'react-redux';
import stroe from '../../store合并'

import { fetchHomeMultidataAction } from '../../store/actionCreators';

const Category = (props) => {
    
    const { banners, recommends, counter } = props
    useEffect(() => {
        props.fetchHomeMultidata()
    }, [])
    console.log(stroe.getState())
    /* 
        category: {banners: Array(4), recommends: Array(4)}
        counter: {counter: 100}
    */
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
        dispatch(fetchHomeMultidataAction());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)

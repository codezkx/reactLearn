import {
    useNavigation,
    useNavigationType,
    useOutlet,
} from 'react-router-dom';

const RouterNavigation = () => {
    const natigation = useNavigation();
    // console.log(natigation, 'natigation');
    const navigationType = useNavigationType();
    console.log(navigationType, 'navigationType'); // PUSH
    
    return (
        <>
            <Navigation />
        </>
    )
}

const Navigation = () => {
    const outLet = useOutlet(); // 父路由的Outlet上的context属性的值  用于父子路由信息传递
    console.log(outLet, 'outlet');
    return (
        <div>
            子组件
        </div>
    )
}

export default RouterNavigation
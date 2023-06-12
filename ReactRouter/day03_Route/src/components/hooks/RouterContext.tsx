import { useInRouterContext } from 'react-router-dom';

import {
    useRef,
    useEffect,
} from 'react';

const RouterCoontext = () => {
    const inContext = useInRouterContext()
    console.log(inContext); // true  在Router 组件上下文中
    const linkRef = useRef(null);
    useEffect(() => {
        console.log(linkRef, 'linkRef')
    }, [])
    return (
        <div>My Component!</div>
    )
}


export default RouterCoontext
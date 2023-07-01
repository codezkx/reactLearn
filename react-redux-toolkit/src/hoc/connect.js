import { 
    useState,
    useContext,
    useEffect,
} from 'react';

import { StoreContext } from './StoreContext'

export const connect = (mapStateToProps, mapDispatchToProps) => {
    return (WrapperComponent) => {
        const NewComponent = (props) => {
            const context = useContext(StoreContext);
            /* 
                mapStateToProps函数 参数是一个state

                1、如何获取state 
                    a、根据文件直接引入store， 但是和下项目的文件目录的耦合度非常高，不推荐
                    b、可以使用context  在初始化渲染设置时获取到开始的stroe
                2、
            */
            const contextState =  mapStateToProps(context.getState());
            /* 
                注意:
                    当设置setState
            
            */
            const [key, setKey] = useState(contextState); // // 主要作用就是更新组件
            const _dispatch = mapDispatchToProps(context.dispatch);
            useEffect(() => {
                const unsubscribe = context.subscribe(() => {
                    setKey(context.getState()); // 主要作用就是更新组件
                });
                return () => {
                    unsubscribe();
                }
            }, [context]);
            return <WrapperComponent key={key} {...props} {...contextState} {..._dispatch}/>
        }
        return NewComponent;
    }
};
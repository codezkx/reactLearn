import { 
    // useBeforeUnload,
    Form,
} from 'react-router-dom';
import { 
    useState,
    useCallback,
    useEffect,
} from 'react';


const RouterBeforeUnload = () => {
    const [state, setState] = useState('');
    const a = useBeforeUnload( // 卸载页面时 触发该钩子
        useCallback(() => {
            localStorage.stuff = state
        }, [state])
    );

    useEffect(() => {
        if (!state && localStorage.stuff) {
            setState(localStorage.stuff);
        }
    }, [state]);

    return (
        <Form method='post'>
            <label htmlFor='beforeUnload'>useBeforeUnload</label>
            <input
                value={state}
                type="text" 
                id="beforeUnload" 
                onChange={ (event) => {
                    const text = event.target?.value
                    setState(text)
                } }
            />
        </Form>
    )
}

/* 
    useBeforeunload 注意思想是
        只要传入一个发生 beforeunload 事件时需要执行的回调函数即可。

        主要做了下面几件事情:

        注册 beforeunload 事件监听器
        执行传入的 onBeforeUnload 回调函数
        返回清理函数,用来在卸载组件时移除事件监听器

*/
const useBeforeUnload = (callback: (event: BeforeUnloadEvent) => any) => {
    useEffect(() => {
        const onBeforeUnloadListener = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            callback(event);
        }
        window.addEventListener('beforeunload', onBeforeUnloadListener);
        return () => {
            window.removeEventListener('beforeunload', onBeforeUnloadListener);
        };
    }, [callback]);
}

export default RouterBeforeUnload



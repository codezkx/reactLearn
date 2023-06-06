import { 
    useBeforeUnload,
    Form,
} from 'react-router-dom';
import { 
    useState,
    useCallback,
    useEffect,
} from 'react';


const RouterBeforeUnload = () => {
    const [state, setState] = useState('');
    console.log(state, 'state')
    useBeforeUnload( // 卸载页面时 触发该钩子
        useCallback(() => {
            localStorage.stuff = state
        }, [state])
    );

    useEffect(() => {
        console.log(localStorage.stuff, 'localStorage.stuff')
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

export default RouterBeforeUnload



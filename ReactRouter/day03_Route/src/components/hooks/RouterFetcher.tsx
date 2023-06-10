import { useFetcher } from 'react-router-dom';

import { useEffect } from 'react';

const RouterFetcher = () => {
    const fetcher = useFetcher();
    console.log(fetcher, 'fetcher');
    const From = fetcher.Form;
    useEffect(() => {
        // fetcher.submit(fetcher.data);
        // fetcher.load('/fetcher');
    }, [fetcher]);
    return (
        <From>
            <label htmlFor="for">Input: </label>
            <input
                type="text"

            />
        </From>
    )
}

export default RouterFetcher;
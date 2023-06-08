import { useFetcher } from 'react-router-dom';

import { useEffect } from 'react';

const RouterFetcher = () => {
    const fetcher = useFetcher();
    console.log(fetcher, 'fetcher');
    const From = fetcher.Form;
    useEffect(() => {
        fetcher.submit(fetcher.data);
        fetcher.load()
    }, [fetcher]);
    return (
        <From>


        </From>
    )
}

export default RouterFetcher;
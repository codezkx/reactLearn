import { useFetcher, useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';

import { useEffect, useId, useState } from 'react';

const RouterFetcher = () => {
    const fetcher = useFetcher();
    const From = fetcher.Form;
    const navigation = useNavigate()
    const location = useLocation();
    console.log(location, 'location');
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
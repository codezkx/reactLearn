import {  useLoaderData } from 'react-router-dom';

import type { LoaderFunction }  from 'react-router-dom';


export const loader: LoaderFunction = (params) => {
    console.log(params, 'params')
    return 'loader返回的数据';
}

const RouterLoaderData = () => {
    const loaderData = useLoaderData() as string;
    console.log(loaderData);
    return (
        <>
            <h1>{loaderData}</h1>
        </>
    )
}

export default RouterLoaderData;
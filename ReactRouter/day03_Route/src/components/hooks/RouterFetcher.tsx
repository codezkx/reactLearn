import { useFetcher, useParams } from 'react-router-dom';

import { useEffect, useId, useState } from 'react';

const RouterFetcher = () => {
    const fetcher = useFetcher();
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

const User = () => {
    const { match, history } = useFetcher();
    const { id } = useParams();
    const [ user, setUser ] = useState('');
    console.log('match', match, 'history', history);
    console.log('id', id);  
    useEffect(() => {
        setUser('uzi');
    }, [id])

    if (!user) return <h1>Loading...</h1> 

    return ( 
        <div>
            <h1>{ user.name }</h1>
            <button onClick={ () => history.push(`/users/${user.id}/post`) }>跳转</button>
        </div>
    )
}

const Posts = () =>  {
    const { match, location, history } = useFetcher();
    const { userId } = match.params;
    const [posts, setPosts] = useState(null);
    
    useEffect(() => {
        setPosts('EDG.Uzi');
    }, [useId]);

    if (!posts) return <h1>EDG.Uzi 正在连接</h1>;

    return (
        <div>
            <button onClick={() => history.goBack()}>Back</button>
            <h1>{posts}</h1>
        </div>
    )
}

export {
    RouterFetcher,
    User,
    Posts,
}
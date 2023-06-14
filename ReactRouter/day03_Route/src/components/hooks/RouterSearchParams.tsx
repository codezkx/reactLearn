import { useSearchParams,   } from 'react-router-dom';

const RouterSearchParams =  () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const userId = searchParams.get('name'); // uzi
    console.log(userId, 'userId')
    function handleClick() {
        setSearchParams({name: 'uzi-s'})
        console.log(searchParams.get('name'), 'update')
    }
    return (
        <>
            <div onClick={ () => handleClick()}>setSearchParams</div>
        </>
    )
}

export default RouterSearchParams;
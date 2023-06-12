import { useMatch } from "react-router-dom";


const RouterMatch = () => {
    const match = useMatch('match/123');
    console.log(match, 'match');
    return (
        <>
            <h2>{match?.pathname}</h2>
        </>
    )
};

export default RouterMatch;

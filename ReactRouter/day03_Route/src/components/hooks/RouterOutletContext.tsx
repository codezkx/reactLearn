import { useOutletContext } from 'react-router-dom';


const RouterOutletContext = () => {
    const outletContext = useOutletContext();
    console.log(outletContext, 'outletContext');
    return (
        <>
            {outletContext}
        </>
    )
}

export default RouterOutletContext;
import { useResolvedPath  } from 'react-router-dom';

const RouterSolvedPath =  () => {
    const resolvedPath = useResolvedPath('/router', {relative: 'path'});
    console.log(resolvedPath, 'resolvedPath')
    return (
        <></>
    )
}

export default RouterSolvedPath;
import { useNavigate, Outlet } from 'react-router-dom';

import type { LoaderFunction }  from 'react-router-dom';

const Root = () => {
  const navigation = useNavigate();
  return (
    <>
      <h3 onClick={() => {
        navigation('/team');
        }}
      >
        我是顶级路由
      </h3>
      <h3
        onClick={() => {
          navigation('/await');
        }} 
        >
        go to Await component
      </h3>
      <h3
        onClick={() => {
          navigation('/link');
        }} 
        >
        go to Link component
      </h3>
      <h3
        onClick={() => {
          navigation('/action/data');
        }} 
        >
        go to useActionData
      </h3>
      <h3
        onClick={() => {
          navigation('/before/unload');
        }} 
        >
        go to useBeforeUnload
      </h3>
      <h3
        onClick={() => {
          navigation('/fetcher');
        }} 
      >
        go to useFetcher
      </h3>
      <Outlet />
    </>
  )
}

export const loader: LoaderFunction = (params) => {
  return params
}

export default Root
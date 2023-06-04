import { useNavigate, Outlet } from 'react-router-dom';

import type { LoaderFunction }  from 'react-router-dom';

const Root = () => {
  const navigation = useNavigate();
  return (
    <>
      <h1 onClick={() => {
        navigation('/team');
      }}>我是顶级路由</h1>
      <h1
        onClick={() => {
          navigation('/await');
        }} 
        >go to Await component</h1>
      <h1
        onClick={() => {
          navigation('/link');
        }} 
        >go to Link component</h1>
      <Outlet />
    </>
  )
}

export const loader: LoaderFunction = (params) => {
  return params
}

export default Root
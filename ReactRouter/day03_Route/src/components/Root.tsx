import { useNavigate, Outlet } from 'react-router-dom';

const Root = () => {
  const navigation = useNavigate();
  return (
    <>
      <h1 onClick={() => {
        navigation('/team')
      }}>我是顶级路由</h1>
      <Outlet />
    </>
  )
}

export const loader = (params) => {
  console.log(params, 'params')
  return ''
}

export default Root
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
      <h3
        onClick={() => {
          navigation('/context');
        }} 
      >
        go to useInRouterContext 
      </h3>
      <h3
        onClick={() => {
          navigation('/link');
        }} 
      >
        go to useLinkClickHandler 
      </h3>
      <h3
        onClick={() => {
          navigation('/loader/data/123');
        }} 
      >
        go to useLoaderData 
      </h3>
      <h3
        onClick={() => {
          navigation('/match/123');
        }} 
      >
        go to useMatch 
      </h3>
      <h3
        onClick={() => {
          navigation('/matches/123');
        }} 
      >
        go to useMatches
      </h3>
      <h3
        onClick={() => {
          navigation('/navigation/123');
        }} 
      >
        go to useNavigation
      </h3>
      <h3
        onClick={() => {
          navigation('/outlet/context/123');
        }} 
      >
        go to useOutletContext
      </h3>
      <h3
        onClick={() => {
          navigation('/solved/path/123');
        }} 
      >
        go to useResolvedPath
      </h3>
      <h3
        onClick={() => {
          navigation('/search/params/123?name=uzi&age=26');
        }} 
      >
        go to useSearchParams
      </h3>
      <Outlet context='我是Outlet组件' />
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = (params) => {
  return params
}

export default Root
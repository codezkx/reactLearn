import {
  createBrowserRouter,
} from 'react-router-dom';

import {
  Root,
  Team,
  RouterAwait,
  RouterLink,
  RouterActionData,
  RouterBeforeUnload,
  RouterFetcher,
  RouterContext,
  RouterLinkClickHandler,
  RouterLoaderData,
  RouterMatch,
  RouterMatches,
} from './components.ts';

import {
  loaderRoot,
  loaderAwait,
  loaderData
} from './loaders.ts';

import {
  ActionData,
} from './action.ts';

const routes = [
  {
    path: '/',
    element: <Root />,
    loader: loaderRoot,
    children: [
      {
        path: 'team',
        element: <Team />,
      },
      {
        path: 'await',
        element: <RouterAwait />,
        loader: loaderAwait,
      },
      {
        path: 'link',
        element: <RouterLink />,
      },
      {
        path: 'action/data',
        element: <RouterActionData />,
        action: ActionData,
      },
      {
        path: 'before/unload',
        element: <RouterBeforeUnload />,
        action: ActionData,
      },
      {
        path: 'fetcher',
        element: <RouterFetcher />,
        key: 'fetcher',
      },
      {
        path: 'context',
        element: <RouterContext />,
        key: 'context',
      },
      {
        path: 'link',
        element: <RouterLinkClickHandler />,
        key: 'link',
      },
      {
        path: 'loader/data/:id',
        element: <RouterLoaderData />,
        key: 'loaderData',
        loader: loaderData,
      },
      {
        path: 'match/:id',
        element: <RouterMatch />,
        key: 'match',
      },
      {
        path: 'matches/:id',
        element: <RouterMatches />,
        key: 'matches',
        handle: {
          crumb: (data) => <span>{data.threadName}</span>
        }
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router

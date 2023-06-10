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
  User,
  Posts,
} from './components.ts';

import {
  loaderRoot,
  loaderAwait,
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
        children: [
          {
            path: 'user/:id',
            element: <User />,
          },
          {
            path: 'user/:useId/posts',
            element: <Posts />,
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router

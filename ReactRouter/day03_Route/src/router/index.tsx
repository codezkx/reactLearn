import {
  createBrowserRouter,
} from 'react-router-dom';

import {
  Root,
  Team,
  RouterAwait,
  RouterLink,
  RouterActionData,
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
      }
    ],
  },
]

const router = createBrowserRouter(routes)

export default router

import {
  createBrowserRouter,
} from 'react-router-dom';

import {
  Root,
  Team,
  RouterAwait,
} from './components.ts'

import {
  loaderRoot,
  loaderAwait,
} from './loaders.ts'

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
      }
    ],
  },
]

const router = createBrowserRouter(routes)

export default router

import {
  createBrowserRouter,
} from 'react-router-dom';

import {
  Root,
  Team,
} from './components'

import {
  loaderRoot
} from './loaders'

const routes = [
  {
    path: '/',
    element: <Root />,
    loader: loaderRoot,
    children: [
      {
        path: 'team',
        element: <Team />,
        
      }
    ],
  },
]

const router = createBrowserRouter(routes)

export default router

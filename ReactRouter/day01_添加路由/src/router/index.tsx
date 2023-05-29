import {
  createBrowserRouter,
} from 'react-router-dom';

import {
  App,
  ErrorPage,
  Contact,
  loader as rootLoader,
  action as rootAction,
  Edit as EditContact,
  DefaultRouter,
} from './components'

import {
  loader as contactLoader,
} from '@/components/Contact'

import {
  action as editAction
} from '@/components/Edit.tsx'

import {
  Action as destroyAction
} from '@/components/Destroy.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />, // 添加错误页面
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />, // 在子路由中添加错误页面时比较好的一种交互方式。
        children: [ // 添加子路由
          {
            index: true, // 访问Router时需要渲染的UI
            element: <DefaultRouter />,
          },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
          }
        ],
      }
    ]
  },
  // {
  //   path: 'contacts/:contactId',
  //   element: <Contact />
  // }
])

export default router

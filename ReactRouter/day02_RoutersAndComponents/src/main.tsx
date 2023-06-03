import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  RouterProvider, 
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './index.css'

// import {
//   Root,
//   Team,
// } from '@/router/components'

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Root></Root>} />
//         <Route path="/team" element={<Team></Team>} />
//       </Routes>
//     </div>
//   )
// }

import router from '@/router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>

)

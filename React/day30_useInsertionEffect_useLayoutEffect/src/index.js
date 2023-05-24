import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import './style/index.css'

import App from './App.js';

const root1 = createRoot(document.getElementById('root1'));
root1.render(
  // 开启严格模式
  <StrictMode>
    <App />
  </StrictMode>
);
// const root2 = createRoot(document.getElementById('root2'));
// root2.render(
//   // 开启严格模式
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
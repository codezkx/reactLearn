import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';
import './style.css'
import { StoreContext } from './hoc' // 高阶组件

import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 把stroe传入到connet */}
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Provider>
  </React.StrictMode>
);

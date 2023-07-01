import { useState } from "react";

import store from './store';

import Home from './pages/00_redux原生使用/Home.jsx';
import Profile from './pages/00_redux原生使用/Profile.jsx';
// react-redux 库使用  https://cn.react-redux.js.org/introduction/getting-started
import About from './pages/01_react-redux库使用/About.jsx';
// react-thunk 中间件使用  主要处理异步操作不能返回除对象类型的类型
import Category from "./pages/02_react-redux及react-thunk库的使用/Category.jsx";


function App() {
  const [counter, setCounter] = useState(store.getState().counter)
  // 订阅store
  store.subscribe(() => {
    setCounter(store.getState().counter)
  })
  return (
    <div className="App">
      <h2>APPCounter: { counter }</h2>
      <div className='content'>
        <Home />
        <Profile />
        <About />
        <Category />
      </div>
      
    </div>
  );
}

export default App;

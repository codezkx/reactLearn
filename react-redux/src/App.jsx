import { useState } from "react";

import Home from './pages/00_redux原生使用/Home.jsx';
import Profile from './pages/00_redux原生使用/Profile.jsx';
import store from './store';

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
      </div>
      
    </div>
  );
}

export default App;

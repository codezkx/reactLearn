import {useState} from 'react';

import Counter from './Counter'; // ref设置值初体验
import Stopwatch from './Stopwatch'; // ref的作用  重新渲染组件会保留ref的值

import Dashboard from './Dashboard'; 

export default function App() {
  return (
    <>
      <Counter />
      <Stopwatch />
      <Dashboard />
    </>
  )
}




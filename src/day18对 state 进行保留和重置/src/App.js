import { useState } from 'react';

import CounterContent from './CounterContent'; // state 与树中的某个位置相关联（state独立性）

import KeepCounter from './KeepCounter'; // 相同位置的相同组件会使得 state 被保留下来

import ResetCounter from './ResetCounter'; // 相同位置的不同组件会使 state 重置

import Scoreboard from './Scoreboard'; // 使用 key 来重置 state 

import Messenger from './Messenger'; // 使用 key 重置表单 

import Fields from './Fields' // 交换两个表单字段  key 保留state的方式

export default function App() {
  return (
    <div>
      {/* <CounterContent /> */}
      {/* <KeepCounter /> */}
      {/* <ResetCounter /> */}
      {/* <Scoreboard /> */}

      <Fields />
    </div>
  )
}

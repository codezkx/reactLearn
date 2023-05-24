import { Fragment } from 'react';
import { useImmer } from 'use-immer';

/* 
  使用setPosition，你告诉 React：
    替换position为这个新对象
    并再次渲染这个组件
*/
import MovingDot from './MovingDot'; // state设置对象如何修改值

import Form from './Form';  // 使用扩展语法复制对象

export default function App() {
  return (
    <Fragment>
     {/* <MovingDot /> */}
     <Form />
    </Fragment>
  )
}
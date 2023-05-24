import { Fragment } from 'react';
import Form  from './Form';
import Counter from './Counter'; // 验证同时执行setState函数时值只改变一次
import AsyncCounter from './AsyncCounter'; // 验证同时执行setState函数时值只改变一次

export default function App() {
  return (
    <Fragment>
      <Form />
      <Counter />
      <AsyncCounter />
    </Fragment>
  )
}
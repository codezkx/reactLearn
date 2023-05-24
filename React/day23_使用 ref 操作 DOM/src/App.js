import {useState} from 'react';

import FormFocus from './FormFocus';
import CatFriends from './CatFriends'; // 获取单个ref
import CatFriendRefs from './CatFriendRefs' // 获取列表中的ref
import ForwardRef from './ForwardRef' // 获取子组件中ref
import ImperrativeHandle from './ImperrativeHandle'; // 限制父组件通过ref对子组件进行操作

import TodoList from './TodoList'; // flushSync的使用（强制刷新组件渲染）
export default function App() {
  return (
    <>
      <FormFocus></FormFocus>
      <CatFriends></CatFriends>
      <CatFriendRefs></CatFriendRefs>
      <ForwardRef />
      <ImperrativeHandle />
      <TodoList  />
    </>
  )
}

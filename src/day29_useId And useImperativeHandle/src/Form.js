import { useRef } from 'react'
import MyInput from './MyInput';

export default function Form() {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus() // 触发子组件input上的方法
  }
  return (
    <>
      <button onClick={() => handleClick()}>聚焦输入框</button>
      <MyInput ref={ref} />
    </>
  )
}
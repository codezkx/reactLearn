import { 
  forwardRef, 
  useRef,
  useImperativeHandle, // 限制子组件暴露的功能
 } from 'react';
const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null)
  useImperativeHandle(ref, () => ({ // 现在父组件能获取这个对象并只能使用focus方法
    focus() {
      realInputRef.current.focus();
    }
  }))
  return (
    <input {...props} ref={realInputRef}/>
  )
})

export default function ImperrativeHandle() {
  const inputRef = useRef(null);

  const handleClick = () => {
    console.log(inputRef, 'inputRef')
    inputRef.current.focus()    
  }
  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦子组件
      </button>
    </>
  )
}

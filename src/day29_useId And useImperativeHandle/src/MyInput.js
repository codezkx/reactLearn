import { forwardRef, useImperativeHandle, useRef } from 'react'
 const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return { // 返回父组件需要的属性或则方法  自已自定义
      focus() {
        inputRef.current.focus();
      },
    }
  }, [])


  return (
    <>
      <input type="text" ref={inputRef} />
    </>
  )
})


export default MyInput
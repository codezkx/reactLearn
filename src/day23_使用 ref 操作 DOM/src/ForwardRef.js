import { forwardRef, useRef } from 'react';
const MyInput = forwardRef((props, ref) => {
  return (
    <input {...props} ref={ref}/>
  )
})

export default function ForwardRef() {
  const inputRef = useRef(null);

  const handleClick = () => {
    console.log(inputRef)
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

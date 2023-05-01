import {useRef} from 'react';

export default function FormFocus() {
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.focus();
  }
  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  )
}

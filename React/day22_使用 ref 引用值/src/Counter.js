import { useRef } from 'react';

export default function Counter() {
  const ref = useRef(0);
  const handleClick = () => {
    ref.current += 1; // 不会触发渲染
    alert('你点击了 ' + ref.current + ' 次！');
  }
  return (
    <>
      <button onClick={handleClick}>
        点击Me！
      </button>
    </>
  )
}
import { useState } from 'react';

export default function Counter() {
  const [index, setIndex] = useState(0);
  return (
    <>
      <h1>{index}</h1>
      <button onClick={() => {
        setIndex(index + 1);
        setIndex(i => i + 1);
        setIndex(i => i + 1);
        setIndex(i => i + 1); // 输出4  回调函数会添加到react 更新state队列中运行时获取最新的state值
        // setIndex(index + 1); // 输出是1， 因为这里拿到的index是0 而不是最新的值
        // setIndex(42);
      }}>
        +3
      </button>
    </>
  )
}

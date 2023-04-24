import { useState } from 'react';
export default function AsyncCounter() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number); // 第一次点击显示0
        }, 3000);
      }}>
        +5
      </button>
    </>
  )
}
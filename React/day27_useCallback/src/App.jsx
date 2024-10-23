import { useCallback, useRef, useState } from "react";

export default function App() {
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        num add
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        count add
      </button>
      <ChildA num={num} count={count}>
        我是子组件
      </ChildA>
    </>
  );
}

function ChildA({ num, count, children }) {
  const ref = useRef();
  // 造成闭包陷阱问题
  // const cacheFn = useCallback(function () {
  //   ref.current = num;
  // }, []);

  // 根据
  const cacheFn = useCallback(
    function () {
      ref.current = num;
    },
    [num]
  );
  cacheFn();
  return (
    <>
      <div>{num}</div>
      <div>{count}</div>
      <div>显示缓存值: {ref.current}</div>
    </>
  );
}

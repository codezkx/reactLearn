import {useState, useRef} from 'react';


export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null); // 组件重新渲染也不会改变其上一次设置的ref值
  
  const handleStart = () => {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  const handleStop = () => {
    clearInterval(intervalRef.current);
  }
  console.log(intervalRef.current, 'intervalRef.current')

  let secondsPassed = 0;

  if (startTime !== null && now !== null) {
    secondsPassed = (now - startTime) / 1000
  }

  return (
    <>
      <h1>时间过去了: {secondsPassed}</h1>
      <button onClick={handleStart}>
        开始
      </button>
      <button onClick={handleStop}>
        停止
      </button>
    </>
  )
}
import { useState } from 'react';

export default function Counter({ isFancy, person }) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  let className = 'counter-content';
  if (active) {
    className += ' hover';
  }
  if (person) {
    return (
      <div 
        className={className}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
      >
        <h4>{person} 的分数：{count}</h4>
        <button onClick={() => setCount(count + 1)}>
          加一
        </button>
      </div>
    )
  } else {
    return (
      <div 
        className={className}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
      >
          <h3>{count}</h3>
          <button onClick={() => setCount(count + 1)}>
            加1
          </button>
          {/* state被保持的组件中的元素被改变不会影响UI树的位置所以不会重置state */}
          {isFancy ? <h1>1</h1> : <p>2</p> }
      </div>
    )
  }
}
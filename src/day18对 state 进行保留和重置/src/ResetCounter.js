import {useState} from 'react';

import Counter from './Counter';

export default function ResetCounter() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div>
      {/* 改变了UI树结构 所以state会被重置 */}
      {isPaused ? (
        <p>待会见！</p>
      ) : (
        <Counter/>
      )}
      <label>
        <input
            type="checkbox"
            checked={isPaused}
            onChange={e => {
              setIsPaused(e.target.checked)
            }}
          />
        休息一下
      </label>
    </div>
  )
}
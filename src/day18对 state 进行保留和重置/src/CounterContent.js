import { useState } from 'react';

import Counter from './Counter'; // state 与树中的某个位置相关联

export default function CounterContent() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <label>
        <input 
          type="checkbox"
          checked={showB}
          onChange={(e) => setShowB(e.target.checked)}
        />
         渲染第二个计数器
      </label>
      <Counter />
      {showB && <Counter />}  {/* state 不会被保留 因为组件已经注销*/} 
    </div>
  )
}
import { useState } from 'react';

export default function TaskApp({addTask}) {
  const [text, setText] = useState('');
  return (
    <>
      <input 
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="添加任务" 
      />
      <button onClick={() => {
        setText('')
        addTask(text)
      }}>
        添加
      </button>
    </>
  )
}


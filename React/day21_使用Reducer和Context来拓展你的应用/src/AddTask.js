import { useState, useContext } from 'react';

import {TasksDispatchContext} from './TaasksContext';

let nextId = 3

export default function TaskApp({addTask}) {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext); // 结合reducer使用context
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
        dispatch({
          type: 'added',
          id: nextId++,
          text: text
        })
      }}>
        添加
      </button>
    </>
  )
}


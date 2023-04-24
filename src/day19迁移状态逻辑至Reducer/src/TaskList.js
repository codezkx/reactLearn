import { useState } from 'react';

export default function TaskList({tasks, onChangeStak, onRemoveStak}) {
  return (
    <ul>
      {tasks.map(task => 
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeStak}
            onRemove={onRemoveStak}
          />
        </li>
      )}
    </ul>
  )
}

function Task({task, onChange, onRemove}) {
  const [isEdit, setIsEdit] = useState(false);
  let taskContent;
  if (isEdit) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => onChange({
            ...task,
            text: e.target.value,
          })}
        />
        <button onClick={(e) => {
          setIsEdit(false)
        }}>保存</button>
      </>
    )
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={(e) => {
          setIsEdit(true)
        }}>编辑</button>
      </>
    )
  }
  return (
    <>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => onChange({
          ...task,
          done: e.target.checked,
        })}
      />
      {taskContent}
      <button onClick={e => {
        onRemove(task.id)
      }}>删除</button>
    </>
  )
}

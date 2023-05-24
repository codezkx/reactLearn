import { useState, useContext } from 'react';

import { TasksContext, TasksDispatchContext } from './TaasksContext';

export default function TaskList({tasks, onChangeStak, onRemoveStak}) {
  const tasksContext = useContext(TasksContext);
  return (
    <ul>
      {tasksContext.map(task => 
        <li key={task.id}>
          <Task task={task}/>
        </li>
      )}
    </ul>
  )
}

function Task({task, onChange, onRemove}) {
  const [isEdit, setIsEdit] = useState(false);
  const tasksDispatchContext = useContext(TasksDispatchContext);

  let taskContent;
  if (isEdit) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => tasksDispatchContext({
            type: 'changed',
            task: {
              ...task,
              text: e.target.value
            }
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
        onChange={(e) =>{ 
          // onChange({
          //   ...task,
          //   done: e.target.checked,});
          tasksDispatchContext({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          })
        }}
      />
      { task.done ? '1' : '2' }
      {taskContent}
      <button onClick={e => {
        // onRemove(task.id)
        tasksDispatchContext({
          type: 'remove',
          id: task.id,
        })
      }}>删除</button>
    </>
  )
}

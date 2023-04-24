import { useState, useReducer } from 'react';

import AddTask from './AddTask';
import TaskList from './TaskList';


export default function TaskApp() {
  // const [tasks, setTasks] = useState(initialTasks);
  
  const [tasks, dispatch] = useReducer(tasksReducer ,initialTasks)

  const handleAddTask = (text) => {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text
    })
    // setTasks([
    //   ...tasks,
    //   {
    //     id: nextId++,
    //     text: text,
    //     done: false,
    //   }
    // ]);
  }

  const handleChangeStak = (task) => {
    dispatch({
      type: 'changed',
      task: task
    })
    // setTasks(
    //   tasks.map(task => {
    //     if (task.id === id) {
    //       return {
    //         ...task,
    //         text,
    //         done,
    //       }
    //     }
    //     return task
    //   })
    // )
  }

  const handleRemoveStak = (taskId) => {
    dispatch({
      type: 'remove',
      id: taskId,
    })
    // setTasks( tasks.filter(task => task.id !== id) )
  }
  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask addTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeStak={handleChangeStak}
        onRemoveStak={handleRemoveStak}
      />
    </>
  )
}

let nextId = 3

const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];

function tasksReducer(tasks, action) {
  switch(action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ]
    }
    case 'changed': {
      return tasks.map(task => {
        if (task.id === action.task.id) {
          return action.task
        }
        return task
      });
    }
    case 'remove': {
      return tasks.filter(task => task.id !== action.id)
    }
      
  }
}


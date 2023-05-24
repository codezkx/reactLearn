import { useState } from 'react';

let idx = 3

//  自己写的“xiete”代码
export default function MyTaskApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState('');

  const handleAddTask = (text) => {
    setTasks([
      ...tasks,
      {
        id: ++idx,
        text: text,
        done: false,
      }
    ]);
  }

  const handleChangeStak = (id, text) => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            text,
            done: false,
          }
        }
        return task
      })
    )
  }

  const handleRemoveStak = (id) => {
    setTasks(
      tasks.filter(task => task.id !== id)
    )
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <label>
        <input 
          type="text"
          onChange={e => setText(e.target.value)}
          placeholder="添加任务" 
        />
        <button onClick={() => {
          setText('')
          handleAddTask(text)
        }}>添加</button>
      </label>
      {tasks.map(task => (
        <label
          key={task.id}
          style={{'display': 'block'}}>
          <input
            type="checkbox"
          />
          { task.done 
              ? <input type="text" value={text} onChange={e => setText(e.target.value)} />
              : task.text 
          }
          {
            task.done ? (
              <>
                <button onClick={(e) => {
                  console.log(e)
                  e.stopPropagation();
                  handleChangeStak(task.id, text);
                }}>保存</button>
                <button onClick={(e) => {
                  e.stopPropagation()
                  setTasks(
                    tasks.map(odlTask => {
                      if (odlTask.id === task.id) {
                        return {
                          ...odlTask,
                          done: false
                        }
                      }
                      return odlTask
                    })
                  )
                }}>取消</button>
              </>
            ) :
            <button onClick={(e) => {
              e.stopPropagation();
              setText(task.text);
              setTasks(
                tasks.map(odlTask => {
                  if (odlTask.id === task.id) {
                    return {
                      ...odlTask,
                      done: true
                    }
                  }
                  return odlTask
                })
              );
            }}>编辑</button>
          }
          <button onClick={e => {
            e.stopPropagation();
            handleRemoveStak(task.id)
          }}>删除</button>
        </label>
      ))}
    </>
  )
}

const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: false},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];

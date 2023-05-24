import {createContext} from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export default function TasksProvider({tasks, tasksDispatch, children}) {
  return (
    <>
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={tasksDispatch}>
          {children}
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </>
  )
}
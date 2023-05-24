import {useMemo} from 'react'
export default function TodoList({todos, filter}) {
  const time = Date.now();
  const visibleTodos = getFilteredTodos(todos, filter);
  // const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter])
  console.log(Date.now() - time, '运行时间', visibleTodos);

  return (
    <>
      {/* {visibleTodos.map(todo => (
        <p key={todo.id}>{todo.name}</p>
      ))} */}
    </>
  )
}

const getFilteredTodos = (todos, filters) => {
  if (!Array.isArray(todos)) {
    return []
  }
  const list = todos.filter(todo => !filters.includes(todo.id))
  return list
}

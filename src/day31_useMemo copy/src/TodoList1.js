import { useMemo } from 'react';
import { createTodos, filterTodos } from './utils.js';

import List from './List';

const todos = createTodos()

export default function TodoList1({ theme, tab}) {
  console.time('start');
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [tab] // 当tab变化时重新执行计算函数， 当theme变化时不执行计算函数
  ); // 缓存计算结果
  // const visibleTodos = filterTodos(todos, tab)
  console.timeEnd('start');

  return (
    <div className={theme}>
      <p><b>Note: <code>filterTodos</code> is artificially slowed down!</b></p>
      <List items={visibleTodos} />
    </div>
  )
}
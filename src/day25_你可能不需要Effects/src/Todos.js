import {useState} from 'react';
import TodoList from './TodosList';
let count = 1
export default function Todo() {
  const [filter, setFilter] = useState([0])
  const [alter, setAlter] = useState(false)
  return (
    <>
      <button onClick={() => {setAlter(!alter)}}>not update Memo</button>
      <button onClick={() => setFilter([
        ...filter,
        count++
      ])}>update Memo</button>
      <TodoList todos={getList()} filter={filter} />
    </>
  )
}

const getList = () => {
  const list = []
  for (let i = 0; i < 50000; i++) {
    const item = {
      id: i, // 在 JSX 中作为 key 使用
      name: `苏布拉马尼扬·钱德拉塞卡${i}`,
    }
    list.push(item)
  }
  return list
}
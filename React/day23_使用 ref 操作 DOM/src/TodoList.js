import {useState, useRef} from 'react';
import {flushSync} from 'react-dom';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('1');
  const [todos, setTodos] = useState(
    initialTodos
  );

  const handleAdd = () => {
    const newTodo = {id: nextId++, text: text};
    // setText('');
    flushSync(() => setTodos([...todos, newTodo])); // 强制渲染DOM  
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    })
  }
  return (
    <div>
      <button onClick={handleAdd}>
        添加
      </button>
      <input 
        type="text" 
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: '待办 #' + (i + 1)
  });
}
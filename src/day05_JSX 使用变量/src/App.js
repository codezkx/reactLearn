import Avatar from './Avatar';
import TodoList from './TodoList';
import Person from './Person';
import ActivityPerson from './ActivityPerson'

export default function App() {
  return (
    // 使用多个标签时需要用一个父元素包裹，其子组件或则子元素 
    <>
      <Avatar />
      <TodoList />
      <Person />
      <ActivityPerson />
    </>
  );
}

import Profile from './Profile'
import Gallery from './Gallery';
import TodoList from './TodoList'

export default function App() {
  return (
      // 使用多个标签时需要用一个父元素包裹，其子组件或则子元素 
      <section>
        <Gallery />
        <Profile />
        <TodoList />
      </section>
  );
}

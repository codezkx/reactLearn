import OnlyId from './OnlyId';
import Form from './Form'; // 触发子组件DOM节点上的事件句柄
import Comment from './Comment'; // 触发子组件自定义事件句柄
export default function App() {
  return (
    <>
      <OnlyId />
      <Form />
      <Comment />
    </>
  )
}

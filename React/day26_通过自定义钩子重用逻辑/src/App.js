import StatusBar from './StatusBar'; // 自定义hook 组件共享逻辑
import Form from './Form'; // 自定义hook 共享的是有状态逻辑，而不是共享状态本身
export default function App() {
  return (
    <>
      <StatusBar />
      <Form />
    </>
  )
}

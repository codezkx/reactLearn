
import UpdateText from './UpdateText';
import Todo from './Todos';
import GetData from './GetData'; // 要修复竞争条件，您需要添加一个清理函数来忽略陈旧的响应
export default function App() {
  return (
    <>
      {/* <UpdateText /> */}
      {/* <Todo /> */}
      <GetData />
    </>
  )
}

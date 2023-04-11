import { getImageUrl } from './util'
// 接收props 可以用一个形参或则使用es6结构语法{person, size}
export default function Avatar(props) {
  return (
    <img
      className="avatar"
      src={getImageUrl(props.person)}
      alt={props.person.name}
      width={props.size}
      height={props.size}
    />
  )
}
import { Fragment } from 'react'
import { people } from './data';
import { getImageUrl } from './util' 

export default function ScientistList() {
  // Fragment  相当于vue中的template 在真实DOM中并不会渲染
  // Fragment: 语法的简写形式 <> </> 无法接受 key 值，所以你只能
  //          要么把生成的节点用一个 <div> 标签包裹起来，要么使用长一点但更明确的 <Fragment> 写法：
  const scientistList = people.map(person => 
    <Fragment key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
        {' ' + person.profession + ''}
        因{person.accomplishment}而闻名世界
      </p>
    </Fragment>
  )
  return (
      <>{scientistList}</>
  )
}

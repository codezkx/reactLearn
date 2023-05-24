export default function Commodity({isPacked, name}) {
  // 三元运算符写法
  // return (
  //   <p>{ isPacked ? null : name}</p>
  // );
  
  // if写法 
  // if (isPacked) {
  //   return null
  // } else {
  //   return (<p>{name}</p>)
  // }

  // && 写法
  // return !isPacked &&  <p>{ name}</p> 

  // ?? 写法  判断是否是null or undefined
  // return isPacked ? true : null ?? <p>{ name}</p> // 这个写法有弊端 当isPacked 是0时页面会渲染成0

  // || 写法
  // return isPacked || <p>{ name}</p>

  // 但是上面的写法不推荐
  return <p>{ isPacked ? null : name}</p>
}
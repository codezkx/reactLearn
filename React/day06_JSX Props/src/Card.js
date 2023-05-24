//  children 表示Card组件中嵌套的子组件或则元素的实例, 如果接收的是一个props那么props有一个children属性
export default function Card({children, size}) {
  return (
    <>
      <h1>{size}</h1>
      <div className="card">
        {children}
      </div>
    </>
  );
}
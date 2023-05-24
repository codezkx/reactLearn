import { useState } from 'react';

import Counter from './Counter';

// state是否被保持，看父组件的UI树是否变化(位置/元素（组件是否改变或则父元素是否改变-->注意这个的父元素指的是条件判断里的父元素）)，
// 如果没有变化则保持state不变，反之初始化state
// 下面三种情况
export default function KeepCounter() {
  const [isFancy, setIsFancy] = useState(false)

  return (
    <div>
      <label>
      使用好看的样式
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => setIsFancy(e.target.checked)}
        />
      </label>
      {/* 添加一个元素也不会影响下面组件的UI树 理解UI树的构造形式就可以理解为什么不会重置其state  这里为false时相当于一个文本节点*/}
      {isFancy && <h1>勾选checkbox</h1>}
      {/* 第一种保持了state */}
      {isFancy ? (
        <Counter isFancy={isFancy} />
        ) : (
        <Counter isFancy={isFancy}/> 
      )}
      {/* 重置了state */}
      {/* {isFancy ? (
        <div>
          <Counter isFancy={isFancy} />
        </div>
        ) : (
        <section>
          <Counter isFancy={isFancy}/> 
        </section>
      )} */}
    </div>
  )
}
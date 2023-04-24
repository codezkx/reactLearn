import { useState } from 'react';

export default function Panel({title, isActive, onShow, children}) {
  // const [isActive, setIsActive] = useState(); // 状态提升
  return (
    <section>
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          显示
        </button>
      )}
    </section> 
  )
}
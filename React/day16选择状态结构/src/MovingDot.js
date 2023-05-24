import { useState } from 'react';
export default function MovingDot() {
  // 如果某些两个状态变量总是一起变化，那么将它们统一为一个状态变量可能是个好主意
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition(() => ({
          x: e.clientX,
          y: e.clientY
        }))
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }}>
      </div>
    </div>
  ) 
}
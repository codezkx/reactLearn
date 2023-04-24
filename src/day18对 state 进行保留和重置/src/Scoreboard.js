import {useState} from 'react';

import Counter from './Counter';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);

  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA)
      }}>
        下一位玩家！
      </button>
    </div>
  )
}
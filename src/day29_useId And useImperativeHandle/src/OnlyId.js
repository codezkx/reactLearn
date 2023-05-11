import { useState, useId } from 'react';

export default function OnlyId() {
  const id = useId();
  console.log(id);
  const [text, setText] = useState('');
  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}/>
    </>
  )
  
} 
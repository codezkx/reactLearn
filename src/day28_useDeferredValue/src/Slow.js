import {useState, useDeferredValue} from 'react';

import SlowList from './SlowList'

export default function Slow() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  )

}
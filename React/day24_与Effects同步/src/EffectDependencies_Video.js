import {useState} from 'react';

import EffectDependencies_VideoPlayer from './EffectDependencies_VideoPlayer';

export default function EffectDependencies_Video() {
  const [isPlaying, setIsPlaying] = useState(null);
  const [text, setText] = useState('');
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <EffectDependencies_VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
    </div>
  )
}
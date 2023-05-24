import {useState} from 'react';

import VodeoPlayer from './VideoPlayer';

export default function EffectVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(null);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VodeoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
    </>
  )
}
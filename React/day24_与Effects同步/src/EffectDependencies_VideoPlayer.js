import {useRef, useEffect, useState} from 'react';
export default function EffectDependencies_VideoPlayer({src, isPlaying}) {
  const ref = useRef(null);
  const [text, setText] = useState('');
  useEffect(() => {
    if (isPlaying) { // 在渲染后执行，这时DOM已经渲染在页面上
      console.log('play') // 如果没有添加依赖项则每次设置state都会执行useEfect
      ref.current.play();
    } else {
      console.log('pause')
      ref.current.pause();
    }
  }, [isPlaying]) // 添加依赖项 

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <video ref={ref} width="150px" height="100px" src={src} loop playsInline />
    </div>
  )
}
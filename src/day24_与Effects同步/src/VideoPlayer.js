import {useRef, useEffect} from 'react';

export default function VideoPlayer({src, isPlaying}) {
  const ref = useRef(null)
  // if (isPlaying) { // 这里DOM还未加载出来，所以获取不到。
  //   ref.current.play();
  // } else {
  //   ref.current.pause();
  // }

  useEffect(() => {
    if (isPlaying) { // 在渲染后执行，这时DOM已经渲染在页面上
      ref.current.play();
    } else {
      ref.current.pause();
    }
  })

  return <video ref={ref} src={src} width="150px" height="150px" loop playsInline />
}
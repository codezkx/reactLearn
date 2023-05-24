import { useRef } from 'react';
import Post from './Post';

export default function Comment() {
  const postRef = useRef(null);
  const handleClick = () => {
    postRef.current.scrollAndFocusAddComment(); // 调用子组件中的自定义事件句柄
  }
  return (
    <>
      <button onClick={e => handleClick()}>Write a Comment</button>
      <Post ref={postRef} />
    </>
  )
}
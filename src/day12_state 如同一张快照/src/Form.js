import { useState } from 'react';
export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        setIsSent(true);
        setMessage('你好！');
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)} // 获取元素输入的值
      />
      <button type="submit">Send</button>
      <h2>{message}</h2>
    </form>
  )
}
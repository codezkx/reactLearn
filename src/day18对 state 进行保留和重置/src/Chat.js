import {useState} from 'react';

export default function Messaenger({contact}) {
  const [text, setText] = useState('');

  return (
    <section>
      <textarea
        value={text}
        placeholder={'跟 ' + contact.name + ' 聊一聊'}
        onChange={e => setText(e.target.value)}
      ></textarea>
      <button>发送到 {contact.email}</button>
    </section>
  );
}
/*
 * @Author: 郑克祥 72841383+codezkx@users.noreply.github.com
 * @Date: 2023-05-10 22:19:12
 * @LastEditors: 郑克祥 72841383+codezkx@users.noreply.github.com
 * @LastEditTime: 2023-05-11 20:33:04
 * @FilePath: \reactLearn\src\day28_useDeferredValue\src\Slow.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
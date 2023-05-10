import {useState, useDeferredValue, useEffect} from 'react';

import SearchResults from './SearchResults';

export default function Search() {
  const [query, setQuery] = useState('');
   // 当用户多次输入没有停止时 useDeferredValue不会立即刷新UI而是等待一段时间 类似于防抖函数的实现输入文字
  const deferredQuery = useDeferredValue(query);
  console.log(deferredQuery, 'deferredQuery')
  return (
    <>
      <label>
        Search Albums
        <input
          type="text"
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div style={{
        opacity: query !== deferredQuery ? 0.5 : 1
      }}>
        <SearchResults query={deferredQuery}/>
      </div>
    </>
  )
}
import { useState } from 'react';

import Panel from './Panel'; // 下面两个子组件的stats是相互独立的， 做状态提升

export default function App() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <>
      <h2>哈萨克斯坦，阿拉木图</h2>
      <Panel
        title="关于"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都。
      </Panel>
      <Panel 
        title="词源"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        这个名字来自于 <span lang="kk-KZ">алма</span>，哈萨克语中“苹果”的意思，经常被翻译成“苹果之乡”。事实上，阿拉木图的周边地区被认为是苹果的发源地，Malus sieversii 被认为是现今苹果的祖先。
      </Panel>
    </>
  )
}
import EffectVideoPlayer from './EffectVideoPlayer'; // 使用Effect
import EffectDependencies_Video from './EffectDependencies_Video'; // 添加依赖项  依赖项可以是任何可变化的值
import CahtRoom from './ChatRoom'; // 返回清理函数

export default function App() {
  return (
    <>
      <EffectVideoPlayer />
      <EffectDependencies_Video />
      <CahtRoom />
    </>
  )
}

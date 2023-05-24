import {useContext} from 'react';
import {LevelContext} from './LevelContext';
// 使用levelContext替代Prop中的leave  这种方式比较适合树形结构组件
export default function PropsSection({level ,children}) {
  const levelContext = useContext(LevelContext)
  return (
   <>
    <section>
      <LevelContext.Provider value={levelContext + 1}>
        {children}
      </LevelContext.Provider>
    </section>
   </> 
  )
}
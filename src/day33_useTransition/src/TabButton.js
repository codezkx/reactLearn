import { useTransition } from 'react';
export default function TabButton({onClick ,isActive, children}) {
  const [isPading, startTransition] = useTransition(); // 在子组件中执行过度
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPading) {
    return <span>tab加载中...</span>
  }
  return (
    <button
      onClick={() => {
        startTransition(() => {
          onClick();
        })
      }}
    >
      { children }
    </button>
  )
}

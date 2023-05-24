import {useState, useEffect, useSyncExternalStore} from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true); // 初始化时需要默认为连接网络状态
  useEffect(() => {
    function handleOnline() {
      console.log('连接网络');
      setIsOnline(true);
    }
    function handleOffline() {
      console.log('断开网络');
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, [])
  return isOnline;
}

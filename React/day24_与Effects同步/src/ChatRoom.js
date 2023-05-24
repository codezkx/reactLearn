import {useEffect} from 'react';
export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection()
    connection.connect()
    return () => { // 返回清理函数
      connection.disconnect()
    }
  }, [])
  return <h1>Welcome to the chat!</h1>
}

const createConnection = () => {
  return {
    connect() {
      console.log('✅ Connecting...');
    },
    disconnect() {
      console.log('❌ Disconnected.');
    },
  }
}

import {useOnlineStatus} from './useOnlineStatus.js';
export default function StatusButton() {
  const isOnline = useOnlineStatus();
  function handleSaveClick() {
    console.log('✅ Progress saved');
  }
  return (
    <>
      <button disabled={!isOnline} onClick={handleSaveClick}>
        {isOnline ? 'Save progress' : 'Reconnecting...'}
      </button>
      <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
    </>
  )
}
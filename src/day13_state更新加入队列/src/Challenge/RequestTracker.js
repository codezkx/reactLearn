import {useState} from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [complated, setComplated] = useState(0);
  const [disabledBUt, setDisabledBut] = useState(false); 
  async function handleClick() {
    setPending(p => p + 1)
    // setDisabledBut(true);
    await delay(1000);
    // setDisabledBut(false);
    setPending(p => p -1);
    setComplated(complated => complated + 1)
  }
  return (
    <>
      <h3>等待：{pending}</h3>
      <h3>完成：{complated}</h3>
      <button
        className={disabledBUt ? 'cursor' : ''}
        disabled={disabledBUt}
        onClick={handleClick}>购买</button>
    </>
  )
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
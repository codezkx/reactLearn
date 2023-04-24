import {useState} from 'react';

export default function({baseState, queue, expected}) {
  const actual = getFinalState(baseState, queue);
  return (
    <>
      <p>初始State: <b>{baseState}</b></p>
      <p>队列: <b>[{queue.join(', ')}]</b></p>
      <p style={{
        color: actual === expected ?
        'green' : 
        'red'
      }}>
        你的结果：<b>{actual}</b>
        {' '}
        ({actual === expected ?
          '正确' :
          '错误'
        })
      </p>
    </>
  )
}

export function getFinalState(baseState, queue) {
  let finalState = baseState;
  for (const value of queue) {
    if (typeof value === 'function') {
      finalState = value(finalState)
    } else {
      finalState = value
    }
    

  }

  // TODO: 对队列做些什么...

  return finalState;
}
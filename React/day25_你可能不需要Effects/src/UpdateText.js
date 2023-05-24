import {useState, useEffect} from 'react';

export default function UpdateText() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // const [fullName, setFullName] = useState('');
  // 这种写法是冗余的，且效率低下。
  // useEffect(() => {
  //   setFullName(firstName + ' ' + lastName);
  // }) // useEffect收集的依赖只有 firstName 和 lastName 所以这个不会产生无限渲染

  // 正确写法是
  const fullName = firstName + ' ' + lastName

  return (
    <>
      <h1>{fullName}</h1>
    </>
  )
}
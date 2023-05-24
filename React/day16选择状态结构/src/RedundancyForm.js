import { useState } from 'react';

export default function RedundancyForm({initialColor }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [fullName, setFullName] = useState(''); // 冗余的state 
  const [color, setColor] = useState(initialColor)
  let fullName = firstName + lastName;

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    // setFullName(e.target.value + ' ' + lastName);
    setColor('blue')
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    // setFullName(firstName + ' ' + e.target.value);
  }



  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <br />
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p style={{
        color: color
      }}>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  )
}
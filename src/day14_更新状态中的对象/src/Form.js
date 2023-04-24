import {Fragment, useState} from 'react';
const personList = [
  {
    labelName: 'First name',
    inputName: 'firstName',
  },
  {
    labelName: 'Last name',
    inputName: 'lastName',
  },
  {
    labelName: 'Email',
    inputName: 'email',
  },
]

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  });
  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    })
  }
  const personItemList = personList.map(personItem => {
    return (
      <Fragment key={personItem.labelName}>
        <label>
          {personItem.labelName}
          <input
            name={personItem.inputName}
            value={person[personItem.inputName]}
            onChange={handleChange}
          />
        </label>
      </Fragment>
    )
  })
  return (
    <>
      {personItemList}
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  )

}
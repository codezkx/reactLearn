const person = {
  name: '张三',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
}

function useClick(data) {
  console.log(data)
}
export default function Person() {
  const bc = '#222';
  const color = 'red';
  return (
    <>
      <ul style={{ 
        backgroundColor: bc,
        color,
      }}
        className={['person']}
        onClick={useClick({person: '张三'})}>
        <li>the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
      <div style={person.theme}>
        <h1>{person.name}'s Todos</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/7vQD0fPs.jpg"
          alt="Gregorio Y. Zara"
        />
        <ul>
          <li>Improve the videophone</li>
          <li>Prepare aeronautics lectures</li>
          <li>Work on the alcohol-fuelled engine</li>
        </ul>
      </div>
    </>

  )
}
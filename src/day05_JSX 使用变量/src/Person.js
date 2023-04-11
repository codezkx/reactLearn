function useClick(data) {
  console.log(data)
}
export default function Person() {
  const bc = '#222';
  const color = 'red';
  return (
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
  )
}
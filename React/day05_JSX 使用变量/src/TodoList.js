// export default function TodoList() {
//   const name = 'Gregorio Y.Zara';
//   return (
//     <h1>{name}'s To do List</h1>
//   )
// }
const today = new Date();
function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' },
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  )
}
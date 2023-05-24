export default function Avatar() {
  // 在JSX中用花括号使用javaScript变量
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img 
      className={ avatar === 'https://i.imgur.com/7vQD0fPs.jpg' ? 'avatar' : '' }
      src={avatar}
      alt={description}
    />
  )
}
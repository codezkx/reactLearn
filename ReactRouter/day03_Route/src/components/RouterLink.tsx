import { Link } from 'react-router-dom';


const RouterLink = () => {
  return (
    <>
      <div style={{
        height: '1000px',
      }}></div>
      <Link 
        to='/await'
        relative='path'
        preventScrollReset={true}
      >
        Link
      </Link>
    </>
  )
}

export default RouterLink
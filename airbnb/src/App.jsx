import { useRoutes } from 'react-router-dom';

import routes from '@/router'

function App() {
  return (
    <>
      {useRoutes(routes)}
    </>
    // <div className='app'>
    //   <div className='page'>
        
    //   </div>
    //   <div className='footer'>footer</div>
    // </div>
  );
}

export default App;

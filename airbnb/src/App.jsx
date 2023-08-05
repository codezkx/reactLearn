import { useRoutes } from 'react-router-dom';

import Header  from "@/components/header";

import routes from '@/router'

function App() {
  return (
    <div>
      <Header />
      {useRoutes(routes)}
    </div>
  );
}

export default App;

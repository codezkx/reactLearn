
import React from 'react';
import { 
  Outlet,
  useNavigation,
} from 'react-router-dom';

import FormSearch from './FormSearch';
import FormContent from './FormContent';

const Form: React.FC<any> = () => {
  const navigation = useNavigation(); // 路由跳转时 有过度效果
  return (
    <div className="sidebar">
      <h1>React Router Contacts</h1>
      <FormSearch />
      <FormContent />
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Form
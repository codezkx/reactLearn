import { memo, useEffect, useState } from "react";

import IconGlobal from "@/assets/svg/icon_global";
import IconMenu from "@/assets/svg/icon_menu";
import IconAvatar from "@/assets/svg/icon_avatar";

import RightStyledWrapper from "./style";

const HeaderRight = memo(() => {
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const windowClickHandle = () => {
      setShowPanel(false)
    }
    window.addEventListener("click", windowClickHandle, true);

    return () => {
      window.removeEventListener('click', windowClickHandle, true);
    }
  }, []);

  const handleProfile = () => {
    setShowPanel(true);
  };

  return (
    <RightStyledWrapper>
      <div className="buts">
        <span className="but">登录</span>
        <span className="but">注册</span>
        <span className="but">
          <IconGlobal />
        </span>
      </div>
      <div 
        className="profile"
        onClick={handleProfile}>
        <IconMenu />
        <IconAvatar />
        { showPanel &&  
          <ul>
            <li>注册</li>
            <li>登录</li>
            <li className="line" />
            <li>出租房源</li>
            <li>开展体验</li>
            <li>帮助</li>
          </ul>
        }
      </div>
      
    </RightStyledWrapper>
  )
});

export default HeaderRight;
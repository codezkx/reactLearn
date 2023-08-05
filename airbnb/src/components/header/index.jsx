import { memo } from "react";

import HeaderLeft from "./components/left";
import HeaderRight from "./components/right";
import HeaderCenter from "./components/center";

import HeaderStyledWrapper from "./style";


const Header = memo(() => {
  return (
    <HeaderStyledWrapper>
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </HeaderStyledWrapper>
  );
});

export default Header 
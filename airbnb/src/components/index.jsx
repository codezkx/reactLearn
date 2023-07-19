import { memo } from "react";

import HeaderLeft from "./header/components/left";
import HeaderRight from "./header/components/right";
import HeaderCenter from "./header/components/center";

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
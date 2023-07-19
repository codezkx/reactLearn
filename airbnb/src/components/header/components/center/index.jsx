import { memo } from "react";

import CenterStyledWrapper from "./style";

import IconSearchBar from "@/assets/svg/icon-search-bar";

const HeaderCenter = memo(() => {

  return (
    <CenterStyledWrapper>
      <div className="serach">
        <div className="left">
          任何地方
        </div>
        <div className="center">
          任意一周
        </div>
        <div className="right">
          添加房客
          <div className="icon">
            <IconSearchBar />
          </div>
        </div>
      </div>
    </CenterStyledWrapper>
  );
});

export default HeaderCenter;
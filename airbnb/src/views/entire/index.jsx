import { memo } from "react";

import { isEmptyO } from "@/utils";

import EntireWrapper from "./style";

const Entire = memo(() => {
  return (
    <EntireWrapper>
      <div className="mian">
        123
      </div>
    </EntireWrapper>
  )
});

export default Entire;
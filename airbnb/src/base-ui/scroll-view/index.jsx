import { memo } from "react";

import ScrollViewWrapper from './style'

const ScrollView = memo((props) => {
  return (
    <ScrollViewWrapper>
      <div className="scroll-content">
        { props.children }
      </div>
    </ScrollViewWrapper>
  );
});

export default ScrollView;
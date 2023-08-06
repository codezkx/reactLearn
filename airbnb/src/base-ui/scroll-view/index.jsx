import { memo, useEffect, useRef, useState } from "react";

import ScrollViewWrapper from './style';
import IconArrowLeft from "@/assets/svg/icon-arrow-left";
import IconArrowRight from "@/assets/svg/icon-arrow-right";

const ScrollView = memo((props) => {
  const scrollContentRef = useRef(null);

  const totalDistanceRef = useRef(0);

  const [posIndex, setPosIndex] = useState(0);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(false);

  useEffect(() => {
    const scrollContentEl = scrollContentRef.current; // 容器元素
    const scrollWidth = scrollContentEl.scrollWidth; // 元素自身宽度加上滚动宽度（一般是overflow: hidden）
    const clientWidth = scrollContentEl.clientWidth; // 元素可见区域宽度（不包括边框（border）、外边距（margin）和垂直滚动条（如果存在）。）
    totalDistanceRef.current = scrollWidth - clientWidth;
    setShowRightBtn(totalDistanceRef.current > 0); // 滚动区域大于0时 表示可以向右滚动
  }, [])

  const handleOffsetclick = (isRight) => {
    let newIndex = isRight ? posIndex + 1 : posIndex - 1;
    const currentSelectEl = scrollContentRef.current?.children?.[newIndex]; // 滚动元素
    const currentOffsetLift = currentSelectEl.offsetLeft  // 去顶的固定的值不受translate偏移量影响
    scrollContentRef.current.style.transform = `translate(-${currentOffsetLift}px)`
    setShowRightBtn(totalDistanceRef.current > currentOffsetLift)
    setShowLeftBtn(currentOffsetLift > 0)
    setPosIndex(newIndex);
  }

  return (
    <ScrollViewWrapper>
      { showLeftBtn && (
          <div
            className="control left"
            onClick={(e) => {handleOffsetclick(false)}}
          >
            <IconArrowLeft />
          </div>
        )
      }
      { showRightBtn && (
        <div
          className="control right"
          onClick={(e) => {handleOffsetclick(true)}}
        >
          <IconArrowRight />
        </div>
        )
      }
      <div className="scroll">
        <div className="scroll-content" ref={scrollContentRef}>
          { props.children }
        </div>
      </div>
    </ScrollViewWrapper>
  );
});

export default ScrollView;
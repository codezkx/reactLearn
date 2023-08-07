import { memo, useEffect, useRef } from "react";

import IndicatorWrapper from "./style";

const Indicator = memo((props) => {
  const { selectIndex = 0} = props
  const contentRef = useRef(null);

  useEffect(() => {
    const selectItemEl = contentRef?.current?.children[selectIndex];
    const itemElLeft = selectItemEl.offsetLeft; // 左偏移量
    const itemWidth = selectItemEl.clientWidth; // 自身宽度
    const contentWidth = contentRef.current.clientWidth; // 容器宽度自身宽度
    const contentScroll = contentRef.current.scrollWidth; // 滚动宽度（自身宽度加上隐藏宽度）
    // 计算出item向左边移动的偏移量
    let distance = itemElLeft + itemWidth * 0.5 - contentWidth * 0.5;

    if (distance < 0) distance = 0;
    const totalDistance = contentScroll - contentWidth;
    if (distance > totalDistance) distance = totalDistance;  // 当右边的item不足时 不需要item居中
    contentRef.current.style.transform = `translate(${-distance}px)`
  }, [selectIndex])

  return (
    <IndicatorWrapper>
      <div className="i-content" ref={contentRef}>
        { props.children }
      </div>
    </IndicatorWrapper>
  )
})

export default Indicator
import { useRef, useState, useLayoutEffect, useInsertionEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';

import TooltipContainer from './TooltipContainer';

export default function Tooltip({ children, targetRect }) {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useEffect(() => {
    console.log('useEffect')

  }, [])

  useLayoutEffect(() => { // 在浏览器重新绘制页面之前触发
    const { height } = ref.current.getBoundingClientRect(); // 获取元素的位置和大小
    console.log('useLayoutEffect')
    setTooltipHeight(height); 
  }, []);

  useInsertionEffect(() => {
    console.log('useInsertionEffect')

  }, [])

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer
      x={tooltipX}
      y={tooltipY}
      contentRef={ref}
    >
      { children }
    </TooltipContainer>,
    document.body  
  )
}
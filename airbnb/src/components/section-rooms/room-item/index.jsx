import { memo, useRef, useState } from "react";
import { Carousel } from 'antd';
import classNames from "classnames";

import RoomItemWrapper from './style';
import IconArrowLeft from "@/assets/svg/icon-arrow-left";
import IconArrowRight from "@/assets/svg/icon-arrow-right";
import Indicator from "@/base-ui/indicator";

const RoomItem = memo((props) => {
  const { itemData, width = '25%'} = props;
  const sliderRef = useRef(null)
  const [selectIndex, setSelectIndex] = useState(0)
  const prictureUrls = itemData?.pricture_urls || [];

  const controlClickHandle = (event, isRight) => {
    event.stopPropagation();
    // 下一个面板 上一个面板
    isRight ? sliderRef.current.next() : sliderRef.current.prev();
    let nextIndex = isRight ? selectIndex + 1 : selectIndex - 1;
    if (nextIndex < 0) nextIndex = prictureUrls.length - 1;
    if (nextIndex > 0) nextIndex = 0;
    setSelectIndex(nextIndex)
  }

  const pictureElement = (
    <div className="room-ricture">
      <img
        width="100%"
        src={itemData.picture_url}
        alt="airbnb" />
    </div>
  )

  const sliderElement = (
    <div className="swiper">
      <div className="control">
        <div className="btn left" onClick={(e) => controlClickHandle(e ,false)}>
          <IconArrowLeft width="30" height="30"/>
        </div>
        <div className="btn right" onClick={(e) => controlClickHandle(e, true)}>
          <IconArrowRight width="30" height="30" />
        </div>
      </div>
      <div className="indicator">
        <Indicator selectIndex={selectIndex} >
            { prictureUrls.map((item, index) => (
              <div className="dot-item">
                <span className={classNames('dot-item', {active: selectIndex === index})} key={item} />
              </div>
            )) }
        </Indicator> 
      </div>
      <Carousel dots={false} ref={sliderRef}>
        {
          prictureUrls.map(item => {
            return (
              <div className="room-ricture">
                <img src={item} alt="airbnb" />
              </div>
            )
          })
        }
      </Carousel>  
    </div>
  )
  
  return (
    <RoomItemWrapper
      color={itemData?.verify_info?.text_color || '#39576a'}
      width={width}
    >
      { !prictureUrls.length ? pictureElement : sliderElement}
      <div className="room">
        <div className="room-chief">
          <span>{itemData?.verify_info?.messages[0]} · </span>
          <span>{itemData?.verify_info?.messages[1]}</span>
        </div>
        <div className="room-style">{itemData.name}</div>
        <div className="room-price">¥{itemData.price}/晚</div>
        <div className="room-appraise">
          <span>{itemData.star_rating}</span>
          <span>{itemData?.bottom_info?.content}</span>
        </div>
      </div>
    </RoomItemWrapper>
  )
});

export default RoomItem;
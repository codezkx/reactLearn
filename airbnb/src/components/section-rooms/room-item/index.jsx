import { memo } from "react";

import RoomItemWrapper from './style';

const RoomItem = memo((props) => {
  const { itemData, width } = props;
  return (
    <RoomItemWrapper
      verifyColor={itemData?.verify_info?.text_color || '#39576a'}
      appraiseInfo={{
        contentColor: itemData?.bottom_info?.content_color || '#39576a',
        fontSize: itemData?.bottom_info?.font_size,
      }}
      width={width || '25%'}
    >
      <div className="room">
        <div className="room-ricture">
          <img
            width="100%"
            src={itemData.picture_url}
            alt="airbnb" />
        </div>
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
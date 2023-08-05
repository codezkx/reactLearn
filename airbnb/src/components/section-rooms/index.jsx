import { memo } from "react";

import RoomItem from './room-item'
import SectionRoomWrapper from './style';

const SectionRooms = memo((props) => {
  const { roomList, itemWidth } = props;
  return (
    <SectionRoomWrapper>
      { roomList?.map(item => {
        return <RoomItem itemData={item} key={item.id} width={itemWidth}/>
      }) }
    </SectionRoomWrapper>
  );
});

export default SectionRooms;


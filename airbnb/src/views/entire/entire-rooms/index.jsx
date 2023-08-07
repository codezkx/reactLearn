import { memo } from "react";
import { useSelector } from "react-redux";

import EntireRoomsWrapper from "./style";
import RoomItem from "@/components/section-rooms/room-item";

const EntireRooms = memo(() => {

  const { roomList, total } = useSelector(state => ({
    roomList: state.entire.roomList,
    total: state.entire.total,
  }))

  return (
    <EntireRoomsWrapper>
      <div className="romm-title">{ total }多处住所</div>
      <div className="room-list">
        {
          roomList.map((room, index) => {
            return <RoomItem itemData={room} width="20%" key={room._id} />
          })
        }
      </div>
    </EntireRoomsWrapper>
  )
});

export default EntireRooms;
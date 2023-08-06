import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRoomListAction } from "@/store/modules/entire/actionCreators";

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
          roomList.map(room => {
            return <RoomItem itemData={room} width="20%" key={room._id} />
          })
        }
      </div>
    </EntireRoomsWrapper>
  )
});

export default EntireRooms;
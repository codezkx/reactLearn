import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchRoomListAction } from "@/store/modules/entire/actionCreators";
import EntireRooms from "./entire-rooms";
// import { isEmptyO } from "@/utils";

import EntireWrapper from "./style";

const Entire = memo(() => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoomListAction());
  }, [dispatch]);

  return (
    <EntireWrapper>
      <EntireRooms />
    </EntireWrapper>
  )
});

export default Entire;
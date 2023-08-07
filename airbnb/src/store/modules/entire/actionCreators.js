import * as actionTypes from './constants';
import { getEntireRoomList } from '@/services/modules/entire';

export const changeCurrentPageAction = (currentPage) => ({
  type: actionTypes.CHANGE_CURRENT_PAGE,
  currentPage,
});

export const changeRoomListAction = (roomList) => ({
  type: actionTypes.CHANGE_ROOM_LIST,
  roomList,
});

export const changeTotalAction = (total) => ({
  type: actionTypes.CHANGE_TOTAL,
  total,
});

// 发送网络请求
export const fetchRoomListAction = () => {
  return async (dispatch, getState) => {
    const currentPage = getState().entire.currentPage;
    const offset = currentPage * 10;
    const res = await getEntireRoomList(offset);
    const roomList = res.list
    const total = res.totalCount
    dispatch(changeRoomListAction(roomList));
    dispatch(changeTotalAction(total));
  }
}

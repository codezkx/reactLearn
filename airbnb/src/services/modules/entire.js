import api from '..';

export function getEntireRoomList(offset = 0, size = 10) {
  return api.get({
    url: 'entire/list',
    params: {
      offset,
      size,
    }
  });
}
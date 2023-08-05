import api from '..';

export function getHomeGoodPriceData() {
  return api.get({
    url: "/home/goodprice"
  });
}

export function getHomeHighScoreData() {
  return api.get({
    url: "/home/highscore",
  });
}

export function getHomeDiscountData() {
  return api.get({
    url: "/home/discount"
  })
}

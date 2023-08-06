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


export function getHomeHotRecommendData() {
  return api.get({
    url: "/home/hotrecommenddest"
  })
}

export function getHomeLongforData() {
  return api.get({
    url: "/home/longfor"
  })
}


export function getHomePlusData() {
  return api.get({
    url: "/home/plus"
  })
}

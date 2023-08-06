import { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { isEmptyO } from "@/utils";

import Banner from "@/components/banner";
import HoemeWapper from "./style";
import RecommendHousing from "./c-cpns/recommend";
import DiscountHousing from "./c-cpns/discount";
import DestinationCityHousing from "./c-cpns/destination-city";
import GoodPriceHousing from "./c-cpns/good-price";
import HighScoreHeader from "./c-cpns/high-score";
import LuxuryHousing from "./c-cpns/luxury-housing";

import { fetchHomeDataAction } from "@/store/modules/home";

const Home = memo(() => {
  const {
    discountInfo,
    recommendInfo,
    longforInfo,
    goodPriceInfo,
    highScoreInfo,
    plusInfo,
  } = useSelector((state) => ({
    discountInfo: state.home.discountInfo,
    recommendInfo: state.home.recommendInfo,
    longforInfo: state.home.longforInfo,
    goodPriceInfo: state.home.goodPriceInfo,
    highScoreInfo: state.home.highScoreInfo,
    plusInfo: state.home.plusInfo,
  }), shallowEqual);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomeDataAction())
  }, [dispatch]);
  return (
    <HoemeWapper>
      <Banner />
      <div className="mian">
        { isEmptyO(discountInfo) && <DiscountHousing infoData={discountInfo} /> }
        { isEmptyO(recommendInfo) && <RecommendHousing infoData={recommendInfo} /> }
        { isEmptyO(longforInfo) && <DestinationCityHousing infoData={longforInfo} /> }
        { isEmptyO(goodPriceInfo) && <GoodPriceHousing infoData={goodPriceInfo}/> }
        { isEmptyO(highScoreInfo) && <HighScoreHeader infoData={highScoreInfo}/> }
        { isEmptyO(plusInfo) && <LuxuryHousing infoData={plusInfo}/> }
      </div>
    </HoemeWapper>
  )
});

export default Home;
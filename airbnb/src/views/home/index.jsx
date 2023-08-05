import { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { isEmptyO } from "@/utils";

import Banner from "@/components/banner";
import HoemeWapper from "./style";
import GoodPriceHousing from "./c-cpns/good-price";
import HighScoreHeader from "./c-cpns/high-score";
import DiscountHousing from "./c-cpns/discount";

import { fetchHomeDataAction } from "@/store/modules/home";

const Home = memo(() => {
  const { 
    goodPriceInfo,
    highScoreInfo, 
  } = useSelector((state) => ({
    goodPriceInfo: state.home.goodPriceInfo,
    highScoreInfo: state.home.highScoreInfo,
    discountInfo: state.home.discountInfo,
  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeDataAction())
  }, [dispatch]);
  console.log(goodPriceInfo)
  return (
    <HoemeWapper>
      {/* <Banner /> */}
      <div className="mian">
        <DiscountHousing />
        { isEmptyO && <GoodPriceHousing infoData={goodPriceInfo}/> }
        { isEmptyO && <HighScoreHeader infoData={highScoreInfo}/> }
      </div>
    </HoemeWapper>
  )
});

export default Home;
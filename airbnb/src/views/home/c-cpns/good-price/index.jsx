import { memo } from "react";


import SectionHeader from "@/components/section-header";
import SectionRooms from "@/components/section-rooms";
import SectionFooter from "@/components/section-footer";

const GoodPriceHousing = memo((props) => {
  const { infoData = {} } = props
  return (
    <div className="mgT30">
      <SectionHeader title={infoData.title} subtitle={infoData.subtitle} />
      <SectionRooms roomList={infoData.list} itemWidth="25%" />
      <SectionFooter />
    </div>
  )
});

export default GoodPriceHousing;
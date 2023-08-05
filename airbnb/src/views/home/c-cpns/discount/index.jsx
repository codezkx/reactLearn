import { memo } from "react";

import SectionHeader from "@/components/section-header";
import SectionRooms from "@/components/section-rooms";
import SectionTabs from "@/components/header/section-tabs";

const DiscountHousing = memo((props) => {
  // const { infoData = {} } = props
  const cityList = ['贵州', '成都', '贵州', '成都', '贵州', '成都', '贵州', '成都', ]
  return (
    <>
      <SectionTabs tabs={cityList}/>
    </>
  )
});

export default DiscountHousing;
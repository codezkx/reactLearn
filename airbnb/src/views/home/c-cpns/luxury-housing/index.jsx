import { memo } from "react";

import LuxuryHousingWrapper from "./style";
import SectionHeader from "@/components/section-header";
import SectionRooms from "@/components/section-rooms";
import SectionFooter from "@/components/section-footer";

const LuxuryHousing = memo((props) => {
  const { infoData } = props
  return (
    <LuxuryHousingWrapper>
      <SectionHeader title={infoData.title}  subtitle={infoData.subtitle}/>
      <SectionRooms roomList={infoData.list} itemWidth="20%" />
      <SectionFooter name="plus" />
    </LuxuryHousingWrapper>
  )
});

export default LuxuryHousing;
import { memo } from "react";

import SectionHeader from "@/components/section-header";
import SectionRooms from "@/components/section-rooms";

const HighScoreHeader = memo((props) => {
  const { infoData } = props
  return (
    <>
      <SectionHeader title={infoData.title}  subtitle={infoData.subtitle}/>
      <SectionRooms roomList={infoData.list} itemWidth="25%" />
    </>
  )
});

export default HighScoreHeader;
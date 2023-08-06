import { memo, useCallback, useState } from "react";

import SectionHeader from "@/components/section-header";
import SectionRooms from "@/components/section-rooms";
import SectionTabs from "@/components/home/section-tabs";
import SectionFooter from "@/components/section-footer";

const RecommendHousing = memo((props) => {
  const { infoData = {} } = props;
  const cityList = infoData.dest_address?.map(cityItem => cityItem.name);
  
  const initialTab = Object.keys(infoData.dest_list)[0]; // 设置默认action
  const [tabName, setTabName] = useState(initialTab);
  const handleTabName = useCallback((name, index) => {
    setTabName(name);
  }, [])
  return (
    <div className="mgT30">
      <SectionHeader
        title={infoData.title}
        subtitle={infoData.subtitle}
      />
      <SectionTabs
        tabs={cityList}
        changeTabName={handleTabName}
      />
      <SectionRooms
        roomList={infoData.dest_list[tabName]}
        itemWidth="33.333333%" />
      <SectionFooter name={tabName} />  
    </div>
  )
});

export default RecommendHousing;
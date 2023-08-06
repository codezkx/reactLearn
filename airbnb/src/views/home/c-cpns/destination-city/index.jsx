import { memo} from "react";

import DestinationCityWrapper from "./style";
import SectionHeader from "@/components/section-header";
import ScrollView from "@/base-ui/scroll-view";
import DestinationCityItem from "@/components/home/destination-city-item";

const DestinationCityHousing = memo((props) => {
  const { infoData = {} } = props;
  return (
    <DestinationCityWrapper className="mgT30">
      <SectionHeader
        title={infoData.title}
        subtitle={infoData.subtitle}
      />
      <div className='destination-list'>
        <ScrollView>
          { 
            infoData.list.map((cityItem, index) => <DestinationCityItem key={index} cityInfo={cityItem} />)
          }
        </ScrollView>
      </div>
    </DestinationCityWrapper>
  )
});

export default DestinationCityHousing;
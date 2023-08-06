import { memo } from "react";

import DestinationCityTtemWrapper from './style'

const DestinationCityItem = memo((props) => {
  const { cityInfo = {} } = props;
  return (
    <DestinationCityTtemWrapper>
      <div className="inner">
        <img className="cover" src={cityInfo.picture_url} alt="" />
        <div className="price-info">
          <p className="city">{cityInfo.city}</p>
          <p className="price">均价 {cityInfo.price}</p>
        </div>
      </div>
    </DestinationCityTtemWrapper>
  )
});

export default DestinationCityItem;
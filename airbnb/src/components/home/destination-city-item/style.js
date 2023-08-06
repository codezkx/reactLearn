import styled from 'styled-components';

const DestinationCityTtemWrapper = styled.div`
  flex-shrink: 0;
  width: 20%;
  
  .inner {
    position: relative;
    padding: 8px;
    overflow: hidden;
    .cover {
      width: 100%;
      border-radius: 3px;
    }

    .price-info {
      position: absolute;
      bottom: 0;
      width: calc(100% - 16px);
      padding: 20px 0 32px;
      color: var(--primary-fs-color);
      background-image: linear-gradient(-180deg,rgba(0,0,0,0) 3%,rgb(0,0,0) 100%);
      text-align: center;
      border-radius: 3px;
      .city {
        font-size: 18px;
        font-weight: 600;
        padding-bottom: 8px;
      }
  
      .price {
        font-size: 14px;
      }
    }
  }
`
export default DestinationCityTtemWrapper

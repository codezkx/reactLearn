import styled from 'styled-components';

const RoomItemWrapper = styled.div`
  box-sizing: border-box;
  width: ${props => props.width};
  padding: 8px;

  .room {
    border-radius: 4px;
    overflow: hidden;

    .room-ricture {
      position: relative;
      box-sizing: border-box;
      padding: 66.66% 8px 0;

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    .room-chief {
      padding: 8px 0;
      font-size: 12px;
      font-weight: bold;
      color: ${props => props.verifyColor};
    }

    .room-style {
      font-size: 16px;
      font-weight: 700;
      color: var(--color-pitch-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .room-price {
      padding: 8px 0;
      font-size: 14px;
      color: var(--color-pitch-black);
    }

    .room-appraise {
      font-size: 12px;
    }
  }
`

export default RoomItemWrapper;

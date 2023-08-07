import styled from 'styled-components';

const RoomItemWrapper = styled.div`
  box-sizing: border-box;
  width: ${props => props.width};
  padding: 8px;

  .room {
    border-radius: 4px;
    overflow: hidden;

    .swiper {
      position: relative;
      cursor: pointer;

      &:hover {
        .control {
          display: flex;
        }
      }

      .control {
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: none;
        justify-content: space-between;
        color: var(--primary-fs-color);
        transition: display 300ms ease;

        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 83px;
          height: 100%;
          background-image: linear-gradient(to left, transparent 0%, rgba(0, 0, 0, .25) 100%);
  
          &.right {
            background-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, .25) 100%);
          }
        }
      }

      .indicator {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 1;
        bottom: 10px;
        width: 30%;
        margin: 0 auto;

        .dot-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20%;

          .dot {
            width: 6px;
            height: 6px;
            background-color: var(--indicator-bg-color);
            border-radius: 50%;

            &.active {
              width: 8px;
              height: 8px;
              background-color: #FFF;
            }
          }
        }
      }

    }

    .room-ricture {
      position: relative;
      box-sizing: border-box;
      padding: 66.66% 8px 0;
      border-radius: 3px;
      overflow: hidden;

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; // 当图片被压缩时，使用它可以占满宽和高
      }
    }

    .room-chief {
      padding: 8px 0;
      font-size: 12px;
      font-weight: bold;
      color: ${props => props.color};
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

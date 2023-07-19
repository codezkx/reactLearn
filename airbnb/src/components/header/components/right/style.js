import styled from 'styled-components';

const RightStyledWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  font-weight: 600;
  cursor: pointer;
  user-select: none;

  .buts {
    display: flex;
    .but {
      height: 18px;
      line-height: 18px;
      padding: 12px 15px;
      border-radius: 32px;
      &:hover {
        background-color: var(--primary-bgd-color);
      }
    }
  }

  .profile {
    position: relative;
    display: flex;
    align-items: center;
    width: 64px;
    padding: 4px 6px;
    margin-left: 8px;
    border: 1px solid #DDDDDD;
    border-radius: 20px;
    transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);;

    &:hover {
      box-shadow: 0 2px 4px rgba(0,0,0,0.18);
    }

    svg {
      flex: 1;
      color: #717171;
    }

    ul {
      position: absolute;
      top: 50px;
      right: 0;
      width: 240px;
      padding: 8px 0;
      text-align: start;
      background-color: #FFF;
      border-radius: 10px;
      box-shadow: 0 0 4px rgba(0,0,0,0.18);

      li {
        padding: 16px;

        &:hover {
          background-color: var(--primary-bgd-color);
        }
      }
      
      .line {
        width: 100%;
        height: 1px;
        padding: 0;
        margin: 8px 0;
        background-color: #ddd;
        &:hover {
          background-color: #ddd;
        }
      }
    }
  }

`;

export default RightStyledWrapper;
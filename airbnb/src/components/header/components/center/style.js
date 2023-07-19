import styled from 'styled-components';

const CenterStyledWrapper = styled.div`
  .serach {
    display: flex;
    align-items: center;
    padding: 8px;
    border: 1px solid #DDD;
    cursor: pointer;
    border-radius: 50px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05);
    transition: box-shadow 0.2s cubic-bezier(0.2,0,0,1);

    &:hover {
      box-shadow: 0 2px 4px rgba(0,0,0,0.18);
    }

    .left {
      padding-left: 16px;
    }

    .left, .center {
      display: flex;
      // padding: 0 16px;
      line-height: 1.5;
      font-weight: bold;
      color: var(--color-serach-primary);
    }

    .left::after, .center::after {
      content: '';
      display: block;
      width: 1px;
      height: 21px;
      margin: 0 16px;
      background-color: var(--color-serach-line-bg);
    }

    .right {
      display: flex;
      align-items: center;
      line-height: 1.5;
      color: var(--color-serach-secondary);

      .icon {
        padding: 10px;
        margin-left: 8px;
        background-color: var(--primary-color);
        color: #fff;
        border-radius: 50%;
      }
    }
  }
  
`;

export default CenterStyledWrapper;
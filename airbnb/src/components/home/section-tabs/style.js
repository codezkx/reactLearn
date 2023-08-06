import styled from 'styled-components';

const SectionTabsWrapper = styled.div`
  .item {
    box-sizing: border-box;
    user-select: none;
    flex-basis: 120px;
    flex-shrink: 0;
    padding: 14px 16px;
    border: 0.5px solid var(--primary-border-color);
    margin-right: 16px;
    text-align: center;
    font-size: 16px;
    white-space: nowrap;
    cursor: pointer;
    ${props => props.theme.mixin.boxShadow}
  }

  .action {
    color: var(--primary-fs-color);
    background-color: var(--primary-tab-bgd-color);
  }
`;

export default SectionTabsWrapper;
import styled from 'styled-components';

const SectionTabsWrapper = styled.div`
  .item {
    box-sizing: border-box;
    user-select: none;
    flex-basis: 120px;
    flex-shrink: 0;
    padding: 12px 0;
    border: 0.5px solid var(--primary-border-color);
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
    ${props => props.theme.mixin.boxShadow}
  }
`;

export default SectionTabsWrapper;
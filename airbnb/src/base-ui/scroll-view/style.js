import styled from 'styled-components'

const ScrollViewWrapper = styled.div`
  position: relative;

  .control {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border: 0.5px solid rgb(0, 0, 0, 0.3);
    color: var(--primary-color-black);
    stroke: currentcolor;
    stroke-width: 1;
    background-color: var(--primary-bgd-color);
    border-radius: 50%;
    z-index: 1;

    &:hover {
      ${props => props.theme.mixin.boxShadow};
    }

    &.left {
      left: 0;
      transform: translate(-50%, -50%);

    }

    &.right {
      right: 0;
      transform: translate(50%, -50%);
    }
  }

  .scroll {
    overflow: hidden;

    .scroll-content {
      display: flex;
      transition: transform 250ms ease;
    }
  }

`

export default ScrollViewWrapper
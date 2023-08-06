import { memo } from "react";

import SectionHeaderStyledWrapper from './style'

const SectionHeader = memo((props) => {
  const { title, subtitle } = props
  return (
    <SectionHeaderStyledWrapper>
      <h2 className='title'>{ title }</h2>
      { subtitle && <div className='subtitle'>{subtitle}</div> }

    </SectionHeaderStyledWrapper>
  )
});

export default SectionHeader;
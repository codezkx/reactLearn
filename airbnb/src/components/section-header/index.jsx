import { memo } from "react";

import SectionHeaderStyledWrapper from './style'

const SectionHeader = memo((props) => {
  const { title } = props
  return (
    <SectionHeaderStyledWrapper>
      <h2 className="pdB16">{ title }</h2>
    </SectionHeaderStyledWrapper>
  )
});

export default SectionHeader;
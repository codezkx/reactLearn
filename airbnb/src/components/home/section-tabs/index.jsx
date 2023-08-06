import { memo, useEffect, useState } from "react";

import classNames from "classnames";

import SectionTabsWrapper from "./style";
import ScrollView from "@/base-ui/scroll-view";

const SectionTabs = memo((props) => {
  const { tabs = [], changeTabName } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTabNamsClick = (name, index) => {
    // 重复点击时不执行后面的代码
    if (index === currentIndex) {
      return false
    }
    setCurrentIndex(index);
    changeTabName(name, index);
  }

  return (
    <SectionTabsWrapper>
      <ScrollView>
        { 
          tabs.map((tabItem, index) => {
            return (
              <div
                className={classNames('item', {action: index === currentIndex})}
                key={index}
                onClick={() => handleTabNamsClick(tabItem, index)}
              >
                {tabItem}
              </div>
            )
          }) 
        }
      </ScrollView>
    </SectionTabsWrapper>
  );
});

export default SectionTabs;
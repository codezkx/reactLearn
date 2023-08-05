import { memo } from "react";

import SectionTabsWrapper from "./style";
import ScrollView from "@/base-ui/scroll-view";


const SectionTabs = memo((props) => {
  const { tabs } = props;
  return (
    <SectionTabsWrapper>
      <ScrollView>
        { 
          tabs.map((tabItem, index) => {
            return (
              <div
                className="item"
                key={index}
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
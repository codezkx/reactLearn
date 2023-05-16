import { useTransition, useState } from 'react';

import TabButton from './TabButton';
import AboutTab from './AboutTab';
import PostsTab from './PostsTab';
import ContactTab from './ContactTab';


export default function TabContainer() {
  // const [isPending, startTransition] = useTransition(); 在父组件中执行过度
  const [tab, setTab] = useState('about');

  const handleTab = (nextTab) => {
    setTab(nextTab)
    // startTransition(() => {
    //   setTab(nextTab)
    // })
  }
  return (
    <>
      <TabButton
        isActive={tab === 'about'}
        onClick={() => handleTab('about')}
      >
        About
      </TabButton>
      <TabButton 
        isActive={tab === 'posts'}
        onClick={() => handleTab('posts')}
      >
        Posts (slow)
      </TabButton>
      <TabButton 
        isActive={tab === 'contact'}
        onClick={() => handleTab('contact')}
      >
        Contact
      </TabButton>
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </>
  )
}
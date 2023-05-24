import {useState} from 'react';

import PropsSection from './PropsSection';
import PropsHeading from './PropsHeading';
import Post from './Post';
import RecentPosts from './RecentPosts';
import AllPosts from './AllPosts';
export default function App() {
  return (
    <>
    {/* 使用Props方式向子组件中传递数据 */}
      {/* <PropsSection>
        <PropsHeading level={1}>主标题</PropsHeading>
        <PropsHeading level={2}>副标题</PropsHeading>
        <PropsHeading level={3}>子标题</PropsHeading>
        <PropsHeading level={4}>子子标题</PropsHeading>
        <PropsHeading level={5}>子子子标题</PropsHeading>
        <PropsHeading level={6}>子子子子标题</PropsHeading>
      </PropsSection>  */}

      {/* 使用context向子孙组件中传递信息 */}
      {/* <PropsSection level={1}>
        <PropsHeading>主标题</PropsHeading>
        <PropsSection level={2}>
          <PropsHeading>副标题</PropsHeading>
          <PropsHeading>副标题</PropsHeading>
          <PropsHeading>副标题</PropsHeading>
          <PropsSection level={3}>
            <PropsHeading>子标题</PropsHeading>
            <PropsHeading>子标题</PropsHeading>
            <PropsHeading>子标题</PropsHeading>
            <PropsSection level={4}>
              <PropsHeading>子子标题</PropsHeading>
              <PropsHeading>子子标题</PropsHeading>
              <PropsHeading>子子标题</PropsHeading>
            </PropsSection>
          </PropsSection>
        </PropsSection>
      </PropsSection> */}

      {/* 在相同中间中使用并提供context */}
      <PropsSection>
        <PropsHeading>My Profile</PropsHeading>
        <Post
          title="旅行者，你好！"
          body="来看看我的冒险。"
        />
        <AllPosts />
      </PropsSection>

    </>
  )
}




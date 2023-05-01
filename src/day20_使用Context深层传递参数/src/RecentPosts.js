import PropsSection from './PropsSection';
import PropsHeading from './PropsHeading';
import Post from './Post';
export default function RecentPosts() {
  return (
    <>
      <PropsSection>
        <PropsHeading>最近的帖子</PropsHeading>
        <Post
          title="里斯本的味道"
          body="...那些蛋挞！"
        />
        <Post
          title="探戈节奏中的布宜诺斯艾利斯"
          body="我爱它！"
        />
      </PropsSection>
    </>
  )
}

import PropsSection from './PropsSection';
import PropsHeading from './PropsHeading';
import RecentPosts from './RecentPosts';
export default function AllPosts() {
  return (
    <>
      <PropsSection>
        <PropsHeading>帖子</PropsHeading>
        <RecentPosts />
      </PropsSection>
    </>
  )
}
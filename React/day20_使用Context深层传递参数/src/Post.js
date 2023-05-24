import PropsSection from './PropsSection';
import PropsHeading from './PropsHeading';

export default function Post({title, body}) {
  return (
    <>
      <h1>
        <PropsSection isFancy={true}>
          <PropsHeading>
            {title}
          </PropsHeading>
          <p><i>{body}</i></p>
        </PropsSection>
      </h1>
    </>
  )
}

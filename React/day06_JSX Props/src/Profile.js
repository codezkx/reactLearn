import Avatar from './Avatar';
import Card from './Card';

export default function Profile() {
  return (
    <Card size="500">
      <h1>I am the acatar </h1>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar 
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
        size={50}
      />
    </Card>
  )
}
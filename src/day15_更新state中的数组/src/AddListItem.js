import {useState} from 'react';

let nextId = 0

export default function AddListItem() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>振奋人心的雕塑家们</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          {id: nextId++, name: name}
        ])
      }}>
        添加
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}
          </li>
        ))}
      </ul>
    </>
  )
}


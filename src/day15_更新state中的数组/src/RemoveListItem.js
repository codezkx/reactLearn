import {useState} from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function RemoveListItem() {
  const [artists, setArtists] = useState(initialArtists)
  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <ul>
        {artists.map(artist => 
          <li key={artist.id}>
            {artist.name}
            <button onClick={ () => 
              setArtists(
                artists.filter(a => a.id !== artist.id)
              )
            }>remove</button>
          </li>  
        )}
      </ul>
    </>
  )
}

import {memo} from 'react';
import {fetchData} from './data';

 const SerachResults = function SerachResults({query}) {
  if (query === '') {
    return null;
  }
  // console.log('query:', query)
  const albums = use(fetchData(`/search?q=${query}`))
  if (albums.length === 0) {
    return <p>No matches for <i>"{query}"</i></p>;
  }
  return (
    <>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            {album.title} ({album.year})
          </li>
        ))}
      </ul>
    </>
  )
}

export default SerachResults

// 实验性hook还没有确定命  只是有这个提议
function use(promise) {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      result => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      reason => {
        promise.status = 'rejected';
        promise.reason = reason;
      },      
    );
    throw promise;
  }
}
import {useRef} from 'react';

const scrollComfigs = {
  behavior: 'smooth',
  block: 'nearest',
  inline: 'center'
}

export default function CatFriends() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);
  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView(scrollComfigs);
  }

  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView(scrollComfigs);
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView(scrollComfigs);
  }
  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>
          Tom
        </button>
        <button onClick={handleScrollToSecondCat}>
          Maru
        </button>
        <button onClick={handleScrollToThirdCat}>
          Jellylorum
        </button>
      </nav>
      <div>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          width: '200px',
          overflowX: 'auto',
        }}>
          <li>
            <img
              src="https://placekitten.com/g/200/200"
              alt="Tom"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/300/200"
              alt="Maru"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/250/200"
              alt="Jellylorum"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  )

}
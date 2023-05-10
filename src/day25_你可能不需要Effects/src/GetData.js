import {useState, useEffect} from 'react';
export default function GetData() {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    console.log(1)
    setTimeout(() => {
      console.log(ignore)
      if (!ignore) { // 连续点击按钮ignore始终都是true
        // console.log(page);
        setResults([...results, page + 1])
      }
    }, 1000)
    return () => {
      ignore = true;
    console.log(3)

    }
  }, [page])

  return (
    <>
      <button onClick={() => setPage(page + 1)}>Next Page</button>
    </>
  )
}
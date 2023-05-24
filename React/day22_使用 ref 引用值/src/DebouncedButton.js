import { useRef ,useContext } from 'react';
import {TextContext} from './DashboardContex';
export default function DebouncedButton({children}) {
  const textContext = useContext(TextContext);
  const timeoutID = useRef(null);
  return (
    <>
      <button onClick={() => {
        clearTimeout(timeoutID.current);
        timeoutID.current = setTimeout(() => {
          alert(textContext)
        }, 1000);
      }}>
        {children}
      </button>
    </>
  )
}
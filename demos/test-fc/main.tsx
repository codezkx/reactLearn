import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
	const [num, setNum] = useState(0);
	window.setNum = setNum;
	console.log(num, 'num');
	return num === 3 ? <Child /> : <div>1</div>
}

function Child() {

	debugger
	return <span>mini-react</span>;
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />);

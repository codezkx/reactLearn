import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
	// 测试e
	const [num, setNum] = useState(0);
	// window.setNum = setNum;
	console.log(num, 'num');
	// return num === 3 ? <Child /> : <div>1</div>
	return (
		<div onClick={() => setNum(num + 1)}>
			<div
				onClick={(e) => {
					console.log(2);
					e.stopPropagation();
				}}
			></div>
		</div>
	);
}

function Child() {
	debugger;
	return <span>mini-react</span>;
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />);

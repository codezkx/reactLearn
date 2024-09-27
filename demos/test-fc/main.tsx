import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
	const [num, setNum] = useState(0);
	// window.setNum = setNum;
	// console.log(num, 'num');

	// 测试 useState
	// return num === 3 ? <Child /> : <div>1</div>

	// 测试 合成事件
	// return (
	// 	<div onClick={() => setNum(num + 1)}>
	// 		<div
	// 			onClick={(e) => {
	// 				console.log(2);
	// 				e.stopPropagation();
	// 			}}
	// 		></div>
	// 	</div>
	// );

	// 测试diff算法
	const arr =
		num % 2 === 0
			? [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>]
			: [<li key="3">3</li>, <li key="2">2</li>, <li key="1">1</li>];
	return (
		<ul
			onClickCapture={() => {
				setNum((num) => num + 1);
				setNum((num) => num + 1);
				setNum((num) => num + 1);
			}}
		>
			{arr}
		</ul>
	);
}

function Child() {
	debugger;
	return <span>mini-react</span>;
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />);

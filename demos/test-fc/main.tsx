import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
	const [num] = useState(0);
	console.log(num);
	return (
		<div>
			<span>1</span>
		</div>
	);
}

function Child() {
	return <span>mini-react</span>;
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />);

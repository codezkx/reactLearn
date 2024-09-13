import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
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

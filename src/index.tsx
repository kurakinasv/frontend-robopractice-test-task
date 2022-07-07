import { createRoot } from 'react-dom/client';
import 'antd/dist/antd.css';
import './styles/index.css';

import App from './App';

const container = document.getElementById('root');
createRoot(container!).render(<App />);

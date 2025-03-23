import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import { App } from './App.jsx';

// Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Styles
import './assets/css/index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);

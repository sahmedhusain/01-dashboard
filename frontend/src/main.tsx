import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import debug utilities in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/debug-auth');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

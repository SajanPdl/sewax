import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('Sewax app starting...');

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

console.log('Root element found, rendering app...');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('App rendered');

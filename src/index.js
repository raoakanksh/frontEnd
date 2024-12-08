import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Target 'root' div in index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

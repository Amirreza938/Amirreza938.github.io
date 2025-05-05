import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
console.log('Dictionary App is initializing...');
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Current path:', window.location.pathname);

const redirectMatch = window.location.search.match(/\?\/(.*)/);
if (redirectMatch) {
  console.log('Handling GitHub Pages redirect');
  const path = redirectMatch[1];
  window.history.replaceState(null, null, '/' + path);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

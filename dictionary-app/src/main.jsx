import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'  // Update path to point to the styles directory
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

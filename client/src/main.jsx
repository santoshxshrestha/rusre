import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/homepage/home.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <App />
        <Home />
  </StrictMode>,
)

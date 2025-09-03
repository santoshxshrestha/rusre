import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/homepage/home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Home />
  </StrictMode>,
)

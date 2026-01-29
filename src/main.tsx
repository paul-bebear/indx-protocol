import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Environment variable validation
if (!import.meta.env.VITE_SUPABASE_URL) {
  console.error('CRITICAL: VITE_SUPABASE_URL not loaded! Check .env file.');
}
if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('CRITICAL: VITE_SUPABASE_ANON_KEY not loaded! Check .env file.');
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

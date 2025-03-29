import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Authcontext, AuthProvider } from './components/context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <AuthProvider>
   <App />
   </AuthProvider>
   
   
   
  </BrowserRouter>
  
  
)

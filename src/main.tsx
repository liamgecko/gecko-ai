import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { SidebarProvider } from './components/ui/sidebar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SidebarProvider>
          <App />
      </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

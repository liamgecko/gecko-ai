import { AppSidebar } from './components/layout/sidebar'
import { SidebarProvider } from './components/ui/sidebar'
import { Header } from './components/layout/header'
import { Routes, Route } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard'
import { CommandDialog } from './components/layout/command'
import React, { useState } from 'react'
import WidgetTrigger from './components/layout/widget-trigger'

function App() {
  const [isCommandDialogOpen, setCommandDialogOpen] = useState(false)

  const toggleCommandDialog = () => {
    setCommandDialogOpen((prev) => !prev)
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="app-body w-full flex flex-col justify-between">
          <Header onSearchClick={toggleCommandDialog} />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
            </Routes>
          </div>
          <WidgetTrigger onClick={toggleCommandDialog} />
        </main>
        <CommandDialog isOpen={isCommandDialogOpen} onClose={toggleCommandDialog} />
       
      </div>
    </SidebarProvider>
  )
}

export default App
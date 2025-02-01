import { AppSidebar } from './components/layout/sidebar'
import { SidebarProvider } from './components/ui/sidebar'
import { Header } from './components/layout/header'
import { Routes, Route } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard'

function App() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="app-body w-[calc(100vw-var(--sidebar-width))] flex flex-col justify-between">
          <Header />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              {/* Add other routes here */}
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
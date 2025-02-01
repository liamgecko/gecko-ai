import { AppSidebar } from './components/layout/sidebar'
import { SidebarProvider } from './components/ui/sidebar'
import { Header } from './components/layout/header'

function App() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="app-body w-[calc(100vw-var(--sidebar-width))]">
          <Header />
          <div className="p-4">
            <h1>Jobbies</h1>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
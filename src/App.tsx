import { AppSidebar } from './components/layout/sidebar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'

function App() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
            {/* Your main content will go here */}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
import { AppSidebar } from './components/layout/sidebar'

function App() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1">
        {/* Your main content will go here */}
      </main>
    </div>
  )
}

export default App
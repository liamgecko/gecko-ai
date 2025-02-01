import { AppSidebar } from "./sidebar"

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1">
        
      </main>
    </div>
  )
}
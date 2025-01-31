import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebar"

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
} 
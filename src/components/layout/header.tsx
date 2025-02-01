import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { PanelLeft, Search, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Header() {
  return (
    <header className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger>
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </SidebarTrigger>
        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center">
                <Home className="h-3 w-3" />
                <span className="sr-only">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="mx-1" />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center max-w-sm w-full">
        <div className="relative w-full group">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search..."
            className="w-full pl-8 pr-16 transition-all duration-300 border-border hover:border-transparent focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            style={{
              backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          />
        </div>
      </div>
    </header>
  )
} 
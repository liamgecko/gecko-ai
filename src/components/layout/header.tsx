import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { PanelLeft, Search, Home, Star } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useLocation } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'
import { cn } from "@/lib/utils"

const FAVORITES_KEY = 'sidebar:favorites'

// Add this route title mapping
const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/forms': 'Forms',
  '/forms/create': 'Create Form',
  '/forms/templates': 'Form Templates',
  '/forms/responses': 'Form Responses',
  '/events': 'Events',
  '/conversations': 'Conversations',
  '/ai': 'AI and Automation',
  '/broadcasts': 'Broadcasts',
  '/calls': 'Calls',
  '/settings': 'Settings',
  '/contacts': 'Contacts',
  '/responses': 'Responses',
  '/messages': 'Messages',
}

export function Header() {
  const { state } = useSidebar()
  const isOpen = state === "expanded"
  const location = useLocation()
  
  // Add useEffect to update document title
  useEffect(() => {
    const pageTitle = routeTitles[location.pathname] || 'Untitled Page'
    document.title = `${pageTitle} | Gecko Engage`
  }, [location.pathname])

  const [isFavorited, setIsFavorited] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
    return favorites.some((fav: any) => fav.href === location.pathname)
  })

  useEffect(() => {
    const updateFavoritedState = () => {
      const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
      setIsFavorited(favorites.some((fav: any) => fav.href === location.pathname))
    }

    window.addEventListener('favoritesUpdated', updateFavoritedState)
    window.addEventListener('storage', updateFavoritedState)

    return () => {
      window.removeEventListener('favoritesUpdated', updateFavoritedState)
      window.removeEventListener('storage', updateFavoritedState)
    }
  }, [location.pathname])

  const handleFavoriteClick = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
    
    if (isFavorited) {
      const newFavorites = favorites.filter((fav: any) => fav.href !== location.pathname)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      setIsFavorited(false)
      window.dispatchEvent(new Event('favoritesUpdated'))
    } else {
      const newFavorite = {
        title: routeTitles[location.pathname] || 'Untitled Page',
        href: location.pathname
      }
      const newFavorites = [...favorites, newFavorite]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      setIsFavorited(true)
      window.dispatchEvent(new Event('favoritesUpdated'))
    }
  }, [isFavorited, location.pathname])

  return (
    <header className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <SidebarTrigger>
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </SidebarTrigger>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom" 
              className="bg-white text-gray-800 border-white text-xs font-medium tracking-tight shadow-[0_0_12px_rgba(59,130,246,0.75)]"
            >
              <p>{isOpen ? 'Hide sidebar' : 'Show sidebar'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
      
      <div className="flex items-center gap-2 max-w-sm w-full">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="shrink-0 h-8 w-8"
                onClick={handleFavoriteClick}
              >
                <Star className={cn("h-4 w-4", isFavorited && "fill-current")} />
                <span className="sr-only">
                  {isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom" 
              className="bg-white text-gray-800 border-white text-xs font-medium tracking-tight shadow-[0_0_12px_rgba(59,130,246,0.75)]"
            >
              <p>{isFavorited ? 'Remove from favourites' : 'Add to favourites'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
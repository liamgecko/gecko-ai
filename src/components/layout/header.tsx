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
import React from 'react'

const FAVORITES_KEY = 'sidebar:favorites'

// Add this route title mapping
const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/settings': 'Settings',
  
  // Account section
  '/settings/account': 'Account',
  '/settings/account/settings': 'Account settings',
  '/settings/account/templates': 'Email and SMS templates',
  '/settings/account/senders': 'Verified senders and domains',
  '/settings/account/categories': 'Categories',
  '/settings/account/tasks': 'Tasks and objectives',
  
  // User management section
  '/settings/users': 'User management',
  '/settings/users/my-settings': 'My user settings',
  '/settings/users/list': 'Users',
  '/settings/users/groups': 'User groups',
  '/settings/users/devices': 'Mobile devices',
  
  // Field management section
  '/settings/fields': 'Field management',
  '/settings/fields/contact': 'Contact fields',
  '/settings/fields/organisation': 'Organisation fields',
  '/settings/fields/org-types': 'Organisation types',
  '/settings/fields/options': 'Field options',
  
  // Call and SMS section
  '/settings/communications': 'Call and SMS',
  '/settings/communications/outcomes': 'Outcomes',
  '/settings/communications/telephone': 'Telephone numbers',
  '/settings/communications/voip': 'VoIP numbers',
  '/settings/communications/usage': 'Usage and costs',
  '/settings/communications/test-voip': 'Test VoIP connection',
  
  // Chat settings section
  '/settings/chat': 'Chat settings',
  '/settings/chat/widgets': 'Widgets',
  '/settings/chat/chatbots': 'Chatbots',
  '/settings/chat/knowledge-bases': 'Knowledge bases',
  '/settings/chat/channels': 'Channels',
  '/settings/chat/teams': 'Teams',
  '/settings/chat/saved-replies': 'Saved replies',
  '/settings/chat/workflows': 'Chat workflows',
  
  // Data management section
  '/settings/data': 'Data management',
  '/settings/data/integrations': 'Integrations',
  '/settings/data/import': 'Import data',
  '/settings/data/export': 'Export data',
  '/settings/data/labels': 'Labels',
  '/settings/data/security': 'Data security',

  // Keep other existing routes
  '/forms': 'Forms',
  '/forms/create': 'Create Form',
  '/forms/templates': 'Form Templates',
  '/forms/responses': 'Form Responses',
  '/events': 'Events',
  '/conversations': 'Conversations',
  '/ai': 'AI and Automation',
  '/broadcasts': 'Broadcasts',
  '/calls': 'Calls',
  '/contacts': 'Contacts',
  '/responses': 'Responses',
  '/messages': 'Messages',
}

export function Header() {
  const { state } = useSidebar()
  const isOpen = state === "expanded"
  const location = useLocation()
  const isLandingPage = location.pathname === "/"
  
  // Create breadcrumb items from current path
  const getBreadcrumbItems = useCallback(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    return pathSegments.map((_, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/')
      return {
        title: routeTitles[path] || 'Unknown',
        path: path
      }
    })
  }, [location.pathname])

  const breadcrumbs = getBreadcrumbItems()

  // Add useEffect to update document title
  useEffect(() => {
    const pageTitle = routeTitles[location.pathname] || 'Untitled Page'
    document.title = `${pageTitle} | Gecko Engage`
  }, [location.pathname])

  // Add this effect to toggle body class
  useEffect(() => {
    if (isOpen) {
      document.body.classList.remove('menu-collapsed')
    } else {
      document.body.classList.add('menu-collapsed')
    }
  }, [isOpen])

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
        {!isLandingPage && (
          <Breadcrumb>
            <BreadcrumbList className="text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center">
                  <Home className="h-3 w-3" />
                  <span className="sr-only">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.path}>
                  <BreadcrumbSeparator className="mx-1" />
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.path}>{item.title}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
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
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
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
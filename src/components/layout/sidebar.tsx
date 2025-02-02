import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Home, FileText, MessageSquare, ClipboardList, StarOff, CalendarFold, MessageSquareText, Route, PhoneCall, BookUser, SendHorizonal, Inbox, Mail, Settings } from "lucide-react"
import { useLocation, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import React from "react"

const favouriteNav = [
  {
    title: "Finance knowledge base",
    href: "/finance-kb",
  },
  {
    title: "2025 open day",
    href: "/open-day-2025",
  },
  {
    title: "Exports",
    href: "/exports",
  },
]

const platformNav = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Forms",
    href: "/forms",
    icon: ClipboardList,
    submenu: [
      {
        title: "Create Form",
        href: "/forms/create",
        icon: FileText,
      },
      {
        title: "Form Templates",
        href: "/forms/templates",
        icon: ClipboardList,
      },
      {
        title: "Form Responses",
        href: "/forms/responses",
        icon: MessageSquare,
      },
    ]
  },
  {
    title: "Events",
    href: "/events",
    icon: CalendarFold,
    submenu: [
        {
          title: "Create Form",
          href: "/forms/create",
          icon: FileText,
        },
        {
          title: "Form Templates",
          href: "/forms/templates",
          icon: ClipboardList,
        },
        {
          title: "Form Responses",
          href: "/forms/responses",
          icon: MessageSquare,
        },
      ]
  },
  {
    title: "Conversations",
    href: "/conversations",
    icon: MessageSquareText,
    submenu: [
        {
          title: "Create Form",
          href: "/forms/create",
          icon: FileText,
        },
        {
          title: "Form Templates",
          href: "/forms/templates",
          icon: ClipboardList,
        },
        {
          title: "Form Responses",
          href: "/forms/responses",
          icon: MessageSquare,
        },
      ]
  },
  {
    title: "AI and Automation",
    href: "/ai",
    icon: Route,
    submenu: [
        {
          title: "Create Form",
          href: "/forms/create",
          icon: FileText,
        },
        {
          title: "Form Templates",
          href: "/forms/templates",
          icon: ClipboardList,
        },
        {
          title: "Form Responses",
          href: "/forms/responses",
          icon: MessageSquare,
        },
      ]
  },
  {
    title: "Broadcasts",
    href: "/broadcasts",
    icon: SendHorizonal,
    submenu: [
        {
          title: "Create Form",
          href: "/forms/create",
          icon: FileText,
        },
        {
          title: "Form Templates",
          href: "/forms/templates",
          icon: ClipboardList,
        },
        {
          title: "Form Responses",
          href: "/forms/responses",
          icon: MessageSquare,
        },
      ]
  },
  {
    title: "Calls",
    href: "/calls",
    icon: PhoneCall,
    submenu: [
        {
          title: "Create Form",
          href: "/forms/create",
          icon: FileText,
        },
        {
          title: "Form Templates",
          href: "/forms/templates",
          icon: ClipboardList,
        },
        {
          title: "Form Responses",
          href: "/forms/responses",
          icon: MessageSquare,
        },
      ]
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  }
]

const dataNav = [
    {
      title: "Contacts",
      href: "/contacts",
      icon: BookUser,
      submenu: [
          {
            title: "Create Form",
            href: "/forms/create",
            icon: FileText,
          },
          {
            title: "Form Templates",
            href: "/forms/templates",
            icon: ClipboardList,
          },
          {
            title: "Form Responses",
            href: "/forms/responses",
            icon: MessageSquare,
          },
        ]
    },
    {
        title: "Responses",
        href: "/responses",
        icon: Inbox,
        submenu: [
            {
              title: "Create Form",
              href: "/forms/create",
              icon: FileText,
            },
            {
              title: "Form Templates",
              href: "/forms/templates",
              icon: ClipboardList,
            },
            {
              title: "Form Responses",
              href: "/forms/responses",
              icon: MessageSquare,
            },
          ]
      },
      {
        title: "Messages",
        href: "/messages",
        icon: Mail,
        submenu: [
            {
              title: "Create Form",
              href: "/forms/create",
              icon: FileText,
            },
            {
              title: "Form Templates",
              href: "/forms/templates",
              icon: ClipboardList,
            },
            {
              title: "Form Responses",
              href: "/forms/responses",
              icon: MessageSquare,
            },
          ]
      },
  ]

// Move these outside the component
const MainMenuMotion = motion.div
const SubMenuMotion = motion.div

const FAVORITES_KEY = 'sidebar:favorites'

export function AppSidebar() {
  const [isAvailable, setIsAvailable] = useState(true)
  const [currentView, setCurrentView] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<any>(null)
  const [favorites, setFavorites] = useState<Array<{ title: string; href: string }>>([])
  const location = useLocation()
  const navigate = useNavigate()
  const isRootOrDashboard = location.pathname === '/'

  // Listen for changes to favorites in localStorage
  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
      setFavorites(storedFavorites)
    }

    // Load initial favorites
    loadFavorites()

    // Listen for our custom event
    const handleFavoritesUpdate = () => {
      loadFavorites()
    }

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate)
    window.addEventListener('storage', handleFavoritesUpdate) // Keep this for cross-window sync

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate)
      window.removeEventListener('storage', handleFavoritesUpdate)
    }
  }, [])

  const handleMenuClick = (item: any) => {
    if (item.submenu) {
      setCurrentView(item.href)
      setSelectedSection(item)
    } else {
      navigate(item.href)
    }
  }

  return (
    <TooltipProvider>
      <Sidebar className="bg-sidebar border-r border-gray-800">
        <SidebarHeader className="border-b border-gray-800 px-4 py-4">
          <div className="flex items-center gap-2">
            <img src="/logo-full.svg" alt="Logo" className="w-20" />
          </div>
        </SidebarHeader>

        <SidebarContent className="relative px-2 py-4">
          <AnimatePresence mode="sync">
            {currentView === null ? (
              <MainMenuMotion
                key="main-menu"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ 
                  type: "spring",
                  bounce: 0,
                  duration: 0.2,
                  stiffness: 400,
                  damping: 30
                }}
                className="absolute inset-0 px-2 py-4"
              >
                {/* Favourites Section - Only show if there are favorites */}
                {favorites.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="px-2 text-[10px] font-mono font-semibold tracking-wide text-gray-400 uppercase">
                      Favourites
                    </h2>
                    <SidebarMenu>
                      {favorites.map((item) => (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton asChild>
                            <a href={item.href} className="flex items-center gap-2 [&:hover_.remove-star]:opacity-100">
                              <span>{item.title}</span>
                              <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="remove-star ml-auto h-6 w-6 opacity-0 transition-opacity hover:bg-sidebar-accent"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      const newFavorites = favorites.filter(fav => fav.href !== item.href)
                                      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
                                      setFavorites(newFavorites)
                                      // Dispatch the custom event
                                      window.dispatchEvent(new Event('favoritesUpdated'))
                                    }}
                                  >
                                    <StarOff className="h-4 w-4 stroke-[1.5]" />
                                    <span className="sr-only">Remove from favourites</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent 
                                  side="right" 
                                  className="bg-white text-gray-800 border-white text-xs font-medium tracking-tight shadow-[0_0_12px_rgba(59,130,246,0.75)]"
                                >
                                  <p>Remove from favourites</p>
                                </TooltipContent>
                              </Tooltip>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </div>
                )}

                {/* Platform Section */}
                <div className={cn("space-y-2", favorites.length === 0 ? "mt-0" : "mt-6")}>
                  <h2 className="px-2 text-[10px] font-mono font-semibold tracking-wide text-gray-400 uppercase">
                    Platform
                  </h2>
                  <SidebarMenu>
                    {platformNav.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton 
                          onClick={() => handleMenuClick(item)}
                          isActive={item.href === location.pathname || (item.href === '/dashboard' && isRootOrDashboard)}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4 stroke-[1.5]" />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>

                {/* Data Section */}
                <div className="mt-6 space-y-2">
                  <h2 className="px-2 text-[10px] font-mono font-semibold tracking-wide text-gray-400 uppercase">
                    Data
                  </h2>
                  <SidebarMenu>
                    {dataNav.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton onClick={() => handleMenuClick(item)}>
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4 stroke-[1.5]" />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>
              </MainMenuMotion>
            ) : (
              <SubMenuMotion
                key="submenu"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ 
                  type: "spring",
                  bounce: 0,
                  duration: 0.2,
                  stiffness: 400,
                  damping: 30
                }}
                className="absolute inset-0 bg-sidebar px-2 py-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setCurrentView(null)}
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                    <h2 className="font-semibold">
                      {selectedSection?.title}
                    </h2>
                  </div>

                  <SidebarMenu>
                    {selectedSection?.submenu?.map((item: any) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild>
                          <a href={item.href} className="flex items-center gap-2">
                            <item.icon className="h-4 w-4 stroke-[1.5]" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>
              </SubMenuMotion>
            )}
          </AnimatePresence>
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-800">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer rounded-md p-2 hover:bg-sidebar-accent">
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>LY</AvatarFallback>
                  </Avatar>
                  <span className={cn(
                    "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white",
                    isAvailable ? "bg-gray-300" : "bg-green-500"
                  )} />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Liam Young</span>
                  <span className="text-xs text-muted-foreground">liam@geckoengage.com</span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="start" side="right">
              <div className="flex items-center gap-2 px-2 py-2">
                <Switch 
                  id="availability" 
                  checked={!isAvailable}
                  onCheckedChange={(checked) => setIsAvailable(!checked)}
                />
                <Label htmlFor="availability" className="text-gray-900">Set chat status</Label>
              </div>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 cursor-pointer">
                Agent settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 cursor-pointer">
                Security preferences
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 cursor-pointer">
                My accounts
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 cursor-pointer">
                Service status
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 cursor-pointer ">
                Gecko academy
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 cursor-pointer ">
                Contact support
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 cursor-pointer ">
                Product changes
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 cursor-pointer ">
                Suggest a feature
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="text-red-500 hover:bg-red-50 dark:hover:bg-red-50 dark:hover:text-red-600 cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  )
} 
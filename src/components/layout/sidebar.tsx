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
import { Home, Star, Users, FileText, MessageSquare, Bot, Send, Phone, ClipboardList, Bell, StarOff, CalendarFold, MessageSquareText, Route, PhoneCall, BookUser, SendHorizonal, Inbox, Mail } from "lucide-react"

const favouriteNav = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Starred Items",
    href: "/starred",
    icon: Star,
  },
  {
    title: "Recent Activity",
    href: "/recent",
    icon: Bell,
  },
]

const platformNav = [
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

export function AppSidebar() {
  return (
    <TooltipProvider>
      <Sidebar className="bg-sidebar border-r border-gray-800">
        <SidebarHeader className="border-b border-gray-800 px-4 py-4">
          <div className="flex items-center gap-2">
            <img src="/logo-full.svg" alt="Logo" className="w-20" />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 py-4">
          {/* Favourites Section */}
          <div className="space-y-2">
            <h2 className="px-2 text-[10px] font-mono font-semibold tracking-wide text-gray-400 uppercase">
              Favourites
            </h2>
            <SidebarMenu>
              {favouriteNav.map((item) => (
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
                              console.log('Remove', item.title, 'from favourites')
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

          {/* Platform Section */}
          <div className="mt-6 space-y-2">
            <h2 className="px-2 text-[10px] font-mono font-semibold tracking-wide text-gray-400 uppercase">
              Platform
            </h2>
            <SidebarMenu>
              {platformNav.map((item) => (
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

          {/* Data Section */}
          <div className="mt-6 space-y-2">
            <h2 className="px-2 text-[10px] font-mono font-semibold tracking-wide text-gray-400 uppercase">
              Data
            </h2>
            <SidebarMenu>
              {dataNav.map((item) => (
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
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">Liam Young</span>
              <span className="text-xs text-muted-foreground">liam@geckoengage.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  )
} 
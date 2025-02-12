import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Sidebar, SidebarTrigger, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';
import { Edit, Forward, Paperclip, Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
interface CommandDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandDialog: React.FC<CommandDialogProps> = ({ isOpen, onClose }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSidebarOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-5xl w-full h-[94vh] flex overflow-x-hidden p-0 [&>button]:hidden"
        style={{
          boxShadow: '0 0 80px rgba(56, 189, 248, 0.1), 0 0 20px rgba(29, 78, 216, 0.1)',
        }}
      >
        <SidebarProvider className="dialog-sidebar bg-gray-200!important dark:bg-gray-900!important">
          <Sidebar className={`w-64 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <SidebarContent>
              <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="relative w-full group">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 dark:text-white text-gray-900" />
                  <Input 
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-8 pr-16 h-8 transition-all duration-300 hover:border-transparent focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border border-gray-300 dark:border-gray-700 dark:hover:border-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                    }}
                  />
                </div>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="shrink-0 h-8 w-8 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
                      >
                        <Edit/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="bottom" 
                      className="bg-white text-gray-800 border-white text-xs font-medium tracking-tight shadow-[0_0_12px_rgba(0,0,0,0.2)] dark:shadow-[0_0_12px_rgba(59,130,246,0.75)]"
                    >
                      <p>New conversation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-col gap-4 py-4 px-2">
                <div className="space-y-2">
                  <h2 className="px-2 text-[10px] font-mono font-semibold tracking-wide dark:text-gray-400 text-gray-600 uppercase">
                    Today
                  </h2>
                  <ul className="flex w-full min-w-0 flex-col gap-1">
                    <li>
                      <button data-sidebar="menu-button" data-size="default" data-active="true" className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:data-[active=true]:bg-sidebar-accent dark:data-[active=true]:font-medium dark:data-[active=true]:text-sidebar-accent-foreground data-[active=true]:bg-gray-200 data-[active=true]:font-medium data-[active=true]:text-gray-800 data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground h-8 text-sm">Rewrite campaign title</button>
                    </li>
                    <li>
                      <button data-sidebar="menu-button" data-size="default" data-active="false" className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground hover:bg-gray-200 hover:text-gray-800 h-8 text-sm text-ellipsis text-gray-700 dark:text-gray-100">Help building a landing page</button>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h2 className="px-2 text-[10px] font-mono font-semibold tracking-wide dark:text-gray-400 text-gray-600 uppercase">
                    Past 7 days
                  </h2>
                  <ul className="flex w-full min-w-0 flex-col gap-1">
                    <li>
                      <button data-sidebar="menu-button" data-size="default" data-active="false" className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground hover:bg-gray-200 hover:text-gray-800 h-8 text-sm text-ellipsis text-gray-700 dark:text-gray-100">Convert GBP into USD</button>
                    </li>
                    <li>
                      <button data-sidebar="menu-button" data-size="default" data-active="false" className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground hover:bg-gray-200 hover:text-gray-800 h-8 text-sm text-ellipsis text-gray-700 dark:text-gray-100">Best air fryer recipes</button>
                    </li>
                    <li>
                      <button data-sidebar="menu-button" data-size="default" data-active="false" className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground hover:bg-gray-200 hover:text-gray-800 h-8 text-sm text-ellipsis text-gray-700 dark:text-gray-100">Heart of Midlothian best ever...</button>
                    </li>
                    <li>
                      <button data-sidebar="menu-button" data-size="default" data-active="false" className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground hover:bg-gray-200 hover:text-gray-800 h-8 text-sm text-ellipsis text-gray-700 dark:text-gray-100">Content for Open Day event</button>
                    </li>
                  </ul>
                </div>
              </div>
            </SidebarContent>
          </Sidebar>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between">
              <SidebarTrigger onClick={toggleSidebar} className="shrink-0 h-8 w-8">
                {isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
              </SidebarTrigger>
              <DialogClose asChild>
                <Button type="button" variant="ghost" className="shrink-0 h-8 w-8">
                  <X/>
                </Button>
              </DialogClose>
            </div>
            <div className="p-4 flex flex-col justify-between h-[calc(100%-65px)]">
              <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
                <div className="flex flex-row-reverse">
                  <div className="dark:bg-gray-900 bg-gray-200 p-4 rounded-lg gap-2 flex flex-col max-w-[80%]">
                    <p>Can you help me re-write a title for my email? The email is targeted at attracting prospective students to our open day.</p>
                    <p>The current title is: "Join us at our Open Day"</p>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="gap-2 flex flex-col max-w-[80%]">
                    <p>Here are a few engaging and compelling alternatives for your email subject line:</p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Discover Your Future – Visit Our Open Day!</li>
                      <li>Your Journey Starts Here – Open Day Invitation</li>
                      <li>Experience Campus Life at Our Open Day!</li>
                      <li>Find Your Perfect Course – Join Our Open Day</li>
                      <li>See What’s Possible – Open Day Registration Now Open!</li>
                      <li>Your Future Starts Now – Visit Our Open Day</li>
                      <li>Get Inspired – Join Us for an Unmissable Open Day</li>
                      <li>Step Into Your Future – Open Day This [Date]!</li>
                    </ol>
                    <p>Would you like me to tailor the tone further to match your institution’s style or audience?</p>
                  </div>
                </div>
              </div>
              <div className="max-w-3xl mx-auto w-full mt-4">
                <form
                  className="rounded-lg border border-transparent relative"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                >
                  <div className="relative">
                    <textarea
                      placeholder="Type your message"
                      className="w-full bg-transparent focus:outline-none resize-none overflow-y-auto px-4 pt-4 pb-12 rounded text-base"
                      style={{
                        height: '106px',
                      }}
                    />
                    <div className="absolute right-0 bottom-0 left-0">
                      <div className="flex justify-between items-center p-2">
                        <div>
                          <Select defaultValue="claude-3.5">
                            <SelectTrigger className="gap-2 text-muted-foreground border-0 bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs hover:bg-accent hover:text-accent-foreground p-2 h-auto">
                              <SelectValue placeholder="Select AI model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="claude-3.5">claude-3.5.sonnet</SelectItem>
                              <SelectItem value="claude-2.1">claude-2.1</SelectItem>
                              <SelectItem value="gpt-4">GPT-4</SelectItem>
                              <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            type="button"
                            className="dark:text-gray-200 text-gray-800 flex justify-center items-center rounded-full hover:bg-accent hover:text-accent-foreground p-2"
                            style={{
                              height: '36px',
                              width: '36px',
                            }}
                          >
                            <Paperclip className="h-4 w-4" />
                          </button>
                          <button 
                            type="submit"
                            className="text-white rounded-full bg-blue-700 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Forward className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
};
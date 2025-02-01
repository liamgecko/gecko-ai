import { ArrowUp, Forward, Paperclip, PaperclipIcon } from "lucide-react"
import { useState } from "react"
import { TextLoop } from "@/components/ui/text-loop"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function PlaceholderText() {
  return (
    <div className='inline-flex items-center whitespace-pre-wrap text-base text-muted-foreground'>
      I can help you{' '}
      <TextLoop
        className='overflow-y-clip'
        transition={{
          type: 'spring',
          stiffness: 900,
          damping: 80,
          mass: 10,
        }}
        variants={{
          initial: {
            y: 20,
            rotateX: 90,
            opacity: 0,
            filter: 'blur(8px)',
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
          },
          exit: {
            y: -20,
            rotateX: -90,
            opacity: 0,
            filter: 'blur(8px)',
          },
        }}
      >
        <span>create a form</span>
        <span>create an event</span>
        <span>generate a report</span>
        <span>export to your CRM</span>
      </TextLoop>
    </div>
  )
}

export function DashboardPage() {
  const [message, setMessage] = useState("")
  
  return (
    <div className="flex flex-col justify-between max-w-3xl mx-auto w-full">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-8 text-center">What can we help with today, Liam?</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-6 cursor-pointer transition-all hover:border-transparent relative"
            style={{
              backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}>
            <h2 className="text-sm font-semibold">Create a form</h2>
            <p className="text-muted-foreground text-sm">Generate powerful forms to collect student data.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 cursor-pointer transition-all hover:border-transparent relative"
            style={{
              backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}>
            <h2 className="text-sm font-semibold">Create an event</h2>
            <p className="text-muted-foreground text-sm">Attract students to your Open Day.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 cursor-pointer transition-all hover:border-transparent relative"
            style={{
              backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}>
            <h2 className="text-sm font-semibold">Create a new email template</h2>
            <p className="text-muted-foreground text-sm">Improve admissions with tailored content.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 cursor-pointer transition-all hover:border-transparent relative"
            style={{
              backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}>
            <h2 className="text-sm font-semibold">Report on conversations</h2>
            <p className="text-muted-foreground text-sm">See how performant your chat account is.</p>
          </div>
        </div>
      </div>

      <div 
        className="rounded-lg border border-transparent relative mt-4"
        style={{
            backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
        }}
        >
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-transparent focus:outline-none resize-none overflow-y-auto px-4 pt-4 pb-12 rounded text-base"
            style={{
              height: '106px',
            }}
          />
          {!message && (
            <div className="absolute pointer-events-none top-4 left-4">
              <PlaceholderText />
            </div>
          )}
        </div>
        <div className="absolute right-0 bottom-0 left-0">
            <div className="flex justify-between items-center p-2">
                <div>
                    <Select defaultValue="claude-3.5">
                      <SelectTrigger className="gap-2 text-muted-foreground border-0 bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs">
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
                      className="text-white flex justify-center items-center rounded-full hover:bg-gray-800 dark:hover:bg-gray-800 p-2"
                      style={{
                          height: '36px',
                          width: '36px',
                      }}
                    >
                        <Paperclip className="h-4 w-4" />
                    </button>
                    <button 
                      disabled={!message.trim()}
                      className="text-white rounded-full bg-blue-700 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Forward className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
} 
import React, { useState } from 'react'
import { Forward, Paperclip } from "lucide-react"
import { TextLoop } from "@/components/ui/text-loop"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

export function DashboardPage() {
  const [textareaValue, setTextareaValue] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(true)
  const [showChart, setShowChart] = useState(false)

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value)
  }

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault()
    if (textareaValue.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, textareaValue])
      setTextareaValue('')

      setTimeout(() => {
        setShowChart(true)
        setMessages((prevMessages) => [
          ...prevMessages,
          "Here is the data you requested:",
        ])
      }, 1000)
      setShowOptions(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
        {messages.length === 0 && (
          <h1 className="text-4xl font-bold mb-8">What can we help with today, Liam?</h1>
        )}
        {showOptions && messages.length === 0 && (
          <div className="grid grid-cols-2 gap-4 w-full">
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
        )}
        {messages.length > 0 && (
          <div className="flex flex-col w-full mt-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${index % 2 === 0 ? 'bg-blue-500 text-white p-2 rounded-lg max-w-fit' : ''}`}>
                {message}
              </div>
            ))}
          </div>
        )}
        {showChart && (
          <div className="flex flex-col w-full mt-4">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto w-full my-4">
        <form className="rounded-lg border border-transparent relative" onSubmit={handleSendMessage}
          style={{
            backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}>
          <div className="relative">
            <textarea
              value={textareaValue}
              onChange={handleTextareaChange}
              className="w-full bg-transparent focus:outline-none resize-none overflow-y-auto px-4 pt-4 pb-12 rounded text-base"
              style={{
                height: '106px',
              }}
            />
            {textareaValue === '' && (
              <div className="absolute pointer-events-none top-4 left-4">
                <PlaceholderText />
              </div>
            )}
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
                    type="button"
                    className="text-white flex justify-center items-center rounded-full hover:bg-gray-800 dark:hover:bg-gray-800 p-2"
                    style={{
                      height: '36px',
                      width: '36px',
                    }}
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button 
                    type="submit"
                    disabled={textareaValue.trim() === ''}
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
  )
}
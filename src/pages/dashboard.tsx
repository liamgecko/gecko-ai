import { Forward, Paperclip } from "lucide-react"
import { useState } from "react"
import { TextLoop } from "@/components/ui/text-loop"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useChat } from 'ai/react'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart } from "recharts"

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

interface AIResponse {
  type: 'text' | 'chart';
  content: string;
  data?: any[];
  chartType?: 'line' | 'bar';
  config?: {
    [key: string]: {
      label: string;
      color: string;
    };
  };
}

const ChartComponent = ({ type, data, config }: { 
  type: 'line' | 'bar', 
  data: any[],
  config?: AIResponse['config']
}) => {
  const chartConfig = config || {
    value: {
      label: "Value",
      color: "hsl(var(--primary))"
    }
  };

  if (type === 'line') {
    return (
      <ChartContainer config={chartConfig}>
        <LineChart data={data}>
          <Line 
            type="monotone"
            dataKey="value"
            strokeWidth={2}
          />
          <ChartLegend>
            <ChartLegendContent />
          </ChartLegend>
        </LineChart>
      </ChartContainer>
    )
  }

  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={data}>
        <Bar
          dataKey="value"
        />
        <ChartLegend>
          <ChartLegendContent />
        </ChartLegend>
      </BarChart>
    </ChartContainer>
  )
}

export function DashboardPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    initialMessages: [],
  });

  const renderMessage = (message: any) => {
    try {
      const parsed = JSON.parse(message.content) as AIResponse;
      if (parsed.type === 'chart' && parsed.data) {
        return (
          <div className="max-w-[800px]">
            <ChartComponent 
              type={parsed.chartType || 'line'} 
              data={parsed.data}
              config={parsed.config}
            />
            <p className="mt-2 text-sm text-muted-foreground">{parsed.content}</p>
          </div>
        );
      }
      return message.content;
    } catch {
      return message.content;
    }
  };

  const [message, setMessage] = useState("")
  
  return (
    <>
      {messages.length === 0 ? (
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
            <h1 className="text-4xl font-bold mb-8">What can we help with today, Liam?</h1>
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
          </div>

          <div className="max-w-3xl mx-auto w-full mt-4">
            <form onSubmit={handleSubmit} className="rounded-lg border border-transparent relative"
              style={{
                backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  className="w-full bg-transparent focus:outline-none resize-none overflow-y-auto px-4 pt-4 pb-12 rounded text-base"
                  style={{
                    height: '106px',
                  }}
                />
                {!input && (
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
                        disabled={!input?.trim()}
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
      ) : (
        <div className="flex flex-col max-w-3xl mx-auto" style={{ height: 'calc(100vh - 104px)' }}>
            <div className="message-container overflow-y-auto">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message flex mb-4`}
                >
                    {message.role === 'assistant' ? (
                      <div className="text-base">
                        {renderMessage(message)}
                      </div>
                    ) : (
                      <div className="text-base p-3 dark:bg-gray-900 bg-slate-200 rounded">
                        {message.content}
                      </div>
                    )}
                </div>
              ))}
            </div>

          <div className="max-w-3xl mx-auto w-full mt-auto">
            <form onSubmit={handleSubmit} className="rounded-lg border border-transparent relative"
              style={{
                backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Message Gecko"
                  className="w-full bg-transparent focus:outline-none resize-none overflow-y-auto px-4 pt-4 pb-12 rounded text-base"
                  style={{
                    height: '106px',
                  }}
                />
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
                        disabled={!input?.trim()}
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
      )}
    </>
  )
} 
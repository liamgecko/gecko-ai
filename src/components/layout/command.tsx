import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Forward, Paperclip } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChat } from 'ai/react';

interface CommandDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandDialog: React.FC<CommandDialogProps> = ({ isOpen, onClose }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    initialMessages: [],
  });

  const renderMessage = (message: any) => {
    try {
      const parsed = JSON.parse(message.content);
      return parsed.content;
    } catch {
      return message.content;
    }
  };

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
        className="max-w-4xl w-full h-[80vh]"
        style={{
          boxShadow: '0 0 80px rgba(56, 189, 248, 0.1), 0 0 20px rgba(29, 78, 216, 0.1)',
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col items-center justify-end max-w-3xl mx-auto w-full">
            <h1 className="text-4xl font-bold mb-8">What can we help with today?</h1>
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
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-transparent relative"
              style={{
                backgroundImage: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--background))), linear-gradient(to right, #38bdf8, #1d4ed8)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
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
                  <div className="absolute pointer-events-none top-4 left-4 text-muted-foreground">
                    I can help you generate a report
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
      </DialogContent>
    </Dialog>
  );
};
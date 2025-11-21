'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIState } from './ai-actions';
import { Bot, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getScriptureSummaryAction } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type ChatInput = z.infer<typeof chatSchema>;

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export function AIModal() {
  const { open, setOpen } = useAIState();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Namaste! I am Lola, your guide to cosmic knowledge. Ask me anything about scriptures, philosophy, or spiritual wisdom.',
    },
  ]);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChatInput>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = (data: ChatInput) => {
    const userMessage: Message = { role: 'user', text: data.message };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    startTransition(async () => {
      // For now, let's use a mock response.
      // We will replace this with a real AI call later.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const botMessage: Message = {
        role: 'bot',
        text: "This is a placeholder response from Lola. We will connect this to a real AI in the next step.",
      };
      setMessages((prev) => [...prev, botMessage]);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95vw] max-w-2xl h-[85vh] p-0 flex flex-col ai-modal-overlay">
        <DialogHeader className="p-4 ai-modal-header-bg text-white rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-xl font-headline">
            🌺 Lola AI - Ask Anything
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3', {
                  'justify-end': msg.role === 'user',
                })}
              >
                {msg.role === 'bot' && (
                  <Avatar>
                    <AvatarFallback>🌺</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'p-3 rounded-lg max-w-[80%] break-words',
                    msg.role === 'user' ? 'ai-message-user' : 'ai-message-bot'
                  )}
                >
                  <p>{msg.text}</p>
                </div>
                {msg.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isPending && (
                <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarFallback>🌺</AvatarFallback>
                    </Avatar>
                    <div className="p-3 rounded-lg max-w-[80%] break-words ai-message-bot">
                        <p>Lola is thinking...</p>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                    <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormControl>
                                <Input 
                                    placeholder="Ask your question..." 
                                    {...field}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" size="icon" disabled={isPending}>
                        <Send />
                    </Button>
                </form>
            </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Loader2, User, Bot, Sparkles, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { askClinicalAssistant } from '@/ai/flows/ai-clinical-assistant-flow';
import { type IntegratedReport } from '@/lib/data-service';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ClinicalAssistant({ report }: { report: IntegratedReport }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSend = async (customQuery?: string) => {
    const query = customQuery || input;
    if (!query.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    if (!customQuery) setInput('');
    setLoading(true);

    try {
      const result = await askClinicalAssistant({
        query: query,
        patientRecord: report,
      });
      const assistantMessage: Message = { role: 'assistant', content: result.answer };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Assistant error:', err);
      let errorMsg = 'Sorry, I encountered an error while processing your request.';
      if (err.message?.includes('429') || err.message?.includes('quota')) {
        errorMsg = 'I am currently experiencing high demand (rate limit reached). Please try again in a few seconds.';
      }
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, loading]);

  return (
    <Card className="flex flex-col h-[500px] shadow-lg border border-primary/10 overflow-hidden">
      <CardHeader className="bg-primary/5 pb-4 border-b">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Ask MediSync Assistant
        </CardTitle>
        <p className="text-[10px] text-muted-foreground">Query the integrated clinical record in natural language.</p>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
                <Bot className="w-12 h-12 text-muted-foreground opacity-20" />
                <div className="text-xs text-muted-foreground max-w-[200px]">
                  Ask me about this patient's history, lab trends, or medications.
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" size="sm" className="text-[10px]" onClick={() => handleSend("What are the abnormal labs?")}>
                    Abnormal labs?
                  </Button>
                  <Button variant="outline" size="sm" className="text-[10px]" onClick={() => handleSend("List current medications.")}>
                    Medications?
                  </Button>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                )}
                <div className={`rounded-2xl px-3 py-2 text-sm max-w-[85%] ${
                  m.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Bot className="w-3 h-3 text-primary animate-pulse" />
                </div>
                <div className="bg-muted rounded-2xl px-3 py-2 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground italic">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t bg-white">
        <form 
          className="flex w-full items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input 
            placeholder="Type your question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || loading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

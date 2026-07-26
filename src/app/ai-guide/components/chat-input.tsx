"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
  disabled,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleSend = () => {
    if (value.trim() && !isLoading && !disabled) {
      onSend(value);
      onChange("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Speech Recognition handlers
  const startSpeechRecognition = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(
        "Voice input is not supported in this browser. Please use Chrome or Safari.",
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsRecording(true);
        toast.info("Listening... Speak now.");
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error !== "no-speech") {
          toast.error(`Voice recognition error: ${event.error}`);
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");

        if (transcript.trim()) {
          const currentText = textareaRef.current?.value || "";
          onChange(
            currentText
              ? `${currentText.trim()} ${transcript.trim()}`
              : transcript.trim(),
          );
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setIsRecording(false);
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  // Cleanup recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [value]);

  return (
    <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl p-3 sm:p-4 safe-area-bottom">
      <div className="max-w-4xl mx-auto">
        {/* Main input row */}
        <div className="flex items-end gap-2">
          {/* Attachment button - Hidden on small mobile, visible on sm+ */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground hover:bg-muted/20 disabled:opacity-50"
            disabled={isLoading || disabled}
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          {/* Text input area */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              rows={1}
              placeholder={
                disabled
                  ? "Select a chat to begin..."
                  : "Ask about scriptures, meditation, or seek guidance..."
              }
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-muted/20 border border-border/50 rounded-2xl px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              disabled={isLoading || disabled}
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Voice input button */}
            <Button
              variant={isRecording ? "destructive" : "ghost"}
              size="icon"
              onClick={toggleRecording}
              className={cn(
                "h-10 w-10 sm:h-11 sm:w-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/20 disabled:opacity-50 transition-all",
                isRecording &&
                  "bg-destructive text-destructive-foreground hover:bg-[#ef4444] animate-pulse border border-destructive/50",
              )}
              disabled={isLoading || disabled}
              title={isRecording ? "Stop listening" : "Talk to Lola"}
            >
              <Mic className="w-5 h-5" />
            </Button>

            {/* Send button */}
            <Button
              onClick={handleSend}
              disabled={!value.trim() || isLoading || disabled}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl p-0 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Helper text */}
        <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-2 px-2">
          AI can provide spiritual guidance. Always consult original scriptures.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
  label?: string;
  href?: string;
}

export function BackButton({ className, label = "Back", href }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={cn(
        "flex items-center gap-1 text-slate-400 hover:text-white hover:bg-white/10 transition-all -ml-2 px-2",
        className
      )}
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
}

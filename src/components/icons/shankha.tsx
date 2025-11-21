import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function ShankhaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary drop-shadow-[0_0_4px_hsl(var(--primary))]", props.className)}
      {...props}
    >
        <path d="M4 14c-.6.7-1 1.5-1 2.5 0 2.5 2 4.5 4.5 4.5.8 0 1.6-.2 2.3-.6" />
        <path d="M8 19.8c-.9.1-1.8.2-2.8.2-3.9 0-7-3.1-7-7 0-1.5.5-2.9 1.3-4" />
        <path d="M11.3 2.6C6.2 3.5 3 8.3 3 14" />
        <path d="M14 3c-1.1 0-2.1.2-3 .6" />
        <path d="M18 10c0-1.9-1.2-3.6-3-4.5" />
        <path d="M11.9 10.5c-.2.2-.4.4-.5.6" />
        <path d="M18 15.5c0 3.3-2.7 6-6 6-1.5 0-2.8-.5-3.9-1.3" />
        <path d="M21 12c-1.1-4.2-4.5-7.5-8.7-8.6" />
        <path d="M15 11c0 .7-.1 1.4-.3 2" />
        <path d="M18.8 11.9c.1.3.2.7.2 1.1" />
        <path d="M17.8 8.4c.5.9.8 1.9.8 3" />
        <path d="M14.7 6.3c.9.8 1.5 1.9 1.8 3.1" />
    </svg>
  );
}

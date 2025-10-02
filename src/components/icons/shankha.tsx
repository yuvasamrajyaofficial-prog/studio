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
      className={cn("text-accent", props.className)}
      {...props}
    >
      {/* Ribbon */}
      <path d="M6 21c-2-2-2-4 0-6" />
      <path d="M18 21c2-2 2-4 0-6" />
      <path d="M6 15s-1 1-2 2" />
      <path d="M18 15s1 1 2 2" />
      <path d="M9 18c0 2 1 3 3 3s3-1 3-3" />

      {/* Main Conch Body */}
      <path d="M12 2c-1.5 1.5-1.5 3.5 0 5" />
      <path d="M8.5 4C7 5, 7.5 7, 8.5 8" />
      <path d="M15.5 4c1.5 1,1 3-0.5 4" />
      <path d="M12 18.5C6.5 18.5 4 14 4 10c0-4 2-6 8-6s8 2 8 6c0 4-2.5 8.5-8 8.5z" />
      
      {/* Inner Swirl */}
      <path d="M11 11c0,1.5,1.5,2.5,3,2" />
      <path d="M11.5 15.5c1.5,0,2.5-1,2-3" />
    </svg>
  );
}

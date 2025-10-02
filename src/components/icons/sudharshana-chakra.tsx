import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function SudharshanaChakraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-accent drop-shadow-[0_0_3px_hsl(var(--accent))]", props.className)}
      {...props}
    >
      {/* Outer rim with flame-like patterns */}
      <circle cx="50" cy="50" r="48" strokeWidth="2.5" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <g key={i} transform={`rotate(${angle} 50 50)`}>
            <path d="M50 2 L48 6 Q50 4 52 6 Z" fill="currentColor" />
          </g>
        );
      })}

      {/* Main body */}
      <circle cx="50" cy="50" r="42" />

      {/* 16 Spokes */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const x1 = 50 + 20 * Math.cos((angle * Math.PI) / 180);
        const y1 = 50 + 20 * Math.sin((angle * Math.PI) / 180);
        const x2 = 50 + 42 * Math.cos((angle * Math.PI) / 180);
        const y2 = 50 + 42 * Math.sin((angle * Math.PI) / 180);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      
      {/* Inner decorative circle */}
      <circle cx="50" cy="50" r="20" />

      {/* 8 Inner petal-like spokes from center */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8 + 22.5; // Offset to sit between main spokes
        return (
          <g key={i} transform={`rotate(${angle} 50 50)`}>
             <path d="M50 8 Q55 14 50 20 Q45 14 50 8 Z" strokeWidth="1" />
          </g>
        );
      })}

      {/* Central Hub */}
      <circle cx="50" cy="50" r="8" fill="currentColor" />
       <circle cx="50" cy="50" r="3" fill="hsl(var(--background))" stroke="none" />
    </svg>
  );
}

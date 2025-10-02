import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function SudharshanaChakraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      className={cn(
        "text-accent drop-shadow-[0_0_5px_hsl(var(--accent))] filter",
        props.className
      )}
      {...props}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g strokeWidth="1" filter="url(#glow)">
        {/* Outer rim with script */}
        <circle cx="100" cy="100" r="95" />
        <circle cx="100" cy="100" r="85" />

        {/* Script placeholders */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <path
                d="M100 5 Q 102 7, 100 9 M 98 6 L 102 8"
                transform="translate(0 -90) scale(0.5)"
                strokeWidth="2"
              />
            </g>
          );
        })}

        {/* 12 Outer pointed petals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <path d="M100 15 C 95 22, 105 22, 100 15 Z" />
              <path d="M100 15 L 96 12 M100 15 L 104 12" />
            </g>
          );
        })}

        {/* 12 Main spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <path d="M100,56 C 100,56 100,83 100,83" />
              <path d="M100,83 C 96,83 95,80 95,78 L 95,58" />
              <path d="M100,83 C 104,83 105,80 105,78 L 105,58" />
              <path d="M95,70 C 97,72 103,72 105,70" />
            </g>
          );
        })}

        {/* Inner 8-petal lotus */}
        <circle cx="100" cy="100" r="55" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <path d="M100,45 C 90,60 110,60 100,45 Z" />
              <path d="M100,47 C 95,55 105,55 100,47" />
              <circle cx="96" cy="62" r="1" />
              <circle cx="104" cy="62" r="1" />
            </g>
          );
        })}

        {/* Central star and details */}
        <circle cx="100" cy="100" r="28" />
        <circle cx="100" cy="100" r="22" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          const x1 = 100 + 15 * Math.cos((angle * Math.PI) / 180);
          const y1 = 100 + 15 * Math.sin((angle * Math.PI) / 180);
          const x2 = 100 + 22 * Math.cos(((angle + 15) * Math.PI) / 180);
          const y2 = 100 + 22 * Math.sin(((angle + 15) * Math.PI) / 180);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        <circle cx="100" cy="100" r="15" />
         {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
           const r = 11;
           const cx = 100 + r * Math.cos(angle * Math.PI / 180);
           const cy = 100 + r * Math.sin(angle * Math.PI / 180);
          return <circle key={i} cx={cx} cy={cy} r="0.7" />;
        })}
      </g>
    </svg>
  );
}

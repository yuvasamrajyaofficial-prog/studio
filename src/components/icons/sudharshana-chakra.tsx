import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function SudharshanaChakraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-accent drop-shadow-[0_0_3px_hsl(var(--accent))]", props.className)}
      {...props}
    >
      {/* Outer rim */}
      <circle cx="50" cy="50" r="48" strokeWidth="4" />
      <circle cx="50" cy="50" r="42" />

      {/* Decorative dots on the rim */}
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i * 360) / 48;
        const x = 50 + 45 * Math.cos((angle * Math.PI) / 180);
        const y = 50 + 45 * Math.sin((angle * Math.PI) / 180);
        return <circle key={i} cx={x} cy={y} r="0.75" fill="currentColor" stroke="none" />;
      })}

      {/* 8 Main Spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        const x2 = 50 + 34 * Math.cos((angle * Math.PI) / 180);
        const y2 = 50 + 34 * Math.sin((angle * Math.PI) / 180);
        return <line key={i} x1="50" y1="50" x2={x2} y2={y2} strokeWidth="3" />;
      })}

      {/* Central Hub */}
      <circle cx="50" cy="50" r="16" />
      <circle cx="50" cy="50" r="12" strokeWidth="1" />
      <circle cx="50" cy="50" r="8" fill="currentColor" />

      {/* Decorative circle on spokes */}
      <circle cx="50" cy="50" r="25" strokeWidth="1.5" />
    </svg>
  );
}

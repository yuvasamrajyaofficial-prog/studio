import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function ConstellationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-accent drop-shadow-[0_0_3px_hsl(var(--accent))]", props.className)}
      {...props}
    >
      <path d="M4.3 8.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M10.3 6.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M19.3 12.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M13.3 20.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="m5.6 7-3.7-1.4" />
      <path d="m10.3 6.3 7.7 2.7" />
      <path d="m19.3 12.3-5 5.5" />
    </svg>
  );
}

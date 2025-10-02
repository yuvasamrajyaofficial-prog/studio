import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function TulasiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-accent/80", props.className)}
      {...props}
    >
      <path d="M12 22V12" />
      <path d="M12 12C10 11.5 8 10 8 7c0-2.5 2-4 4-4s4 1.5 4 4c0 3-2 4.5-4 5z" />
      <path d="M8.5 11.5C7 11 5.5 9.5 5.5 7.5c0-2 1.5-3.5 3-3.5" />
      <path d="M15.5 11.5c1.5-.5 3-2 3-4s-1.5-3.5-3-3.5" />
      <path d="M12 16a4 4 0 0 0 4-4h-8a4 4 0 0 0 4 4z" />
    </svg>
  );
}

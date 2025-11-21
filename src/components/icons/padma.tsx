import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function PadmaIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 2C8.7 2 6 4.7 6 8c0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.3-2.7-6-6-6z" />
      <path d="M12 14c-3.9 0-7 2.2-7 5v1h14v-1c0-2.8-3.1-5-7-5z" />
      <path d="M2.5 10.5c-1.2 1.2-2 2.8-2 4.5h1" />
      <path d="M21.5 10.5c1.2 1.2 2 2.8 2 4.5h-1" />
      <path d="M6.5 6.5c-2.3 2.3-3.5 5.3-3.5 8.5h1" />
      <path d="M17.5 6.5c2.3 2.3 3.5 5.3 3.5 8.5h-1" />
      <path d="M12 22s-4-2-4-5" />
      <path d="M12 22s4-2 4-5" />
    </svg>
  );
}

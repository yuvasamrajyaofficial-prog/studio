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
      className={cn(
        "text-accent drop-shadow-[0_0_3px_hsl(var(--accent))]",
        props.className
      )}
      {...props}
    >
      <path d="M4 15c-1.5-1.5-1.5-3.5 0-5 .83-.83 2.17-.83 3 0 .38.38.62.88.62 1.42V15l-3.62-3.58" />
      <path d="M10 15c-1.5-1.5-1.5-3.5 0-5 .83-.83 2.17-.83 3 0 .38.38.62.88.62 1.42V15l-3.62-3.58" />
      <path d="M16 15c-1.5-1.5-1.5-3.5 0-5 .83-.83 2.17-.83 3 0 .38.38.62.88.62 1.42V15l-3.62-3.58" />
      <path d="M5.5 16.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5" />
      <path d="M12 21c-1.8 0-3.4-.8-4.5-2" />
      <path d="M4.1 11.5c1.1-1.1 2.8-1.5 4.4-1.5h1.2c1.6 0 3.3.4 4.4 1.5" />
      <path d="M19.9 11.5c.6-.6 1-1.4 1-2.3 0-1.8-1.5-3.2-3.3-3.2-1.2 0-2.3.6-2.9 1.5" />
    </svg>
  );
}

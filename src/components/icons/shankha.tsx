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
        "text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]",
        props.className
      )}
      {...props}
    >
      <path d="M7.3 7.3C9.1 5.5 11.5 4.8 13.6 5.5c1.8.6 3.3 2.1 3.9 3.9.7 2.1.1 4.5-1.7 6.3-1.4 1.4-3.3 2.1-5.2 2.1" />
      <path d="M14.6 5.2c1.8.6 3.3 2.1 3.9 3.9.7 2.1.1 4.5-1.7 6.3l-2.8 2.8" />
      <path d="M20 15.3c1 2.2-2.1 4.3-2.1 4.3" />
      <path d="m5.2 14.6-2.8 2.8" />
      <path d="M4 20.9c2.2 1 4.3-2.1 4.3-2.1" />
      <path d="M11 20.3c-2 .3-4.2-1-5.2-3" />
      <path d="M16.8 3.7c.3 2-1 4.2-3 5.2" />
    </svg>
  );
}

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
      className={cn(
        "text-accent drop-shadow-[0_0_3px_hsl(var(--accent))]",
        props.className
      )}
      {...props}
    >
      <path d="M12 2c-2.8 0-5.4 1.1-7.1 3.1-1.7 2-2.3 4.6-1.6 7.1.7 2.5 2.5 4.6 4.9 5.8 2.4 1.2 5.2 1.2 7.6 0 2.4-1.2 4.2-3.3 4.9-5.8.7-2.5.1-5.1-1.6-7.1C17.4 3.1 14.8 2 12 2Z" />
      <path d="M12 12c-1.7 0-3-1.8-3-4s1.3-4 3-4 3 1.8 3 4-1.3 4-3 4Z" />
      <path d="M12 22c-2.8 0-5.4-1.1-7.1-3.1C3.2 16.9 2.6 14.3 3.3 12h17.4c.7 2.3.1 4.9-1.6 6.9-1.7 2-4.3 3.1-7.1 3.1Z" />
    </svg>
  );
}

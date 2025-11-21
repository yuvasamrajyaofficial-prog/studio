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
        "text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]",
        props.className
      )}
      {...props}
    >
      <path d="M12 2c-.93 0-1.8.2-2.6.6C5.5 4.3 3 8.2 3 12.3c0 1.9.6 3.7 1.7 5.1L3 22l5.1-1.7c1.4 1.1 3.2 1.7 5.1 1.7 4.1 0 7.6-2.5 9.3-6.3.4-.8.6-1.7.6-2.6 0-4.1-2.5-7.6-6.3-9.3-.8-.4-1.7-.6-2.6-.6Z" />
      <path d="M12 11c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3Z" />
      <path d="M13.8 2.8C12.3 2.1 10.3 3.3 9.2 4.8" />
      <path d="M10.2 21.2c1.5.7 3.5-.5 4.6-2" />
      <path d="M2.8 13.8c-.7-1.5.5-3.5 2-4.6" />
      <path d="M21.2 10.2c.7 1.5-.5 3.5-2 4.6" />
    </svg>
  );
}

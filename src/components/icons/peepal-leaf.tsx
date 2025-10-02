import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function PeepalLeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-accent", props.className)}
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10z" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 2C12 2 8 7 8 12c0 5 4 10 4 10s4-5 4-10C16 7 12 2 12 2z" />
      <path d="M12 2v20" />
      <path d="M8 12H4" />
      <path d="M16 12h4" />
      <path d="M9.5 7.5l-3 3" />
      <path d="M14.5 7.5l3 3" />
      <path d="M9.5 16.5l-3-3" />
      <path d="M14.5 16.5l3-3" />
    </svg>
  );
}

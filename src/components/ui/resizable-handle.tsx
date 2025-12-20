'use client';

import { GripVertical } from 'lucide-react';
import * as ResizablePrimitive from 'react-resizable-panels';
import { cn } from '@/lib/utils';

export const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[vertical]:h-px data-[vertical]:w-full data-[vertical]:after:left-0 data-[vertical]:after:h-1 data-[vertical]:after:w-full data-[vertical]:after:-translate-y-1/2 data-[vertical]:after:translate-x-0 [&[data-vertical]>div]:rotate-90',
      'bg-white/10 hover:bg-white/20 transition-colors duration-300',
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-8 w-4 items-center justify-center rounded-sm border bg-background/50 backdrop-blur-sm border-white/10">
        <GripVertical className="h-3 w-3 text-white/50" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

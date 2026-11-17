import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface OsWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
}

export function OsWindow({ title, children, className, showControls = false }: OsWindowProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border',
        'shadow-[0_0_0_1px_rgba(0,245,255,0.05),0_20px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(0,245,255,0.03)]',
        className
      )}
    >
      <div className="bg-muted border-b border-border px-3 py-[7px] flex items-center gap-2 select-none cursor-default">
        <span className="w-2.5 h-2.5 border border-[#FF5F57] block shrink-0" />
        <span className="w-2.5 h-2.5 border border-[#FFBD2E] block shrink-0" />
        <span className="w-2.5 h-2.5 border border-[#28C940] block shrink-0" />
        <span className="font-terminal text-[1rem] text-muted-foreground ml-1 flex-1 tracking-[0.05em] truncate">
          {title}
        </span>
        {showControls && (
          <div className="flex gap-2 ml-2">
            <span className="font-pixel text-[0.35rem] text-muted-foreground hover:text-foreground cursor-pointer px-0.5">[_]</span>
            <span className="font-pixel text-[0.35rem] text-muted-foreground hover:text-foreground cursor-pointer px-0.5">[□]</span>
            <span className="font-pixel text-[0.35rem] text-muted-foreground hover:text-foreground cursor-pointer px-0.5">[✕]</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

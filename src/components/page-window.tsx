import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { OsWindow } from './os-window';

interface PageWindowProps {
  title: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
  className?: string;
}

const WIDTH_CLASS = {
  sm: 'max-w-3xl',   // 768px  — article reading pages
  md: 'max-w-4xl',   // 896px  — list pages
  lg: 'max-w-5xl',   // 1024px — wide list pages
};

export function PageWindow({ title, children, maxWidth = 'md', className }: PageWindowProps) {
  return (
    <div className={cn('mx-auto px-4 py-6', WIDTH_CLASS[maxWidth], className)}>
      <OsWindow title={title} showControls>
        {children}
      </OsWindow>
    </div>
  );
}

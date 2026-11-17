'use client';

import { useEffect, useRef, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocNavProps {
  toc: TocItem[];
}

export function TocNav({ toc }: TocNavProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingIds = toc.map(item => item.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost heading that is intersecting
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const first = visible[0];
        if (first) {
          setActiveId(first.target.id);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );

    headingIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [toc]);

  return (
    <nav className="flex flex-col gap-1 text-sm border-l border-border pl-3">
      {toc.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={[
              'block py-0.5 text-[0.75rem] font-mono transition-colors',
              item.level === 1 ? 'font-bold' : '',
              item.level === 2 ? 'pl-2' : '',
              item.level === 3 ? 'pl-4 opacity-75' : '',
              isActive
                ? 'text-neon-cyan'
                : 'text-muted-foreground hover:text-neon-cyan',
            ].join(' ')}
          >
            {item.level >= 2 && (
              <span className={`mr-1 ${isActive ? 'text-neon-cyan/50' : 'text-border'}`}>
                {'#'.repeat(item.level)}
              </span>
            )}
            {item.text}
          </a>
        );
      })}
    </nav>
  );
}

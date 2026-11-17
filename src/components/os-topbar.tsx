'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { siteHost } from '@/config/site';

const NAV_ITEMS = [
  { href: '/blog',      label: 'Blog'      },
  { href: '/leetcode',  label: 'LeetCode'  },
  { href: '/projects',  label: 'Projects'  },
  { href: '/about',     label: 'About'     },
  { href: '/contact',   label: 'Contact'   },
];

export function OsTopbar() {
  const pathname = usePathname();
  const [time,   setTime]   = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('zh-TW', {
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-7 z-50 bg-card/97 border-b border-border shadow-[0_1px_20px_rgba(0,245,255,0.05)]">
        <div className="max-w-5xl mx-auto h-full flex items-center">

          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'px-3.5 h-full flex items-center shrink-0',
              'border-r border-border',
              'font-pixel text-[0.45rem] text-neon-cyan',
              '[text-shadow:0_0_8px_var(--neon-cyan)] tracking-[0.05em]',
              'hover:bg-white/5 transition-colors'
            )}
          >
            {siteHost}
          </Link>

          {/* Nav items — desktop only */}
          <div className="hidden sm:flex h-full">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[0.7rem] px-3 h-full flex items-center transition-colors whitespace-nowrap',
                  pathname.startsWith(item.href)
                    ? 'text-foreground bg-white/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: status dot + clock */}
          <div className="ml-auto flex items-center h-full border-l border-border px-3 gap-3 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_6px_var(--neon-green)]" />
            <span className="hidden sm:inline font-terminal text-[0.95rem] text-neon-cyan min-w-[72px]">{time}</span>
            {/* Hamburger — mobile only */}
            <button
              className="sm:hidden font-terminal text-[0.9rem] text-muted-foreground hover:text-foreground transition-colors leading-none w-5 text-center"
              onClick={() => setIsOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="sm:hidden fixed top-7 left-0 right-0 z-40 bg-os-deep/98 border-b border-border">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center px-5 py-3 text-sm border-b border-border/50 transition-colors',
                pathname.startsWith(item.href)
                  ? 'text-neon-cyan bg-neon-cyan/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

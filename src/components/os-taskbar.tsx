import Link from 'next/link';
import { siteConfig, shellPrompt } from '@/config/site';

export function OsTaskbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-6 bg-card/98 border-t border-border">
      <div className="max-w-5xl mx-auto h-full flex items-center px-3 gap-3 font-terminal text-[0.9rem]">
        <span className="flex items-center gap-1.5 text-neon-green shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_5px_var(--neon-green)]" />
          ONLINE
        </span>
        <span className="text-border shrink-0">·</span>
        <span className="text-muted-foreground shrink-0">{shellPrompt}</span>
        <span className="text-border shrink-0">·</span>
        <Link href="/changelog" className="text-neon-purple shrink-0 hover:text-neon-purple/70 transition-colors">
          {siteConfig.version}
        </Link>
        <span className="ml-auto text-muted-foreground/70 shrink-0 hidden sm:block">
          dark-os theme
        </span>
      </div>
    </div>
  );
}

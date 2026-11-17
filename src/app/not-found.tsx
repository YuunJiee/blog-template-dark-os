import { shellPrompt } from '@/config/site';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg font-mono text-sm space-y-2">

        <div>
          <span className="text-neon-green">{shellPrompt}</span>
          <span className="text-muted-foreground">:~$ </span>
          <span className="text-foreground">cd /void/page</span>
        </div>

        <div className="text-neon-pink">
          bash: /void/page: No such file or directory
        </div>

        <div className="text-border">&nbsp;</div>

        <div>
          <span className="text-neon-green">{shellPrompt}</span>
          <span className="text-muted-foreground">:~$ </span>
          <span className="text-foreground">cat /error.log</span>
        </div>

        <div className="border border-border bg-os-deep p-4 space-y-0.5 text-xs">
          <div className="text-border">---</div>
          <div>
            <span className="text-neon-purple">status:  </span>
            <span className="text-neon-pink font-pixel text-[0.7rem]">404</span>
          </div>
          <div>
            <span className="text-neon-purple">message: </span>
            <span className="text-foreground">&quot;Page not found&quot;</span>
          </div>
          <div>
            <span className="text-neon-purple">hint:    </span>
            <span className="text-muted-foreground">The page you requested does not exist or has been moved.</span>
          </div>
          <div className="text-border">---</div>
        </div>

        <div className="text-border">&nbsp;</div>

        <div>
          <span className="text-neon-green">{shellPrompt}</span>
          <span className="text-muted-foreground">:~$ </span>
          <span className="text-foreground">cd ~</span>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 border border-neon-cyan text-neon-cyan text-xs hover:bg-neon-cyan/5 transition-colors"
          >
            <span>$</span> ./go_home
          </Link>
        </div>

      </div>
    </div>
  );
}

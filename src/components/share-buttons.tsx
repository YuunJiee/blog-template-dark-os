'use client';

import { useState } from 'react';
import { Link2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareX = () => {
    const url = `https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="text-muted-foreground">share</span>
      <span className="text-border">›</span>
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 px-2.5 py-1 border border-border hover:border-neon-cyan/50 hover:text-neon-cyan text-muted-foreground transition-colors"
      >
        <Link2 className="w-3 h-3" />
        {copied ? 'copied!' : 'copy link'}
      </button>
      <button
        onClick={shareX}
        className="flex items-center gap-1.5 px-2.5 py-1 border border-border hover:border-neon-purple/50 hover:text-neon-purple text-muted-foreground transition-colors"
      >
        <span className="font-bold leading-none">𝕏</span>
        post
      </button>
    </div>
  );
}

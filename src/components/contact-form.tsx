'use client';

import { useState } from 'react';
import { CONTACT_MESSAGE_MAX_LENGTH } from '@/config/constants';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const INPUT_CLS =
  'bg-transparent border-0 border-b border-border focus:border-neon-cyan outline-none ' +
  'text-foreground placeholder:text-border flex-1 py-1 text-sm font-mono transition-colors';

export function ContactForm() {
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, message }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        toast.error(data.error ?? '傳送失敗，請稍後再試。');
        return;
      }
      setSent(true);
      toast.success('訊息已成功送出！');
    } catch {
      toast.error('網路錯誤，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="font-mono text-sm space-y-3 py-8">
        <div className="text-xs text-muted-foreground">$ ./submit --send</div>
        <div className="text-neon-green">✓ message delivered successfully</div>
        <div className="text-muted-foreground">感謝你的回饋，我會盡快回覆。</div>
        <div className="mt-6">
          <button
            onClick={() => { setSent(false); setEmail(''); setMessage(''); }}
            className="text-xs text-muted-foreground hover:text-neon-cyan transition-colors font-mono"
          >
            $ ./contact --new
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="font-mono text-sm space-y-5">

      {/* Email */}
      <div className="flex items-center gap-2">
        <span className="text-neon-cyan shrink-0 select-none">$</span>
        <span className="text-muted-foreground shrink-0 w-32 text-xs">email (required):</span>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={INPUT_CLS}
        />
      </div>

      {/* Message */}
      <div>
        <div className="text-xs text-muted-foreground mb-2">
          <span className="text-neon-cyan">$</span> message (required):
        </div>
        <div className="border border-border focus-within:border-neon-cyan bg-os-deep transition-colors p-3">
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="想說什麼都可以，包括 bug 回報、功能建議或任何想法。"
            required
            minLength={10}
            maxLength={CONTACT_MESSAGE_MAX_LENGTH}
            rows={5}
            className="w-full bg-transparent border-0 outline-none text-foreground placeholder:text-border resize-none text-sm font-mono"
          />
          <div className={cn(
            'text-right text-xs mt-1',
            message.length > 1800 ? 'text-neon-pink' : 'text-border',
          )}>
            {message.length}/{CONTACT_MESSAGE_MAX_LENGTH}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 border border-neon-green text-neon-green text-xs hover:bg-neon-green/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-mono"
      >
        {loading ? (
          <><Loader2 className="w-3 h-3 animate-spin" /> transmitting...</>
        ) : (
          <><span>$</span> ./submit --send</>
        )}
      </button>

    </form>
  );
}

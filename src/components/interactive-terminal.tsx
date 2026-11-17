'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { siteConfig, shellPrompt } from '@/config/site';
import { PostType } from '@/config/constants';

type Line = { type: 'cmd' | 'out' | 'error' | 'blank'; text: string };
type PostItem = { title: string; id: string; type: string };
type CommandResult = { lines: Line[]; navigate?: string; clear?: true };
type CommandDef = {
  test: (lo: string) => boolean;
  run: (cmd: string, posts: PostItem[]) => CommandResult;
};

const out   = (text: string): Line => ({ type: 'out',   text });
const err   = (text: string): Line => ({ type: 'error', text });
const cmdln = (text: string): Line => ({ type: 'cmd',   text });

const COMMANDS: CommandDef[] = [
  {
    test: lo => lo === 'help',
    run:  cmd => ({ lines: [
      cmdln(cmd),
      out('available commands:'),
      out('  help              show this message'),
      out('  whoami            who runs this blog'),
      out('  ls                list recent posts'),
      out('  cat status.txt    current status'),
      out('  cd blog           navigate to /blog'),
      out('  cd leetcode       navigate to /leetcode'),
      out('  clear             clear terminal'),
    ]}),
  },
  {
    test: lo => lo === 'whoami',
    run:  cmd => ({ lines: [
      cmdln(cmd),
      ...siteConfig.bio.map(line => out(`→ ${line}`)),
    ]}),
  },
  {
    test: lo => lo === 'ls' || lo === 'ls -la' || lo === 'ls posts',
    run:  (cmd, posts) => ({ lines: [
      cmdln(cmd),
      ...posts.map(p => out(`  ${p.type === PostType.LEETCODE ? '[LC]  ' : '[POST]'} ${p.title}`)),
    ]}),
  },
  {
    test: lo => lo === 'cat current_status.txt' || lo === 'cat status.txt',
    run:  cmd => ({ lines: [
      cmdln(cmd),
      out(siteConfig.currentStatus),
    ]}),
  },
  {
    test: lo => lo === 'pwd',
    run:  cmd => ({ lines: [cmdln(cmd), out(`/home/${siteConfig.author.handle}/blog`)] }),
  },
  {
    test: lo => lo === 'cd blog' || lo === 'cd /blog',
    run:  cmd => ({ lines: [cmdln(cmd), out('→ navigating to /blog...')], navigate: '/blog' }),
  },
  {
    test: lo => lo === 'cd leetcode' || lo === 'cd /leetcode',
    run:  cmd => ({ lines: [cmdln(cmd), out('→ navigating to /leetcode...')], navigate: '/leetcode' }),
  },
  {
    test: lo => lo === 'clear',
    run:  ()  => ({ lines: [], clear: true }),
  },
  {
    test: lo => lo === 'sudo rm -rf /' || lo === 'sudo rm -rf /*' || lo === 'rm -rf /',
    run:  cmd => ({ lines: [cmdln(cmd), err('Permission denied. Nice try.')] }),
  },
  {
    test: lo => lo === 'hack' || lo === 'matrix',
    run:  cmd => ({ lines: [
      cmdln(cmd),
      out('INITIATING SEQUENCE...'),
      out('[████████████████████] 100%'),
      out('>>> ACCESS GRANTED <<<'),
      out(`welcome back, ${siteConfig.author.handle}.`),
    ]}),
  },
  {
    test: lo => lo.startsWith('cd '),
    run:  cmd => ({ lines: [cmdln(cmd), err(`cd: ${cmd.slice(3)}: no such directory`)] }),
  },
];

const PROMPT = shellPrompt;

const INIT_HISTORY: Line[] = [
  { type: 'cmd',   text: 'whoami' },
  ...siteConfig.bio.map(line => ({ type: 'out' as const, text: `→ ${line}` })),
  { type: 'blank', text: '' },
  { type: 'cmd',   text: 'cat current_status.txt' },
  { type: 'out',   text: siteConfig.currentStatus },
  { type: 'blank', text: '' },
];

interface InteractiveTerminalProps {
  recentPosts: PostItem[];
}

export function InteractiveTerminal({ recentPosts }: InteractiveTerminalProps) {
  const router       = useRouter();
  const inputRef     = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [value,   setValue]   = useState('');
  const [history, setHistory] = useState<Line[]>(INIT_HISTORY);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const push = (...lines: Line[]) =>
    setHistory(prev => [...prev, ...lines, { type: 'blank', text: '' }]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const lo = cmd.toLowerCase();

    const match  = COMMANDS.find(c => c.test(lo));
    const result = match
      ? match.run(cmd, recentPosts)
      : { lines: [cmdln(cmd), err(`command not found: ${cmd}  (try 'help')`)] };

    if (result.clear) {
      setHistory([]);
    } else {
      push(...result.lines);
      if (result.navigate) setTimeout(() => router.push(result.navigate!), 500);
    }
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') runCommand(value);
    if (e.key === 'Tab')   e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className="px-4 py-3 bg-os-deep font-terminal text-[1rem] leading-[1.7] cursor-text h-[16rem] overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => {
        if (line.type === 'blank') return <p key={i} className="text-border select-none">&nbsp;</p>;
        if (line.type === 'cmd')   return (
          <p key={i}>
            <span className="text-neon-green">{PROMPT}</span>
            {' '}
            <span className="text-foreground">{line.text}</span>
          </p>
        );
        if (line.type === 'error') return <p key={i} className="text-neon-pink">{line.text}</p>;
        return <p key={i} className="text-neon-cyan">{line.text}</p>;
      })}

      <p className="flex items-center">
        <span className="text-neon-green shrink-0">{PROMPT}</span>
        <span className="ml-1 relative flex items-center flex-1">
          <span className="text-foreground whitespace-pre">{value}</span>
          <span className="inline-block w-[0.5em] h-[0.9em] bg-neon-green animate-os-blink align-text-bottom" />
          <input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 w-full opacity-0 cursor-text bg-transparent border-0 outline-none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </span>
      </p>
    </div>
  );
}

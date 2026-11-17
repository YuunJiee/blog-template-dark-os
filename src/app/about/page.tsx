import { PageWindow } from "@/components/page-window";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { techStack, timelineData, honors, INFO_ROWS, PALETTE_A, PALETTE_B, HASHES } from "@/data/about";

export const metadata = {
  title: "關於我",
  description: `認識 ${siteConfig.author.name}`,
};

const { github, linkedin, email } = siteConfig.author;
const links = [
  github   && { label: "git",  text: `github.com/${github}`,     href: `https://github.com/${github}` },
  linkedin && { label: "www",  text: `linkedin.com/${linkedin}`, href: `https://linkedin.com/${linkedin}` },
  email    && { label: "mail", text: email,                      href: `mailto:${email}` },
].filter((l): l is { label: string; text: string; href: string } => Boolean(l));

export default function AboutPage() {
  return (
    <PageWindow title="about.exe" maxWidth="md">
      <div className="p-6 font-mono text-sm space-y-8">

        {/* ── Neofetch: avatar + system info ── */}
        <div className="flex flex-col sm:flex-row gap-8 items-start">

          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="relative w-32 h-32 border-2 border-dashed border-neon-cyan">
              <Image
                src={siteConfig.author.avatar}
                alt={siteConfig.author.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <div className="flex gap-0.5">
              {PALETTE_A.map(c => (
                <div key={c} style={{ background: c }} className="w-6 h-4 border border-os-track" />
              ))}
            </div>
            <div className="flex gap-0.5">
              {PALETTE_B.map(c => (
                <div key={c} style={{ background: c }} className="w-6 h-4 border border-os-track" />
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-base mb-1">
              <span className="text-neon-green font-bold">{siteConfig.author.handle}</span>
              <span className="text-muted-foreground">@</span>
              <span className="text-neon-cyan font-bold">blog</span>
            </div>
            <div className="h-px bg-muted-foreground/30 mb-3 w-52" />
            <div className="space-y-0.5">
              {INFO_ROWS.map(([key, val]) => (
                <div key={key} className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-neon-cyan font-bold w-20 shrink-0">{key}</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-foreground">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Timeline as git log ── */}
        <div className="border-t border-border pt-6">
          <div className="text-xs text-muted-foreground mb-4">
            $ <span className="text-neon-cyan">git log</span> --all --oneline
          </div>
          <div className="space-y-2">
            {timelineData.map((item, i) => (
              <div key={i} className="group">
                <div className="flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm">
                  <span className="text-neon-pink font-mono">{HASHES[i] ?? "0000000"}</span>
                  <span className="text-muted-foreground">({item.date})</span>
                  <span className="text-foreground">{item.title}</span>
                </div>
                <p className="text-[0.7rem] text-muted-foreground/70 pl-16 mt-0.5 leading-relaxed hidden group-hover:block">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech stack as cat output ── */}
        <div className="border-t border-border pt-6">
          <div className="text-xs text-muted-foreground mb-4">
            $ <span className="text-neon-cyan">cat</span> ~/.config/tech_stack.conf
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {Object.entries(techStack).map(([category, skills]) => (
              <div key={category}>
                <div className="text-neon-purple text-xs mb-2 uppercase tracking-wider">[{category}]</div>
                <div className="space-y-1.5">
                  {skills.map(skill => {
                    const bars     = skill.level === 'proficient' ? 10 : skill.level === 'familiar' ? 7 : 4;
                    const dotColor = skill.level === 'proficient' ? 'text-neon-green'
                                   : skill.level === 'familiar'   ? 'text-neon-cyan'
                                   :                                'text-muted-foreground';
                    return (
                      <div key={skill.name} className="flex items-center gap-2 text-xs">
                        <span className={dotColor}>
                          {skill.level === 'proficient' ? '●' : skill.level === 'familiar' ? '◕' : '○'}
                        </span>
                        <span className="text-foreground w-28 shrink-0">{skill.name}</span>
                        <span className="text-neon-cyan tracking-tighter leading-none">{'█'.repeat(bars)}</span>
                        <span className="text-os-track tracking-tighter leading-none">{'█'.repeat(10 - bars)}</span>
                        <span className={`text-[0.6rem] ${dotColor}`}>{skill.level}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Honors ── */}
        {honors.length > 0 && (
        <div className="border-t border-border pt-6">
          <div className="text-xs text-muted-foreground mb-4">
            $ <span className="text-neon-cyan">cat</span> ~/honors.txt
          </div>
          <div className="space-y-1">
            {honors.map((h, i) => (
              <div key={i} className="flex gap-2 text-xs sm:text-sm">
                <span className="text-neon-yellow shrink-0">★</span>
                <span className="text-foreground">{h}</span>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* ── Contact ── */}
        <div className="border-t border-border pt-6 pb-2">
          <div className="text-xs text-muted-foreground mb-4">
            $ <span className="text-neon-cyan">whoami</span> --links
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map(({ label, text, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                <span className="text-neon-cyan">{label}</span>{' '}{text}
              </a>
            ))}
          </div>
        </div>

      </div>
    </PageWindow>
  );
}

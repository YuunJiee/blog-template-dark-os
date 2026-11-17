import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData, getHeatmapData, PostType } from '@/lib/posts';
import { getSortedProjectsData } from '@/lib/projects';
import { OsWindow } from '@/components/os-window';
import { PostHeatmap } from '@/components/post-heatmap';
import { InteractiveTerminal } from '@/components/interactive-terminal';
import { siteConfig } from '@/config/site';


type PostSummary = ReturnType<typeof getSortedPostsData>[number];

const INDICATOR_CLASSES: Record<string, string> = {
  cyan:   'bg-neon-cyan shadow-[0_0_6px_var(--neon-cyan)]',
  purple: 'bg-neon-purple shadow-[0_0_6px_var(--neon-purple)]',
  pink:   'bg-neon-pink shadow-[0_0_6px_var(--neon-pink)]',
  green:  'bg-neon-green shadow-[0_0_6px_var(--neon-green)]',
  yellow: 'bg-neon-yellow shadow-[0_0_6px_var(--neon-yellow)]',
};

function getIndicator(post: PostSummary): string {
  const tags = post.tags.map((t) => t.toLowerCase());
  if (post.type === PostType.LEETCODE) return 'pink';
  if (tags.some((t) => t.includes('oop'))) return 'purple';
  if (tags.some((t) => ['ai', 'ml', 'deep', 'transformer', 'neural', 'cnn'].some((k) => t.includes(k)))) return 'cyan';
  if (tags.some((t) => ['dev', 'docker', 'github', 'ci', 'deploy', 'runner'].some((k) => t.includes(k)))) return 'green';
  return 'yellow';
}

function getIcon(post: PostSummary): string {
  const tags = post.tags.map((t) => t.toLowerCase());
  if (post.type === PostType.LEETCODE) return '💻';
  if (tags.some((t) => t.includes('oop'))) return '📓';
  if (tags.some((t) => ['ai', 'ml', 'transformer', 'cnn'].some((k) => t.includes(k)))) return '🧠';
  if (tags.some((t) => ['docker', 'github', 'ci', 'deploy', 'runner'].some((k) => t.includes(k)))) return '⚡';
  return '📄';
}

function formatDate(dateStr: string) {
  return dateStr.slice(2); // 2025-04-12 → 25-04-12
}

const TAG_COLORS = [
  'border-neon-cyan text-neon-cyan',
  'border-neon-purple text-neon-purple',
  'border-neon-pink text-neon-pink',
  'border-neon-green text-neon-green',
];
const PROFILE_TAGS = siteConfig.profileTags.map((label, i) => ({
  label,
  cls: TAG_COLORS[i % TAG_COLORS.length],
}));

export default function HomePage() {
  const allPosts    = getSortedPostsData();
  const projects    = getSortedProjectsData();
  const heatmapData = getHeatmapData();

  const lcPosts   = allPosts.filter((p) => p.type === PostType.LEETCODE);
  const blogPosts = allPosts.filter((p) => p.type !== PostType.LEETCODE);
  const recent    = allPosts.slice(0, 5);

  const stats = [
    { num: String(blogPosts.length).padStart(2, '0'), label: 'Posts',    color: 'var(--neon-cyan)' },
    { num: String(lcPosts.length).padStart(2, '0'),   label: 'LC Solved', color: 'var(--neon-cyan)' },
    { num: String(projects.length).padStart(2, '0'),  label: 'Projects', color: 'var(--neon-purple)' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Main desktop layout */}
      <div className="flex gap-4 flex-wrap items-start pt-4 pb-6 max-[520px]:flex-col">

        {/* ── Profile Window ─────────────────────────────── */}
        <OsWindow title="user_profile.exe" className="w-full max-w-[360px] max-[820px]:max-w-full shrink-0">
          <div className="p-5">
            {/* Avatar + info */}
            <div className="flex gap-4 items-center mb-4">
              <div
                className="relative w-[72px] h-[72px] shrink-0
                  border border-neon-cyan bg-neon-cyan/5
                  flex items-center justify-center
                  shadow-[0_0_20px_rgba(0,245,255,0.15),inset_0_0_20px_rgba(0,245,255,0.03)]"
              >
                <Image
                  src={siteConfig.author.avatar}
                  alt={siteConfig.author.name}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
                <div className="absolute inset-[-4px] border border-dashed border-neon-cyan/30 animate-os-spin pointer-events-none" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-pixel text-[0.55rem] text-neon-cyan [text-shadow:0_0_8px_var(--neon-cyan)] mb-1.5 tracking-[0.05em]">
                  @{siteConfig.author.handle.toUpperCase()}
                </div>
                <p className="text-[0.8rem] text-muted-foreground leading-[1.7]">
                  {siteConfig.description}
                </p>
                <div className="mt-2 flex gap-1.5 flex-wrap">
                  {PROFILE_TAGS.map((tag) => (
                    <span
                      key={tag.label}
                      className={`font-terminal text-[0.85rem] px-2 py-px border tracking-[0.05em] ${tag.cls}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {stats.map((s) => (
                <div key={s.label} className="border border-border p-2.5 text-center bg-white/4">
                  <span
                    className="font-pixel text-[0.9rem] block mb-1"
                    style={{ color: s.color, textShadow: `0 0 10px ${s.color}` }}
                  >
                    {s.num}
                  </span>
                  <span className="text-[0.65rem] text-muted-foreground uppercase tracking-[0.06em]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>


          </div>
        </OsWindow>

        {/* ── Right column ───────────────────────────────── */}
        <div className="flex flex-col gap-4 flex-1 min-w-[280px] max-[820px]:min-w-0 max-[520px]:w-full">

          {/* Posts Window */}
          <OsWindow title="latest_posts.log" showControls>
            <div>
              {recent.map((post) => {
                const href = post.type === PostType.LEETCODE ? `/leetcode/${post.id}` : `/blog/${post.id}`;
                const cat  = post.type === PostType.LEETCODE ? 'LeetCode' : (post.tags[0] ?? 'Post');
                const ind  = getIndicator(post);

                return (
                  <Link
                    key={post.id}
                    href={href}
                    className="flex items-center gap-3 px-4 py-2.5 border-b border-border last:border-b-0
                      hover:bg-neon-cyan/4 transition-colors group"
                  >
                    <div className={`w-[3px] h-9 shrink-0 ${INDICATOR_CLASSES[ind]}`} />
                    <div className="text-[1.1rem] w-7 shrink-0 text-center leading-none">
                      {getIcon(post)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-terminal text-[0.78rem] text-muted-foreground tracking-[0.06em] uppercase truncate">
                        {cat}
                      </div>
                      <div className="text-[0.85rem] font-bold text-foreground truncate group-hover:text-neon-cyan transition-colors">
                        {post.title}
                      </div>
                    </div>
                    <div className="font-terminal text-[0.9rem] text-muted-foreground whitespace-nowrap max-[520px]:hidden">
                      {formatDate(post.date)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </OsWindow>

          {/* Terminal Window */}
          <OsWindow title="terminal — zsh">
            <InteractiveTerminal recentPosts={recent} />
          </OsWindow>

        </div>
      </div>

      {/* Heatmap */}
      <div className="pb-6">
        <OsWindow title="writing_activity.log">
          <PostHeatmap {...heatmapData} />
        </OsWindow>
      </div>
    </div>
  );
}

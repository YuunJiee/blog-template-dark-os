import Link from 'next/link';

interface SeriesPost {
  id: string;
  title: string;
}

interface SeriesNavProps {
  seriesName: string;
  posts: SeriesPost[];
  currentId: string;
}

export function SeriesNav({ seriesName, posts, currentId }: SeriesNavProps) {
  return (
    <div className="my-6 border border-neon-purple/30 bg-neon-purple/5 px-4 py-3 text-sm">
      <div className="font-pixel text-[0.4rem] text-neon-purple tracking-widest uppercase mb-3">
        series / {seriesName}
      </div>
      <ol className="flex flex-col gap-1.5">
        {posts.map((post, i) => {
          const isCurrent = post.id === currentId;
          return (
            <li key={post.id} className="flex items-baseline gap-2 font-mono text-xs">
              <span className="text-border shrink-0">{String(i + 1).padStart(2, '0')}.</span>
              {isCurrent ? (
                <span className="text-neon-cyan flex-1">{post.title}</span>
              ) : (
                <Link
                  href={`/blog/${post.id}`}
                  className="text-muted-foreground hover:text-neon-cyan transition-colors flex-1"
                >
                  {post.title}
                </Link>
              )}
              {isCurrent && (
                <span className="text-neon-cyan/40 shrink-0">← here</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

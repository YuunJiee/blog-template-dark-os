import Link from 'next/link';

interface RelatedPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary?: string;
  readingTime: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border not-prose">
      <h4 className="font-pixel text-[0.45rem] uppercase tracking-wider text-muted-foreground mb-4">
        related_posts
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group flex flex-col gap-2 p-3 border border-border hover:border-neon-cyan/40 hover:bg-neon-cyan/[0.03] transition-colors"
          >
            <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
            <span className="text-sm text-foreground group-hover:text-neon-cyan transition-colors line-clamp-2 leading-snug">
              {post.title}
            </span>
            {post.summary && (
              <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {post.summary}
              </span>
            )}
            <div className="flex flex-wrap gap-1 mt-auto pt-1">
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[0.65rem] font-mono text-neon-green/70 border border-neon-green/20 px-1">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

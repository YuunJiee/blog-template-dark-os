import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { PostData } from '@/lib/posts';

interface ArticleHeaderProps {
  post: PostData;
  tags: string[];
  /** Colour classes for the tag chips, e.g. 'text-neon-green border-neon-green/30'. */
  tagClassName: string;
  /** Optional row rendered above the title (e.g. LeetCode number + difficulty). */
  eyebrow?: ReactNode;
}

export function ArticleHeader({ post, tags, tagClassName, eyebrow }: ArticleHeaderProps) {
  return (
    <header className="mb-8 border-b border-border pb-6">
      {eyebrow}
      <h1 className="text-2xl font-bold text-foreground mb-3 leading-snug">
        {post.title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-terminal text-[0.9rem] text-muted-foreground mb-3">
        <span className="text-neon-yellow">{post.date}</span>
        <span className="text-border">·</span>
        <span>{post.readingTime}</span>
        {post.updated && (
          <>
            <span className="text-border">·</span>
            <span className="text-neon-purple">updated {post.updated}</span>
          </>
        )}
        {tags.length > 0 && (
          <>
            <span className="text-border">·</span>
            {tags.map(tag => (
              <span key={tag} className={cn('border px-1.5 text-[0.8rem]', tagClassName)}>
                {tag}
              </span>
            ))}
          </>
        )}
      </div>
      {post.summary && (
        <p className="text-muted-foreground text-sm leading-relaxed italic border-l-2 border-border pl-3">
          {post.summary}
        </p>
      )}
    </header>
  );
}

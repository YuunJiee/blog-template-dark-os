'use client';

import Link from 'next/link';
import { PaginationComponent } from '@/components/pagination';
import { cn } from '@/lib/utils';
import { BLOG_POSTS_PER_PAGE } from '@/config/constants';
import { type PostData } from '@/lib/posts';
import { useListFilters } from '@/hooks/use-list-filters';

type Category = {
  id: string;
  label: string;
};

interface BlogPostsProps {
  posts: PostData[];
  allTags: string[];
  categories: Category[];
}

export function BlogPosts({ posts, allTags, categories }: BlogPostsProps) {
  const {
    searchParamsHook,
    primaryValue: currentCategory,
    currentTags,
    currentPage,
    toggleTag,
    clearTags,
    clearAll: clearFilters,
    hasFilter,
  } = useListFilters({ basePath: '/blog', primaryKey: 'category' });

  const activeCategory = currentCategory || 'all';

  let filteredPosts = [...posts];
  if (activeCategory !== 'all') {
    filteredPosts = filteredPosts.filter(p => p.category === activeCategory);
  }
  if (currentTags.length > 0) {
    filteredPosts = filteredPosts.filter(p => p.tags.some((t: string) => currentTags.includes(t)));
  }

  const totalPages          = Math.ceil(filteredPosts.length / BLOG_POSTS_PER_PAGE);
  const postsForCurrentPage = filteredPosts.slice(
    (currentPage - 1) * BLOG_POSTS_PER_PAGE,
    currentPage * BLOG_POSTS_PER_PAGE,
  );

  const catLabel = activeCategory === 'all'
    ? 'all_posts'
    : (categories.find(c => c.id === activeCategory)?.id ?? activeCategory);

  return (
    <div>

      {/* ── Address / path bar ── */}
      <div className="border-b border-border px-4 py-2 bg-os-deep flex items-center gap-1.5 text-[0.65rem] font-mono">
        <span className="text-muted-foreground">~/</span>
        <span className="text-muted-foreground">blog</span>
        <span className="text-border">/</span>
        <span className="text-neon-cyan">{catLabel}</span>
        {currentTags.length > 0 && (
          <>
            <span className="text-border ml-1">· filter:</span>
            {currentTags.map(t => (
              <span key={t} className="text-neon-purple">{t}</span>
            ))}
          </>
        )}
        <span className="ml-auto text-border">{filteredPosts.length} file(s)</span>
        {hasFilter && (
          <button
            onClick={clearFilters}
            className="ml-2 text-neon-pink hover:text-neon-pink/80 transition-colors"
          >
            [clear]
          </button>
        )}
      </div>

      {/* ── Mobile: horizontal category tabs ── */}
      <div className="sm:hidden flex overflow-x-auto border-b border-border bg-os-sidebar">
        {categories.map(cat => {
          const active = activeCategory === cat.id;
          return (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.id}`}
              className={cn(
                'flex items-center gap-1 px-3 py-2 text-xs whitespace-nowrap border-r border-border shrink-0 transition-colors',
                active ? 'text-neon-cyan bg-neon-cyan/8' : 'text-muted-foreground',
              )}
            >
              <span className="text-[0.7rem]">{active ? '📂' : '📁'}</span>
              <span>{cat.id === 'all' ? 'all' : cat.id}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex min-h-[400px]">

        {/* ── Left: directory tree (desktop) ── */}
        <aside className="hidden sm:block w-44 shrink-0 border-r border-border bg-os-sidebar">
          <div className="p-2 space-y-0.5">

            <div className="text-[0.55rem] text-border uppercase tracking-wider px-2 py-1 font-pixel">
              DIRECTORIES
            </div>

            {categories.map(cat => {
              const active = activeCategory === cat.id;
              const name   = cat.id === 'all' ? 'all_posts/' : `${cat.id}/`;
              return (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.id}`}
                  className={cn(
                    'flex items-center gap-1.5 px-2 py-1 text-xs transition-colors rounded-sm',
                    active
                      ? 'bg-neon-cyan/8 text-neon-cyan'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span className="text-[0.75rem]">{active ? '📂' : '📁'}</span>
                  <span className="truncate font-mono">{name}</span>
                </Link>
              );
            })}

            {/* Tag filter */}
            <div className="mt-4 pt-3 border-t border-border">
              <div className="text-[0.55rem] text-border uppercase tracking-wider px-2 pb-1 font-pixel">
                FILTER
              </div>
              <div className="px-2 flex flex-wrap gap-1">
                {allTags.slice(0, 16).map(tag => {
                  const active = currentTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'text-[0.6rem] px-1 py-0.5 border transition-colors',
                        active
                          ? 'border-neon-cyan/50 text-neon-cyan bg-neon-cyan/5'
                          : 'border-border text-border hover:border-muted-foreground hover:text-muted-foreground',
                      )}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              {currentTags.length > 0 && (
                <button
                  onClick={clearTags}
                  className="text-[0.6rem] text-neon-pink px-2 mt-1.5 hover:underline"
                >
                  clear tags
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* ── Right: file list ── */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* Column headers */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_6rem_6rem] border-b border-border px-4 py-1.5 bg-os-deep">
            <span className="font-pixel text-[0.45rem] text-border uppercase tracking-wider">NAME</span>
            <span className="font-pixel text-[0.45rem] text-border uppercase tracking-wider text-right hidden sm:block">DATE</span>
            <span className="font-pixel text-[0.45rem] text-border uppercase tracking-wider text-right hidden sm:block">TAGS</span>
          </div>

          {/* Rows */}
          {postsForCurrentPage.length > 0 ? (
            <div>
              {postsForCurrentPage.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_6rem_6rem] items-center border-b border-border px-4 py-2.5 hover:bg-neon-cyan/3 group transition-colors"
                >
                  {/* Name + summary */}
                  <div className="flex items-start gap-2 min-w-0 pr-3">
                    <span className="text-muted-foreground text-[0.75rem] shrink-0 mt-0.5">📄</span>
                    <div className="min-w-0">
                      <div className="text-foreground text-sm truncate group-hover:text-neon-cyan transition-colors leading-snug">
                        {post.title}
                      </div>
                      {post.summary && (
                        <div className="text-[0.68rem] text-muted-foreground truncate mt-0.5 leading-relaxed">
                          {post.summary}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <span className="text-[0.68rem] text-muted-foreground font-mono text-right hidden sm:block whitespace-nowrap">
                    {post.date}
                  </span>

                  {/* Tags */}
                  <div className="hidden sm:flex justify-end gap-1 flex-wrap">
                    {post.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="text-[0.6rem] text-muted-foreground border border-border px-1 py-0.5 shrink-0"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center font-mono">
              <div className="text-muted-foreground text-sm">$ ls: no files found</div>
              <button
                onClick={clearFilters}
                className="mt-4 text-xs text-neon-cyan hover:underline"
              >
                $ cd ~/blog/all_posts
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-auto border-t border-border px-4 py-3">
              <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                basePath="/blog"
                searchParams={Object.fromEntries(searchParamsHook.entries())}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

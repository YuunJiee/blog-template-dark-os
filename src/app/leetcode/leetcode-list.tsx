'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PaginationComponent } from '@/components/pagination';
import { DIFFICULTY_CONFIG, DIFFICULTIES, type Difficulty, LC_POSTS_PER_PAGE } from '@/config/constants';
import { type PostData } from '@/lib/posts';
import { useListFilters } from '@/hooks/use-list-filters';

type StudyPlan = {
  key: string;
  name: string;
  description: string;
  total: number;
};

interface LeetCodeListProps {
  posts: PostData[];
  allTopicTags: string[];
  studyPlans: StudyPlan[];
  completedPerPlan: Record<string, number>;
  difficultyCounts: Record<string, number>;
}


export function LeetCodeList({
  posts,
  allTopicTags,
  studyPlans,
  completedPerPlan,
  difficultyCounts,
}: LeetCodeListProps) {
  const {
    searchParamsHook,
    primaryValue: selectedDifficulty,
    currentTags,
    currentPage,
    togglePrimary: toggleDifficulty,
    toggleTag,
    clearTags,
    clearAll,
    hasFilter,
  } = useListFilters({ basePath: '/leetcode', primaryKey: 'difficulty' });

  const filteredPosts = posts.filter(post => {
    if (selectedDifficulty && post.difficulty !== selectedDifficulty) return false;
    if (currentTags.length > 0 && !post.tags.some(t => currentTags.includes(t))) return false;
    return true;
  });

  const totalPages          = Math.ceil(filteredPosts.length / LC_POSTS_PER_PAGE);
  const postsForCurrentPage = filteredPosts.slice(
    (currentPage - 1) * LC_POSTS_PER_PAGE,
    currentPage * LC_POSTS_PER_PAGE,
  );

  return (
    <div>

      {/* ── Query bar ── */}
      <div className="border-b border-border px-4 py-2 bg-os-deep font-mono text-xs flex flex-wrap items-center gap-x-1 gap-y-0.5">
        <span className="text-muted-foreground">$</span>
        <span className="text-neon-cyan">SELECT</span>
        <span className="text-foreground">*</span>
        <span className="text-neon-cyan">FROM</span>
        <span className="text-foreground">problems_solved</span>
        {selectedDifficulty && (
          <>
            <span className="text-neon-cyan">WHERE</span>
            <span className="text-neon-yellow">difficulty=&apos;{selectedDifficulty}&apos;</span>
          </>
        )}
        {currentTags.length > 0 && (
          <>
            <span className="text-neon-cyan">{selectedDifficulty ? 'AND' : 'WHERE'}</span>
            <span className="text-neon-yellow">tag IN ({currentTags.map(t => `'${t}'`).join(', ')})</span>
          </>
        )}
        <span className="text-border">-- {filteredPosts.length} row(s)</span>
        {hasFilter && (
          <button onClick={clearAll} className="ml-2 text-neon-pink hover:underline">[reset]</button>
        )}
      </div>

      {/* ── Mobile: difficulty tabs ── */}
      <div className="sm:hidden flex overflow-x-auto border-b border-border bg-os-sidebar">
        <button
          onClick={clearAll}
          className={cn('px-3 py-2 text-xs whitespace-nowrap border-r border-border shrink-0 transition-colors',
            !selectedDifficulty ? 'text-neon-cyan bg-neon-cyan/8' : 'text-muted-foreground')}
        >ALL</button>
        {DIFFICULTIES.map(diff => (
          <button key={diff}
            onClick={() => toggleDifficulty(diff)}
            className={cn('px-3 py-2 text-xs whitespace-nowrap border-r border-border shrink-0 transition-colors',
              selectedDifficulty === diff
                ? `${DIFFICULTY_CONFIG[diff].color} bg-neon-cyan/5`
                : 'text-muted-foreground')}
          >{diff}</button>
        ))}
      </div>

      <div className="flex min-h-[400px]">

        {/* ── Left: filter panel (desktop) ── */}
        <aside className="hidden sm:block w-44 shrink-0 border-r border-border bg-os-sidebar p-2">

          {/* Stats */}
          <div className="text-[0.55rem] text-border uppercase tracking-wider px-2 py-1 font-pixel">STATS</div>
          <div className="px-2 mb-3 space-y-0.5 text-xs font-mono">
            <div className="text-foreground">{posts.length} solved</div>
            <div className="text-emerald-400">{difficultyCounts['Easy'] ?? 0} easy</div>
            <div className="text-amber-400">{difficultyCounts['Medium'] ?? 0} medium</div>
            <div className="text-rose-400">{difficultyCounts['Hard'] ?? 0} hard</div>
          </div>

          {/* Difficulty filter */}
          <div className="border-t border-border pt-2 mt-2">
            <div className="text-[0.55rem] text-border uppercase tracking-wider px-2 py-1 font-pixel">FILTER</div>
            <div className="space-y-0.5">
              <button
                onClick={clearAll}
                className={cn(
                  'flex items-center gap-1.5 px-2 py-1 text-xs w-full text-left transition-colors',
                  !selectedDifficulty ? 'text-neon-cyan' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span>{!selectedDifficulty ? '◉' : '○'}</span> ALL
              </button>
              {DIFFICULTIES.map(diff => {
                const active = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => toggleDifficulty(diff)}
                    className={cn(
                      'flex items-center gap-1.5 px-2 py-1 text-xs w-full text-left transition-colors',
                      active ? DIFFICULTY_CONFIG[diff as Difficulty]?.color : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <span>{active ? '◉' : '○'}</span> {diff.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic tags */}
          {allTopicTags.length > 0 && (
            <div className="border-t border-border pt-2 mt-2">
              <div className="text-[0.55rem] text-border uppercase tracking-wider px-2 py-1 font-pixel">TAGS</div>
              <div className="px-2 flex flex-wrap gap-1">
                {allTopicTags.slice(0, 14).map(tag => {
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
                  className="text-[0.6rem] text-neon-pink px-2 mt-1 hover:underline"
                >
                  clear tags
                </button>
              )}
            </div>
          )}

          {/* Study plans */}
          {studyPlans.length > 0 && (
            <div className="border-t border-border pt-2 mt-2">
              <div className="text-[0.55rem] text-border uppercase tracking-wider px-2 py-1 font-pixel">PLANS</div>
              <div className="px-2 space-y-3">
                {studyPlans.map(plan => {
                  const completed = completedPerPlan[plan.key] ?? 0;
                  const pct  = Math.round((completed / plan.total) * 100);
                  const bars = Math.round(pct / 10);
                  return (
                    <div key={plan.key} className="text-xs font-mono">
                      <div className="text-muted-foreground text-[0.65rem] mb-0.5">{plan.key}</div>
                      <div className="flex gap-0 items-center">
                        <span className="text-neon-cyan tracking-tighter">{'█'.repeat(bars)}</span>
                        <span className="text-os-track tracking-tighter">{'█'.repeat(10 - bars)}</span>
                      </div>
                      <div className="text-[0.6rem] text-border">{completed}/{plan.total} ({pct}%)</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* ── Right: problem list ── */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* Column headers */}
          <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[3.5rem_1fr_4rem_5.5rem] border-b border-border px-4 py-1.5 bg-os-deep">
            <span className="font-pixel text-[0.45rem] text-border uppercase">ID</span>
            <span className="font-pixel text-[0.45rem] text-border uppercase">TITLE</span>
            <span className="font-pixel text-[0.45rem] text-border uppercase text-center hidden sm:block">DIFF</span>
            <span className="font-pixel text-[0.45rem] text-border uppercase text-right hidden sm:block">DATE</span>
          </div>

          {/* Problem rows */}
          {postsForCurrentPage.length > 0 ? (
            <div>
              {postsForCurrentPage.map(post => {
                const diff      = post.difficulty;
                const color     = diff ? (DIFFICULTY_CONFIG[diff as Difficulty]?.color ?? 'text-muted-foreground') : 'text-muted-foreground';
                const code      = diff ? (DIFFICULTY_CONFIG[diff as Difficulty]?.code ?? '---') : '---';
                const topicTags = post.tags.filter(t => t !== 'LeetCode');
                return (
                  <Link
                    key={post.id}
                    href={`/leetcode/${post.id}`}
                    className="grid grid-cols-[3rem_1fr] sm:grid-cols-[3.5rem_1fr_4rem_5.5rem] items-center border-b border-border px-4 py-2.5 hover:bg-neon-cyan/3 group transition-colors"
                  >
                    <span className="text-muted-foreground text-xs font-mono">
                      {post.leetcode_id ? `#${post.leetcode_id}` : '—'}
                    </span>
                    <div className="min-w-0 pr-3">
                      <div className="text-foreground text-sm truncate group-hover:text-neon-cyan transition-colors">
                        {post.title}
                      </div>
                      {topicTags.length > 0 && (
                        <div className="flex gap-1 mt-0.5 flex-wrap">
                          {topicTags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[0.6rem] text-muted-foreground border border-border px-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className={cn('text-xs font-mono font-bold text-center hidden sm:block', color)}>
                      {code}
                    </span>
                    <span className="text-[0.68rem] text-muted-foreground font-mono text-right hidden sm:block whitespace-nowrap">
                      {post.date}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 font-mono text-center">
              <div className="text-muted-foreground text-sm">$ query: 0 rows returned</div>
              <button onClick={clearAll} className="mt-4 text-xs text-neon-cyan hover:underline">
                $ SELECT * FROM problems_solved
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-auto border-t border-border px-4 py-3">
              <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                basePath="/leetcode"
                searchParams={Object.fromEntries(searchParamsHook.entries())}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

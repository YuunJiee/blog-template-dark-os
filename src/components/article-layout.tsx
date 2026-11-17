import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import parse, { Element, domToReact, DOMNode } from 'html-react-parser';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { PageWindow } from '@/components/page-window';
import { Comments } from '@/components/comments';
import { CopyCodeListener } from '@/components/copy-code-listener';
import { TocNav } from '@/components/toc-nav';
import { ReadingProgressBar } from '@/components/reading-progress-bar';
import { ShareButtons } from '@/components/share-buttons';
// RelatedPosts is rendered as a ReactNode prop (server-composed in the page)

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface AdjacentPost {
  id: string;
  title: string;
}

export interface ArticleLayoutProps {
  windowTitle: string;
  parentHref: string;
  parentLabel: string;
  header: React.ReactNode;
  contentHtml: string;
  postTitle?: string;
  seriesNav?: React.ReactNode;
  relatedPosts?: React.ReactNode;
  nextPost?: { url: string; title: string } | null;
  adjacentPrev?: AdjacentPost | null;
  adjacentNext?: AdjacentPost | null;
  adjacentHrefPrefix: string;
  toc?: TocItem[];
}

export function ArticleLayout({
  windowTitle,
  parentHref,
  parentLabel,
  header,
  contentHtml,
  postTitle,
  seriesNav,
  relatedPosts,
  nextPost,
  adjacentPrev,
  adjacentNext,
  adjacentHrefPrefix,
  toc,
}: ArticleLayoutProps) {
  return (
    <PageWindow title={windowTitle} maxWidth={toc && toc.length > 0 ? 'md' : 'sm'}>
      <ReadingProgressBar />

      {/* File tab bar */}
      <div className="flex items-center border-b border-border bg-os-deep overflow-x-auto">
        <div className="flex items-center gap-2 px-4 py-2 bg-muted border-r border-border text-xs font-mono text-foreground shrink-0">
          <span className="text-muted-foreground text-[0.75rem]">📄</span>
          <span>{windowTitle}</span>
          <span className="text-border ml-1 cursor-default">×</span>
        </div>
        <div className="px-4 py-2 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
          <Link href={parentHref} className="hover:text-neon-cyan transition-colors">{parentLabel}</Link>
          <span className="text-border">›</span>
          <span className="text-foreground truncate max-w-[180px]">{windowTitle}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">

        {/* Main article */}
        <div className="flex-1 min-w-0 p-6 lg:p-8">
          <article>
            <CopyCodeListener />

            {header}
            {seriesNav}

            <div className="manual-prose code-editor-prose">
              {parse(contentHtml, {
                replace: (domNode) => {
                  if (domNode instanceof Element && domNode.name === 'img') {
                    const { src, alt, class: className } = domNode.attribs;
                    return <ImageWithFallback src={src} alt={alt} className={className} />;
                  }
                  if (domNode instanceof Element && domNode.name === 'table') {
                    return (
                      <div className="overflow-x-auto my-6">
                        <table className="w-full border-collapse text-sm">
                          {domToReact(domNode.children as DOMNode[])}
                        </table>
                      </div>
                    );
                  }
                  if (domNode instanceof Element && domNode.name === 'pre') {
                    const codeChild = domNode.children.find(
                      (c): c is Element => c instanceof Element && c.name === 'code'
                    );
                    const lang = codeChild?.attribs?.class
                      ?.split(' ')
                      .find((c) => c.startsWith('language-'))
                      ?.replace('language-', '');
                    return (
                      <div className="relative">
                        {lang && (
                          <span className="absolute top-2 left-3 font-terminal text-[0.75rem] text-muted-foreground select-none z-10 pointer-events-none">
                            {lang}
                          </span>
                        )}
                        <pre>{domToReact(domNode.children as DOMNode[])}</pre>
                      </div>
                    );
                  }
                },
              })}
            </div>

            {/* Next Chapter */}
            {nextPost && (
              <Link
                href={nextPost.url}
                className="mt-8 flex items-center justify-between gap-4 border border-border bg-os-deep px-4 py-3 hover:border-neon-purple/50 hover:bg-neon-purple/4 transition-colors group not-prose no-underline"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-pixel text-[0.4rem] text-neon-purple tracking-widest uppercase">
                    next_chapter
                  </span>
                  <span className="font-terminal text-[1rem] text-foreground truncate group-hover:text-neon-purple transition-colors">
                    {nextPost.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-border group-hover:text-neon-purple shrink-0 transition-colors" />
              </Link>
            )}

            {/* Prev / Next navigation */}
            <div className="mt-12 pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              {adjacentPrev ? (
                <Link
                  href={`${adjacentHrefPrefix}${adjacentPrev.id}`}
                  className="group flex flex-col items-start gap-1 p-4 border border-border hover:border-neon-cyan/40 hover:bg-neon-cyan/3 transition-colors"
                >
                  <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-neon-cyan font-mono">
                    <ArrowLeft className="w-3 h-3" /> prev
                  </span>
                  <span className="text-sm text-foreground line-clamp-1">{adjacentPrev.title}</span>
                </Link>
              ) : <div />}
              {adjacentNext && (
                <Link
                  href={`${adjacentHrefPrefix}${adjacentNext.id}`}
                  className="group flex flex-col items-end gap-1 p-4 border border-border hover:border-neon-cyan/40 hover:bg-neon-cyan/3 transition-colors text-right"
                >
                  <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-neon-cyan font-mono">
                    next <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-sm text-foreground line-clamp-1">{adjacentNext.title}</span>
                </Link>
              )}
            </div>

            {relatedPosts}

            <div className="mt-12 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4 not-prose">
              {postTitle && <ShareButtons title={postTitle} />}
            </div>

            <div className="mt-8 flex flex-col items-center gap-8">
              <Comments />
            </div>
          </article>
        </div>

        {/* TOC sidebar */}
        <aside className="hidden lg:flex flex-col w-[200px] shrink-0 border-t lg:border-t-0 lg:border-l border-border p-4">
          <div className="sticky top-14">
            <h4 className="font-pixel text-[0.45rem] mb-4 uppercase tracking-wider text-muted-foreground">OUTLINE</h4>
            {toc && <TocNav toc={toc} />}
          </div>
        </aside>

      </div>
    </PageWindow>
  );
}

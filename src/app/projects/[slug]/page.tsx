import { getProjectData, getAllProjectSlugs, getSortedProjectsData } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PageWindow } from '@/components/page-window';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return getAllProjectSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getSortedProjectsData().find(p => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let projectData;
  try {
    projectData = await getProjectData(slug);
  } catch {
    notFound();
  }

  return (
    <PageWindow title={`${slug}.project`} maxWidth="sm">

      {/* ── File tab bar ── */}
      <div className="flex items-center border-b border-border bg-os-deep overflow-x-auto">
        <div className="flex items-center gap-2 px-4 py-2 bg-muted border-r border-border text-xs font-mono text-foreground shrink-0">
          <span className="text-muted-foreground text-[0.75rem]">💾</span>
          <span>{slug}.project</span>
          <span className="text-border ml-1 cursor-default">×</span>
        </div>
        <div className="px-4 py-2 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
          <Link href="/projects" className="hover:text-neon-cyan transition-colors">projects/</Link>
          <span className="text-border">›</span>
          <span className="text-foreground truncate max-w-[180px]">{slug}</span>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-8">

        {/* ── Frontmatter-style header ── */}
        <div className="border border-border bg-os-deep p-4 font-mono text-xs space-y-0.5">
          <div className="text-border">---</div>
          <div>
            <span className="text-neon-purple">project:  </span>
            <span className="text-foreground">&quot;{projectData.title}&quot;</span>
          </div>
          {projectData.summary && (
            <div>
              <span className="text-neon-purple">summary:  </span>
              <span className="text-muted-foreground">{projectData.summary}</span>
            </div>
          )}
          {projectData.tags.length > 0 && (
            <div>
              <span className="text-neon-purple">stack:    </span>
              <span className="text-neon-green">[{projectData.tags.join(', ')}]</span>
            </div>
          )}
          {projectData.githubUrl && (
            <div>
              <span className="text-neon-purple">repo:     </span>
              <a
                href={projectData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:underline"
              >
                {projectData.githubUrl}
              </a>
            </div>
          )}
          {projectData.liveUrl && (
            <div>
              <span className="text-neon-purple">live_url: </span>
              <a
                href={projectData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:underline"
              >
                {projectData.liveUrl}
              </a>
            </div>
          )}
          <div className="text-border">---</div>
        </div>

        {/* ── Preview image ── */}
        {projectData.image && (
          <div className="relative w-full aspect-[16/10] border border-border overflow-hidden">
            <Image
              src={projectData.image}
              alt={`${projectData.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent pointer-events-none" />
          </div>
        )}

        {/* ── Content ── */}
        <article
          className="manual-prose"
          dangerouslySetInnerHTML={{ __html: projectData.contentHtml }}
        />

        {/* ── Back link ── */}
        <div className="border-t border-border pt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-neon-cyan transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            $ cd ../projects
          </Link>
        </div>

      </div>
    </PageWindow>
  );
}

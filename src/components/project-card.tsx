// File: components/project-card.tsx

import Image from 'next/image';
import Link from 'next/link';
// 【修改】從 lib/projects 匯入 ProjectPreview 型別
import type { ProjectPreview } from '@/lib/projects';

interface ProjectCardProps {
  // 【修改】將 project 的型別從 Project 改為 ProjectPreview
  project: ProjectPreview;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="border border-border overflow-hidden transition-all duration-200 group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.06)]">
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-card">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <span className="font-terminal text-sm text-muted-foreground">no_preview.png</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
        </div>
        <div className="p-3 bg-muted border-t border-border">
          <h3 className="font-terminal text-[1.05rem] text-foreground group-hover:text-neon-cyan transition-colors tracking-wide truncate">
            {project.title}
          </h3>
          {project.summary && (
            <p className="text-[0.75rem] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {project.summary}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
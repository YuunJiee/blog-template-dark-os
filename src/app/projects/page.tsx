// 檔案位置: app/projects/page.tsx

// 【修改點 1】將 getProjectsData 改名為 getSortedProjectsData
import { getSortedProjectsData } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { PageWindow } from "@/components/page-window";

export const metadata = {
  title: "專案作品集",
  description: "個人開發的作品與專案展示。",
};

export default function ProjectsPage() {
  const projects = getSortedProjectsData();

  return (
    <PageWindow title="projects.dir" maxWidth="md">
      <div className="p-6 space-y-6">

        {/* Terminal header */}
        <div className="font-mono text-xs border-b border-border pb-4 space-y-1">
          <div>
            <span className="text-muted-foreground">$ </span>
            <span className="text-neon-cyan">ls</span>
            <span className="text-foreground"> ~/projects/ </span>
            <span className="text-border">-- {projects.length} project(s)</span>
          </div>
          <div className="text-muted-foreground pl-4">
            個人開發與研究專案展示。
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </PageWindow>
  );
}
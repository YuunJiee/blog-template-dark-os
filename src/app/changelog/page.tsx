import { siteConfig } from "@/config/site";
import { PageWindow } from "@/components/page-window";
import { getChangelogData } from "@/lib/changelog";
import type { ChangelogEntry } from "@/lib/changelog";

export const metadata = {
  title: "更新日誌",
  description: "記錄這個部落格的成長與演變。",
};

const TYPE_COLOR: Record<string, string> = {
  feat:     "text-neon-green",
  fix:      "text-neon-pink",
  perf:     "text-neon-yellow",
  refactor: "text-neon-cyan",
  style:    "text-neon-purple",
  docs:     "text-muted-foreground",
  chore:    "text-muted-foreground",
};

function versionToHash(version: string): string {
  const n = parseInt(version.replace(/\D/g, ""), 10) || 0;
  return ((n * 0x1e9bf + 0x5f375a) >>> 0).toString(16).padStart(7, "0").slice(0, 7);
}

function GitEntry({ entry, last }: { entry: ChangelogEntry; last: boolean }) {
  return (
    <div className={`pb-8 ${last ? "" : "border-b border-border mb-8"}`}>

      {/* commit <hash> (tag: vX.Y.Z) */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-2 text-sm">
        <span className="text-neon-pink">commit</span>
        <span className="text-neon-green font-bold">{versionToHash(entry.version)}</span>
        <span className="text-neon-purple">(tag: {entry.version})</span>
      </div>

      {/* Author / Date */}
      <div className="text-xs space-y-0.5 mb-4 text-muted-foreground">
        <div>
          <span className="text-neon-cyan">Author: </span>
          <span className="text-foreground">{siteConfig.author.name}{siteConfig.author.email && <> &lt;{siteConfig.author.email}&gt;</>}</span>
        </div>
        <div>
          <span className="text-neon-cyan">Date:   </span>
          {entry.date}
        </div>
      </div>

      {/* Commit body */}
      <div className="pl-4 border-l-2 border-border space-y-1.5">
        <div className="text-foreground font-bold mb-2">{entry.title}</div>
        {entry.description && (
          <div className="text-muted-foreground text-xs mb-3 leading-relaxed">{entry.description}</div>
        )}
        {entry.changes?.map((change, j) => (
          <div key={j} className="flex gap-2 text-xs">
            <span className={`shrink-0 w-16 ${TYPE_COLOR[change.type] ?? "text-muted-foreground"}`}>
              {change.type}:
            </span>
            <span className="text-foreground/80 leading-relaxed">{change.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChangelogPage() {
  const entries = getChangelogData();
  return (
    <PageWindow title="git_log.sh" maxWidth="md">
      <div className="p-6 font-mono text-sm">

        <div className="text-xs text-muted-foreground mb-6">
          $ <span className="text-neon-cyan">git log</span>{" "}
          <span className="text-foreground">--format=fuller --all</span>
        </div>

        {entries.map((entry, i) => (
          <GitEntry key={entry.version} entry={entry} last={i === entries.length - 1} />
        ))}

      </div>
    </PageWindow>
  );
}

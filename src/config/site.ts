/**
 * ─────────────────────────────────────────────
 *  Site Configuration — edit this file to
 *  customise the blog for your own use.
 * ─────────────────────────────────────────────
 */

export const siteConfig = {
  // ── Identity ──────────────────────────────
  /** Displayed in navbar, footer, browser tab, and OG tags. */
  name: "My Dark OS Blog",

  /** Short tagline shown in the hero section. */
  description: "技術筆記、專案與開發雜記",

  /**
   * Canonical URL of your deployed site.
   * Override with NEXT_PUBLIC_SITE_URL env var (no trailing slash).
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",

  // ── Author ────────────────────────────────
  author: {
    /** Full display name (About page, SEO). */
    name: "Your Name",
    /** Short handle — used for the shell prompt (`handle@blog`) and home card. */
    handle: "guest",
    /** Avatar image under /public. */
    avatar: "/images/avatar.svg",
    /** GitHub username (contact page, About links). Set "" to hide. */
    github: "your-github",
    /** LinkedIn slug, e.g. "in/your-name". Set "" to hide. */
    linkedin: "",
    /** Public email shown on About / Changelog. Set "" to hide. */
    email: "",
  },

  /** Small tags on the home profile card (colours cycle cyan → purple → pink → green). */
  profileTags: ["Web", "AI", "LC", "Dev"],

  // ── Version ───────────────────────────────
  /** Injected from package.json by next.config.ts — bump the version there. */
  version: `v${process.env.NEXT_PUBLIC_APP_VERSION}`,

  // ── Terminal ──────────────────────────────
  // Shown when user runs `whoami` in the home terminal.
  bio: [
    "軟體工程師 · 喜歡把東西做出來",
    "記錄學習筆記、LeetCode、各種開發雜記",
  ],

  // Shown when user runs `cat current_status.txt` in the home terminal.
  currentStatus: "正在用 Dark OS 主題架自己的部落格",

  // ── SEO ───────────────────────────────────
  keywords: ["Next.js", "React", "AI", "Programming", "Blog"],
  locale: "zh_TW",
  lang: "zh-TW",

  // ── Giscus Comments ───────────────────────
  // Get your own values at https://giscus.app
  // Set giscus to null to disable comments entirely.
  giscus: null as GiscusConfig | null,
  // Example:
  // giscus: {
  //   repo: "you/blog-comments",
  //   repoId: "R_xxxxxxxx",
  //   category: "Announcements",
  //   categoryId: "DIC_xxxxxxxx",
  //   lang: "zh-TW",
  // },
};

/** Hostname shown in the top bar, e.g. "EXAMPLE.COM". */
export const siteHost = new URL(siteConfig.url).host.toUpperCase();

/** Shell prompt used across the terminal-styled UI. */
export const shellPrompt = `${siteConfig.author.handle}@blog`;

export interface GiscusConfig {
  repo: `${string}/${string}`;
  repoId: string;
  category: string;
  categoryId: string;
  lang: string;
}

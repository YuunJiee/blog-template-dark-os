/**
 * ─────────────────────────────────────────────
 *  About page content — replace with your own.
 * ─────────────────────────────────────────────
 */

/** Rendered neofetch-style next to your avatar. */
export const INFO_ROWS: [string, string][] = [
  ["OS",       "Your School / Company"],
  ["Host",     "Your City"],
  ["Kernel",   "Software Engineer v1.0"],
  ["Uptime",   "since 2020"],
  ["Focus",    "Web · AI · DevOps"],
  ["Shell",    "TypeScript · Python"],
  ["IDE",      "VS Code"],
  ["Interests","Open source · Writing"],
];

export const PALETTE_A = ["#050510", "#2A2A4A", "#6868A8", "#E8E8FF"];
export const PALETTE_B = ["#00F5FF", "#B44FFF", "#FF2D78", "#00FF9B"];

export const HASHES = [
  "8f3a21d", "4b2c819", "7d1e005",
  "3a9f014", "6c8b027", "1f0e421", "c9a2e83",
  "e47b19a", "2d6f8c3",
];

export const techStack = {
  "Languages": [
    { name: "Python",     level: "proficient" },
    { name: "TypeScript", level: "familiar"   },
    { name: "Java",       level: "learning"   },
    { name: "SQL",        level: "familiar"   },
    { name: "C",          level: "learning"   },
  ],
  "AI & Data": [
    { name: "PyTorch",     level: "learning" },
    { name: "NumPy",       level: "familiar" },
    { name: "Pandas",      level: "familiar" },
    { name: "Scikit-learn",level: "learning" },
    { name: "YOLO",        level: "learning" },
  ],
  "Web & Backend": [
    { name: "Next.js",     level: "familiar" },
    { name: "React",       level: "familiar" },
    { name: "FastAPI",     level: "familiar" },
    { name: "Spring Boot", level: "learning" },
  ],
  "DevOps & Tools": [
    { name: "Git",            level: "proficient" },
    { name: "Docker",         level: "learning"   },
    { name: "GitHub Actions", level: "learning"   },
    { name: "Linux",          level: "familiar"   },
  ],
};

/** Rendered as a `git log`. Hover a line to see the description. */
export const timelineData = [
  {
    date: "2025.09 ~",
    title: "某某公司 軟體工程師",
    description: "負責前端與部署流程。把這段換成你自己的經歷。",
  },
  {
    date: "2023.09 ~ 2025.06",
    title: "某某大學 資訊工程研究所",
    description: "研究主題、實驗室或代表作品。",
  },
  {
    date: "2019.09 ~ 2023.06",
    title: "某某大學 資訊工程學系",
    description: "大學時期的重點經歷。",
  },
];

/** Set to [] to hide the section. */
export const honors = [
  "1st Place — Example Hackathon (2025)",
  "Best Paper — Example Conference (2024)",
];

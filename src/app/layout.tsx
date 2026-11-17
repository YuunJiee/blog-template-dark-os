import type { Metadata } from "next";
import { Inter, Noto_Sans_TC, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { OsTopbar } from "@/components/os-topbar";
import { OsTaskbar } from "@/components/os-taskbar";
import { CommandMenu } from "@/components/command-menu";
import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { ConsoleWelcome } from "@/components/easter-eggs/console-welcome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-tc",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only pass the fields CommandMenu actually uses — avoids serialising full PostData
  // (date, summary, readingTime, …) into every page's HTML payload.
  const posts = getSortedPostsData().map(({ id, title, tags, type }) => ({ id, title, tags, type }));

  return (
    <html lang="zh-TW" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.variable,
          notoSansTC.variable,
          pressStart2P.variable,
          vt323.variable
        )}
      >
        <ConsoleWelcome />
        <OsTopbar />
        <CommandMenu posts={posts} />
        <div className="relative flex min-h-screen flex-col pt-7 pb-6">
          <main className="flex-grow">{children}</main>
        </div>
        <OsTaskbar />
        <Toaster />
      </body>
    </html>
  );
}
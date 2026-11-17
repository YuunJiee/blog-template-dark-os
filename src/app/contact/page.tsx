import type { Metadata } from 'next';
import { PageWindow } from "@/components/page-window";
import { ContactForm } from '@/components/contact-form';
import { siteConfig, shellPrompt } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: '有任何問題、Bug 回報或功能建議，歡迎來信！',
};

export default function ContactPage() {
  return (
    <PageWindow title="contact.sh" maxWidth="sm">
      <div className="p-6 font-mono text-sm space-y-6">

        {/* Terminal banner */}
        <div className="space-y-1 text-xs">
          <div>
            <span className="text-neon-cyan">{shellPrompt}</span>
            <span className="text-muted-foreground">:~$ </span>
            <span className="text-foreground">./contact --help</span>
          </div>
          <div className="text-muted-foreground pl-4 leading-relaxed">
            發現文章錯誤、頁面 Bug，或有任何建議與想法？<br />
            填寫下方表單，我會盡快回覆。
          </div>
          <div className="text-muted-foreground pt-1">
            <span className="text-neon-cyan">alternate:</span>{' '}
            <a
              href={`https://github.com/${siteConfig.author.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neon-cyan transition-colors underline"
            >
              github.com/{siteConfig.author.github}/issues
            </a>
          </div>
        </div>

        <div className="border-t border-border" />

        <ContactForm />

      </div>
    </PageWindow>
  );
}

import { ImageResponse } from 'next/og';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';
import { OG_IMAGE_SIZE } from '@/config/constants';

// Satori (next/og) renders inline styles only — no CSS variables or Tailwind —
// so OG colours live here as literals.

export interface PillColor {
  bg: string;
  border: string;
  text: string;
}

export const PILL_INDIGO: PillColor = { bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)', text: '#818cf8' };
export const PILL_AMBER:  PillColor = { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24' };
const PILL_TAG:           PillColor = { bg: 'rgba(99,102,241,0.2)',  border: 'rgba(99,102,241,0.4)', text: '#a5b4fc' };

export function OgPill({ color, children }: { color: PillColor; children: ReactNode }) {
  return (
    <div
      style={{
        background: color.bg,
        border: `1px solid ${color.border}`,
        color: color.text,
        padding: '8px 20px',
        borderRadius: '9999px',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: '0.04em',
      }}
    >
      {children}
    </div>
  );
}

interface PostOgImageOptions {
  title: string;
  tags: string[];
  date: string;
  /** Rendered above the title (e.g. a LeetCode problem number). */
  eyebrow?: ReactNode;
  /** Rendered at the right of the site-name row. */
  topRight?: ReactNode;
  /** Rendered at the right of the date row. */
  bottomRight?: ReactNode;
}

/** Shared 1200×630 card for /blog/[id] and /leetcode/[id] OG images. */
export function renderPostOgImage({ title, tags, date, eyebrow, topRight, bottomRight }: PostOgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: `${OG_IMAGE_SIZE.width}px`,
          height: `${OG_IMAGE_SIZE.height}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Top: site name (+ optional label) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>{siteConfig.name.charAt(0).toUpperCase()}</span>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '20px', letterSpacing: '0.02em' }}>
              {siteConfig.name}
            </span>
          </div>
          {topRight}
        </div>

        {/* Middle: title + tags */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {eyebrow}
          <div
            style={{
              fontSize: title.length > 40 ? '44px' : '56px',
              fontWeight: 700,
              color: '#f1f5f9',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
              // Limit to 3 lines
              display: '-webkit-box',
              WebkitLineClamp: 3,
              overflow: 'hidden',
            }}
          >
            {title}
          </div>

          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    background: PILL_TAG.bg,
                    border: `1px solid ${PILL_TAG.border}`,
                    color: PILL_TAG.text,
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: date (+ optional label) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b', fontSize: '18px' }}>{date}</span>
          {bottomRight}
        </div>
      </div>
    ),
    OG_IMAGE_SIZE,
  );
}

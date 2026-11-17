import { getSortedPostsData, aggregateTags, PostType } from '@/lib/posts';
import { BlogPosts } from './blog-posts';
import { Suspense } from 'react';
import { PageWindow } from '@/components/page-window';

const CATEGORIES = [
  { id: 'all',            label: '全部文章' },
  { id: 'notes',          label: '課堂筆記' },
  { id: 'implementation', label: '實作筆記' },
  { id: 'til',            label: 'TIL'      },
  { id: 'paper',          label: '論文閱讀' },
];

export const metadata = {
  title: "Blog & Notes",
  description: "技術文章、課堂筆記與實作心得。",
};

// SSG — no force-dynamic needed; all filtering happens client-side in BlogPosts
export default function BlogIndexPage() {
  // LeetCode posts have their own /leetcode route — exclude here
  const allPosts = getSortedPostsData().filter(post => post.type === PostType.BLOG);

  const allTags = aggregateTags(allPosts);

  return (
    <PageWindow title="blog_posts.list" maxWidth="lg">
      <Suspense>
        <BlogPosts
          posts={allPosts}
          allTags={allTags}
          categories={CATEGORIES}
        />
      </Suspense>
    </PageWindow>
  );
}

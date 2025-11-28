import Head from 'next/head';
import { useEffect, useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';

import BlogLayout from '../../layouts/BlogLayout';
import { getPostSlugs, getPostBySlug } from '../../lib/posts';

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    console.error('Missing post for slug:', params.slug);
    return { notFound: true };
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
        [rehypePrism, { ignoreMissing: true, showLineNumbers: false }],
      ],
    },
  });

  return {
    props: {
      mdxSource,
      frontMatter: post.meta,
    },
  };
}

export default function BlogPost({ frontMatter, mdxSource }) {
  const title = frontMatter.title ?? frontMatter.slug;
  const description = frontMatter.excerpt ?? '';
  const keywords = Array.isArray(frontMatter.tags) ? frontMatter.tags.join(',') : '';

  // State for Back to Top button and scroll progress
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowButton(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>{title} | StrikeSec</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://strikesec.dev/blog/${frontMatter.slug}`} />
        <link rel="canonical" href={`https://strikesec.dev/blog/${frontMatter.slug}`} />
      </Head>

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-green-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Blog Content */}
      <BlogLayout mdxSource={mdxSource} frontMatter={frontMatter} />

      {/* Back to Top Button */}
      {showButton && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            fixed bottom-6 right-6 z-50
            inline-flex items-center justify-center
            h-12 w-12 rounded-full
            bg-green-400 text-white
            shadow-lg transition
            hover:bg-green-500
            hover:shadow-[0_0_20px_rgba(165,246,58,0.6)]
            focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2
          "
        >
          ↑
        </button>
      )}
    </>
  );
}

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
      frontMatter: post.meta, // ✅ Pass as frontMatter
    },
  };
}

export default function BlogPost({ frontMatter, mdxSource }) {
  const title = frontMatter.title ?? frontMatter.slug;
  const description = frontMatter.excerpt ?? '';
  const keywords = Array.isArray(frontMatter.tags) ? frontMatter.tags.join(',') : '';

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowButton(scrollTop > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          backgroundColor: '#0070f3',
          zIndex: 9999,
          transition: 'width 0.2s ease-out'
        }}
      />

      {/* Back to Top Button */}
      {showButton && (<button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 15px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 9999
        }}
      >
        ↑ Back to Top
      </button>)}

      <BlogLayout mdxSource={mdxSource} frontMatter={frontMatter} />
    </>
  );
}

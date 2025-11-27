import Head from 'next/head';
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
      meta: post.meta,
    },
  };
}

export default function BlogPost({ meta, mdxSource }) {
  const title = meta.title ?? meta.slug;
  const description = meta.excerpt ?? '';
  const keywords = Array.isArray(meta.tags) ? meta.tags.join(',') : '';

  return (
    <>      
      <Head>
        <title>{title} | StrikeSec</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://strikesec.dev/blog/${meta.slug}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {description && <meta name="twitter:description" content={description} />}
        
        {/* Canonical */}
        <link rel="canonical" href={`https://strikesec.dev/blog/${meta.slug}`} />
      </Head>

      <BlogLayout mdxSource={mdxSource} frontMatter={meta} />
    </>
  );
}

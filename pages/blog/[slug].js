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
      frontMatter: post.meta, // ✅ Pass as frontMatter
    },
  };
}

export default function BlogPost({ frontMatter, mdxSource }) {
  const title = frontMatter.title ?? frontMatter.slug;
  const description = frontMatter.excerpt ?? '';
  const keywords = Array.isArray(frontMatter.tags) ? frontMatter.tags.join(',') : '';

  return (
    <>
      <Head>
        <title>{title} | StrikeSecLive</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://strikesec.dev/blog/${frontMatter.slug}`} />
        <link rel="canonical" href={`https://strikesec.dev/blog/${frontMatter.slug}`} />
      </Head>

      <BlogLayout mdxSource={mdxSource} frontMatter={frontMatter} />
    </>
  );
}

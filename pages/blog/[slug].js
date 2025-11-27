
import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';

import BlogLayout from '@/layouts/BlogLayout';
import MDXComponents from '@/components/MDXComponents';
import { getPostSlugs, getPostBySlug } from '@/lib/posts';

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { meta, content } = getPostBySlug(params.slug);

  const mdxSource = await serialize(content, {
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
    props: { meta, mdxSource },
  };
}

export default function BlogPost({ meta, mdxSource }) {
  const title = meta.title ?? meta.slug;
  const dateFmt = meta.date
    ? new Date(meta.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <>
      <Head>
        <title>{title} · StrikeSec</title>
        <meta name="description" content={meta.excerpt || ''} />
        <meta name="keywords" content={meta.tags?.join(',') || ''} />
      </Head>

      <BlogLayout>
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          {dateFmt && <p className="text-gray-400">{dateFmt}</p>}
          {meta.tags?.length > 0 && (
            <ul className="flex gap-2 mt-2">
              {meta.tags.map((tag) => (
                <li key={tag} className="text-sm text-accent">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <article className="prose prose-invert max-w-none">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
      </BlogLayout>
    </>
  );
}

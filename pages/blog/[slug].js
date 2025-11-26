
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import Layout from '../../components/Layout';
import MDXComponents from '../../components/MDXComponents';
import { getPostSlugs, getPostBySlug } from '../../lib/posts';

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
        rehypePrism,
      ],
    },
  });

  return {
    props: {
      meta,
      mdxSource,
    },
  };
}

export default function BlogPost({ meta, mdxSource }) {
  const title = meta.title || meta.slug;
  const dateFmt = meta.date
    ? new Date(meta.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Layout>
      <Head>
        <title>{title} · StrikeSec</title>
        {meta.excerpt && <meta name="description" content={meta.excerpt} />}
        {meta.tags && <meta name="keywords" content={meta.tags.join(',')} />}
        <link rel="canonical" href={`https://strikesec.dev/blog/${meta.slug}`} />
      </Head>

      <article style={{ padding: '2rem 1rem', maxWidth: 880, margin: '0 auto' }}>
        <header style={{ marginBottom: '1.5rem' }}>
          <nav aria-label="Breadcrumb">
            <Link href="/blog" style={{ color: '#2563eb', textDecorationo none
            </Link>
          </nav>

          <h1 style={{ margin: '0.75rem 0' }}>{title}</h1>

          {dateFmt && (
            <time dateTime={meta.date} style={{ color: '#6b7280' }}>
              {dateFmt}
            </time>
          )}

          {Array.isArray(meta.tags) && meta.tags.length > 0 && (
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.75rem',
                    background: '#eef2ff',
                    color: '#3730a3',
                    borderRadius: '999px',
                    padding: '0.25rem 0.5rem',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {meta.thumbnail && (
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginTop: '1rem' }}>
              <Image
                src={meta.thumbnail}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                style={{ objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
          )}
        </header>

        <div className="mdx-content">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </div>
      </article>
    </Layout>
  );
}

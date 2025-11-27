
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
  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const { meta, content } = getPostBySlug(params.slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
        [rehypePrism, { ignoreMissing: true }], // ✅ Added option to prevent crashes
      ],
    },
  });
  return { props: { meta, mdxSource } };
}

export default function BlogPost({ meta, mdxSource }) {
  const title = meta.title ?? meta.slug;
  const dateFmt =
    meta.date ? new Date(meta.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : null;

  return (
    <Layout>
      <Head>
        <title>{title} · StrikeSec</title>
        {meta.excerpt && <meta name="description" content={meta.excerpt} />}
        {Array.isArray(meta.tags) && meta.tags.length > 0 && (
          <meta name="keywords" content={meta.tags.join(',')} />
        )}
      </Head>

      <article className="prose prose-invert max-w-none">
        <div className="mb-6">
          /blog← Back to blog</Link>
        </div>

        <h1 className="mb-2">{title}</h1>
        {dateFmt && <p className="text-sm text-gray-400">{dateFmt}</p>}

        {Array.isArray(meta.tags) && meta.tags.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {meta.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-800 text-gray-200 px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
        )}

        {meta.thumbnail && (
          <div className="my-6">
            <Image src={meta.thumbnail} alt={title} width={1200} height={630} className="rounded" />
          </div>
        )}

        <MDXRemote {...mdxSource} components={MDXComponents} />
      </article>
    </Layout>
  );
}


import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content/blog'));
  const paths = files.map(filename => ({
    params: { slug: filename.replace('.mdx', '') }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const markdownWithMeta = fs.readFileSync(path.join('content/blog', params.slug + '.mdx'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);
  return { props: { frontmatter, mdxSource } };
}

export default function Post({ frontmatter, mdxSource }) {
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <MDXRemote {...mdxSource} />
    </article>
  );
}

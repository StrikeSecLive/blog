import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from '../components/MDXComponents';

export default function BlogLayout({ mdxSource, children, frontMatter }) {
  return (
    <article className="prose mx-auto">
      {/* Optional: render title/date/tags from frontMatter */}
      {frontMatter?.title && <h1>{frontMatter.title}</h1>}
      {frontMatter?.date && (
        <p className="text-sm text-gray-500">
          {new Date(frontMatter.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      )}

      {/* Render MDX content */}
      <MDXRemote {...mdxSource} components={MDXComponents} />

      {/* If the page passes extra children, render them after */}
      {children}
    </article>
  );
}

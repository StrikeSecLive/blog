import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from '../components/MDXComponents';

export default function BlogLayout({ mdxSource, children, frontMatter }) {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Blog content wrapper */}
        
        <article className="
          prose mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl dark:prose-invert
        ">
          {frontMatter?.title && <h1>{frontMatter.title}</h1>}
          {frontMatter?.date && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(frontMatter.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          )}
        
          <MDXRemote {...mdxSource} components={MDXComponents} />
          {children}
        </article>

      </div>
    </main>
  );
}

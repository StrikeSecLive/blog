import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from '../components/MDXComponents';

export default function BlogLayout({ mdxSource }) {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Blog content wrapper */}
        <article className="prose mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl dark:prose-invert">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
      </div>
    </main>
  );
}

import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from '../components';

export default function BlogLayout({ mdxSource }) {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Blog content wrapper */}
        <article className="prose prose-invert max-w-none dark:prose-invert">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
      </div>
    </main>
  );
}

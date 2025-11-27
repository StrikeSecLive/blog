
import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from '../components/MDXComponents';

/**
 * BlogLayout
 *
 * - Constrains line length for readability (max-w-3xl).
 * - Adds responsive horizontal padding so content doesn't touch the edges.
 * - Inverts Tailwind Typography in dark mode (dark:prose-invert).
 * - Safely displays front matter (title, date) if provided.
 * - Renders MDX content via MDXRemote using custom MDXComponents.
 */
export default function BlogLayout({ mdxSource, children, frontMatter }) {
  const title = frontMatter?.title ?? '';
  const date = frontMatter?.date ?? null;

  const formattedDate =
    date
      ? new Date(date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : null;

  return (
    <article
      className="
        prose mx-auto
        px-4 sm:px-6 lg:px-8
        max-w-3xl
        dark:prose-invert
        prose-a:text-sky-600 dark:prose-a:text-sky-400
        prose-code:text-pink-600 dark:prose-code:text-pink-400
      "
    >
      {/* Title */}
      {title && <h1>{title}</h1>}

      {/* Date (light/dark tone) */}
      {formattedDate && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
      )}

      {/* MDX content */}
      <MDXRemote {...mdxSource} components={MDXComponents} />

      {/* Any extra children from the page */}
      {children}
    </article>
  );
}

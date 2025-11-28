
import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from '../components/MDXComponents';

/**
 * BlogLayout
 * - Adds responsive horizontal padding and vertical spacing.
 * - Constrains width for readability (max-w-4xl).
 * - Applies dark mode inversion (dark:prose-invert).
 * - Includes sensible typography overrides for links and code.
 */
export default function BlogLayout({ mdxSource, children, frontMatter }) {
  const title = frontMatter?.title ?? '';
  const date = frontMatter?.date ?? null;
  const tags = Array.isArray(frontMatter.tags) ? frontMatter.tags : [];

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
        py-8 sm:py-12
        max-w-4xl
        dark:prose-invert
        prose-a:text-sky-600 dark:prose-a:text-sky-400
        prose-code:text-pink-600 dark:prose-code:text-pink-400
        prose-img:rounded-lg
      "
    >
      {/* Title */}
      {title && <h1>{title}</h1>}

      
      {tags.length > 0 && (
        <div className="post-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Date */}
      {formattedDate && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
      )}

      {/* MDX content */}
      <MDXRemote {...mdxSource} components={MDXComponents} />

      {/* Extra children */}
      {children}
    </article>
  );
}

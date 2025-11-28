
// pages/blog/index.js
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function getAllPostsMeta() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const filePath = path.join(BLOG_DIR, filename);
      const source = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(source);
      return {
        slug,
        title: data.title || slug,
        date: data.date || null,
        excerpt: data.excerpt || data.description || '',
        thumbnail: data.thumbnail || '/logo.png',
        tags: data.tags || [],
      };
    })
    .sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      return a.title.localeCompare(b.title);
    });
}

export async function getStaticProps() {
  const posts = getAllPostsMeta();
  return { props: { posts } };
}

export default function BlogIndex({ posts }) {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-white text-2xl font-semibold">Blog</h1>
      <p className="mb-8 text-gray-300">Latest posts, write-ups, and notes.</p>

      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="
              group
              rounded-xl overflow-hidden bg-white
              border border-gray-200
              transition-transform transition-shadow duration-300
              hover:-translate-y-1
              hover:shadow-[0_0_20px_rgba(165,246,58,0.6)]
              focus-within:shadow-[0_0_20px_rgba(165,246,58,0.6)]
              dark:bg-slate-800
            "
          >
            <Link href={`/blog/${post.slug}`} className="no-underline text-inherit block">
              <div className="relative w-full bg-gray-100 aspect-[16/9]">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="text-gray-900 text-lg font-semibold m-0">{post.title}</h2>

                {post.date && (
                  <time
                    dateTime={post.date}
                    className="text-sm text-gray-500"
                  >
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                )}

                {post.excerpt && (
                  <p className="mt-2 text-gray-700">{post.excerpt}</p>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}


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
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Blog</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Latest posts, write-ups, and notes.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {posts.map((post) => (
          <article
            key={post.slug}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
            }}            
            className="
              group rounded-xl overflow-hidden bg-white border border-gray-200 p-4
              transition-transform transition-shadow duration-300
              hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(165,246,58,0.6)]
              focus-within:shadow-[0_0_20px_rgba(165,246,58,0.6)]
              dark:bg-slate-800
             "
          >
            <Link
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  background: '#f3f4f6',
                }}
              >
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1rem' }}>
                <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{post.title}</h2>
                {post.date && (
                  <time
                    dateTime={post.date}
                    style={{ color: '#6b7280', fontSize: '0.875rem' }}
                  >
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                )}
                {post.excerpt && (
                  <p style={{ marginTop: '0.5rem', color: '#fff' }}>
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

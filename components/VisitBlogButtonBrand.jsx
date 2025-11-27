import Link from 'next/link';

export default function VisitBlogLink() {
  return (
    <Link
      href="/blog"
      className="inline-block px-6 py-3 text-lg font-semibold text-[#2b3742] bg-[#a5f63a] rounded-md hover:bg-[#8cd52f] transition-colors duration-300"
    >
      Visit Blog
    </Link>
  );
}

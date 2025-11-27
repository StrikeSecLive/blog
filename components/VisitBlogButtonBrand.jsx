import Link from 'next/link';

export default function VisitBlogButton() {
  return (
    <Link
      href="/blog"
      className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-[#2b3742] bg-[#a5f63a] rounded-lg shadow-md hover:bg-[#8cd52f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a5f63a] transition-colors duration-300 no-underline"

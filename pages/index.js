import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl">
        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Welcome to <span className="text-sky-600 dark:text-sky-400">StrikeSec.dev</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Learn, practice, and master penetration testing tools and techniques.
        </p>

        {/* Call-to-Action Button */}
          <Link
        href="/blog"
        className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-[#2b3742] bg-[#a5f63a] rounded-md shadow-sm hover:bg-[#8cd52f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a5f63a] no-underline transition-colors duration-300"
      >
        Visit Blog
      </Link>
      </div>
    </div>
  );
}

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
        <a
          href="/blog"
          className="
            inline-block
            px-6 py-3
            bg-sky-600 text-white font-semibold
            rounded-md
            hover:bg-sky-700
            transition-colors duration-200
            shadow-md
          "
        >
          Visit Blog →
        </a>
      </div>
    </div>
  );
}

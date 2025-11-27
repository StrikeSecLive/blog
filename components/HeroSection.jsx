import VisitBlogButton from './VisitBlogButtonBrand';

export default function HeroSection() {
  return (
    <section className="relative bg-[#2b3742] text-center overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 0H0V40"
                fill="none"
                stroke="#a5f63a"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Welcome to StrikeSec.dev
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Learn, practice, and master penetration testing tools and techniques.
        </p>
        <div className="mt-8">
          <VisitBlogButton />
        </div>
      </div>
    </section>
  );
}

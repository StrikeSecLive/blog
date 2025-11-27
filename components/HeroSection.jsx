import VisitBlogButton from './VisitBlogButtonBrand';

export default function HeroSection() {
  return (
    
<section className="relative bg-[#2b3742] text-center overflow-hidden">
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#2b3742] via-[#1f262e] to-[#2b3742] opacity-90"></div>

  {/* SVG texture */}
  <div className="absolute inset-0">
    <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#a5f63a" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  {/* Floating accents */}
  <div className="absolute top-10 left-10 w-16 h-16 bg-[#a5f63a] rounded-full opacity-20 blur-xl"></div>
  <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#a5f63a] rounded-full opacity-10 blur-2xl"></div>

  {/* Content */}
  <div className="relative z-10 max-w-3xl mx-auto py-20 px-6">
    <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to StrikeSec.dev</h1>
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

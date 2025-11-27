export default function Layout({ children, hideNav = false }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans">
      {!hideNav && (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <picture>
              <source srcSet="/logo-small.png" media="(max-width: 768px)" className="h-24" />
              <img src="/logo.png" alt="StrikeSec Live Logo" className="h-20" />
            </picture>
          </div>
          <nav className="flex gap-6">
            <a href="/" className="hover:text-lime-400 font-medium">Home</a>
            <a href="/blog" className="hover:text-lime-400 font-medium">Blog</a>
            <a href="https://github.com/StrikeSecLive" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 font-medium">GitHub</a>
          </nav>
        </header>
      )}

      <main className="flex-1 mx-auto max-w-3xl px-4 py-8">
        {children}
      </main>

      {!hideNav && (
        <footer className="text-center py-4 border-t border-gray-700 text-gray-400 text-sm">
          © {new Date().getFullYear()} StrikeSec Live
        </footer>
      )}
    </div>
  );
}

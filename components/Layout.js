export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-navy text-white">
      <header className="bg-navy border-b border-gray-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="StrikeSec Live Logo" className="h-12" />
          </div>
          <nav className="flex gap-6 text-lg">
            <a href="/" className="hover:text-accent">Home</a>
            <a href="/docs" className="hover:text-accent">Docs</a>
            <a href="https://github.com/StrikeSecLive/blog" target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto p-6">{children}</main>
      <footer className="bg-navy border-t border-gray-700 text-center p-4 text-sm">
        © {new Date().getFullYear()} StrikeSec Live — Built with Next.js & Tailwind CSS
      </footer>
    </div>
  );
}

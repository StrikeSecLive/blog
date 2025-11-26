export default function Layout({ children, hideNav = false }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      {!hideNav && (
        <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.png" alt="StrikeSec Live Logo" style={{ height: '40px' }} />            
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '500' }}>Home</a>
            <a href="/blog" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '500' }}>Blog</a>
            <a
              href="https://github.com/StrikeSecLive"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '500' }}
            >
              GitHub
            </a>
          </nav>
        </header>
      )}

      <main style={{ flex: 1 }}>{children}</main>

      {!hideNav && (
        <footer style={{ padding: '1rem', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
          © {new Date().getFullYear()} StrikeSec Live
        </footer>
      )}
    </div>
  );
}

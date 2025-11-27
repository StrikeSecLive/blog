export default function Layout({ children, hideNav = false }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', backgroundColor: '#2b3742', color: '#fff' }}>
      {!hideNav && (
        <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
           <picture>
              <source srcSet="/logo-small.png" media="(max-width: 768px)" style={{ height: '100px' }} />
              <img src="/logo.png" alt="StrikeSec Live Logo" style={{ height: '80px' }} />
           </picture>
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/" style={{ textDecoration: 'none', color: '#fff', fontWeight: '500' }} onMouseOver={(e) => e.target.style.color = '#a5f63a'} onMouseOut={(e) => e.target.style.color = '#fff'}>Home</a>
            <a href="/blog" style={{ textDecoration: 'none', color: '#fff', fontWeight: '500' }} onMouseOver={(e) => e.target.style.color = '#a5f63a'} onMouseOut={(e) => e.target.style.color = '#fff'}>Blog</a>
            <a
              href="https://github.com/StrikeSecLive"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#fff', fontWeight: '500' }}
              onMouseOver={(e) => e.target.style.color = '#a5f63a'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >
              GitHub
            </a>
          </nav>
        </header>
      )}

      <main style={{ flex: 1 }}>{children}</main>

      {!hideNav && (
        <footer style={{ padding: '1rem', borderTop: '1px solid #374151', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
          © {new Date().getFullYear()} StrikeSec Live
        </footer>
      )}
    </div>
  );
}

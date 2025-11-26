
export default function Layout({ children, hideNav = false }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!hideNav && (
        <header style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            /Home</a>
            <a href="/blog" style={{ textDecoration: 'none', color: '#ithub.com/StrikeSecLive"
               target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#2563eb' }}
            >
              GitHub
            </a>
          </nav>
        </header>
      )}

      <main style={{ flex: 1 }}>{children}</main>

      {!hideNav && (
        <footer style={{ padding: '1rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
          © {new Date().getFullYear()} StrikeSec Live
        </footer>
      )}
    </div>
  );
}

// components/Layout.js
import Head from 'next/head';

export default function Layout({ children, hideNav = false }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        backgroundColor: '#2b3742',
        color: '#fff',
      }}
    >
      <Head>
        {/* Proper responsive viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Favicons for different devices */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="196x196" href="/favicon-196x196.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
      </Head>

      {!hideNav && (
        <header
          style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #374151',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            flexWrap: 'wrap', // allow wrapping on small screens
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <picture>
              <source srcSet="/logo-small.png" media="(max-width: 768px)" />
              <img
                src="/logo.png"
                alt="StrikeSec Live Logo"
                style={{
                  height: 'auto',
                  maxHeight: '56px',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </picture>
          </div>

          <nav
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              wordBreak: 'break-word',
            }}
          >
            <a
              href="/"
              style={{ textDecoration: 'none', color: '#fff', fontWeight: 500 }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#a5f63a')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
            >
              Home
            </a>

            <a
              href="/blog"
              style={{ textDecoration: 'none', color: '#fff', fontWeight: 500 }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#a5f63a')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
            >
              Blog
            </a>

            <a
              href="https://github.com/StrikeSecLive"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#fff', fontWeight: 500 }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#a5f63a')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
            >
              GitHub
            </a>
          </nav>
        </header>
      )}

      <main
        style={{
          flex: 1,
          maxWidth: '1028px',
          width: '100%', // ensure full-width on mobile
          margin: '0 auto',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </main>

      {!hideNav && (
        <footer
          style={{
            padding: '1rem',
            borderTop: '1px solid #374151',
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: '0.875rem',
          }}
        >
          © {new Date().getFullYear()} StrikeSecLive
        </footer>
      )}
    </div>
  );
}

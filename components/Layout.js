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
        {/* ✅ Proper responsive viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            flexWrap: 'wrap', // ✅ allow wrapping on small screens
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <picture>
              {/* style on <source> is ignored; use sizes and CSS on <img> */}
              /logo-small.png
              <img
                src="/logo.png"
                alt="StrikeSec Live Logo"
                style={{
                  height: 'auto',
                  maxHeight: '56px',  // ✅ smaller on mobile
                  width: 'auto',
                }}
              }}
          >
            <a
             e.color = '#a5f63a')}
              onMouseOut={(e) => (e.target.style.color = '#fff')}
            >
              Home
            </a>
            <a
              href="/blog"
                          onMouseOut={(e) => (e.target.style.color = '#fff')}
            >
              Blog
            </a>
            <a
              href="https://github.com/StrikeSecLive"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#fff', fontWeight: 500 }}
              onMouseOver={(e)<main
        style={{
          flex: 1,
          maxWidth: '1028px',
          width: '100%',       // ✅ ensure full-width on mobile
          margin: '0 auto',
          padding: '1rem',
          boxSizing: 'border-box', // ✅ include padding in width calc
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

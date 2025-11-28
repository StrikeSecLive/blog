import Head from 'next/head';
import VisitBlogButton from './VisitBlogButtonBrand';

export default function HeroSection() {
  return (
    <>
      <Head>
        <title>StrikeSecLive Development</title>
        <meta name="description" content="Welcome to StrikeSecLive Development Hub. Explore penetration testing tools, security resources, and developer insights." />
      </Head>

      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/strikesecdev-landing.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#fff',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to StrikeSec.dev</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '2rem' }}>
            Explore StrikeSecLive's development hub at strikesec.dev. <br /><br />Learn penetration testing techniques, security best practices, and advanced tools for ethical hacking.
          </p>
          <div className="mt-8">
           <VisitBlogButton />
          </div>
        </div>
      </div>
    </>
  );
}

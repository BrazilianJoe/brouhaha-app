import React from 'react';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#0f0f23',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <header style={{ padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontWeight: 800, fontSize: '1.5rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Brouhaha</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/terms" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Terms</a>
            <a href="/privacy" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Privacy</a>
            <a href="https://app.brouhaha.com" style={{ color: '#feca57', textDecoration: 'none', fontWeight: 700 }}>Open App →</a>
          </div>
        </nav>
      </header>

      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', margin: 0 }}>Entertainment, Everywhere</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem', fontSize: '1.2rem' }}>
            Webtoons, books, and videos — one account across web, iOS, and Android.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.brouhaha.com" style={{ background: '#667eea', color: 'white', padding: '0.9rem 1.2rem', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>Launch App</a>
            <a href="#features" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.9rem 1.2rem', borderRadius: 10, textDecoration: 'none' }}>Learn More</a>
          </div>
        </div>
      </section>

      <footer style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <span>© {new Date().getFullYear()} Brouhaha</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
            <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}



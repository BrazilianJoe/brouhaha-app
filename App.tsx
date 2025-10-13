import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  console.log('App component rendering');

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>Brouhaha</div>
          <div style={styles.navLinks}>
            <a href="#content" style={styles.navLink}>Content</a>
            <a href="#pricing" style={styles.navLink}>Pricing</a>
            <a href="#about" style={styles.navLink}>About</a>
            <button style={styles.signInBtn}>Sign In</button>
          </div>
        </nav>
      </header>

      {/* Main Hero */}
      <main style={styles.main}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            Welcome to <span style={styles.accent}>Brouhaha</span>
          </h1>
          <h2 style={styles.subtitle}>
            The Ultimate Entertainment Platform
          </h2>
          <p style={styles.description}>
            Dive into amazing webtoons, books, and videos across all your devices. 
            Discover endless entertainment with our curated content library.
          </p>
          
          <div style={styles.ctaButtons}>
            <button style={styles.primaryBtn}>Start Watching Free</button>
            <button style={styles.secondaryBtn}>Self-Publish Content</button>
          </div>

          <div style={styles.stats}>
            <div style={styles.stat}>
              <div style={styles.statNumber}>50K+</div>
              <div style={styles.statLabel}>Happy Viewers</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>10K+</div>
              <div style={styles.statLabel}>Content Hours</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>500+</div>
              <div style={styles.statLabel}>Self-Publishers</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section style={styles.features}>
          <h3 style={styles.sectionTitle}>Why Choose Brouhaha?</h3>
          <div style={styles.featuresGrid}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📱</div>
              <h4 style={styles.featureTitle}>Watch Anywhere</h4>
              <p style={styles.featureDesc}>Seamless entertainment across web, iOS, and Android devices</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🎬</div>
              <h4 style={styles.featureTitle}>Curated Content</h4>
              <p style={styles.featureDesc}>Hand-picked webtoons, books, and videos for maximum enjoyment</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>💎</div>
              <h4 style={styles.featureTitle}>Premium Experience</h4>
              <p style={styles.featureDesc}>Ad-free viewing with exclusive content and early access</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🎨</div>
              <h4 style={styles.featureTitle}>Self-Publish</h4>
              <p style={styles.featureDesc}>Share your creations with our community of entertainment lovers</p>
            </div>
          </div>
        </section>

        {/* Content Preview */}
        <section style={styles.contentPreview}>
          <h3 style={styles.sectionTitle}>Featured Content</h3>
          <div style={styles.contentGrid}>
            <div style={styles.contentCard}>
              <div style={styles.contentThumbnail}>📖</div>
              <h4 style={styles.contentTitle}>Epic Fantasy Saga</h4>
              <p style={styles.contentDesc}>An immersive webtoon adventure</p>
              <div style={styles.contentType}>WEBTOON</div>
            </div>
            <div style={styles.contentCard}>
              <div style={styles.contentThumbnail}>📚</div>
              <h4 style={styles.contentTitle}>Sci-Fi Chronicles</h4>
              <p style={styles.contentDesc}>A gripping book series</p>
              <div style={styles.contentType}>BOOK</div>
            </div>
            <div style={styles.contentCard}>
              <div style={styles.contentThumbnail}>🎬</div>
              <h4 style={styles.contentTitle}>Action Thriller</h4>
              <p style={styles.contentDesc}>High-octane entertainment</p>
              <div style={styles.contentType}>VIDEO</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Brouhaha</h4>
            <p style={styles.footerDesc}>Your gateway to amazing content</p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Platform</h4>
            <a href="#" style={styles.footerLink}>Web App</a>
            <a href="#" style={styles.footerLink}>Mobile Apps</a>
            <a href="#" style={styles.footerLink}>Self-Publishing</a>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Support</h4>
            <a href="#" style={styles.footerLink}>Help Center</a>
            <a href="#" style={styles.footerLink}>Contact Us</a>
            <a href="#" style={styles.footerLink}>Community</a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© 2025 Brouhaha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f0f23',
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: 0,
    width: '100%',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(15, 15, 35, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease',
  },
  signInBtn: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
  },
  main: {
    paddingTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  heroContent: {
    textAlign: 'center',
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    marginBottom: '4rem',
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    margin: 0,
    lineHeight: 1.2,
  },
  accent: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '1.5rem',
    margin: 0,
    fontWeight: 300,
  },
  description: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: 1.6,
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  stat: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#feca57',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  features: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  feature: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#feca57',
  },
  featureDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 1.5,
  },
  contentPreview: {
    padding: '4rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  contentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease',
  },
  contentThumbnail: {
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  contentTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#feca57',
  },
  contentDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  contentType: {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    display: 'inline-block',
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '3rem 2rem 1rem',
    marginTop: '4rem',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerSection: {
    textAlign: 'left',
  },
  footerTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#feca57',
  },
  footerDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
  },
  footerLink: {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    transition: 'color 0.3s ease',
  },
  footerBottom: {
    textAlign: 'center',
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.9rem',
    margin: 0,
  },
};

// Mount the app
if (typeof window !== 'undefined') {
  // Ensure scrollbars are visible
  const style = document.createElement('style');
  style.textContent = `
    body {
      overflow: auto !important;
    }
    html {
      overflow: auto !important;
    }
    #root {
      overflow: visible !important;
    }
  `;
  document.head.appendChild(style);
  
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
}

export default App;
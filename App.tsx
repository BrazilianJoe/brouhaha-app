import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import Constants from 'expo-constants';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';

function AppContent() {
  const { user } = useUser();
  console.log('App component rendering');

  // Check current route
  const currentPath = window.location.pathname;
  
  // Handle legal pages
  if (currentPath === '/terms-of-service.html' || currentPath === '/terms-of-service') {
    return <TermsOfService />;
  }
  
  if (currentPath === '/privacy-policy.html' || currentPath === '/privacy-policy') {
    return <PrivacyPolicy />;
  }

  // Mock role system - in real app, this would come from your backend
  const getUserRole = (email) => {
    if (email === 'tiago.freire@gmail.com') return 'superadmin';
    if (email?.includes('admin')) return 'admin';
    if (email?.includes('moderator')) return 'moderator';
    if (email?.includes('creator')) return 'creator';
    return 'reader';
  };

  const getRoleInfo = (role) => {
    const roleMap = {
      superadmin: { name: 'Super Admin', color: '#ff6b6b', icon: '👑' },
      admin: { name: 'Administrator', color: '#667eea', icon: '🛡️' },
      moderator: { name: 'Moderator', color: '#feca57', icon: '⚖️' },
      creator: { name: 'Creator', color: '#48dbfb', icon: '🎨' },
      reader: { name: 'Reader', color: '#a55eea', icon: '👤' }
    };
    return roleMap[role] || roleMap.reader;
  };

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const userRole = getUserRole(userEmail);
  const roleInfo = getRoleInfo(userRole);

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
            <SignedIn>
              {(userRole === 'superadmin' || userRole === 'admin') && (
                <a href="#admin" style={styles.navLink}>Admin</a>
              )}
              {userRole === 'creator' && (
                <a href="#creator" style={styles.navLink}>Creator</a>
              )}
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={styles.signInBtn}>Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div style={styles.userSection}>
                <div style={styles.userInfo}>
                  <span style={styles.userName}>Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
                  <div style={{...styles.roleBadge, backgroundColor: roleInfo.color}}>
                    <span style={styles.roleIcon}>{roleInfo.icon}</span>
                    <span style={styles.roleText}>{roleInfo.name}</span>
                  </div>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
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

            {/* Admin Dashboard */}
            <SignedIn>
              {(userRole === 'superadmin' || userRole === 'admin') && (
                <section id="admin" style={styles.adminSection}>
                  <h3 style={styles.sectionTitle}>Admin Dashboard</h3>
                  <div style={styles.adminGrid}>
                    <div style={styles.adminCard}>
                      <div style={styles.adminIcon}>👥</div>
                      <h4 style={styles.adminTitle}>User Management</h4>
                      <p style={styles.adminDesc}>Manage user accounts and roles</p>
                      <button style={styles.adminBtn}>Manage Users</button>
                    </div>
                    <div style={styles.adminCard}>
                      <div style={styles.adminIcon}>📊</div>
                      <h4 style={styles.adminTitle}>Analytics</h4>
                      <p style={styles.adminDesc}>View platform analytics and reports</p>
                      <button style={styles.adminBtn}>View Analytics</button>
                    </div>
                    <div style={styles.adminCard}>
                      <div style={styles.adminIcon}>💰</div>
                      <h4 style={styles.adminTitle}>Payments</h4>
                      <p style={styles.adminDesc}>Manage subscriptions and payments</p>
                      <button style={styles.adminBtn}>Manage Payments</button>
                    </div>
                    <div style={styles.adminCard}>
                      <div style={styles.adminIcon}>🎬</div>
                      <h4 style={styles.adminTitle}>Content</h4>
                      <p style={styles.adminDesc}>Moderate and manage content</p>
                      <button style={styles.adminBtn}>Manage Content</button>
                    </div>
                  </div>
                </section>
              )}
            </SignedIn>

            {/* Creator Dashboard */}
      <SignedIn>
              {userRole === 'creator' && (
                <section id="creator" style={styles.creatorSection}>
                  <h3 style={styles.sectionTitle}>Creator Dashboard</h3>
                  <div style={styles.creatorGrid}>
                    <div style={styles.creatorCard}>
                      <div style={styles.creatorIcon}>📝</div>
                      <h4 style={styles.creatorTitle}>Create Content</h4>
                      <p style={styles.creatorDesc}>Upload webtoons, books, or videos</p>
                      <button style={styles.creatorBtn}>Create New</button>
                    </div>
                    <div style={styles.creatorCard}>
                      <div style={styles.creatorIcon}>📈</div>
                      <h4 style={styles.creatorTitle}>Analytics</h4>
                      <p style={styles.creatorDesc}>View your content performance</p>
                      <button style={styles.creatorBtn}>View Analytics</button>
                    </div>
                    <div style={styles.creatorCard}>
                      <div style={styles.creatorIcon}>💎</div>
                      <h4 style={styles.creatorTitle}>Earnings</h4>
                      <p style={styles.creatorDesc}>Track your revenue and payments</p>
                      <button style={styles.creatorBtn}>View Earnings</button>
                    </div>
                  </div>
                </section>
              )}
      </SignedIn>
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
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Legal</h4>
            <a href="/terms-of-service" style={styles.footerLink}>Terms of Service</a>
            <a href="/privacy-policy" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Cookie Policy</a>
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
      userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      },
      userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
      },
      userName: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.9rem',
      },
      roleBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.2rem 0.6rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      },
      roleIcon: {
        fontSize: '0.8rem',
      },
      roleText: {
        fontSize: '0.7rem',
        fontWeight: '600',
      },
  main: {
    paddingTop: '80px',
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
      // Admin Dashboard Styles
      adminSection: {
        padding: '4rem 2rem',
        backgroundColor: 'rgba(255, 107, 107, 0.05)',
        borderTop: '1px solid rgba(255, 107, 107, 0.2)',
      },
      adminGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      },
      adminCard: {
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderRadius: '12px',
        padding: '2rem',
        border: '1px solid rgba(255, 107, 107, 0.2)',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
      },
      adminIcon: {
        fontSize: '3rem',
        marginBottom: '1rem',
      },
      adminTitle: {
        fontSize: '1.3rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#ff6b6b',
      },
      adminDesc: {
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '1.5rem',
        lineHeight: 1.5,
      },
      adminBtn: {
        backgroundColor: '#ff6b6b',
        color: 'white',
        border: 'none',
        padding: '0.8rem 1.5rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
      },
      // Creator Dashboard Styles
      creatorSection: {
        padding: '4rem 2rem',
        backgroundColor: 'rgba(72, 219, 251, 0.05)',
        borderTop: '1px solid rgba(72, 219, 251, 0.2)',
      },
      creatorGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      },
      creatorCard: {
        backgroundColor: 'rgba(72, 219, 251, 0.1)',
        borderRadius: '12px',
        padding: '2rem',
        border: '1px solid rgba(72, 219, 251, 0.2)',
    textAlign: 'center',
        transition: 'transform 0.3s ease',
      },
      creatorIcon: {
        fontSize: '3rem',
        marginBottom: '1rem',
      },
      creatorTitle: {
        fontSize: '1.3rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#48dbfb',
      },
      creatorDesc: {
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '1.5rem',
        lineHeight: 1.5,
      },
      creatorBtn: {
        backgroundColor: '#48dbfb',
        color: 'white',
        border: 'none',
        padding: '0.8rem 1.5rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(72, 219, 251, 0.3)',
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
  // Ensure single scrollbar and prevent double scrollbars
  const style = document.createElement('style');
  style.textContent = `
    html {
      overflow: auto !important;
      height: 100% !important;
    }
    body {
      overflow: auto !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    #root {
      overflow: visible !important;
      height: auto !important;
      min-height: 100vh !important;
    }
    * {
      box-sizing: border-box !important;
    }
  `;
  document.head.appendChild(style);
  
  // Set environment variables for Clerk
  if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_c3VpdGVkLWtvZGlhay05NC5jbGVyay5hY2NvdW50cy5kZXYk';
  }
  
  // Also set on window for web access
  (window as any).__CLERK_PUBLISHABLE_KEY__ = 'pk_test_c3VpdGVkLWtvZGlhay05NC5jbGVyay5hY2NvdW50cy5kZXYk';
  
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
}

function App() {
  // Try multiple sources for the Clerk publishable key
  const clerkPublishableKey = 
    Constants.expoConfig?.extra?.clerkPublishableKey ||
    (typeof window !== 'undefined' ? (window as any).__CLERK_PUBLISHABLE_KEY__ : null) ||
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    'pk_test_c3VpdGVkLWtvZGlhay05NC5jbGVyay5hY2NvdW50cy5kZXYk';
  
  console.log('Clerk publishable key:', clerkPublishableKey ? 'Found' : 'Missing');
  console.log('Key source:', Constants.expoConfig?.extra?.clerkPublishableKey ? 'Constants' : 'Fallback');
  
  return (
    <ClerkProvider 
      publishableKey={clerkPublishableKey}
      appearance={{
        baseTheme: 'dark',
        variables: {
          colorPrimary: '#667eea',
          colorBackground: '#0f0f23',
          colorText: '#ffffff',
          colorTextSecondary: 'rgba(255, 255, 255, 0.8)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        elements: {
          modalBackdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          modalContent: {
            backgroundColor: '#1a1a2e',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
          },
          card: {
            backgroundColor: '#1a1a2e',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
          },
          formButtonPrimary: {
            backgroundColor: '#667eea',
            '&:hover': {
              backgroundColor: '#5a6fd8',
            },
          },
          headerTitle: {
            color: '#ffffff',
            fontWeight: '600',
          },
          headerSubtitle: {
            color: 'rgba(255, 255, 255, 0.9)',
          },
          socialButtonsBlockButton: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            },
          },
          socialButtonsBlockButtonText: {
            color: '#ffffff',
            fontWeight: '500',
          },
          socialButtonsBlockButtonIcon: {
            color: '#667eea',
            filter: 'brightness(1.2)',
          },
          formFieldInput: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            borderRadius: '8px',
            '&:focus': {
              borderColor: '#667eea',
              boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)',
            },
          },
          formFieldLabel: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '500',
          },
          footerActionText: {
            color: 'rgba(255, 255, 255, 0.8)',
          },
          footerActionLink: {
            color: '#667eea',
            fontWeight: '500',
          },
          dividerLine: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          dividerText: {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          // Icon visibility improvements
          iconButton: {
            color: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.2)',
              color: '#5a6fd8',
            },
          },
          buttonIcon: {
            color: '#667eea',
            filter: 'brightness(1.3)',
          },
          // Form field icons
          formFieldIcon: {
            color: '#667eea',
            opacity: '0.8',
          },
          // Header icons
          headerIcon: {
            color: '#feca57',
            filter: 'brightness(1.2)',
          },
          // Footer icons
          footerIcon: {
            color: '#667eea',
            filter: 'brightness(1.1)',
          },
          // Clerk branding elements
          footer: {
            backgroundColor: 'transparent',
          },
          footerText: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.8rem',
          },
          footerBranding: {
            color: '#667eea',
            fontWeight: '500',
          },
          // Clerk logo and branding
          logoBox: {
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '6px',
            padding: '0.5rem',
          },
          logoImage: {
            filter: 'brightness(1.5) contrast(1.2)',
          },
          // "Secured by Clerk" text
          securedByText: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.75rem',
            fontWeight: '500',
          },
          securedByBrand: {
            color: '#feca57',
            fontWeight: '700',
            filter: 'brightness(1.2)',
          },
          // Alternative selectors for "Secured by Clerk"
          footerText: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.75rem',
            fontWeight: '500',
          },
          footerBranding: {
            color: '#feca57',
            fontWeight: '700',
            filter: 'brightness(1.2)',
          },
          // Generic footer text improvements
          footerActionText: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.8rem',
            fontWeight: '500',
          },
          // Clerk footer elements
          clerkFooter: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1rem',
          },
          clerkFooterText: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.8rem',
          },
          clerkFooterLink: {
            color: '#667eea',
            textDecoration: 'none',
            '&:hover': {
              color: '#5a6fd8',
            },
          },
          // UserButton profile dropdown
          userButtonPopoverCard: {
            backgroundColor: '#1a1a2e',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          },
          userButtonPopoverActions: {
            backgroundColor: 'transparent',
          },
          userButtonPopoverActionButton: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
          },
          userButtonPopoverActionButtonText: {
            color: '#ffffff',
            fontWeight: '500',
          },
          userButtonPopoverActionButtonIcon: {
            color: '#667eea',
            filter: 'brightness(1.3)',
          },
          userButtonPopoverFooter: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          },
          userButtonPopoverFooterText: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.8rem',
          },
          userButtonPopoverFooterLink: {
            color: '#667eea',
            fontWeight: '500',
            '&:hover': {
              color: '#5a6fd8',
            },
          },
          // Target the specific "Secured by Clerk" elements in UserButton popover
          userButtonPopoverFooter: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            '& p': {
              color: 'rgba(255, 255, 255, 0.9) !important',
              fontSize: '0.75rem !important',
              fontWeight: '500 !important',
            },
            '& a': {
              color: '#feca57 !important',
              fontWeight: '600 !important',
              filter: 'brightness(1.2) !important',
              '&:hover': {
                color: '#ffd700 !important',
              },
            },
            '& svg': {
              filter: 'brightness(1.3) !important',
            },
          },
          // Profile modal specific elements
          profileSectionTitle: {
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '1rem',
          },
          profileSectionContent: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '1rem',
          },
          profileFieldLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '500',
            fontSize: '0.9rem',
          },
          profileFieldValue: {
            color: '#ffffff',
            fontSize: '0.9rem',
          },
          profileActionButton: {
            backgroundColor: '#667eea',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            fontWeight: '500',
            '&:hover': {
              backgroundColor: '#5a6fd8',
            },
          },
        },
      }}
    >
      <AppContent />
    </ClerkProvider>
  );
}

export default App;
import React from 'react';

interface LegalPageProps {
  title: string;
  content: React.ReactNode;
}

export default function LegalPage({ title, content }: LegalPageProps) {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: 'white',
      color: '#333',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: 1.6,
      minHeight: '100vh',
    },
    header: {
      backgroundColor: '#0f0f23',
      color: 'white',
      padding: '1rem 2rem',
      marginBottom: '2rem',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    backLink: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer',
    },
    title: {
      color: '#667eea',
      marginBottom: '1rem',
      fontSize: '2.5rem',
      textAlign: 'center' as const,
    },
    content: {
      textAlign: 'justify' as const,
    },
    highlight: {
      backgroundColor: '#d1ecf1',
      padding: '1rem',
      borderLeft: '4px solid #17a2b8',
      margin: '1rem 0',
    },
    warning: {
      backgroundColor: '#f8d7da',
      padding: '1rem',
      borderLeft: '4px solid #dc3545',
      margin: '1rem 0',
    },
    success: {
      backgroundColor: '#d4edda',
      padding: '1rem',
      borderLeft: '4px solid #28a745',
      margin: '1rem 0',
    },
    lastUpdated: {
      fontStyle: 'italic',
      color: '#666',
      textAlign: 'center' as const,
      marginTop: '2rem',
      paddingTop: '1rem',
      borderTop: '1px solid #eee',
    },
    h2: {
      color: '#333',
      marginTop: '2rem',
      marginBottom: '1rem',
      fontSize: '1.5rem',
      borderBottom: '2px solid #667eea',
      paddingBottom: '0.5rem',
    },
    h3: {
      color: '#555',
      marginTop: '1.5rem',
      marginBottom: '0.5rem',
      fontSize: '1.2rem',
    },
    p: {
      marginBottom: '1rem',
    },
    ul: {
      marginLeft: '2rem',
      marginBottom: '1rem',
    },
    li: {
      marginBottom: '0.5rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      margin: '1rem 0',
    },
    th: {
      border: '1px solid #ddd',
      padding: '0.75rem',
      textAlign: 'left' as const,
      backgroundColor: '#f8f9fa',
      fontWeight: '600',
    },
    td: {
      border: '1px solid #ddd',
      padding: '0.75rem',
      textAlign: 'left' as const,
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>Brouhaha</div>
          <a href="/" style={styles.backLink}>← Back to Brouhaha</a>
        </nav>
      </header>
      
      <h1 style={styles.title}>{title}</h1>
      
      <div style={styles.content}>
        {content}
      </div>
    </div>
  );
}

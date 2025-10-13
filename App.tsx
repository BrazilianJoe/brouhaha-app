import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  console.log('App component rendering');
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Brouhaha</h1>
      <h2 style={styles.subtitle}>Media Platform</h2>
      <p style={styles.description}>
        Cross-platform media consumption for webtoons, books, and videos
      </p>
      <div style={styles.status}>
        ✅ App is running successfully!
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#667eea',
    minHeight: '100vh',
    margin: 0,
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: '10px',
    margin: 0,
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: '20px',
    margin: 0,
  },
  description: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: '30px',
    lineHeight: '24px',
    maxWidth: '400px',
  },
  status: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '15px',
    borderRadius: '8px',
  },
};

// Mount the app
if (typeof window !== 'undefined') {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
}

export default App;
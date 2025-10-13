import React from 'react';
import LegalPage from './LegalPage';

export default function TermsOfService() {
  const content = (
    <>
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '1rem',
        borderLeft: '4px solid #ffc107',
        margin: '1rem 0',
      }}>
        <strong>Effective Date:</strong> January 1, 2025<br />
        <strong>Last Updated:</strong> January 1, 2025
      </div>
      
      <p>Welcome to Brouhaha! These Terms of Service ("Terms") govern your use of our cross-platform media consumption service, including webtoons, books, videos, and related features. By accessing or using Brouhaha, you agree to be bound by these Terms.</p>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>1. Acceptance of Terms</h2>
      <p>By creating an account, accessing our platform, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our services.</p>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>2. Description of Service</h2>
      <p>Brouhaha is a cross-platform media consumption platform that provides:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Access to webtoons, books, and videos</li>
        <li>Content creation and self-publishing tools</li>
        <li>Subscription-based ad-free experiences</li>
        <li>Community features and social interactions</li>
        <li>Analytics and content recommendations</li>
      </ul>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>3. User Accounts and Registration</h2>
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>3.1 Account Creation</h3>
      <p>To access our services, you must create a free account. You agree to:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Provide accurate, current, and complete information</li>
        <li>Maintain and update your account information</li>
        <li>Keep your login credentials secure</li>
        <li>Notify us immediately of any unauthorized use</li>
      </ul>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>3.2 Account Types</h3>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Reader:</strong> Free access to consume content with advertisements</li>
        <li><strong>Creator:</strong> Ability to upload and publish content</li>
        <li><strong>Subscriber:</strong> Ad-free experience with premium features</li>
        <li><strong>Moderator/Admin:</strong> Platform management capabilities</li>
      </ul>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>4. Content and Intellectual Property</h2>
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>4.1 User-Generated Content</h3>
      <p>By uploading content to Brouhaha, you grant us a non-exclusive, worldwide, royalty-free license to:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Host, display, and distribute your content</li>
        <li>Create derivative works for platform functionality</li>
        <li>Use content for analytics and recommendation systems</li>
        <li>Use content for AI training and improvement (with opt-out for paying customers)</li>
        <li>Moderate and remove content that violates these Terms</li>
      </ul>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>4.2 Content Ownership</h3>
      <p>You retain ownership of your original content. However, you represent and warrant that:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>You have the right to grant the licenses above</li>
        <li>Your content does not infringe on third-party rights</li>
        <li>Your content complies with our Content Guidelines</li>
      </ul>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>5. Content Guidelines and Prohibited Uses</h2>
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>5.1 Prohibited Content</h3>
      <p>You may not upload, post, or share content that:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Contains illegal, harmful, or dangerous material</li>
        <li>Infringes on intellectual property rights</li>
        <li>Contains hate speech, harassment, or discrimination</li>
        <li>Includes explicit sexual content involving minors</li>
        <li>Promotes violence, self-harm, or dangerous activities</li>
        <li>Contains spam, malware, or malicious code</li>
        <li>Violates applicable laws or regulations</li>
      </ul>
      
      <div style={{
        backgroundColor: '#f8d7da',
        padding: '1rem',
        borderLeft: '4px solid #dc3545',
        margin: '1rem 0',
      }}>
        <strong>Important:</strong> We are not liable for user-generated content. Users are responsible for their own content and any consequences thereof.
      </div>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>6. Privacy and Data Usage</h2>
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>6.1 AI Training and Analytics</h3>
      <p>We may use your content and data for:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Improving our recommendation algorithms</li>
        <li>Training AI models for content analysis</li>
        <li>Enhancing user experience and platform features</li>
        <li>Conducting research and analytics</li>
      </ul>
      
      <div style={{
        backgroundColor: '#d1ecf1',
        padding: '1rem',
        borderLeft: '4px solid #17a2b8',
        margin: '1rem 0',
      }}>
        <strong>Opt-Out Rights:</strong> Paying subscribers have the right to opt-out of having their content used for AI training. Contact us to exercise this right.
      </div>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>7. Digital Rights Management (DRM)</h2>
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>7.1 Content Protection</h3>
      <p>We implement various DRM measures to protect content:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Encrypted content delivery</li>
        <li>Time-limited access tokens</li>
        <li>Device fingerprinting and authentication</li>
        <li>Watermarking and anti-piracy measures</li>
      </ul>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>8. Limitation of Liability</h2>
      <div style={{
        backgroundColor: '#f8d7da',
        padding: '1rem',
        borderLeft: '4px solid #dc3545',
        margin: '1rem 0',
      }}>
        <p><strong>Important Legal Notice:</strong> Brouhaha is provided "as is" without warranties of any kind. We are not liable for:</p>
        <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
          <li>Third-party content or user-generated material</li>
          <li>Service interruptions or technical issues</li>
          <li>Indirect, incidental, or consequential damages</li>
          <li>Loss of data, profits, or business opportunities</li>
        </ul>
      </div>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>9. Contact Information</h2>
      <p>For questions about these Terms, please contact us:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Email: legal@brouhaha.com</li>
        <li>Address: [Company Address]</li>
        <li>Phone: [Contact Number]</li>
      </ul>
      
      <div style={{
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'center',
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid #eee',
      }}>
        <p>This Terms of Service was last updated on January 1, 2025.</p>
        <p>By using Brouhaha, you acknowledge that you have read and agree to these Terms.</p>
      </div>
    </>
  );

  return <LegalPage title="Terms of Service" content={content} />;
}

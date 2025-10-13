import React from 'react';
import LegalPage from './LegalPage';

export default function PrivacyPolicy() {
  const content = (
    <>
      <div style={{
        backgroundColor: '#d1ecf1',
        padding: '1rem',
        borderLeft: '4px solid #17a2b8',
        margin: '1rem 0',
      }}>
        <strong>Effective Date:</strong> January 1, 2025<br />
        <strong>Last Updated:</strong> January 1, 2025<br />
        <strong>Compliance:</strong> GDPR, CCPA, PIPEDA, LGPD, and other applicable privacy laws
      </div>
      
      <p>At Brouhaha, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and share your personal information. This Privacy Policy explains our practices regarding your data when you use our cross-platform media consumption service.</p>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>1. Information We Collect</h2>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>1.1 Information You Provide Directly</h3>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        margin: '1rem 0',
      }}>
        <thead>
          <tr>
            <th style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
              backgroundColor: '#f8f9fa',
              fontWeight: '600',
            }}>Data Type</th>
            <th style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
              backgroundColor: '#f8f9fa',
              fontWeight: '600',
            }}>Examples</th>
            <th style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
              backgroundColor: '#f8f9fa',
              fontWeight: '600',
            }}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Account Information</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Email, username, password, profile details</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Account creation, authentication, personalization</td>
          </tr>
          <tr>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Content</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Uploaded webtoons, books, videos, comments</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Platform functionality, content delivery</td>
          </tr>
          <tr>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Payment Information</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Billing address, payment method (processed by Stripe)</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Subscription management, billing</td>
          </tr>
        </tbody>
      </table>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>1.2 Information We Collect Automatically</h3>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Usage Data:</strong> Content consumption patterns, time spent, preferences</li>
        <li><strong>Device Information:</strong> Device type, operating system, browser, IP address</li>
        <li><strong>Location Data:</strong> General location (country/region) for content delivery</li>
        <li><strong>Analytics Data:</strong> Platform performance, error logs, user interactions</li>
        <li><strong>Cookies and Tracking:</strong> Session data, preferences, authentication tokens</li>
      </ul>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>2. How We Use Your Information</h2>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>2.1 AI Training and Machine Learning</h3>
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '1.5rem',
        borderRadius: '8px',
        margin: '1rem 0',
        border: '1px solid #ffeaa7',
      }}>
        <h4 style={{ marginBottom: '1rem' }}>AI Training Usage</h4>
        <p>We may use your content and data to train AI models for:</p>
        <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
          <li>Content recommendation algorithms</li>
          <li>Content moderation and safety systems</li>
          <li>Automated content analysis and categorization</li>
          <li>Improving user experience and platform features</li>
        </ul>
        
        <div style={{
          backgroundColor: '#d4edda',
          padding: '1rem',
          borderLeft: '4px solid #28a745',
          margin: '1rem 0',
        }}>
          <strong>Your Rights:</strong> Paying subscribers have the right to opt-out of AI training. Free users' content may be used for AI training as part of the free service agreement.
        </div>
      </div>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>3. Your Privacy Rights</h2>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>3.1 General Rights</h3>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Access:</strong> Request a copy of your personal data</li>
        <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
        <li><strong>Erasure:</strong> Request deletion of your personal data</li>
        <li><strong>Portability:</strong> Receive your data in a structured format</li>
        <li><strong>Restriction:</strong> Limit how we process your data</li>
        <li><strong>Objection:</strong> Object to certain processing activities</li>
      </ul>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>3.2 Special Rights for Paying Customers</h3>
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '1.5rem',
        borderRadius: '8px',
        margin: '1rem 0',
        border: '1px solid #ffeaa7',
      }}>
        <h4 style={{ marginBottom: '1rem' }}>Enhanced Privacy Rights</h4>
        <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
          <li><strong>AI Training Opt-Out:</strong> Exclude your content from AI training</li>
          <li><strong>Advanced Analytics Control:</strong> Limit detailed usage analytics</li>
          <li><strong>Data Minimization:</strong> Request reduced data collection</li>
          <li><strong>Priority Support:</strong> Faster response to privacy requests</li>
        </ul>
      </div>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>4. Data Security</h2>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>4.1 Security Measures</h3>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Encryption of data in transit and at rest</li>
        <li>Regular security audits and assessments</li>
        <li>Access controls and authentication systems</li>
        <li>Secure coding practices and vulnerability management</li>
        <li>Employee training on data protection</li>
      </ul>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>5. Children's Privacy</h2>
      
      <div style={{
        backgroundColor: '#f8d7da',
        padding: '1rem',
        borderLeft: '4px solid #dc3545',
        margin: '1rem 0',
      }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Age Restrictions</h3>
        <p>Our platform is not intended for children under 13 (US) or 16 (EU). We do not knowingly collect personal information from children. If we discover we have collected data from a child, we will delete it immediately.</p>
      </div>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>6. California Privacy Rights (CCPA)</h2>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>6.1 California Consumer Rights</h3>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Right to Know:</strong> What personal information we collect and how we use it</li>
        <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
        <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information</li>
        <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
      </ul>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>7. Data Retention and Deletion</h2>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>7.1 General Retention Policy</h3>
      <p>We retain your personal data for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. The specific retention periods depend on the type of data and the purpose for which it was collected.</p>
      
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '1rem',
        borderLeft: '4px solid #ffc107',
        margin: '1rem 0',
      }}>
        <strong>Important:</strong> We may retain certain data for an indeterminate period when necessary for legitimate business purposes, legal compliance, or to protect our rights and interests.
      </div>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>7.2 Account Deletion Upon Request</h3>
      <p>You have the right to request deletion of your account and associated personal data. When you request account deletion:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>We will permanently delete your account and personal information</li>
        <li>Your content will be removed from our platform</li>
        <li>We will stop processing your data for our services</li>
        <li>Deletion will be completed within 30 days of your request</li>
      </ul>
      
      <div style={{
        backgroundColor: '#d1ecf1',
        padding: '1rem',
        borderLeft: '4px solid #17a2b8',
        margin: '1rem 0',
      }}>
        <strong>How to Request Deletion:</strong> Contact us at privacy@brouhaha.com or use the account deletion feature in your account settings. We may require verification of your identity before processing the request.
      </div>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>7.3 Legal Requirements and Compliance</h3>
      <p>We may retain certain data beyond normal retention periods when required by applicable laws, regulations, or legal processes:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Financial Records:</strong> Payment and billing information retained for 7 years as required by tax and accounting laws</li>
        <li><strong>Legal Holds:</strong> Data preserved when subject to litigation, regulatory investigation, or law enforcement requests</li>
        <li><strong>Audit Requirements:</strong> Records maintained for internal and external audit purposes</li>
        <li><strong>Regulatory Compliance:</strong> Data retained to comply with industry-specific regulations</li>
        <li><strong>Security Incidents:</strong> Information preserved for security investigation and prevention</li>
      </ul>
      
      <div style={{
        backgroundColor: '#f8d7da',
        padding: '1rem',
        borderLeft: '4px solid #dc3545',
        margin: '1rem 0',
      }}>
        <strong>Legal Exception:</strong> Even if you request account deletion, we may retain certain data if we are legally required to do so or if retention is necessary to protect our legitimate interests, resolve disputes, or enforce our agreements.
      </div>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>7.4 Data Retention Schedule</h3>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        margin: '1rem 0',
      }}>
        <thead>
          <tr>
            <th style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
              backgroundColor: '#f8f9fa',
              fontWeight: '600',
            }}>Data Type</th>
            <th style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
              backgroundColor: '#f8f9fa',
              fontWeight: '600',
            }}>Retention Period</th>
            <th style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
              backgroundColor: '#f8f9fa',
              fontWeight: '600',
            }}>Legal Basis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Account Information</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Until deletion request</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Service provision</td>
          </tr>
          <tr>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>User Content</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Until deletion request</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Platform functionality</td>
          </tr>
          <tr>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Payment Records</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>7 years minimum</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Tax and accounting laws</td>
          </tr>
          <tr>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Usage Analytics</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>24 months</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Service improvement</td>
          </tr>
          <tr>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Support Communications</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>3 years</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Customer service</td>
          </tr>
          <tr>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Legal Hold Data</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Until legal matter resolved</td>
            <td style={{
              border: '1px solid #ddd',
              padding: '0.75rem',
              textAlign: 'left',
            }}>Legal obligation</td>
          </tr>
        </tbody>
      </table>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>7.5 Post-Deletion Rights</h3>
      <p>After account deletion, you retain certain rights:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Request confirmation that your data has been deleted</li>
        <li>Receive a copy of any data that must be retained for legal reasons</li>
        <li>Object to continued processing of retained data</li>
        <li>Request restriction of processing for retained data</li>
      </ul>
      
      <h2 style={{
        color: '#333',
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
      }}>8. Contact Information</h2>
      
      <h3 style={{
        color: '#555',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
      }}>7.1 Privacy Team</h3>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Email:</strong> privacy@brouhaha.com</li>
        <li><strong>Data Protection Officer:</strong> dpo@brouhaha.com</li>
        <li><strong>Address:</strong> [Company Address]</li>
        <li><strong>Phone:</strong> [Contact Number]</li>
      </ul>
      
      <div style={{
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'center',
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid #eee',
      }}>
        <p>This Privacy Policy was last updated on January 1, 2025.</p>
        <p>By using Brouhaha, you acknowledge that you have read and understand this Privacy Policy.</p>
      </div>
    </>
  );

  return <LegalPage title="Privacy Policy" content={content} />;
}

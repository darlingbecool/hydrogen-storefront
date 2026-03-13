import {Link} from 'react-router';
import {useState, useEffect} from 'react';

const playfair = "'Playfair Display', serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const subtleText = "#4A4A4A";

export const meta = () => {
  return [{title: 'Privacy Policy | Mercer 94'}];
};

export default function PrivacyPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ background: 'white', marginLeft: isMobile ? '0' : '50px' }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${warmBg} 0%, #E8D7AE 50%, ${warmBg} 100%)`,
        padding: isMobile ? "60px 24px" : "80px 0",
        paddingLeft: isMobile ? "24px" : "298px",
        paddingRight: isMobile ? "24px" : "48px",
        textAlign: "center",
        marginLeft: isMobile ? '0' : '-250px',
        marginRight: isMobile ? '0' : '-48px',
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h1 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 36 : 48,
            color: darkText,
            marginBottom: 16,
            fontWeight: 400,
            lineHeight: 1.2
          }}>
            Privacy Policy
          </h1>
          <div style={{
            width: 80, height: 2, background: goldAccent, margin: "0 auto", opacity: 0.6
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "white", padding: isMobile ? "48px 24px" : "80px 48px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          <p style={{ fontSize: 14, color: subtleText, marginBottom: 32 }}>
            Last updated: February 2026
          </p>

          {[
            {
              title: "Information We Collect",
              body: "We collect information you provide when placing an order, including your name, email address, shipping address, and payment details. We also collect information about your device and how you interact with our website."
            },
            {
              title: "How We Use Your Information",
              body: "We use your information to process orders, communicate with you about your commission, improve our services, and send you updates about new pieces if you've opted in to our newsletter. We will never sell your personal information to third parties."
            },
            {
              title: "Data Security",
              body: "We take the security of your personal information seriously and use industry-standard encryption and security measures to protect your data. Payment information is processed securely through our payment provider and is not stored on our servers."
            },
            {
              title: "Cookies",
              body: "We use cookies to improve your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences."
            },
            {
              title: "Your Rights",
              body: "Under GDPR, you have the right to access, correct, or delete your personal data. You can also object to processing, request data portability, and withdraw consent at any time. To exercise these rights, please contact us."
            },
            {
              title: "Third-Party Services",
              body: "We use trusted third-party services to process payments, fulfill orders, and send emails. These services have their own privacy policies and we encourage you to review them."
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 style={{
                fontFamily: playfair,
                fontSize: isMobile ? 22 : 28,
                color: darkText,
                marginBottom: 20,
                marginTop: 48,
                fontWeight: 400
              }}>
                {section.title}
              </h2>
              <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 32 }}>
                {section.body}
              </p>
            </div>
          ))}

          <p style={{ fontSize: 15, color: subtleText, lineHeight: 1.7, marginTop: 48, fontStyle: "italic" }}>
            Questions about our privacy policy?{' '}
            <Link to="/pages/contact" style={{ color: darkText, textDecoration: 'underline' }}>Contact us</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

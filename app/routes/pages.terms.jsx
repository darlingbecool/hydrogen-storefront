import {Link} from 'react-router';
import {useState, useEffect} from 'react';

const playfair = "'Playfair Display', serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const subtleText = "#4A4A4A";

export const meta = () => {
  return [{title: 'Terms & Conditions | Mercer 94'}];
};

export default function TermsPage() {
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
            Terms & Conditions
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
              title: "Made to Order",
              body: "All pieces are made to order. Production times range from 3-8 weeks depending on the piece. By placing an order, you acknowledge and accept these lead times."
            },
            {
              title: "Returns Policy",
              body: "Due to the bespoke nature of our work, we cannot accept returns or exchanges unless your piece arrives damaged or defective. Please ensure your sizing and personalization details are correct before ordering."
            },
            {
              title: "Pricing & Payment",
              body: "All prices are in GBP and include VAT where applicable. Payment is taken at the time of order. We accept major credit cards and bank transfers for large commissions."
            },
            {
              title: "Intellectual Property",
              body: "All designs, images, and content on this site are the property of Mercer 94 and may not be reproduced without permission."
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
            Questions about these terms?{' '}
            <Link to="/pages/contact" style={{ color: darkText, textDecoration: 'underline' }}>Contact us</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

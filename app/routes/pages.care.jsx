import {Link} from 'react-router';
import {useState, useEffect} from 'react';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";

export const meta = () => {
  return [{title: 'Care Guide | Mercer 94'}];
};

export default function CareGuidePage() {
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
            Care Guide
          </h1>
          <div style={{
            width: 80,
            height: 2,
            background: goldAccent,
            margin: "0 auto",
            opacity: 0.6
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "white", padding: isMobile ? "48px 24px" : "80px 48px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          <p style={{
            fontSize: isMobile ? 16 : 18,
            color: subtleText,
            lineHeight: 1.8,
            marginBottom: 32,
            textAlign: 'center'
          }}>
            Solid gold jewelry is remarkably durable and improves with age. With proper care, your pieces will last for generations.
          </p>

          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 26 : 32,
            color: darkText,
            marginBottom: 20,
            marginTop: 56,
            fontWeight: 400
          }}>
            Daily Wear
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
            Our jewelry is designed for everyday wear. Solid gold is naturally resistant to tarnish and can be worn while washing hands, showering, or swimming. However, we recommend removing your jewelry before:
          </p>
          <ul style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 2, marginBottom: 32, paddingLeft: 24 }}>
            <li>Heavy exercise or manual work</li>
            <li>Using harsh chemicals or cleaning products</li>
            <li>Applying lotions, perfumes, or hairspray (wait until they're absorbed)</li>
          </ul>

          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 26 : 32,
            color: darkText,
            marginBottom: 20,
            marginTop: 56,
            fontWeight: 400
          }}>
            Cleaning
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
            Clean your pieces every few months with warm water and mild soap. Use a soft toothbrush to gently remove any buildup, then rinse and pat dry with a soft cloth.
          </p>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 32 }}>
            For a deeper clean, bring your piece to any jeweler for professional cleaning. Most will do this for free or a small fee.
          </p>

          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 26 : 32,
            color: darkText,
            marginBottom: 20,
            marginTop: 56,
            fontWeight: 400
          }}>
            Storage
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 32 }}>
            Store pieces separately to prevent scratching. We include a soft pouch with every order—perfect for storage when not wearing your jewelry.
          </p>

          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 26 : 32,
            color: darkText,
            marginBottom: 20,
            marginTop: 56,
            fontWeight: 400
          }}>
            Patina & Character
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
            Over time, gold develops a beautiful patina—a soft, matte finish that many people prefer to high polish. This is completely normal and adds character to your piece.
          </p>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 32 }}>
            If you prefer to restore the original polish, any jeweler can re-polish your piece. This won't damage the gold.
          </p>

          {/* Contact CTA */}
          <div style={{
            padding: isMobile ? 24 : 32,
            background: warmBg,
            borderRadius: 12,
            marginTop: 48,
            border: `1px solid ${goldAccent}20`
          }}>
            <h3 style={{ fontSize: 18, color: darkText, fontWeight: 500, marginBottom: 12 }}>
              Questions About Care?
            </h3>
            <p style={{ fontSize: 15, color: subtleText, lineHeight: 1.7, marginBottom: 12 }}>
              Our team is always happy to advise on caring for your specific piece.
            </p>
            <Link
              to="/pages/contact"
              style={{ fontSize: 15, color: darkText, fontWeight: 500, textDecoration: 'underline' }}
            >
              Get in touch →
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

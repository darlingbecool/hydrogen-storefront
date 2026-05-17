import {Link} from 'react-router';
import {useState, useEffect} from 'react';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";
const borderCol = "#E8D7AE";

export const meta = () => {
  return [{title: 'Packaging | Mercer 79'}];
};

export default function PackagingPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const prose = {
    fontSize: isMobile ? 15 : 17,
    color: subtleText,
    lineHeight: 1.85,
    marginBottom: 16,
    fontFamily: bodyFont,
  };

  const h2 = {
    fontFamily: playfair,
    fontSize: isMobile ? 22 : 26,
    fontWeight: 400,
    color: darkText,
    marginTop: 48,
    marginBottom: 16,
    paddingBottom: 10,
    borderBottom: `2px solid ${borderCol}`,
  };

  const wrap = {
    maxWidth: 760,
    margin: '0 auto',
    padding: isMobile ? '48px 24px 80px' : '64px 32px 100px',
    fontFamily: bodyFont,
  };

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <div style={wrap}>

        <h1 style={{
          fontFamily: playfair,
          fontSize: isMobile ? 32 : 42,
          fontWeight: 400,
          color: darkText,
          marginBottom: 8,
          marginTop: 0,
        }}>
          Packaging
        </h1>
        <p style={{ fontSize: 13, color: mutedText, marginBottom: 0, marginTop: 0 }}>
          Every Mercer 79 order arrives ready to give.
        </p>

        <h2 style={h2}>What's included</h2>
        <p style={prose}>
          Every order comes with a soft protective pouch — use it for storage when you are not wearing your piece. It is there to keep the ring in good condition, not just for the unboxing.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Full packaging details will be confirmed before launch. This page will be updated shortly.
        </p>

        <h2 style={h2}>Giving as a gift</h2>
        <p style={prose}>
          If you are ordering for someone else and would like to discuss presentation or timing, get in touch before placing your order.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Gift cards are also available — a good option if you would like someone to choose their own piece, initial, and gold.
        </p>

        <div style={{
          marginTop: 56,
          paddingTop: 40,
          borderTop: `2px solid ${borderCol}`,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          <Link
            to="/pages/gift-cards"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: darkText,
              color: 'white',
              fontFamily: bodyFont,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            View gift cards
          </Link>
          <Link
            to="/pages/contact"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: 'transparent',
              color: darkText,
              fontFamily: bodyFont,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: `1px solid ${darkText}`,
            }}
          >
            Get in touch
          </Link>
        </div>

      </div>
    </div>
  );
}

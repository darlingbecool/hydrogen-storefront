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
  return [{title: 'Our Story | Mercer 79'}];
};

export default function AboutPage() {
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
    marginBottom: 20,
    fontFamily: bodyFont,
  };

  const wrap = {
    maxWidth: 760,
    margin: '0 auto',
    padding: isMobile ? '0 24px' : '0 32px',
  };

  const rule = {
    border: 'none',
    borderTop: `2px solid ${borderCol}`,
    margin: '0',
  };

  return (
    <div style={{ background: 'white', minHeight: '100vh', fontFamily: bodyFont }}>
      <div style={{ ...wrap, paddingTop: isMobile ? 48 : 64, paddingBottom: isMobile ? 64 : 100 }}>

        {/* Page title */}
        <h1 style={{
          fontFamily: playfair,
          fontSize: isMobile ? 32 : 42,
          fontWeight: 400,
          color: darkText,
          marginBottom: 8,
          marginTop: 0,
        }}>
          Our Story
        </h1>
        <p style={{ fontSize: 13, color: mutedText, marginBottom: 40, marginTop: 0 }}>
          Mercer 79 began with a ring found in a drawer - one I have not taken off since.
        </p>

        {/* Section 1: The ring */}
        <h2 style={{
          fontFamily: playfair,
          fontSize: isMobile ? 22 : 26,
          fontWeight: 400,
          color: darkText,
          marginTop: 48,
          marginBottom: 16,
          paddingBottom: 10,
          borderBottom: `2px solid ${borderCol}`,
        }}>
          The ring that started it
        </h2>
        <p style={prose}>
          The ring belonged to my partner's uncle. An oval signet in 9ct yellow gold, engraved with his initials - SG - worn every day for decades until it was passed down, and eventually found its way into a drawer.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          I found it there, and when I looked at it properly, noticed something that stopped me: the initials engraved into the gold were the same as my children's. I put it on. I haven't taken it off since.
        </p>

        {/* Image placeholder */}
        <div style={{
          width: '100%',
          aspectRatio: '3/2',
          background: warmBg,
          border: `1px solid ${borderCol}`,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: mutedText,
          fontSize: 11,
          letterSpacing: '0.15em',
          margin: '32px 0 0',
        }}>
          IMAGE - THE ORIGINAL RING
        </div>

        {/* Section 2: The making */}
        <h2 style={{
          fontFamily: playfair,
          fontSize: isMobile ? 22 : 26,
          fontWeight: 400,
          color: darkText,
          marginTop: 56,
          marginBottom: 16,
          paddingBottom: 10,
          borderBottom: `2px solid ${borderCol}`,
        }}>
          Made by hand, in the UK
        </h2>
        <p style={prose}>
          I worked with a goldsmith to recreate the ring as closely as possible, with one change: instead of an engraved initial, the initial is set in diamonds - raised slightly from the surface, tactile as much as visual. That piece became No. 1. The Oval Signet Ring with Diamond Initial.
        </p>
        <p style={prose}>
          Nothing in the collection is held in stock. Every piece is made specifically to order, taking four to six weeks.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          The ring that inspired this brand is decades old and barely shows it. That is the standard I hold every piece to - the kind of thing you wear every day and never take off.
        </p>

        {/* Image placeholder */}
        <div style={{
          width: '100%',
          aspectRatio: '3/2',
          background: warmBg,
          border: `1px solid ${borderCol}`,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: mutedText,
          fontSize: 11,
          letterSpacing: '0.15em',
          margin: '32px 0 0',
        }}>
          IMAGE - WORKSHOP / PROCESS
        </div>

        {/* Closing CTA */}
        <div style={{
          marginTop: 64,
          paddingTop: 48,
          borderTop: `2px solid ${borderCol}`,
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: darkText,
              color: 'white',
              fontFamily: bodyFont,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              View the collection
            </Link>
            <Link to="/bespoke" style={{
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
            }}>
              Enquire about bespoke
            </Link>
          </div>
        </div>


      </div>
    </div>
  );
}

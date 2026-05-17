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
  return [{title: 'Care Guide | Mercer 79'}];
};

export default function CareGuidePage() {
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

        {/* Page title */}
        <h1 style={{
          fontFamily: playfair,
          fontSize: isMobile ? 32 : 42,
          fontWeight: 400,
          color: darkText,
          marginBottom: 8,
          marginTop: 0,
        }}>
          Care Guide
        </h1>
        <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.85, marginBottom: 0, marginTop: 0 }}>
          Solid gold is one of the most durable materials in jewellery. Looked after well, a piece can last decades without losing anything. The ring that inspired this brand is proof of that.
        </p>

        {/* Daily wear */}
        <h2 style={h2}>Daily wear</h2>
        <p style={prose}>
          Mercer 79 pieces are made to be worn every day, not kept for occasions. That said, there are a few things worth avoiding to keep your ring in the best condition.
        </p>
        <p style={prose}>
          Remove your ring before heavy exercise, manual work, or using cleaning products, bleach, or harsh chemicals. These won't necessarily cause immediate damage, but repeated exposure will dull the surface over time.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Apply lotions, perfumes, and hand creams before putting your ring on, not after. Allow them to absorb fully first.
        </p>

        {/* Cleaning */}
        <h2 style={h2}>Cleaning</h2>
        <p style={prose}>
          Clean your ring every few months, or whenever it starts to look dull. Warm water, a small amount of mild washing-up liquid, and a soft toothbrush is all you need. Work gently around the diamond setting, rinse thoroughly, and pat dry with a soft cloth - do not leave it to air dry.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          For a more thorough clean, any local jeweller will be able to help. Most do this routinely and it takes only a few minutes.
        </p>

        {/* Storage */}
        <h2 style={h2}>Storage</h2>
        <p style={prose}>
          Every Mercer 79 order comes with a soft pouch - use it. Storing your ring loose with other jewellery is the most common cause of surface scratches, and gold is softer than most people expect.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Keep it somewhere dry. Avoid leaving it on the edge of a sink or in a bathroom cabinet long-term - humidity and condensation are not good for gold over time.
        </p>

        {/* Patina */}
        <h2 style={h2}>Patina and polish</h2>
        <p style={prose}>
          With wear, gold develops a patina - a slightly softer, more matte finish than the original high polish. This is normal and, for many people, preferable. The ring that started Mercer 79 has it, and it looks all the better for the years of wear.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          If you want to restore the original finish, any jeweller can re-polish your ring. It will not affect the gold or the diamond setting.
        </p>

        {/* CTA */}
        <div style={{
          marginTop: 56,
          paddingTop: 40,
          borderTop: `2px solid ${borderCol}`,
        }}>
          <p style={prose}>
            If you have a question about caring for your specific piece, get in touch.
          </p>
          <Link
            to="/pages/contact"
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
            Get in touch
          </Link>
        </div>

      </div>
    </div>
  );
}

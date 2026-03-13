import {Link} from 'react-router';
import {useState, useEffect} from 'react';

// Design constants
const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";

export const meta = () => {
  return [{title: 'About | Mercer 94'}];
};

export default function AboutPage() {
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
            Our Story
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

      {/* Opening Text */}
      <div style={{
        background: "white",
        padding: isMobile ? "48px 24px 32px" : "80px 48px 40px"
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{
            fontSize: isMobile ? 16 : 18,
            color: subtleText,
            lineHeight: 1.8,
            marginBottom: 32,
            textAlign: 'center'
          }}>
            Some things are just made differently. There's a signet ring that started all of this — a chunky, oversized gold signet that belonged to my partner's uncle, engraved with his initials, worn every day for decades. When it was passed down, it found its way onto my hand. And that's when I noticed something that stopped me: the initials engraved into the gold were the same as my children's.
          </p>
          <p style={{
            fontSize: isMobile ? 16 : 18,
            color: subtleText,
            lineHeight: 1.8,
            marginBottom: 0,
            textAlign: 'center'
          }}>
            A small miracle, as these things go. The kind that makes you look at an object completely differently.
          </p>
        </div>
      </div>

      {/* Section 1: The Making — Image Left */}
      <div style={{
        padding: isMobile ? "40px 24px" : "60px 48px",
        background: "white"
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 60,
          alignItems: "center"
        }}>
          {/* Image placeholder */}
          <div style={{
            width: "100%",
            aspectRatio: "4/3",
            background: "linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%)",
            border: "8px solid rgba(180,175,165,0.25)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: mutedText,
            fontSize: 14,
            letterSpacing: "0.15em"
          }}>
            WORKSHOP / ATELIER PHOTO
          </div>
          <div>
            <h2 style={{
              fontFamily: playfair,
              fontSize: isMobile ? 28 : 36,
              color: darkText,
              marginBottom: 24,
              fontWeight: 400
            }}>
              Made by Hand, in London
            </h2>
            <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
              Every Mercer 94 piece is made to order in my London studio. The designs draw on traditional jewellery-making for their shapes and sensibility — the same methods behind the vintage pieces that inspired the brand — combined with contemporary techniques where they serve the work better.
            </p>
            <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 0 }}>
              Nothing is held in stock. Nothing is rushed. Each piece is made specifically for the person who ordered it, using 9ct, 14ct or 18ct gold with ethically sourced materials — including natural and lab-grown diamonds.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Made to Last — Image Right */}
      <div style={{
        padding: isMobile ? "40px 24px" : "60px 48px",
        background: "white"
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 60,
          alignItems: "center"
        }}>
          <div>
            <h2 style={{
              fontFamily: playfair,
              fontSize: isMobile ? 28 : 36,
              color: darkText,
              marginBottom: 24,
              fontWeight: 400
            }}>
              Built to Last a Lifetime
            </h2>
            <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
              The ring that started Mercer 94 is thirty years old and barely shows it. No thinning, no wearing away — just a quiet, stubborn beauty that refuses to age. That's the standard every piece here is held to.
            </p>
            <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 0 }}>
              Each order carries a lead time of around eight weeks — not a caveat, just an honest reflection of what it takes to make something properly. Every piece leaves the studio hallmarked by the London Assay Office, which has been certifying the quality of British precious metals since 1478.
            </p>
          </div>
          {/* Image placeholder */}
          <div style={{
            width: "100%",
            aspectRatio: "4/3",
            background: "linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%)",
            border: "8px solid rgba(180,175,165,0.25)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: mutedText,
            fontSize: 14,
            letterSpacing: "0.15em"
          }}>
            ENGRAVING / PROCESS PHOTO
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{
        background: "white",
        padding: isMobile ? "48px 24px" : "80px 48px"
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 28 : 36,
            color: darkText,
            marginBottom: 40,
            fontWeight: 400,
            textAlign: 'center'
          }}>
            How I Work
          </h2>
          <div style={{
            padding: isMobile ? 24 : 32,
            background: warmBg,
            borderRadius: 12,
            marginBottom: 24,
            border: `1px solid ${goldAccent}20`
          }}>
            <h3 style={{ fontFamily: playfair, fontSize: 18, color: darkText, fontWeight: 500, marginBottom: 12 }}>No stock. No compromise.</h3>
            <p style={{ fontSize: 15, color: subtleText, lineHeight: 1.7, margin: 0 }}>
              Every piece is made to order. That means your piece is made for you — not pulled from a shelf, not mass produced, not sitting in a warehouse.
            </p>
          </div>
          <div style={{
            padding: isMobile ? 24 : 32,
            background: warmBg,
            borderRadius: 12,
            marginBottom: 24,
            border: `1px solid ${goldAccent}20`
          }}>
            <h3 style={{ fontFamily: playfair, fontSize: 18, color: darkText, fontWeight: 500, marginBottom: 12 }}>Ethically sourced, always.</h3>
            <p style={{ fontSize: 15, color: subtleText, lineHeight: 1.7, margin: 0 }}>
              All gold is ethically sourced. Diamonds — natural or lab-grown — come from certified suppliers. The materials are held to the same standard as the making.
            </p>
          </div>
          <div style={{
            padding: isMobile ? 24 : 32,
            background: warmBg,
            borderRadius: 12,
            marginBottom: 48,
            border: `1px solid ${goldAccent}20`
          }}>
            <h3 style={{ fontFamily: playfair, fontSize: 18, color: darkText, fontWeight: 500, marginBottom: 12 }}>Designed to be worn, not displayed.</h3>
            <p style={{ fontSize: 15, color: subtleText, lineHeight: 1.7, margin: 0 }}>
              The pieces here are inspired by jewellery that has been worn every day for decades and still looks extraordinary. That's what Mercer 94 is trying to make.
            </p>
          </div>

          {/* Closing quote */}
          <div style={{
            textAlign: "center",
            padding: isMobile ? 32 : 48,
            background: `linear-gradient(135deg, ${warmBg} 0%, #E8D7AE 50%, ${warmBg} 100%)`,
            borderRadius: 12
          }}>
            <p style={{
              fontFamily: playfair,
              fontSize: isMobile ? 20 : 24,
              color: darkText,
              lineHeight: 1.6,
              fontStyle: "italic",
              margin: 0
            }}>
              "I came to jewellery through fashion and design — years spent understanding not just how things look, but how they're put together."
            </p>
            <p style={{
              fontSize: 14,
              color: mutedText,
              marginTop: 16,
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}>
              Kate, Founder
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

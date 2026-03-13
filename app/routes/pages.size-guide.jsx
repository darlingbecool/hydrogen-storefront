import {Link} from 'react-router';
import {useState, useEffect} from 'react';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";

const sizes = [
  { uk: "D", diameter: "14.9", circumference: "46.8" },
  { uk: "E", diameter: "15.3", circumference: "48.0" },
  { uk: "F", diameter: "15.7", circumference: "49.3" },
  { uk: "G", diameter: "16.1", circumference: "50.6" },
  { uk: "H", diameter: "16.5", circumference: "51.9" },
  { uk: "I", diameter: "16.9", circumference: "53.1" },
  { uk: "J", diameter: "17.3", circumference: "54.4" },
  { uk: "K", diameter: "17.7", circumference: "55.7" },
  { uk: "L", diameter: "18.1", circumference: "57.0" },
  { uk: "M", diameter: "18.5", circumference: "58.3" },
  { uk: "N", diameter: "18.9", circumference: "59.5" },
  { uk: "O", diameter: "19.3", circumference: "60.8" },
  { uk: "P", diameter: "19.7", circumference: "62.1" },
  { uk: "Q", diameter: "20.1", circumference: "63.4" },
  { uk: "R", diameter: "20.5", circumference: "64.6" },
  { uk: "S", diameter: "20.9", circumference: "65.9" },
  { uk: "T", diameter: "21.3", circumference: "67.2" },
  { uk: "U", diameter: "21.7", circumference: "68.5" },
  { uk: "V", diameter: "22.1", circumference: "69.7" },
  { uk: "W", diameter: "22.5", circumference: "71.0" },
];

export const meta = () => {
  return [{title: 'Size Guide | Mercer 94'}];
};

export default function SizeGuidePage() {
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
            Size Guide
          </h1>
          <div style={{
            width: 80, height: 2, background: goldAccent, margin: "0 auto", opacity: 0.6
          }} />
        </div>
      </div>

      {/* How to Measure */}
      <div style={{ padding: isMobile ? "48px 24px 40px" : "80px 48px 60px", background: "white" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 28 : 32,
            color: darkText,
            marginBottom: 16,
            fontWeight: 400,
            textAlign: 'center'
          }}>
            Finding Your Size
          </h2>
          <p style={{
            fontSize: isMobile ? 15 : 16,
            color: subtleText,
            lineHeight: 1.8,
            textAlign: 'center',
            maxWidth: 560,
            margin: '0 auto 48px',
          }}>
            Because every piece is made to order, getting your size right before you place your order matters. Take your time — and if you'd like help, just get in touch.
          </p>

          {/* 3 Steps */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 32 : 32,
            marginBottom: 48
          }}>
            {[
              {
                num: "1",
                title: "Request a Ring Sizer",
                text: "The most reliable method. Get in touch with your name and address and a complimentary ring sizer will be posted to you."
              },
              {
                num: "2",
                title: "Measure an Existing Ring",
                text: "Place a well-fitting ring on a flat surface and measure the internal diameter — straight across the inside of the band — in millimetres."
              },
              {
                num: "3",
                title: "String or Paper Method",
                text: "Wrap a thin strip of paper or string snugly around the base of your finger. Mark where it meets, lay flat, and measure the length in millimetres."
              },
            ].map((step) => (
              <div key={step.num} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%", background: goldAccent,
                  color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 500, margin: '0 auto 16px', fontFamily: playfair
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: 16, color: darkText, fontWeight: 500, marginBottom: 8, letterSpacing: '0.05em' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: subtleText, margin: 0, lineHeight: 1.6 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div style={{ padding: isMobile ? 24 : 32, background: warmBg, borderRadius: 12, marginBottom: 48 }}>
            <h3 style={{
              fontSize: 18, color: darkText, fontWeight: 500, marginBottom: 20,
              textAlign: 'center', letterSpacing: '0.05em'
            }}>
              A Few Things Worth Knowing
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? 20 : 24
            }}>
              {[
                { icon: "🌡", text: "Fingers are slightly larger in the evening and when warm — measure at the end of the day for the most accurate result" },
                { icon: "❄️", text: "Avoid measuring first thing in the morning or in cold weather — fingers shrink more than you'd expect" },
                { icon: "↔️", text: "Mercer 94 works in full sizes only. If you fall between two sizes, sizing up gives the most comfortable fit" },
              ].map((tip, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>{tip.icon}</span>
                  <p style={{ fontSize: 13, color: subtleText, margin: 0, lineHeight: 1.5 }}>{tip.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Size Chart */}
          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 28 : 32,
            color: darkText,
            marginBottom: 32,
            fontWeight: 400,
            textAlign: 'center'
          }}>
            UK Ring Size Chart
          </h2>

          <div style={{
            maxWidth: 500,
            margin: '0 auto 48px',
            borderRadius: 12,
            overflow: "hidden",
            border: "2px solid #E8E4DE",
          }}>
            {/* Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              background: darkText,
              padding: '16px 0'
            }}>
              {["UK Size", "Diameter (mm)", "Circumference (mm)"].map((h) => (
                <div key={h} style={{
                  textAlign: "center", fontSize: 11, color: "white",
                  fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase"
                }}>
                  {h}
                </div>
              ))}
            </div>
            {sizes.map((row, i) => (
              <div key={row.uk} style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: i % 2 === 0 ? "white" : warmBg,
                padding: '12px 0',
                borderTop: '1px solid #E8E4DE'
              }}>
                <div style={{ textAlign: "center", fontSize: 15, color: darkText, fontWeight: 500 }}>{row.uk}</div>
                <div style={{ textAlign: "center", fontSize: 15, color: subtleText }}>{row.diameter}</div>
                <div style={{ textAlign: "center", fontSize: 15, color: subtleText }}>{row.circumference}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            maxWidth: 600,
            margin: '0 auto',
            padding: isMobile ? 28 : 40,
            background: `linear-gradient(135deg, ${warmBg} 0%, #E8D7AE 50%, ${warmBg} 100%)`,
            borderRadius: 12,
            border: `2px solid ${goldAccent}`,
            textAlign: 'center'
          }}>
            <h3 style={{
              fontFamily: playfair,
              fontSize: isMobile ? 20 : 24,
              color: darkText,
              fontWeight: 400,
              marginBottom: 12
            }}>
              Want to measure properly first?
            </h3>
            <p style={{ fontSize: 16, color: subtleText, marginBottom: 24, lineHeight: 1.6 }}>
              A complimentary ring sizer can be posted to you before you order. Just get in touch.
            </p>
            <Link
              to="/pages/contact"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                background: darkText,
                color: 'white',
                fontSize: 14,
                letterSpacing: '0.15em',
                fontWeight: 500,
                fontFamily: bodyFont,
                borderRadius: 8,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.target.style.background = 'white'; e.target.style.color = darkText; e.target.style.outline = `2px solid ${darkText}`; }}
              onMouseLeave={(e) => { e.target.style.background = darkText; e.target.style.color = 'white'; e.target.style.outline = 'none'; }}
            >
              REQUEST RING SIZER
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

import {Link} from 'react-router';
import {useState} from 'react';

// Design constants
const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";

const shopLinks = [
  {label: 'No. 1 Oval Signet', path: '/products/no-1-oval-signet'},
  {label: 'No. 2 Rectangular Signet', path: '/products/no-2-rectangular-signet'},
  { label: "Bespoke", path: "/bespoke" },
];

const helpLinks = [
  { label: "Size Guide", path: "/pages/size-guide" },
  { label: "Care Guide", path: "/pages/care" },
  { label: "FAQs", path: "/pages/faqs" },
];

const legalLinks = [
  { label: "Delivery & Returns", path: "/pages/delivery" },
  { label: "Terms & Conditions", path: "/pages/terms" },
  { label: "Privacy Policy", path: "/pages/privacy" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      console.log('Newsletter signup:', email);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      {/* ── Newsletter Section ── */}
      <section
        style={{
          padding: "64px 80px",
          background: "white",
        }}
        className="newsletter-section"
      >
        <div
          className="newsletter-divider"
          style={{
            height: 1,
            background: "#E8D7AE",
            marginBottom: 40,
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
          }}
          className="newsletter-content"
        >
          <div style={{ flex: 1, textAlign: "left" }} className="newsletter-text">
            <h3 style={{
              fontFamily: playfair,
              fontSize: 28,
              color: darkText,
              fontWeight: 400,
              marginBottom: 12,
            }}>
              Stay in the know
            </h3>
            <p style={{
              fontSize: 15,
              color: subtleText,
              lineHeight: 1.7,
              maxWidth: 420,
              margin: 0,
            }}>
              New pieces and the story behind them. Sent when there's something worth saying.
            </p>
          </div>

          <div style={{ flex: 1, maxWidth: 480 }}>
            <form
              onSubmit={handleSubscribe}
              style={{ display: "flex", gap: 12 }}
              className="newsletter-form"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  border: "1px solid #E8D7AE",
                  borderRadius: 8,
                  fontSize: 15,
                  color: darkText,
                  fontFamily: bodyFont,
                  background: "white",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "16px 32px",
                  border: "none",
                  borderRadius: 8,
                  background: subscribed ? "#2D5A27" : darkText,
                  color: "white",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  fontWeight: 500,
                  fontFamily: bodyFont,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {subscribed ? "✓ Subscribed" : "Join"}
              </button>
            </form>
            <p
              style={{
                fontSize: 12,
                color: mutedText,
                marginTop: 12,
                textAlign: "left",
              }}
              className="newsletter-privacy"
            >
              Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          background: warmBg,
          padding: "64px 80px 32px",
          borderTop: "1px solid #E8D7AE",
        }}
        className="footer-main"
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr",
              gap: 48,
              marginBottom: 48,
            }}
            className="footer-grid"
          >
            {/* Brand Column */}
            <div className="footer-brand">
              <h3 style={{
                fontFamily: playfair,
                fontSize: 22,
                fontWeight: 400,
                color: darkText,
                margin: "0 0 16px",
              }}>
                Mercer 79
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: mutedText,
                margin: "0 0 20px",
                fontFamily: bodyFont,
                maxWidth: 280,
              }}>
                Made-to-order gold signet rings, hand-crafted in the UK. The kind of thing you wear every day and never take off.
              </p>
              <p style={{
                fontSize: 12,
                letterSpacing: "0.08em",
                color: goldAccent,
                fontWeight: 500,
                fontFamily: bodyFont,
                margin: 0,
              }}>
                MADE TO ORDER · HAND-CRAFTED IN THE UK
              </p>
            </div>

            {/* Shop Column */}
            <div className="footer-column">
              <div className="footer-column-header" onClick={() => toggleSection('shop')}>
                <h4 style={{ fontSize: 11, letterSpacing: "0.15em", color: goldAccent, fontWeight: 600, margin: "0", fontFamily: bodyFont }}>SHOP</h4>
                <svg className="footer-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={mutedText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s ease", transform: openSections.shop ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </div>
              <div className={`footer-links ${openSections.shop ? 'open' : ''}`}>
                {shopLinks.map((link) => (
                  <Link key={link.label} to={link.path} style={{ display: "block", fontSize: 14, color: darkText, textDecoration: "none", marginBottom: 12, fontFamily: bodyFont, transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = goldAccent} onMouseLeave={(e) => e.target.style.color = darkText}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Column */}
            <div className="footer-column">
              <div className="footer-column-header" onClick={() => toggleSection('help')}>
                <h4 style={{ fontSize: 11, letterSpacing: "0.15em", color: goldAccent, fontWeight: 600, margin: "0", fontFamily: bodyFont }}>HELP</h4>
                <svg className="footer-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={mutedText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s ease", transform: openSections.help ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </div>
              <div className={`footer-links ${openSections.help ? 'open' : ''}`}>
                {helpLinks.map((link) => (
                  <Link key={link.label} to={link.path} style={{ display: "block", fontSize: 14, color: darkText, textDecoration: "none", marginBottom: 12, fontFamily: bodyFont, transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = goldAccent} onMouseLeave={(e) => e.target.style.color = darkText}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal Column */}
            <div className="footer-column">
              <div className="footer-column-header" onClick={() => toggleSection('legal')}>
                <h4 style={{ fontSize: 11, letterSpacing: "0.15em", color: goldAccent, fontWeight: 600, margin: "0", fontFamily: bodyFont }}>LEGAL</h4>
                <svg className="footer-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={mutedText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s ease", transform: openSections.legal ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </div>
              <div className={`footer-links ${openSections.legal ? 'open' : ''}`}>
                {legalLinks.map((link) => (
                  <Link key={link.label} to={link.path} style={{ display: "block", fontSize: 14, color: darkText, textDecoration: "none", marginBottom: 12, fontFamily: bodyFont, transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = goldAccent} onMouseLeave={(e) => e.target.style.color = darkText}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect Column */}
            <div className="footer-column">
              <div className="footer-column-header" onClick={() => toggleSection('connect')}>
                <h4 style={{ fontSize: 11, letterSpacing: "0.15em", color: goldAccent, fontWeight: 600, margin: "0", fontFamily: bodyFont }}>CONNECT</h4>
                <svg className="footer-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={mutedText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s ease", transform: openSections.connect ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </div>
              <div className={`footer-links ${openSections.connect ? 'open' : ''}`}>
                <p style={{ fontSize: 14, color: darkText, margin: "0 0 12px", fontFamily: bodyFont }}>
                  <Link to="/pages/contact" style={{ color: darkText, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = goldAccent} onMouseLeave={(e) => e.target.style.color = darkText}>
                    Contact
                  </Link>
                </p>
                <p style={{ fontSize: 14, color: mutedText, margin: "0 0 20px", fontFamily: bodyFont, lineHeight: 1.6 }}>
                  Questions about sizing, materials, or your order? Get in touch - we're happy to help.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <a href="https://instagram.com/mercerseventynine" target="_blank" rel="noopener noreferrer" style={{ color: darkText, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = goldAccent} onMouseLeave={(e) => e.currentTarget.style.color = darkText}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={{ color: darkText, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = goldAccent} onMouseLeave={(e) => e.currentTarget.style.color = darkText}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.329-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.566 0-2.387-1.715-4.057-4.163-4.057-2.837 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.284c-.076.315-.244.995-.277 1.134-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              paddingTop: 32,
              borderTop: "1px solid #E8D7AE",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="footer-bottom"
          >
            <p style={{ fontSize: 12, color: mutedText, fontFamily: bodyFont, margin: 0 }}>
              © 2026 Mercer 79 Ltd · All rights reserved
            </p>
            <p style={{ fontSize: 11, letterSpacing: "0.08em", color: mutedText, fontFamily: bodyFont, margin: 0 }}>
              HAND-CRAFTED IN THE UK
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          margin-bottom: 16px;
        }

        .footer-chevron {
          display: none;
        }

        @media (max-width: 768px) {
          .newsletter-section {
            padding: 40px 24px !important;
          }
          .newsletter-content {
            flex-direction: column !important;
            text-align: center !important;
          }
          .newsletter-text {
  text-align: center !important;
}
          .newsletter-content h3 {
            font-size: 28px !important;
          }
          .newsletter-form {
            flex-direction: column !important;
          }
          .newsletter-privacy {
            text-align: center !important;
          }
          .footer-main {
            padding: 40px 24px 24px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .footer-brand {
            margin-bottom: 24px !important;
            padding-bottom: 24px !important;
            border-bottom: 1px solid #E8D7AE !important;
          }
          .footer-column {
            border-bottom: 1px solid #E8D7AE !important;
            padding: 16px 0 !important;
          }
          .footer-column-header {
            margin-bottom: 0 !important;
          }
          .footer-chevron {
            display: block !important;
          }
          .footer-links {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            margin-top: 0;
          }
          .footer-links.open {
            max-height: 500px;
            margin-top: 16px;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 12px !important;
            text-align: center !important;
            margin-top: 24px !important;
          }
        }
      `}</style>
    </>
  );
}

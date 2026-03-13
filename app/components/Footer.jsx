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
  { label: "All Pieces", path: "/collections/all" },
  { label: "Rings", path: "/collections/rings" },
  { label: "Necklaces", path: "/collections/necklaces" },
  { label: "Bespoke", path: "/bespoke" },
  { label: "Gift Cards", path: "/pages/gift-cards" },
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
        {/*
          This divider line separates the page content from the newsletter.
          On the homepage it is hidden via .hide-newsletter-divider in _index.jsx,
          because the story banner sits directly above and no line is needed.
          On all other pages it shows normally.
        */}
        <div
          className="newsletter-divider"
          style={{
            height: 1,
            background: "#E8E4DE",
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
          <div style={{ flex: 1, textAlign: "left" }}>
            <h3 style={{
              fontFamily: playfair,
              fontSize: 28,
              color: darkText,
              fontWeight: 400,
              marginBottom: 12,
            }}>
              Stay in the Know
            </h3>
            <p style={{
              fontSize: 15,
              color: subtleText,
              lineHeight: 1.7,
              maxWidth: 420,
              margin: 0,
            }}>
              New collections, behind-the-scenes, and exclusive offers. No spam — just gold.
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
                  border: "1px solid #D4D0CA",
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
                {subscribed ? "✓ SUBSCRIBED" : "JOIN"}
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
              Unsubscribe anytime. We respect your privacy.
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
                Hand-crafted luxury jewelry made to order in our London atelier. Each piece is created using traditional lost-wax casting and engraving techniques.
              </p>
              <p style={{
                fontSize: 12,
                letterSpacing: "0.08em",
                color: goldAccent,
                fontWeight: 500,
                fontFamily: bodyFont,
                margin: 0,
              }}>
                MADE IN LONDON, MADE TO LAST
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
                    Contact Us
                  </Link>
                </p>
                <p style={{ fontSize: 14, color: mutedText, margin: "0 0 20px", fontFamily: bodyFont, lineHeight: 1.6 }}>
                  Our concierge team is here to help with sizing, customisation, or any questions about your order.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: 22, textDecoration: 'none' }}>📷</a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: 22, textDecoration: 'none' }}>📌</a>
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
              © 2026 Mercer 79 · All rights reserved
            </p>
            <p style={{ fontSize: 11, letterSpacing: "0.08em", color: mutedText, fontFamily: bodyFont, margin: 0 }}>
              HAND-CRAFTED IN LONDON
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
          .newsletter-content > div:first-child {
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

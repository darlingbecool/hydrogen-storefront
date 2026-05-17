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
  return [{title: 'Contact | Mercer 79'}];
};

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    width: "100%",
    padding: 16,
    border: `1px solid ${borderCol}`,
    borderRadius: 8,
    fontSize: 15,
    fontFamily: bodyFont,
    outline: "none",
    boxSizing: "border-box",
    background: "white",
    color: darkText,
  };

  const labelStyle = {
    display: 'block',
    fontFamily: bodyFont,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: goldAccent,
    marginBottom: 8,
  };

  const cardStyle = {
    padding: isMobile ? 20 : 24,
    background: warmBg,
    border: `1px solid ${borderCol}`,
    marginBottom: 16,
  };

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: warmBg,
        padding: isMobile ? '56px 24px 48px' : '80px 32px 64px',
        borderBottom: `2px solid ${borderCol}`,
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{
            fontFamily: bodyFont, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: goldAccent, marginBottom: 16, marginTop: 0,
          }}>
            Mercer 79
          </p>
          <h1 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 36 : 52,
            color: darkText,
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: 24,
            marginTop: 0,
          }}>
            Get in touch
          </h1>
          <p style={{
            fontFamily: bodyFont,
            fontSize: isMobile ? 15 : 17,
            color: subtleText,
            lineHeight: 1.75,
            maxWidth: 520,
            margin: '0 auto',
          }}>
            Questions about a piece, sizing, or the making process - get in touch before you order. No question is too small.
          </p>
        </div>
      </div>

      {/* Intro — above the grid */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '48px 24px 0' : '64px 48px 0',
      }}>
        <h2 style={{
          fontFamily: playfair,
          fontSize: isMobile ? 26 : 32,
          color: darkText,
          fontWeight: 400,
          marginBottom: 12,
          marginTop: 0,
        }}>
          Let's talk
        </h2>
        <p style={{
          fontFamily: bodyFont,
          fontSize: isMobile ? 15 : 17,
          color: subtleText,
          lineHeight: 1.8,
          marginBottom: 0,
          maxWidth: 560,
        }}>
          All messages are responded to within 24 hours, Monday to Friday. For a quicker conversation, find us on Instagram - DMs are always welcome.
        </p>
      </div>

      {/* Main grid — starts at same point on both sides */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '32px 24px 80px' : '40px 48px 100px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 48 : 80,
        alignItems: 'start',
      }}>

        {/* Left: contact cards */}
        <div>
          <div style={cardStyle}>
            <p style={{ ...labelStyle, marginBottom: 12 }}>Email</p>
            <p style={{ fontSize: 16, color: darkText, margin: '0 0 6px', fontWeight: 500, fontFamily: bodyFont }}>
              hello@mercer79.com
            </p>
            <p style={{ fontSize: 13, color: mutedText, margin: 0, lineHeight: 1.6, fontFamily: bodyFont }}>
              Responded to within 24 hours, Monday to Friday.
            </p>
          </div>

          <div style={cardStyle}>
            <p style={{ ...labelStyle, marginBottom: 12 }}>Instagram</p>
            <p style={{ fontSize: 16, color: darkText, margin: '0 0 6px', fontWeight: 500, fontFamily: bodyFont }}>
              @mercerseventynine
            </p>
            <p style={{ fontSize: 13, color: mutedText, margin: 0, lineHeight: 1.6, fontFamily: bodyFont }}>
              DMs welcome - a good place for quick questions or to see work in progress.
            </p>
          </div>

          <div style={cardStyle}>
            <p style={{ ...labelStyle, marginBottom: 12 }}>Pinterest</p>
            <a href="https://uk.pinterest.com/mercerseventynine/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, color: darkText, margin: '0 0 6px', fontWeight: 500, fontFamily: bodyFont, display: 'block', textDecoration: 'none' }}>
              pinterest.com/mercerseventynine
            </a>
            <p style={{ fontSize: 13, color: mutedText, margin: 0, lineHeight: 1.6, fontFamily: bodyFont }}>
              Inspiration, references, and the world behind the collection.
            </p>
          </div>

          {/* PLACEHOLDER — concierge callout to be added once AI concierge is live */}
          {/* Uncomment when ready:
          <div style={{ ...cardStyle, marginBottom: 0, background: `linear-gradient(135deg, ${warmBg} 0%, #E8D7AE 50%, ${warmBg} 100%)` }}>
            <p style={{ ...labelStyle, marginBottom: 12 }}>Instant answers</p>
            <p style={{ fontSize: 13, color: subtleText, margin: 0, lineHeight: 1.6, fontFamily: bodyFont }}>
              The Mercer 79 concierge is available on the site around the clock — ask it anything about the collection, sizing, or the making process.
            </p>
          </div>
          */}
        </div>

        {/* Right: contact form */}
        <div>
          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => e.target.style.border = `1px solid ${darkText}`}
                onBlur={(e) => e.target.style.border = `1px solid ${borderCol}`}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => e.target.style.border = `1px solid ${darkText}`}
                onBlur={(e) => e.target.style.border = `1px solid ${borderCol}`}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{ ...inputStyle }}
                onFocus={(e) => e.target.style.border = `1px solid ${darkText}`}
                onBlur={(e) => e.target.style.border = `1px solid ${borderCol}`}
              >
                <option value="">Select a subject</option>
                <option value="new-piece">New piece enquiry</option>
                <option value="sizing">Ring sizer request</option>
                <option value="bespoke">Bespoke enquiry</option>
                <option value="existing">Existing order</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => e.target.style.border = `1px solid ${darkText}`}
                onBlur={(e) => e.target.style.border = `1px solid ${borderCol}`}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: 18,
                border: "none",
                borderRadius: 8,
                background: submitted ? "#2D5A27" : darkText,
                color: "white",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
                fontFamily: bodyFont,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {submitted ? "✓ Message sent" : "Send message"}
            </button>

            <p style={{ fontSize: 13, color: mutedText, marginTop: 16, textAlign: 'center', lineHeight: 1.5, fontFamily: bodyFont }}>
              By submitting this form you agree to our{' '}
              <Link to="/pages/privacy" style={{ color: darkText, textDecoration: 'underline' }}>
                Privacy Policy
              </Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

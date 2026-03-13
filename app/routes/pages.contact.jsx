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
  return [{title: 'Contact | Mercer 94'}];
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
    border: "1px solid #D4D0CA",
    borderRadius: 8,
    fontSize: 15,
    fontFamily: bodyFont,
    outline: "none",
    boxSizing: "border-box",
  };

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
            Get in Touch
          </h1>
          <div style={{
            width: 80, height: 2, background: goldAccent, margin: "0 auto 24px", opacity: 0.6
          }} />
          <p style={{
            fontSize: isMobile ? 15 : 17,
            color: subtleText,
            lineHeight: 1.6
          }}>
            Whether you have a question about a piece, want help with sizing, or simply want to know more before you decide — please do reach out. No question is too small.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: isMobile ? "48px 24px" : "80px 48px" }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 48 : 80,
          alignItems: "start"
        }}>

          {/* Left: Contact Info */}
          <div>
            <h2 style={{
              fontFamily: playfair,
              fontSize: isMobile ? 28 : 32,
              color: darkText,
              marginBottom: 32,
              fontWeight: 400
            }}>
              Let's talk
            </h2>
            <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 40 }}>
              All messages are responded to within 24 hours. For a quicker conversation, find Mercer 94 on Instagram — DMs are always welcome.
            </p>

            {[
              {
                label: "EMAIL",
                main: "hello@mercer94.com",
                sub: "Responded to within 24 hours, Monday to Friday."
              },
              {
                label: "INSTAGRAM",
                main: "[Instagram handle to be added]",
                sub: "DMs welcome. A good place for quick questions or to see work in progress."
              },
              {
                label: "THE STUDIO",
                main: "London, United Kingdom",
                sub: "Studio visits are by appointment. Get in touch if you'd like to come and see pieces in person before commissioning."
              },
            ].map((item) => (
              <div key={item.label} style={{
                padding: isMobile ? 20 : 32,
                background: warmBg,
                borderRadius: 12,
                marginBottom: 24,
                border: `1px solid ${goldAccent}20`
              }}>
                <h3 style={{
                  fontSize: 14,
                  letterSpacing: "0.15em",
                  color: goldAccent,
                  fontWeight: 600,
                  marginBottom: 16,
                  fontFamily: bodyFont
                }}>
                  {item.label}
                </h3>
                {item.main && (
                  <p style={{ fontSize: 17, color: darkText, margin: "0 0 8px", fontWeight: 500 }}>
                    {item.main}
                  </p>
                )}
                <p style={{ fontSize: 14, color: subtleText, margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {item.sub}
                </p>
              </div>
            ))}

            {/* AI Concierge callout */}
            <div style={{
              padding: isMobile ? 20 : 32,
              background: `linear-gradient(135deg, ${warmBg} 0%, #E8D7AE 50%, ${warmBg} 100%)`,
              borderRadius: 12,
              border: `1px solid ${goldAccent}40`
            }}>
              <h3 style={{
                fontSize: 14,
                letterSpacing: "0.15em",
                color: goldAccent,
                fontWeight: 600,
                marginBottom: 16,
                fontFamily: bodyFont
              }}>
                INSTANT ANSWERS
              </h3>
              <p style={{ fontSize: 14, color: subtleText, margin: 0, lineHeight: 1.6 }}>
                The Mercer 94 concierge is available on the site around the clock — ask it anything about the collection, the making process, sizing, or materials.
              </p>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div>
            <form onSubmit={handleSubmit}>
              {[
                { label: "NAME *", name: "name", type: "text", required: true },
                { label: "EMAIL *", name: "email", type: "email", required: true },
              ].map((field) => (
                <div key={field.name} style={{ marginBottom: 24 }}>
                  <label style={{
                    display: 'block', fontSize: 14, fontWeight: 500,
                    color: darkText, marginBottom: 8, letterSpacing: '0.05em'
                  }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.border = `2px solid ${goldAccent}`}
                    onBlur={(e) => e.target.style.border = "1px solid #D4D0CA"}
                  />
                </div>
              ))}

              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: 'block', fontSize: 14, fontWeight: 500,
                  color: darkText, marginBottom: 8, letterSpacing: '0.05em'
                }}>
                  SUBJECT
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{ ...inputStyle, background: 'white' }}
                  onFocus={(e) => e.target.style.border = `2px solid ${goldAccent}`}
                  onBlur={(e) => e.target.style.border = "1px solid #D4D0CA"}
                >
                  <option value="">Select a subject</option>
                  <option value="new-piece">New Piece</option>
                  <option value="sizing">Ring Sizer Request</option>
                  <option value="existing">Existing Order</option>
                  <option value="other">Something Else</option>
                </select>
              </div>

              <div style={{ marginBottom: 32 }}>
                <label style={{
                  display: 'block', fontSize: 14, fontWeight: 500,
                  color: darkText, marginBottom: 8, letterSpacing: '0.05em'
                }}>
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => e.target.style.border = `2px solid ${goldAccent}`}
                  onBlur={(e) => e.target.style.border = "1px solid #D4D0CA"}
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
                  fontSize: 14,
                  letterSpacing: "0.15em",
                  fontWeight: 500,
                  fontFamily: bodyFont,
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                {submitted ? "✓ MESSAGE SENT" : "SEND MESSAGE"}
              </button>

              <p style={{ fontSize: 13, color: mutedText, marginTop: 16, textAlign: 'center', lineHeight: 1.5 }}>
                By submitting this form, you agree to our{' '}
                <Link to="/pages/privacy" style={{ color: darkText, textDecoration: 'underline' }}>Privacy Policy</Link>
              </p>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}

import {Link, useFetcher} from 'react-router';
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
  return [
    {title: 'Contact | Mercer 79'},
    {
      name: 'description',
      content: "Get in touch with Mercer 79 about a piece, sizing, or a bespoke commission - by email, Instagram, or the form below.",
    },
  ];
};

export async function action({ request, context }) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    return { error: 'Please fill in all required fields.' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mercer 79 Website <notifications@mail.mercer79.com>',
        to: 'hello@mercer79.com',
        reply_to: email,
        subject: `New message from ${name} via Contact page`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Resend API error:', errorDetails);
      return { error: 'Something went wrong sending your message. Please try emailing us directly at hello@mercer79.com.' };
    }

    return { success: true };
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return { error: 'Something went wrong sending your message. Please try emailing us directly at hello@mercer79.com.' };
  }
}

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);
  const fetcher = useFetcher();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canSubmit = formData.name && formData.email && formData.message;
  const isSubmitting = fetcher.state !== 'idle';
  const success = fetcher.data?.success;
  const error = fetcher.data?.error;

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
    color: darkText,
    marginBottom: 8,
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
          Get in touch
        </h1>
        <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.85, marginBottom: 0, marginTop: 0 }}>
          Questions about a piece, sizing, or the making process - no question is too small.
        </p>

        {/* Email */}
        <h2 style={h2}>Email</h2>
        <p style={{ ...prose, marginBottom: 0 }}>
          <a href="mailto:hello@mercer79.com" style={{ color: darkText, textDecoration: 'underline' }}>
            hello@mercer79.com
          </a>
          {' '}- read personally, and replied to as soon as we can.
        </p>

        {/* Instagram */}
        <h2 style={h2}>Instagram</h2>
        <p style={{ ...prose, marginBottom: 0 }}>
          <a href="https://instagram.com/mercerseventynine" target="_blank" rel="noopener noreferrer" style={{ color: darkText, textDecoration: 'underline' }}>
            @mercerseventynine
          </a>
          {' '}- DMs welcome, a good place for quick questions or to see work in progress.
        </p>

        {/* Pinterest */}
        <h2 style={h2}>Pinterest</h2>
        <p style={{ ...prose, marginBottom: 0 }}>
          <a href="https://uk.pinterest.com/mercerseventynine/" target="_blank" rel="noopener noreferrer" style={{ color: darkText, textDecoration: 'underline' }}>
            pinterest.com/mercerseventynine
          </a>
          {' '}- inspiration, references, and the world behind the collection.
        </p>

        {/* PLACEHOLDER — concierge callout to be added once AI concierge is live */}
        {/* Uncomment when ready:
        <h2 style={h2}>Instant answers</h2>
        <p style={{ ...prose, marginBottom: 0 }}>
          The Mercer 79 concierge is available on the site around the clock - ask it anything about the collection, sizing, or the making process.
        </p>
        */}

        {/* Send a message */}
        <h2 style={h2}>Send a message</h2>

        {success ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${goldAccent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke={goldAccent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10l5 5 7-8" />
              </svg>
            </div>
            <h3 style={{ fontFamily: playfair, fontSize: 24, fontWeight: 400, color: darkText, marginBottom: 12 }}>
              Thank you, {formData.name.split(' ')[0]}
            </h3>
            <p style={{ fontSize: 14, color: mutedText, lineHeight: 1.7 }}>
              Your message has been received.<br />We'll be in touch shortly.
            </p>
          </div>
        ) : (
          <fetcher.Form method="post">

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

            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="What can we help with? Sizing, an existing order, a bespoke idea - anything at all."
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => e.target.style.border = `1px solid ${darkText}`}
                onBlur={(e) => e.target.style.border = `1px solid ${borderCol}`}
              />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: '#c0392b', marginBottom: 16, textAlign: 'center' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              style={{
                width: "100%",
                padding: 18,
                border: "none",
                borderRadius: 8,
                background: canSubmit ? darkText : "#ccc",
                color: "white",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
                fontFamily: bodyFont,
                cursor: canSubmit ? "pointer" : "default",
                transition: "all 0.3s ease",
              }}
            >
              {isSubmitting ? "SENDING..." : "Send message"}
            </button>

            <p style={{ fontSize: 13, color: mutedText, marginTop: 16, textAlign: 'center', lineHeight: 1.5, fontFamily: bodyFont }}>
              By submitting this form you agree to our{' '}
              <Link to="/pages/privacy" style={{ color: darkText, textDecoration: 'underline' }}>
                Privacy Policy
              </Link>
            </p>

          </fetcher.Form>
        )}

      </div>
    </div>
  );
}

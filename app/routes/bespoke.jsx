import { useState } from 'react';
import { useFetcher } from 'react-router';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";
const warmBg = "#F5F2ED";
const borderCol = "#E8D7AE";

const processSteps = [
  {
    num: "01", title: "The Brief",
    body: "Start with whatever you have — a sketch, a photo, a few words describing what you're after. We'll take it from there.",
  },
  {
    num: "02", title: "Design & Quote",
    body: "We'll turn your brief into a design proposal and a detailed quote, so you know exactly what you're agreeing to before anything's made.",
  },
  {
    num: "03", title: "Crafting",
    body: "With your approval and deposit in, your piece goes into the workshop — made by hand in the UK.",
  },
  {
    num: "04", title: "Inspiration",
    body: "Family crests and heirlooms, custom initials and monograms, engagement pieces, or a stone you already own. If you have an idea, that's enough to start.",
  },
];

export const meta = () => [
  { title: 'Bespoke | Mercer 79' },
  { name: 'description', content: 'Commission a bespoke piece with Mercer 79 — handcrafted in the UK to your exact brief.' },
];

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
        subject: `New bespoke enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Resend API error:', errorDetails);
      return { error: 'Something went wrong sending your enquiry. Please try emailing us directly at hello@mercer79.com.' };
    }

    return { success: true };
  } catch (err) {
    console.error('Failed to send enquiry email:', err);
    return { error: 'Something went wrong sending your enquiry. Please try emailing us directly at hello@mercer79.com.' };
  }
}

function ImageBreak({ src, alt = "" }) {
  if (src) {
    return (
      <div style={{ width: "100%", height: 480, overflow: "hidden" }}>
        <img src={src} alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      </div>
    );
  }
  return (
    <div style={{
      width: "100%", height: 480,
      background: `linear-gradient(135deg, #ede8e0 0%, ${borderCol} 50%, #ede8e0 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 14,
      borderTop: "1px dashed #c8b98a", borderBottom: "1px dashed #c8b98a",
    }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a89060" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "#a89060", fontWeight: 500 }}>
        YOUR IMAGE HERE
      </span>
    </div>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box",
  padding: "14px 18px", border: "1px solid #D4D0CA", borderRadius: 6,
  fontSize: 15, fontFamily: bodyFont, color: darkText, outline: "none",
};

const labelStyle = {
  fontSize: 12, letterSpacing: "0.12em", color: darkText, fontWeight: 500,
};

const fieldWrap = {
  display: "flex", flexDirection: "column", gap: 8, marginBottom: 24,
};

export default function Bespoke() {
  const fetcher = useFetcher();
  const [formData, setFormData] = useState({
    name: '', email: '', message: '',
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const canSubmit = formData.name && formData.email && formData.message;
  const isSubmitting = fetcher.state !== 'idle';
  const success = fetcher.data?.success;
  const error = fetcher.data?.error;

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <style>{`
        .bespoke-process-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: ${borderCol};
          max-width: 1100px;
          margin: 0 auto;
          border: 1px solid ${borderCol};
          border-radius: 12px;
          overflow: hidden;
        }
        .bespoke-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 24px;
          width: 100%;
        }
        @media (max-width: 900px) {
          .bespoke-process-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .bespoke-process-cards { grid-template-columns: 1fr !important; }
          .bespoke-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "88px 32px 72px", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: goldAccent, fontWeight: 500, marginBottom: 16 }}>
          BESPOKE COMMISSIONS
        </p>
        <div style={{ width: 40, height: 1, background: goldAccent, margin: "0 auto 48px" }} />
        <h1 style={{ fontFamily: playfair, fontSize: "clamp(40px, 5vw, 58px)", fontWeight: 400, lineHeight: 1.15, color: darkText, marginBottom: 32 }}>
          Made for you,<br />
          <em style={{ fontStyle: "italic", color: subtleText }}>made by hand</em>
        </h1>
        <p style={{ fontSize: 17, color: subtleText, lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
          Every piece in the Mercer 79 collection began as someone's idea of exactly what they wanted. If you don't see it, we'd love to hear what you have in mind.
        </p>
      </div>

      {/* Image break — add src="..." when you have photography */}
      <ImageBreak />

      {/* Process */}
      <div style={{ background: warmBg, padding: "80px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: goldAccent, fontWeight: 500, marginBottom: 16 }}>THE PROCESS</p>
          <h2 style={{ fontFamily: playfair, fontSize: 32, fontWeight: 400, color: darkText }}>How it works</h2>
        </div>
        <div className="bespoke-process-cards">
          {processSteps.map((step) => (
            <div key={step.num} style={{ background: warmBg, padding: "40px 32px" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.15em", color: goldAccent, fontWeight: 500, marginBottom: 20 }}>{step.num}</p>
              <h3 style={{ fontFamily: playfair, fontSize: 20, fontWeight: 400, color: darkText, marginBottom: 14 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: subtleText, lineHeight: 1.8 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry form */}
      <div style={{ background: warmBg, padding: "80px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: goldAccent, fontWeight: 500, marginBottom: 16 }}>GET IN TOUCH</p>
            <h2 style={{ fontFamily: playfair, fontSize: 36, fontWeight: 400, color: darkText, marginBottom: 16 }}>
              Start your commission
            </h2>
            <p style={{ fontSize: 15, color: subtleText, lineHeight: 1.7 }}>
              Tell us what you have in mind. We'll be in touch very soon.
            </p>
          </div>

          {success ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${goldAccent}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke={goldAccent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10l5 5 7-8" />
                </svg>
              </div>
              <h3 style={{ fontFamily: playfair, fontSize: 26, fontWeight: 400, color: darkText, marginBottom: 12 }}>
                Thank you, {formData.name.split(' ')[0]}
              </h3>
              <p style={{ fontSize: 14, color: mutedText, lineHeight: 1.7 }}>
                Your enquiry has been received.<br />We'll be in touch shortly.
              </p>
            </div>
          ) : (
            <fetcher.Form method="post" style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
              <div className="bespoke-form-row">
                <div style={fieldWrap}>
                  <label style={labelStyle}>YOUR NAME</label>
                  <input style={inputStyle} name="name" value={formData.name} onChange={handleChange} placeholder="Full name" />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>EMAIL ADDRESS</label>
                  <input style={inputStyle} name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
              </div>

              <div style={fieldWrap}>
                <label style={labelStyle}>TELL US MORE</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 140, lineHeight: 1.6, resize: "vertical" }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe what you have in mind — as much or as little as you know. We'll reply by email, where you're welcome to send reference images or anything else that helps."
                />
              </div>

              {error && (
                <p style={{ fontSize: 13, color: "#c0392b", marginBottom: 16, textAlign: "center" }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                style={{
                  width: "100%", padding: 18,
                  background: canSubmit ? darkText : "#ccc",
                  color: "white", border: "none", borderRadius: 6,
                  fontSize: 13, letterSpacing: "0.15em", fontWeight: 500,
                  fontFamily: bodyFont, cursor: canSubmit ? "pointer" : "default",
                  marginTop: 8, transition: "background 0.2s ease",
                }}
              >
                {isSubmitting ? "SENDING..." : "SEND ENQUIRY"}
              </button>

              <p style={{ fontSize: 12, color: mutedText, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                We'll never share your details. See our{' '}
                <a href="/pages/privacy" style={{ color: darkText, textDecoration: "underline" }}>privacy policy</a>.
              </p>
            </fetcher.Form>
          )}
        </div>
      </div>
    </div>
  );
}

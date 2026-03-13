import {Link} from 'react-router';

// ── Design tokens ──────────────────────────────────────────────────────────────
const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";

export const meta = () => {
  return [{title: 'Gift Wrapping — Mercer 94'}];
};

const tiers = [
  {
    name: "Our Signature Packaging",
    price: "Complimentary with every order",
    included: true,
    icon: "✦",
    description:
      "Every piece arrives beautifully presented in our branded Mercer 94 jewelry box, nestled in soft tissue paper and tied with a satin ribbon. Because the unboxing should feel just as special as the piece inside.",
    details: [
      "Branded jewelry box in warm cream",
      "Soft protective pouch for storage",
      "Tissue paper wrapping",
      "Satin ribbon finish",
      "Care card included",
    ],
  },
  {
    name: "The Gift Edit",
    price: "+ £20",
    included: false,
    icon: "❖",
    description:
      "Elevate the moment. Our premium gift wrapping transforms your order into a true luxury gifting experience — perfect for birthdays, anniversaries, or any occasion that deserves a little extra.",
    details: [
      "Everything in our Signature Packaging",
      "Luxury rigid gift box with magnetic closure",
      "Layered tissue paper in gold & cream",
      "Hand-stamped wax seal",
      "Wrapped in our bespoke gift paper",
      "Finished with a grosgrain ribbon bow",
    ],
  },
  {
    name: "Handwritten Note Card",
    price: "+ £5",
    included: false,
    icon: "✧",
    description:
      "Add a personal touch. We'll hand-write your message on one of our embossed note cards and tuck it inside the packaging. Tell us what to say and we'll make sure it's perfect.",
    details: [
      "Embossed Mercer 94 note card",
      "Your message handwritten by our team",
      "Sealed in a matching envelope",
      "Nestled inside the gift box",
      "Up to 150 characters",
    ],
  },
  {
    name: "Gift Bag",
    price: "+ £10",
    included: false,
    icon: "◆",
    description:
      "Handing your gift over in person? Our branded gift bag makes it effortless. Sturdy, beautiful, and ready to go — no wrapping paper required.",
    details: [
      "Branded Mercer 94 gift bag",
      "Rope handles in cream",
      "Tissue paper lining",
      "Perfect for in-person gifting",
      "Fits all jewelry boxes",
    ],
  },
];

const steps = [
  {step: "01", title: "Choose Your Piece", desc: "Browse our collection and find the perfect piece"},
  {step: "02", title: "Select Wrapping", desc: "Add your preferred gift options at checkout"},
  {step: "03", title: "We Do the Rest", desc: "Your order arrives beautifully presented and ready to give"},
];

export default function GiftWrappingPage() {
  return (
    <>
      <style>{`
        .gw-hero {
          background: linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 50%, #F5F2ED 100%);
          padding: 80px 80px;
          text-align: center;
        }
        .gw-body {
          background: white;
          padding: 80px 80px;
        }
        .gw-steps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          margin-top: 32px;
        }
        @media (max-width: 768px) {
          .gw-hero { padding: 48px 24px; }
          .gw-hero h1 { font-size: 36px !important; }
          .gw-body { padding: 48px 24px; }
          .gw-steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Breadcrumb ── */}
      <div style={{padding: '20px 80px'}}>
        <Link
          to="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 13, color: subtleText, textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke={darkText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 9H3"/><path d="M8 4L3 9l5 5"/>
          </svg>
          Home / Gift Wrapping
        </Link>
      </div>

      {/* ── Hero ── */}
      <div className="gw-hero">
        <div style={{maxWidth: 680, margin: '0 auto'}}>
          <h1 style={{
            fontFamily: playfair, fontSize: 48,
            color: darkText, marginBottom: 16,
            fontWeight: 400, lineHeight: 1.2,
          }}>
            Gift Wrapping
          </h1>
          <div style={{width: 80, height: 1, background: goldAccent, margin: '0 auto 20px', opacity: 0.6}} />
          <p style={{fontSize: 17, color: mutedText, lineHeight: 1.7}}>
            The unboxing is part of the experience. Every order arrives beautifully packaged — with options to make it even more special.
          </p>
        </div>
      </div>

      {/* ── Packaging tiers ── */}
      <div className="gw-body">
        <div style={{maxWidth: 780, margin: '0 auto'}}>

          {tiers.map((tier, index) => (
            <div key={index} style={{marginBottom: index < tiers.length - 1 ? 64 : 0}}>

              {/* Tier header */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16, flexWrap: 'wrap', gap: 8,
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <span style={{fontSize: 22, color: goldAccent}}>{tier.icon}</span>
                  <h2 style={{
                    fontFamily: playfair, fontSize: 28,
                    color: darkText, fontWeight: 400, margin: 0,
                  }}>
                    {tier.name}
                  </h2>
                </div>
                <span style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: tier.included ? '#2D5A27' : darkText,
                  background: tier.included ? '#2D5A2710' : warmBg,
                  padding: '6px 16px',
                  letterSpacing: '0.03em',
                }}>
                  {tier.price}
                </span>
              </div>

              {/* Description */}
              <p style={{fontSize: 16, color: subtleText, lineHeight: 1.8, marginBottom: 20}}>
                {tier.description}
              </p>

              {/* Details */}
              <div style={{background: warmBg, padding: '24px 28px'}}>
                {tier.details.map((detail, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 0',
                    borderBottom: i < tier.details.length - 1 ? '1px solid #E8E4DE' : 'none',
                  }}>
                    <span style={{color: goldAccent, fontSize: 10, flexShrink: 0}}>●</span>
                    <span style={{fontSize: 15, color: darkText, lineHeight: 1.5}}>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Divider between tiers */}
              {index < tiers.length - 1 && (
                <div style={{height: 1, background: '#E8E4DE', marginTop: 64}} />
              )}
            </div>
          ))}

          {/* ── How it works ── */}
          <div style={{marginTop: 72}}>
            <h2 style={{fontFamily: playfair, fontSize: 32, color: darkText, marginBottom: 20, fontWeight: 400}}>
              How It Works
            </h2>
            <p style={{fontSize: 16, color: subtleText, lineHeight: 1.8, marginBottom: 24}}>
              Our Signature Packaging is included with every order — you don't need to do a thing. If you'd like to add any of our premium options, simply select them at checkout. You can combine options too — like The Gift Edit with a Handwritten Note Card for the ultimate gifting experience.
            </p>
            <div className="gw-steps-grid">
              {steps.map((s, i) => (
                <div key={i} style={{
                  padding: 28, background: warmBg,
                  textAlign: 'center',
                }}>
                  <p style={{fontFamily: playfair, fontSize: 32, color: goldAccent, marginBottom: 8, opacity: 0.5}}>
                    {s.step}
                  </p>
                  <p style={{fontSize: 15, color: darkText, fontWeight: 500, marginBottom: 8}}>{s.title}</p>
                  <p style={{fontSize: 14, color: subtleText, lineHeight: 1.6, margin: 0}}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Gift cards CTA ── */}
          <div style={{
            padding: 40, background: warmBg,
            marginTop: 72, textAlign: 'center',
            border: `1px solid ${goldAccent}30`,
          }}>
            <h3 style={{fontFamily: playfair, fontSize: 28, color: darkText, fontWeight: 400, marginBottom: 12}}>
              Not Sure What to Choose?
            </h3>
            <p style={{
              fontSize: 15, color: subtleText,
              lineHeight: 1.7, marginBottom: 24,
              maxWidth: 520, margin: '0 auto 24px',
            }}>
              Our gift cards make it easy — let them choose their own piece, and it still arrives in our beautiful packaging.
            </p>
            <Link
              to="/pages/gift-cards"
              style={{
                display: 'inline-block',
                padding: '15px 44px',
                border: `1px solid ${darkText}`,
                background: 'transparent',
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontFamily: bodyFont,
                color: darkText,
                textDecoration: 'none',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = darkText; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = darkText; }}
            >
              Shop Gift Cards
            </Link>
          </div>

          {/* ── Sustainability note ── */}
          <div style={{marginTop: 72, textAlign: 'center'}}>
            <h2 style={{fontFamily: playfair, fontSize: 32, color: darkText, marginBottom: 20, fontWeight: 400}}>
              Thoughtfully Packaged
            </h2>
            <p style={{fontSize: 16, color: subtleText, lineHeight: 1.8, maxWidth: 600, margin: '0 auto'}}>
              Our packaging is designed to be kept and reused. The jewelry box doubles as a beautiful storage case, and all our materials are recyclable. Because luxury and responsibility should go hand in hand.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

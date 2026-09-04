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

const sizes = [
  { uk: "E", diameter: "13.68" },
  { uk: "F", diameter: "14.20" },
  { uk: "G", diameter: "14.40" },
  { uk: "H", diameter: "14.77" },
  { uk: "I", diameter: "15.17" },
  { uk: "J", diameter: "15.55" },
  { uk: "K", diameter: "15.98" },
  { uk: "L", diameter: "16.40" },
  { uk: "M", diameter: "16.79" },
  { uk: "N", diameter: "17.20" },
  { uk: "O", diameter: "17.59" },
  { uk: "P", diameter: "17.95" },
  { uk: "Q", diameter: "18.38" },
  { uk: "R", diameter: "18.76" },
  { uk: "S", diameter: "19.14" },
  { uk: "T", diameter: "19.53" },
  { uk: "U", diameter: "19.90" },
  { uk: "V", diameter: "20.29" },
  { uk: "W", diameter: "20.67" },
];

export const meta = () => {
  return [
    {title: 'Size Guide | Mercer 79'},
    {
      name: 'description',
      content: "Find your ring size with Mercer 79's UK sizing guide, or request a complimentary ring sizer before you order.",
    },
    {rel: 'canonical', href: 'https://mercer79.com/pages/size-guide'},
  ];
};

export default function SizeGuidePage() {
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
          Size Guide
        </h1>
        <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.85, marginBottom: 0, marginTop: 0 }}>
          Because every piece is made to order, it's important to get your size right before you place your order. If you would like help, please get in touch.
        </p>

        {/* Section 1: How to measure */}
        <h2 style={h2}>Finding your size</h2>


        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 28,
          marginTop: 28,
        }}>
          {[
            {
              num: '01',
              title: 'Request a ring sizer',
              text: 'The most reliable method. Get in touch with your name and address and a complimentary ring sizer will be posted to you, free of charge, before you commit to an order.',
            },
            {
              num: '02',
              title: 'Measure an existing ring',
              text: 'Place a well-fitting ring on a flat surface and measure the internal diameter - straight across the inside of the band - in millimetres. Match to the chart below.',
            },

          ].map((step) => (
            <div key={step.num} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <p style={{
                fontFamily: bodyFont,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: darkText,
                marginBottom: 0,
                marginTop: 2,
                flexShrink: 0,
                width: 28,
              }}>
                {step.num}
              </p>
              <div>
                <p style={{ fontFamily: bodyFont, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: darkText, marginBottom: 8, marginTop: 0 }}>
                  {step.title}
                </p>
                <p style={{ fontSize: 14, color: subtleText, lineHeight: 1.7, margin: 0 }}>
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Tips */}
        <h2 style={h2}>A few things worth knowing</h2>

        <p style={prose}>
          Fingers change size more than most people expect. For the most accurate result, measure at the end of the day rather than first thing in the morning, and avoid measuring in cold weather - fingers are noticeably smaller when cold.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Mercer 79 works in full sizes only. If you fall between two sizes, sizing up gives the most comfortable fit for everyday wear.
        </p>

        {/* Section 3: Size chart */}
        <h2 style={h2}>UK ring size chart</h2>

        <p style={{ ...prose, marginBottom: 28 }}>
  All measurements are in millimetres. Diameter is measured straight across the inside of the band.
</p>

        <div style={{
          border: `1px solid ${borderCol}`,
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 0,
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: darkText,
            padding: '14px 0',
          }}>
           {['UK size', 'Diameter (mm)'].map((h) => (
              <div key={h} style={{
                textAlign: 'center',
                fontSize: 11,
                color: 'white',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {h}
              </div>
            ))}
          </div>
          {/* Table rows */}
          {sizes.map((row, i) => (
            <div key={row.uk} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: i % 2 === 0 ? 'white' : warmBg,
              padding: '11px 0',
              borderTop: `1px solid ${borderCol}`,
            }}>
              <div style={{ textAlign: 'center', fontSize: 15, color: darkText, fontWeight: 500 }}>{row.uk}</div>
              <div style={{ textAlign: 'center', fontSize: 15, color: subtleText }}>{row.diameter}</div>
            </div>
          ))}
        </div>

        {/* Section 4: Still unsure */}
        <h2 style={h2}>I'd like a ring sizer</h2>

        <p style={prose}>
          A complimentary ring sizer can be posted to you anywhere in the UK before you place your order. It takes a minute to use and removes any guesswork. Just get in touch with your name and address.
        </p>

        <Link
          to="/pages/contact"
          style={{
            display: 'inline-block',
            marginTop: 8,
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
          Request a ring sizer
        </Link>

      </div>
    </div>
  );
}
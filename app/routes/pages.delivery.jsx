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
  return [{title: 'Delivery & Returns | Mercer 79'}];
};

export default function DeliveryReturnsPage() {
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
          Delivery & Returns
        </h1>
        <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.85, marginBottom: 0, marginTop: 0 }}>
          Everything you need to know about how your order is sent and what happens if something is not right.
        </p>

        {/* Delivery */}
        <h2 style={h2}>Delivery</h2>
        <p style={prose}>
          All UK orders are sent via Royal Mail Special Delivery - tracked, insured, and requiring a signature on receipt. Delivery is free on all orders over £300. A dispatch notification with tracking details is sent as soon as your piece is on its way.
        </p>
        <p style={prose}>
          Orders are dispatched once the piece is complete. The lead time for all pieces is four to six weeks from the date of order - please bear this in mind when ordering for a specific occasion.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          If you have a specific date in mind, get in touch before placing your order and we will do our best to help.
        </p>

        {/* Packaging */}
        <h2 style={h2}>Packaging</h2>
        <p style={prose}>
          Every Mercer 79 commission is packaged by hand. Your piece arrives in a black soft-touch ring box with a velour interior, presented in its sleeve with Mercer 79 marked in gold on the inside lid. The box is wrapped in black tissue and packed securely for transit.
        </p>
        

        {/* International */}
        <h2 style={h2}>International delivery</h2>
        <p style={{ ...prose, marginBottom: 0 }}>
          We ship internationally. Get in touch before ordering for delivery times and costs outside the UK.
        </p>

        {/* Returns */}
        <h2 style={h2}>Returns</h2>
        <p style={prose}>
          Because every Mercer 79 piece is made to order specifically for you, it falls outside the standard 14-day return right under UK consumer law. This is a recognised legal exemption that applies to bespoke and personalised goods.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          This is not small print - it is simply the nature of how the pieces are made. Please take your time before ordering. The Size Guide is there to help with fit, the product pages cover materials and details in full, and we are happy to answer any questions before you place your order.
        </p>

        {/* If something isn't right */}
        <h2 style={h2}>If something is not right</h2>
        <p style={prose}>
          If a piece arrives damaged, or does not match what was agreed at the time of order, it will always be put right. Please get in touch as soon as possible with photographs and a description of the issue.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Queries about an order can be sent to{' '}
          <a href="mailto:hello@mercer79.com" style={{ color: darkText, textDecoration: 'underline' }}>
            hello@mercer79.com
          </a>.
        </p>

        {/* Sizing */}
        <h2 style={h2}>Sizing</h2>
        <p style={{ ...prose, marginBottom: 0 }}>
          Getting your size right before ordering matters. Full guidance is on the Size Guide page - and a complimentary ring sizer can be posted to you anywhere in the UK before you commit to anything. Just get in touch with your name and address.
        </p>

        {/* CTA */}
        <div style={{
          marginTop: 56,
          paddingTop: 40,
          borderTop: `2px solid ${borderCol}`,
        }}>
          <p style={prose}>
            Any questions about delivery, sizing, or your order - get in touch.
          </p>
          <Link
            to="/pages/contact"
            style={{
              display: 'inline-block',
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
            Get in touch
          </Link>
        </div>

      </div>
    </div>
  );
}

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
  return [{title: 'Delivery & Returns | Mercer 94'}];
};

export default function DeliveryReturnsPage() {
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
            Delivery & Returns
          </h1>
          <div style={{
            width: 80, height: 2, background: goldAccent, margin: "0 auto", opacity: 0.6
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "white", padding: isMobile ? "48px 24px" : "80px 48px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* Delivery */}
          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 26 : 32,
            color: darkText,
            marginBottom: 20,
            fontWeight: 400
          }}>
            Delivery
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
            All UK orders are sent via Royal Mail on a tracked, insured service. Delivery is free on all orders over £250.
          </p>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
            Orders are dispatched once the piece is complete — please allow around eight weeks from the date of order. A dispatch notification with tracking details is sent as soon as the piece is on its way.
          </p>

          {/* Packaging placeholder */}
          <div style={{
            padding: isMobile ? 20 : 24,
            background: warmBg,
            borderRadius: 8,
            marginBottom: 24,
            border: `1px solid ${goldAccent}20`
          }}>
            <p style={{ fontSize: 14, color: mutedText, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
              [Packaging details to be added.]
            </p>
          </div>

          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 32 }}>
            <strong style={{ color: darkText, fontWeight: 500 }}>Need it sooner?</strong> If you have a specific date in mind, get in touch before placing your order and we'll do our best to help.
          </p>

          {/* International placeholder */}
          <div style={{
            padding: isMobile ? 20 : 24,
            background: warmBg,
            borderRadius: 8,
            marginBottom: 56,
            border: `1px solid ${goldAccent}20`
          }}>
            <p style={{ fontSize: 14, color: mutedText, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
              [International shipping information to be added.]
            </p>
          </div>

          {/* Returns */}
          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 26 : 32,
            color: darkText,
            marginBottom: 20,
            fontWeight: 400
          }}>
            Returns
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
            Because every Mercer 94 piece is made to order specifically for you, it falls outside the standard 14-day return right under UK consumer law. This is a recognised legal exemption that applies to bespoke and personalised goods.
          </p>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
            This isn't small print. It's simply the nature of how the pieces are made. Customers are encouraged to take their time before ordering — the Size Guide is there to help with fit, the product pages cover materials and details in full, and Kate is always happy to answer questions before a decision is made.
          </p>

          {/* If something isn't right */}
          <div style={{
            padding: isMobile ? 24 : 32,
            background: warmBg,
            borderRadius: 12,
            marginBottom: 56,
            border: `1px solid ${goldAccent}20`
          }}>
            <h3 style={{
              fontFamily: playfair,
              fontSize: 20,
              color: darkText,
              fontWeight: 400,
              marginBottom: 12
            }}>
              If something isn't right
            </h3>
            <p style={{ fontSize: isMobile ? 14 : 15, color: subtleText, lineHeight: 1.7, margin: 0 }}>
              If a piece arrives damaged, or doesn't match what was agreed at the time of order, Mercer 94 will always put it right. Please get in touch within 48 hours of receiving your order with photographs and a description of the issue.
            </p>
          </div>

          {/* Sizing */}
          <h2 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 26 : 32,
            color: darkText,
            marginBottom: 20,
            fontWeight: 400
          }}>
            Sizing
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.8, marginBottom: 24 }}>
            Getting your size right before ordering matters. Full guidance is on the Size Guide page — and a complimentary ring sizer can be posted to you before you commit to anything. Just get in touch with your name and address.
          </p>

          {/* Contact CTA */}
          <div style={{
            padding: isMobile ? 24 : 32,
            background: warmBg,
            borderRadius: 12,
            marginTop: 48,
            border: `1px solid ${goldAccent}20`
          }}>
            <h3 style={{
              fontFamily: playfair,
              fontSize: 22,
              color: darkText,
              fontWeight: 400,
              marginBottom: 12
            }}>
              Any questions?
            </h3>
            <p style={{ fontSize: 15, color: subtleText, lineHeight: 1.7, marginBottom: 16 }}>
              Get in touch before you order — Kate is happy to help with anything about delivery, sizing, or your piece.
            </p>
            <Link
              to="/pages/contact"
              style={{ fontSize: 15, color: darkText, fontWeight: 500, textDecoration: 'underline' }}
            >
              Get in touch →
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

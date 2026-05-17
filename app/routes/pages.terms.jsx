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
  return [{title: 'Terms & Conditions | Mercer 79'}];
};

export default function TermsPage() {
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
          Terms & Conditions
        </h1>
        <p style={{ fontSize: 13, color: mutedText, marginBottom: 0, marginTop: 0 }}>
          Last updated: March 2026
        </p>

        {/* Who we are */}
        <h2 style={h2}>Who we are</h2>
        <p style={prose}>
          Mercer 79 Ltd is a UK-registered company. Our website is mercer79.com. You can contact us at hello@mercer79.com.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          These terms apply to all orders placed through mercer79.com. By placing an order, you agree to them.
        </p>

        {/* Orders */}
        <h2 style={h2}>Orders and the contract between us</h2>
        <p style={prose}>
          When you place an order, you are making an offer to purchase. That offer is accepted — and a contract formed — when you receive an order confirmation from us by email.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Full payment is taken at the time of order. All prices are in GBP. Mercer 79 is not currently VAT registered — the price shown is the price you pay, with nothing to add.
        </p>

        {/* Made to order */}
        <h2 style={h2}>Made to order</h2>
        <p style={prose}>
          Every piece is made specifically for the person who orders it. Nothing is held in stock. The lead time for all pieces is four to six weeks from the date of order.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          By placing an order you confirm that you have read and understood the lead time, and that you accept it. If you have a specific date in mind, please get in touch before ordering.
        </p>

        {/* Returns */}
        <h2 style={h2}>Returns and cancellations</h2>
        <p style={prose}>
          Because every Mercer 79 piece is made to order specifically for you, it falls outside the standard 14-day cancellation right under the Consumer Contracts Regulations 2013. This is a recognised legal exemption that applies to goods made to a customer's specification.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Please take your time before ordering. If you have any questions about a piece — sizing, materials, or anything else — get in touch before you commit. Kate is happy to help.
        </p>

        {/* Faulty or incorrect goods */}
        <h2 style={h2}>Faulty or incorrect goods</h2>
        <p style={prose}>
          If a piece arrives damaged, or does not match what was agreed at the time of order, your statutory rights are not affected. Please get in touch as soon as possible with photographs and a description of the issue and it will be put right.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Nothing in these terms affects your rights under the Consumer Rights Act 2015.
        </p>

        {/* Sizing */}
        <h2 style={h2}>Sizing</h2>
        <p style={{ ...prose, marginBottom: 0 }}>
          It is your responsibility to provide the correct ring size at the time of order. Full guidance is available on the Size Guide page, and a complimentary ring sizer can be posted to you before you order. If you are unsure, please get in touch before placing your order.
        </p>

        {/* Intellectual property */}
        <h2 style={h2}>Intellectual property</h2>
        <p style={{ ...prose, marginBottom: 0 }}>
          All designs, images, and content on this website are the property of Mercer 79 Ltd and may not be reproduced, copied, or used without written permission.
        </p>

        {/* Liability */}
        <h2 style={h2}>Our liability</h2>
        <p style={prose}>
          Mercer 79 Ltd is not liable for any indirect or consequential loss arising from the use of this website or from any order placed through it. Our liability in connection with any order is limited to the value of that order.
        </p>
        <p style={{ ...prose, marginBottom: 0 }}>
          Nothing in these terms limits our liability for death, personal injury caused by negligence, or fraud.
        </p>

        {/* Governing law */}
        <h2 style={h2}>Governing law</h2>
        <p style={{ ...prose, marginBottom: 0 }}>
          These terms are governed by the law of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>

        {/* Contact */}
        <div style={{
          marginTop: 56,
          paddingTop: 40,
          borderTop: `2px solid ${borderCol}`,
        }}>
          <p style={prose}>
            Questions about these terms? Get in touch.
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

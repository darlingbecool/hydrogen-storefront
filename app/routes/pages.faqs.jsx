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

const faqs = [
  {
    category: "The making process",
    items: [
      {
        q: "How are the pieces made?",
        a: "Every piece is made to order by hand in the UK. Nothing is held in stock — each ring is made specifically for the person who ordered it, and does not exist until they do. The process uses lost-wax casting and hand engraving."
      },
      {
        q: "How long will my order take?",
        a: "The lead time for all pieces is four to six weeks from the date of order. You will receive updates as your piece moves through the making process."
      },
      {
        q: "Can I see progress on my order?",
        a: "Yes — updates are sent at each key stage. Any questions along the way can be directed to Kate directly."
      },
    ]
  },
  {
    category: "Customisation",
    items: [
      {
        q: "What can be customised?",
        a: "Every piece can be made in 9ct, 14ct or 18ct yellow gold. Signet rings are made with a diamond-set initial — the initial is yours to choose. If you would like guidance on which carat is right for you, get in touch before ordering."
      },
      {
        q: "Can I order something that isn't on the site?",
        a: "The current collection focuses on signet rings and a minimal band. If you have something specific in mind, use the bespoke enquiry form and Kate will let you know what is possible."
      },
    ]
  },
  {
    category: "Materials",
    items: [
      {
        q: "What metals do you use?",
        a: "All pieces are made in solid gold — 9ct (37.5% pure gold), 14ct (58.5% pure gold), or 18ct (75% pure gold). Gold is alloyed with other metals to give it strength; higher carat gold is softer and richer in colour, lower carat is more hardwearing."
      },
      {
        q: "What is the difference between natural and lab-grown diamonds?",
        a: "Both are real diamonds — chemically and physically identical. Natural diamonds are formed over billions of years underground; lab-grown diamonds are created in a controlled environment in a fraction of the time. Lab-grown diamonds are typically less expensive. Both are available for all Mercer 79 pieces."
      },
      {
        q: "Are your diamonds ethically sourced?",
        a: "Yes. Both natural and lab-grown diamonds come from certified suppliers."
      },
    ]
  },
  {
    category: "Sizing",
    items: [
      {
        q: "How do I find my ring size?",
        a: "Full guidance is on the Size Guide page. A complimentary ring sizer can be posted to you anywhere in the UK before you order — just get in touch with your name and address."
      },
      {
        q: "What if my ring doesn't fit when it arrives?",
        a: "Get in touch and Kate will advise on next steps. Because each piece is made to order, please take time to confirm your size before ordering — the Size Guide and complimentary ring sizer are there to help with that."
      },
    ]
  },
  {
    category: "Payment",
    items: [
      {
        q: "How do I pay?",
        a: "Full payment is taken at the time of order via the website. All prices are in GBP."
      },
      {
        q: "Are prices inclusive of VAT?",
        a: "Mercer 79 is not currently VAT registered. Prices shown are the full price — there is no VAT to add."
      },
    ]
  },
  {
    category: "Delivery",
    items: [
      {
        q: "How will my order be delivered?",
        a: "All pieces are carefully packaged and sent via tracked, insured post. Full details are on the Delivery page."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. Get in touch before ordering for delivery times and costs outside the UK."
      },
    ]
  },
  {
    category: "Returns",
    items: [
      {
        q: "Can I return my piece?",
        a: "Because every Mercer 79 piece is made to order specifically for you, it falls outside the standard 14-day return right under UK consumer law. This is a recognised legal exemption that applies to bespoke and personalised goods — not small print, simply the nature of how the pieces are made. Please take your time before ordering, and get in touch with any questions first. If something arrives damaged or does not match what was agreed, it will always be put right."
      },
    ]
  },
];

export const meta = () => {
  return [{title: 'FAQs | Mercer 79'}];
};

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid ${borderCol}` }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0',
          cursor: 'pointer',
        }}
      >
        <span style={{
          fontFamily: bodyFont,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: goldAccent,
          paddingRight: 16,
          lineHeight: 1.4,
        }}>
          {faq.q}
        </span>
        <span style={{
          fontSize: 22,
          color: goldAccent,
          flexShrink: 0,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'inline-block',
          lineHeight: 1,
        }}>
          +
        </span>
      </div>
      {open && (
        <p style={{
          fontFamily: bodyFont,
          fontSize: 15,
          color: subtleText,
          lineHeight: 1.8,
          paddingBottom: 16,
          marginTop: 0,
          marginBottom: 0,
        }}>
          {faq.a}
        </p>
      )}
    </div>
  );
}

export default function FAQsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
          Frequently asked questions
        </h1>
        <p style={{ fontSize: isMobile ? 15 : 17, color: subtleText, lineHeight: 1.85, marginBottom: 0, marginTop: 0 }}>
          If your question is not here, get in touch and Kate will answer it directly.
        </p>

        {faqs.map((section, si) => (
          <div key={si}>
            <h2 style={h2}>{section.category}</h2>
            {section.items.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        ))}

        {/* CTA */}
        <div style={{
          marginTop: 56,
          paddingTop: 40,
          borderTop: `2px solid ${borderCol}`,
        }}>
          <p style={{ fontSize: 15, color: subtleText, lineHeight: 1.8, marginBottom: 16 }}>
            Still have a question? Get in touch and Kate will answer it directly.
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

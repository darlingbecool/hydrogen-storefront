import {Link} from 'react-router';
import {useState, useEffect} from 'react';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const goldAccentText = darkText;
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";
const borderCol = "#E8D7AE";

const linkStyle = { color: darkText, textDecoration: 'underline' };

const faqs = [
  {
    category: "The making process",
    items: [
      {
        q: "How long will my order take?",
        a: "The lead time for all pieces is four to six weeks from the date of order. You will receive updates as your piece moves through the making process."
      },
      {
        q: "Can I see progress on my order?",
        a: "Yes - updates are sent at each key stage. Any questions along the way can be sent to us directly."
      },
      {
        q: "What's a resin proof, and how does it work?",
        a: "A resin proof is a resin version of your ring, made in your chosen size and initial, so you can check the fit and feel before committing to gold. It's available for £36, deducted from the price if you go on to order the gold ring. Delivered in one to two weeks."
      },
    ]
  },
  {
    category: "Customisation",
    items: [
      {
        q: "What gold carats are available?",
        a: "Every piece can be made in 9ct, 14ct, or 18ct yellow gold. Prices shown are for 9ct - 14ct and 18ct are available on request, at an adjusted price confirmed with you before your order is placed."
      },
      {
        q: "Can I customise my ring?",
        a: "Beyond a single initial, we can also set a symbol, a number, or two initials together, and switch the diamond setting between raised and flush-set. Get in touch before ordering, or use the bespoke enquiry form, to talk through what you have in mind."
      },
      {
        q: "Can I order something that isn't on the site?",
        a: "The current collection focuses on signet rings and a minimal band. If you have something specific in mind, use the bespoke enquiry form to talk it through."
      },
    ]
  },
  {
    category: "Materials",
    items: [
      {
        q: "What metals do you use?",
        a: "All pieces are made in solid gold, 9ct as standard. Get in touch if you'd prefer 14ct or 18ct."
      },
      {
        q: "What is the difference between natural and lab-grown diamonds?",
        a: "Both are real diamonds, chemically and physically identical. Natural diamonds are formed over billions of years underground; lab-grown diamonds are created in a controlled environment in a fraction of the time. Both are available for all Mercer 79 pieces."
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
        a: <>Full guidance is on the <Link to="/pages/size-guide" style={linkStyle}>Size Guide</Link> page. A complimentary ring sizer can be posted to you anywhere in the UK before you order - just get in touch with your name and address.</>
      },
      {
        q: "What if my ring doesn't fit when it arrives?",
        a: "Get in touch and we'll advise on next steps. Because each piece is made to order, please take time to confirm your size before ordering - the Size Guide and complimentary ring sizer are there to help with that."
      },
    ]
  },
  {
    category: "Payment",
    items: [
      {
        q: "How do I pay?",
        a: "All major credit and debit cards are accepted, including Amex, along with Apple Pay and Google Pay. Full payment is taken at the time of order. All prices are in GBP."
      },
    ]
  },
  {
    category: "Delivery",
    items: [
      {
        q: "How will my order be delivered?",
        a: <>All pieces are carefully packaged and sent via tracked, insured post. Full details are on the <Link to="/pages/delivery" style={linkStyle}>Delivery & Returns</Link> page.</>
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. Get in touch before ordering for delivery times and costs outside the UK."
      },
    ]
  },
  {
    category: "Changes, cancellations & returns",
    items: [
      {
        q: "Can I make changes once my order is placed?",
        a: "Once confirmed, your order goes straight to the goldsmith for production, so we're not able to make changes to size, initial, or gold carat after that point. If you're not sure about something, ordering a resin proof first is a good way to check before committing to gold - or send us any questions before you order."
      },
      {
        q: "Can I cancel my order?",
        a: "Once an order is placed, it goes straight into production and can't be cancelled. Please take your time before ordering, and get in touch with any questions first."
      },
      {
        q: "Can I return my piece?",
        a: "Because every Mercer 79 piece is made to order specifically for you, it falls outside the standard 14-day return right under UK consumer law. Full details are on our <Link to="/pages/terms" style={linkStyle}>Terms & Conditions</Link> page. Please take your time before ordering, and get in touch with any questions first. If something arrives damaged or does not match what was agreed, it will always be put right."
      },
    ]
  },
];

export const meta = () => {
  return [
    {title: 'FAQs | Mercer 79'},
    {
      name: 'description',
      content: "Answers to common questions about Mercer 79's bespoke gold signet rings - sizing, customisation, materials, and delivery.",
    },
    {rel: 'canonical', href: 'https://mercer79.com/pages/faqs'},    
  ];
};

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid ${borderCol}` }}>
      <div
        onClick={() => setOpen(!open)}
role="button"
tabIndex={0}
aria-expanded={open}
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setOpen(!open);
  }
}}
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
          color: goldAccentText,
          paddingRight: 16,
          lineHeight: 1.4,
        }}>
          {faq.q}
        </span>
        <span style={{
          fontSize: 22,
          color: darkText,
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
          If your question is not here, get in touch and we'll answer it directly.
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
            Still have a question? Get in touch and we'll answer it directly.
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

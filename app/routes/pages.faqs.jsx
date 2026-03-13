import {Link} from 'react-router';
import {useState, useEffect} from 'react';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";

const faqs = [
  {
    category: "The Making Process",
    items: [
      {
        q: "How are the pieces made?",
        a: "Every piece is made to order in Mercer 94's London studio, by hand. Traditional jewellery-making techniques form the foundation — the same methods behind the vintage pieces that inspired the brand — combined with contemporary approaches where they serve the work better. Nothing is mass produced, nothing is held in stock. Each piece is made specifically for the person who ordered it."
      },
      {
        q: "How long will my order take?",
        a: "The lead time for all pieces is around eight weeks from the date of order. You'll be kept informed at each key stage throughout the making process."
      },
      {
        q: "Can I see progress on my order?",
        a: "Yes — updates are sent as your piece moves through the studio. Any questions along the way can be directed to Kate directly."
      },
    ]
  },
  {
    category: "Customisation",
    items: [
      {
        q: "What can be customised?",
        a: "Every piece can be made in 9ct, 14ct or 18ct gold — get in touch if you'd like guidance on which carat is right for you. Signet rings can be engraved with initials. Beyond that, options vary by piece and are outlined on each product page."
      },
      {
        q: "Can I order something that isn't on the site?",
        a: "The current collection focuses on signet rings and minimal bands. If you have something specific in mind, get in touch and we'll let you know what's possible."
      },
    ]
  },
  {
    category: "Materials & Hallmarking",
    items: [
      {
        q: "What metals do you use?",
        a: "All pieces are made in solid gold — 9ct (37.5% pure), 14ct (58.5% pure), or 18ct (75% pure) — ethically sourced from certified suppliers."
      },
      {
        q: "Are the pieces hallmarked?",
        a: "Yes. Every piece leaves the studio hallmarked by the London Assay Office — the institution that has been independently certifying the quality of British precious metals since 1478. The hallmark is your assurance that the gold is exactly what it says it is."
      },
      {
        q: "Are your diamonds conflict-free?",
        a: "Yes. Both natural and lab-grown diamonds are available, and all are ethically sourced from certified suppliers."
      },
    ]
  },
  {
    category: "Sizing",
    items: [
      {
        q: "How do I find my ring size?",
        a: "Full guidance is on the Size Guide page. A complimentary ring sizer can also be posted to you before you order — just get in touch with your name and address."
      },
      {
        q: "What if my ring doesn't fit when it arrives?",
        a: "Please get in touch and we'll advise on next steps. [Resizing policy to be added.]"
      },
    ]
  },
  {
    category: "Payment",
    items: [
      {
        q: "How do I pay?",
        a: "Full payment is taken at the time of order. All prices are in GBP and include VAT where applicable."
      },
    ]
  },
  {
    category: "Delivery",
    items: [
      {
        q: "How will my order be delivered?",
        a: "All pieces are packaged carefully and sent via tracked, insured Royal Mail post. Full details are on the Delivery page."
      },
      {
        q: "Do you ship internationally?",
        a: "[International shipping information to be added.]"
      },
    ]
  },
  {
    category: "Returns",
    items: [
      {
        q: "Can I return my piece?",
        a: "Because every Mercer 94 piece is made to order specifically for you, it falls outside the standard 14-day return right under UK consumer law. This is a recognised legal exemption that applies to bespoke and personalised goods — it's not small print, it's simply the nature of how the pieces are made. Customers are encouraged to take their time before ordering, and Kate is always happy to answer questions before a decision is made. If something arrives damaged or doesn't match what was agreed, Mercer 94 will always put it right."
      },
    ]
  },
];

export const meta = () => {
  return [{title: 'FAQs | Mercer 94'}];
};

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid #E8E4DE", paddingBottom: 20, marginBottom: 20 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          textAlign: "left"
        }}
      >
        <h3 style={{ fontSize: 18, color: darkText, fontWeight: 500, margin: 0, paddingRight: 16 }}>
          {faq.q}
        </h3>
        <span style={{
          fontSize: 20,
          color: goldAccent,
          flexShrink: 0,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)'
        }}>
          +
        </span>
      </button>
      {open && (
        <p style={{ fontSize: 16, color: mutedText, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>
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
            fontSize: isMobile ? 32 : 48,
            color: darkText,
            marginBottom: 16,
            fontWeight: 400,
            lineHeight: 1.2
          }}>
            Frequently Asked Questions
          </h1>
          <div style={{
            width: 80, height: 2, background: goldAccent, margin: "0 auto", opacity: 0.6
          }} />
        </div>
      </div>

      {/* FAQs */}
      <div style={{ background: "white", padding: isMobile ? "48px 24px" : "80px 48px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {faqs.map((section, si) => (
            <div key={si} style={{ marginBottom: 48 }}>
              <h2 style={{
                fontFamily: playfair,
                fontSize: isMobile ? 20 : 22,
                color: darkText,
                fontWeight: 400,
                marginBottom: 24,
                paddingBottom: 12,
                borderBottom: `2px solid ${goldAccent}`,
                display: 'inline-block',
                letterSpacing: '0.02em'
              }}>
                {section.category}
              </h2>
              {section.items.map((faq, i) => (
                <FAQItem key={i} faq={faq} />
              ))}
            </div>
          ))}

          {/* Contact CTA */}
          <div style={{
            marginTop: 48,
            padding: isMobile ? 24 : 32,
            background: warmBg,
            borderRadius: 12,
            textAlign: "center",
            border: `1px solid ${goldAccent}20`
          }}>
            <h3 style={{ fontFamily: playfair, fontSize: 22, color: darkText, fontWeight: 400, marginBottom: 12 }}>
              Still have a question?
            </h3>
            <p style={{ fontSize: 15, color: mutedText, lineHeight: 1.7, marginBottom: 20 }}>
              Get in touch — Kate is happy to help with anything before you order.
            </p>
            <Link
              to="/pages/contact"
              style={{
                display: 'inline-block',
                padding: "14px 32px",
                border: `2px solid ${darkText}`,
                background: "white",
                borderRadius: 8,
                fontSize: 13,
                letterSpacing: "0.1em",
                fontWeight: 500,
                fontFamily: bodyFont,
                color: darkText,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.target.style.background = darkText; e.target.style.color = 'white'; }}
              onMouseLeave={(e) => { e.target.style.background = 'white'; e.target.style.color = darkText; }}
            >
              GET IN TOUCH
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

import {useState, useEffect} from 'react';
import {Link, useLoaderData} from 'react-router';
import {Image} from '@shopify/hydrogen';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";
const borderCol = "#E8D7AE";

const amounts = ["50", "100", "250", "500"];

export const meta = () => {
  return [{title: 'Gift Card | Mercer 79'}];
};

export async function loader({context}) {
  const {storefront} = context;
  const {product} = await storefront.query(GIFT_CARD_QUERY, {
    variables: { handle: 'gift-card' }
  });
  return {giftCard: product};
}

export default function GiftCardPage() {
  const {giftCard} = useLoaderData();
  const [isMobile, setIsMobile] = useState(false);
  const [amount, setAmount] = useState("100");
  const [customAmount, setCustomAmount] = useState("");
  const [recipient, setRecipient] = useState({ name: "", email: "", message: "" });
  const [addedToBag, setAddedToBag] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const displayAmount = customAmount || amount || "100";

  const handleAddToBag = () => {
    setAddedToBag(true);
    console.log('Gift card:', { amount: displayAmount, recipient });
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: `1px solid ${borderCol}`,
    borderRadius: 8,
    fontSize: 15,
    fontFamily: bodyFont,
    outline: "none",
    boxSizing: "border-box",
    color: darkText,
    background: "white",
  };

  return (
    <div style={{ background: 'white', marginLeft: isMobile ? '0' : '50px' }}>

      {/* Main Content */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: isMobile ? "24px 24px 64px" : "48px 32px 80px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 40 : 80,
      }}>

        {/* Left: Gift Card Visual */}
        <div style={isMobile ? {} : { position: "sticky", top: 100, alignSelf: "flex-start" }}>
          {giftCard?.featuredImage ? (
            <div style={{
              width: "100%",
              aspectRatio: "1",
              border: `1px solid ${borderCol}`,
              overflow: "hidden",
            }}>
              <Image
                data={giftCard.featuredImage}
                aspectRatio="1/1"
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ) : (
            <div style={{
              width: "100%",
              aspectRatio: "1",
              background: warmBg,
              border: `1px solid ${borderCol}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}>
              <p style={{
                fontFamily: bodyFont,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: darkText,
                margin: 0,
              }}>
                Mercer 79
              </p>
              <p style={{
                fontFamily: playfair,
                fontSize: isMobile ? 52 : 72,
                color: darkText,
                margin: 0,
                lineHeight: 1,
              }}>
                £{displayAmount}
              </p>
              <p style={{
                fontFamily: bodyFont,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: mutedText,
                margin: 0,
              }}>
                Gift Card
              </p>
            </div>
          )}
        </div>

        {/* Right: Details and form */}
        <div>
          <p style={{
            fontFamily: bodyFont,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: darkText,
            marginBottom: 12,
            marginTop: 0,
          }}>
            Gift Card
          </p>
          <h1 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 32 : 42,
            color: darkText,
            marginBottom: 16,
            marginTop: 0,
            fontWeight: 400,
            lineHeight: 1.2,
          }}>
            £{displayAmount}
          </h1>
          <p style={{
            fontSize: isMobile ? 15 : 17,
            color: subtleText,
            lineHeight: 1.85,
            marginBottom: 32,
            fontFamily: bodyFont,
          }}>
            A Mercer 79 gift card lets someone choose their own piece - the ring, the initial, the gold. Sent by email instantly, with no expiry date.
          </p>

          <div style={{ height: 1, background: borderCol, marginBottom: 32 }} />

          {/* Amount */}
          <div style={{ marginBottom: 32 }}>
            <p style={{
              fontFamily: bodyFont,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: darkText,
              marginBottom: 16,
              marginTop: 0,
            }}>
              Amount
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              marginBottom: 12,
            }}>
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAmount(a); setCustomAmount(""); }}
                  style={{
                    padding: "14px 8px",
                    border: amount === a && !customAmount ? `1px solid ${darkText}` : `1px solid ${borderCol}`,
                    borderRadius: 8,
                    background: amount === a && !customAmount ? darkText : "white",
                    color: amount === a && !customAmount ? "white" : darkText,
                    fontSize: 15,
                    fontFamily: bodyFont,
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  £{a}
                </button>
              ))}
            </div>
            <input
              type="text"
              inputMode="numeric"
              value={customAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                if (parseInt(val) >= 50 || val === '') {
                  setCustomAmount(val);
                  if (val) setAmount("");
                }
              }}
              placeholder="Custom amount (minimum £50)"
              style={{
                ...inputStyle,
                border: customAmount ? `1px solid ${darkText}` : `1px solid ${borderCol}`,
              }}
            />
          </div>

          {/* Recipient */}
          <div style={{ marginBottom: 32 }}>
            <p style={{
              fontFamily: bodyFont,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: darkText,
              marginBottom: 16,
              marginTop: 0,
            }}>
              Recipient
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                type="text"
                placeholder="Recipient name"
                value={recipient.name}
                onChange={(e) => setRecipient({...recipient, name: e.target.value})}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Recipient email"
                value={recipient.email}
                onChange={(e) => setRecipient({...recipient, email: e.target.value})}
                style={inputStyle}
              />
              <textarea
                placeholder="Personal message (optional)"
                value={recipient.message}
                onChange={(e) => setRecipient({...recipient, message: e.target.value})}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
          </div>

          {/* Purchase button */}
          <button
            onClick={handleAddToBag}
            style={{
              width: "100%",
              padding: "16px 28px",
              border: "none",
              borderRadius: 8,
              background: addedToBag ? "#2D5A27" : darkText,
              color: "white",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: bodyFont,
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            {addedToBag ? "Added to bag" : "Purchase gift card"}
          </button>

          {/* Details */}
          <div style={{ marginTop: 40, borderTop: `1px solid ${borderCol}`, paddingTop: 32 }}>
            <p style={{
              fontFamily: bodyFont,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: darkText,
              marginBottom: 16,
              marginTop: 0,
            }}>
              Details
            </p>
            {[
              { label: "Delivery", value: "Sent immediately to the email address provided above" },
              { label: "Validity", value: "No expiry date" },
              { label: "Redeemable against", value: "Any piece in the collection" },
              { label: "Personal message", value: "Included - add yours above" },
            ].map((item, i, arr) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "12px 0",
                borderBottom: i < arr.length - 1 ? `1px solid ${borderCol}` : "none",
                gap: 16,
              }}>
                <span style={{ fontSize: 14, color: darkText, flexShrink: 0 }}>{item.label}</span>
                <span style={{ fontSize: 14, color: subtleText, textAlign: "right" }}>{item.value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

const GIFT_CARD_QUERY = `#graphql
  query GiftCard($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      featuredImage {
        id
        url
        altText
        width
        height
      }
      variants(first: 10) {
        nodes {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
        }
      }
    }
  }
`;

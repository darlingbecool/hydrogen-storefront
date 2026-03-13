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

const amounts = ["50", "100", "250", "500"];

export const meta = () => {
  return [{title: 'Gift Card | Mercer 94'}];
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
    padding: 16,
    border: "1px solid #D4D0CA",
    borderRadius: 8,
    fontSize: 15,
    fontFamily: bodyFont,
    outline: "none",
    boxSizing: "border-box"
  };

  return (
    <div style={{ background: 'white', marginLeft: isMobile ? '0' : '50px' }}>

      {/* Breadcrumb */}
      <div style={{ padding: isMobile ? "16px 24px" : "20px 32px" }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: subtleText,
            textDecoration: "none",
            letterSpacing: "0.05em"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={darkText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 9H3" />
            <path d="M8 4L3 9l5 5" />
          </svg>
          Home / Gift Card
        </Link>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: "100%",
        margin: "0 auto",
        padding: isMobile ? "0 24px 64px" : "0 32px 80px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 40 : 60
      }}>

        {/* Left: Gift Card Visual */}
        <div style={isMobile ? {} : { position: "sticky", top: 100, alignSelf: "flex-start" }}>
          {giftCard?.featuredImage ? (
            <div style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: 8,
              border: "12px solid rgba(180,175,165,0.25)",
              overflow: "hidden",
              position: "relative"
            }}>
              <Image
                data={giftCard.featuredImage}
                aspectRatio="1/1"
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ) : (
            <div style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: 8,
              background: "linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%)",
              border: "12px solid rgba(180,175,165,0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <p style={{ fontSize: 14, letterSpacing: "0.2em", color: subtleText, marginBottom: 12 }}>GIFT CARD</p>
              <p style={{ fontFamily: playfair, fontSize: isMobile ? 52 : 72, color: darkText, margin: 0, lineHeight: 1 }}>
                £{displayAmount}
              </p>
              <p style={{ fontSize: 14, letterSpacing: "0.2em", color: subtleText, marginTop: 12 }}>MERCER 94</p>
            </div>
          )}
        </div>

        {/* Right: Details & Form */}
        <div>
          <p style={{ fontSize: 12, letterSpacing: "0.15em", color: goldAccent, fontWeight: 500, marginBottom: 8 }}>GIFT</p>
          <h1 style={{
            fontFamily: playfair,
            fontSize: isMobile ? 32 : 40,
            color: darkText,
            marginBottom: 12,
            fontWeight: 400,
            lineHeight: 1.2
          }}>
            Gift Card
          </h1>
          <p style={{ fontSize: 24, color: darkText, fontWeight: 500, marginBottom: 24 }}>£{displayAmount}</p>
          <p style={{ fontSize: 16, color: subtleText, lineHeight: 1.7, marginBottom: 40 }}>
            Give the gift of hand-crafted jewelry. Your recipient will receive a beautifully designed digital gift card, valid for 12 months from purchase. Redeemable against any piece in our collection.
          </p>

          <div style={{ height: 1, background: "#E8E4DE", marginBottom: 32 }} />

          {/* Amount Selection */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 14, letterSpacing: "0.1em", color: darkText, fontWeight: 500, marginBottom: 16 }}>AMOUNT</p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              marginBottom: 16
            }}>
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAmount(a); setCustomAmount(""); }}
                  style={{
                    padding: isMobile ? "12px 8px" : "16px 20px",
                    border: amount === a && !customAmount ? `2px solid ${darkText}` : "1px solid #D4D0CA",
                    borderRadius: 8,
                    background: amount === a && !customAmount ? darkText : "white",
                    color: amount === a && !customAmount ? "white" : darkText,
                    fontSize: isMobile ? 14 : 15,
                    fontWeight: amount === a && !customAmount ? 500 : 400,
                    fontFamily: bodyFont,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
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
                border: customAmount ? `2px solid ${darkText}` : "1px solid #D4D0CA",
              }}
            />
          </div>

          {/* Recipient Details */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 14, letterSpacing: "0.1em", color: darkText, fontWeight: 500, marginBottom: 16 }}>RECIPIENT</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Recipient Name" value={recipient.name}
                onChange={(e) => setRecipient({...recipient, name: e.target.value})} style={inputStyle} />
              <input type="email" placeholder="Recipient Email" value={recipient.email}
                onChange={(e) => setRecipient({...recipient, email: e.target.value})} style={inputStyle} />
              <textarea placeholder="Personal Message (Optional)" value={recipient.message}
                onChange={(e) => setRecipient({...recipient, message: e.target.value})}
                rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAddToBag}
            style={{
              width: "100%",
              padding: 20,
              marginBottom: 12,
              border: "none",
              borderRadius: 8,
              background: addedToBag ? "#2D5A27" : darkText,
              color: "white",
              fontSize: 15,
              letterSpacing: "0.15em",
              fontWeight: 500,
              fontFamily: bodyFont,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            {addedToBag ? "✓ ADDED TO BAG" : "PURCHASE GIFT CARD"}
          </button>

          {/* Details */}
          <div style={{ marginTop: 40 }}>
            <h3 style={{ fontFamily: playfair, fontSize: 24, color: darkText, marginBottom: 20, fontWeight: 400 }}>
              Details
            </h3>
            {[
              { label: "Delivery", value: "Sent instantly via email" },
              { label: "Validity", value: "12 months from purchase" },
              { label: "Redeemable", value: "Any piece in our collection" },
              { label: "Personalisation", value: "Custom message included" },
            ].map((item, i, arr) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: i < arr.length - 1 ? "1px solid #E8E4DE" : "none"
              }}>
                <span style={{ fontSize: 15, color: darkText }}>{item.label}</span>
                <span style={{ fontSize: 15, color: subtleText, textAlign: "right" }}>{item.value}</span>
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

import {useState, useEffect} from 'react';
import {useLoaderData} from 'react-router';
import {useAside} from '~/components/Aside';
import {CartForm, Image} from '@shopify/hydrogen';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";
const warmBg = "#F5F2ED";
const borderCol = "#E8D7AE";

// Kept as a constant rather than pulled from Shopify: the resin variants
// query doesn't currently return a price field, so this matches the same
// hardcoded £36 already used on both product pages' resin accordions.
const RESIN_PRICE = 36;

const processSteps = [
  {
    num: "01", title: "Choose your style",
    body: "Pick No. 1 Oval or No. 2 Rectangular, then your size and initial - same options as the gold ring.",
  },
  {
    num: "02", title: "We make it in resin",
    body: "A lightweight resin cast in your size, with your initial, ready in 1-2 weeks.",
  },
  {
    num: "03", title: "Check the fit",
    body: "Wear it, see how the initial sits, and decide with confidence before ordering the real thing.",
  },
  {
    num: "04", title: "Go for gold",
    body: "Order the gold ring when you're ready - we'll take £36 off the price.",
  },
];

const faqItems = [
  {
    q: "What does the resin proof actually feel like?",
    a: "It's the same size and shape as your gold ring, cast in a lightweight resin, so you can check comfort, fit, and how the initial sits - not the weight or finish of gold itself.",
  },
  {
    q: "Do I get the £36 back if I order the gold ring?",
    a: "We deduct £36 from the price of your gold ring if you go on to order it, so the resin proof effectively costs nothing if you decide to buy.",
  },
  {
    q: "How long does delivery take?",
    a: "Resin proofs are made to order and typically delivered within 1-2 weeks - much faster than the 4-6 week lead time for the gold ring itself.",
  },
  {
    q: "Can I return it?",
    a: "As a made-to-order piece, the resin proof itself can't be returned - but that's exactly the point: it lets you get sizing and fit right before committing to gold.",
  },
];

export const meta = () => [
  { title: 'Resin Proof | Mercer 79' },
  {
    name: 'description',
    content: "Not sure about sizing? Try your Mercer 79 signet ring in resin first - your exact size and initial, delivered in 1-2 weeks, with the cost deducted if you order the gold ring.",
  },
  { rel: 'canonical', href: 'https://mercer79.com/pages/resin-proof' },
];

export async function loader({context}) {
  const {storefront} = context;

  const [no1, no2] = await Promise.all([
    storefront.query(RESIN_VARIANTS_QUERY, {
      variables: {handle: 'resin-proof-no-1'},
    }),
    storefront.query(RESIN_VARIANTS_QUERY, {
      variables: {handle: 'resin-proof-no-2'},
    }),
  ]);

  return {
    no1Variants: no1?.product?.variants?.nodes ?? [],
    no1Image: no1?.product?.featuredImage ?? null,
    no2Variants: no2?.product?.variants?.nodes ?? [],
    no2Image: no2?.product?.featuredImage ?? null,
  };
}

export default function ResinProof() {
  const {no1Variants, no1Image, no2Variants, no2Image} = useLoaderData();

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <style>{`
        .resin-process-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: ${borderCol};
          max-width: 1100px;
          margin: 0 auto;
          border: 1px solid ${borderCol};
          border-radius: 12px;
          overflow: hidden;
        }
        .resin-ring-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .resin-process-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .resin-process-cards { grid-template-columns: 1fr !important; }
          .resin-ring-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "88px 32px 72px", textAlign: "center" }}>
        <h1 style={{ fontFamily: playfair, fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.25, color: darkText, marginBottom: 20 }}>
          Not sure about sizing? Try it in resin first.
        </h1>
        <p style={{ fontSize: 17, color: subtleText, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
          Before committing to gold, we'll make your ring in resin - your size and initial - so you can see and feel it on your hand. Delivered in 1-2 weeks. If you go on to order the real thing, we'll take the resin cost off the price.
        </p>
      </div>

      {/* Process */}
      <div style={{ background: warmBg, padding: "80px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: darkText, fontWeight: 500, marginBottom: 16 }}>THE PROCESS</p>
          <h2 style={{ fontFamily: playfair, fontSize: 32, fontWeight: 400, color: darkText }}>How it works</h2>
        </div>
        <div className="resin-process-cards">
          {processSteps.map((step) => (
            <div key={step.num} style={{ background: warmBg, padding: "40px 32px" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.15em", color: darkText, fontWeight: 500, marginBottom: 20 }}>{step.num}</p>
              <h3 style={{ fontFamily: playfair, fontSize: 20, fontWeight: 400, color: darkText, marginBottom: 14 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: subtleText, lineHeight: 1.8 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Choose your style */}
      <div style={{ padding: "80px 32px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: playfair, fontSize: 32, fontWeight: 400, color: darkText, marginBottom: 12 }}>Choose a style to try</h2>
          <p style={{ fontSize: 15, color: mutedText }}>Select your size and initial for either ring below.</p>
        </div>

        <div className="resin-ring-cards">
          <ResinOrderCard
  ringLabel="No. 1 Oval Signet"
  basedOnProduct="No. 1 Oval Signet Ring with Diamond Initial"
  variants={no1Variants}
  image={no1Image}
/>
<ResinOrderCard
  ringLabel="No. 2 Rectangular Signet"
  basedOnProduct="No. 2 Rectangular Signet Ring with Diamond-Set Initial"
  variants={no2Variants}
  image={no2Image}
/>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: warmBg, padding: "80px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: playfair, fontSize: 28, fontWeight: 400, color: darkText, textAlign: "center", marginBottom: 40 }}>
            Common questions
          </h2>
          {faqItems.map((item, i) => (
            <div key={item.q} style={{ padding: "22px 0", borderBottom: i < faqItems.length - 1 ? `1px solid ${borderCol}` : "none" }}>
              <h4 style={{ fontSize: 15, fontWeight: 500, color: darkText, margin: "0 0 8px" }}>{item.q}</h4>
              <p style={{ fontSize: 14, color: subtleText, margin: 0, lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <p style={{ textAlign: "center", padding: "48px 32px", fontSize: 12, color: mutedText, fontStyle: "italic", letterSpacing: "0.03em" }}>
        ✦ Hand-crafted in the UK ✦
      </p>
    </div>
  );
}

function ResinOrderCard({ ringLabel, basedOnProduct, variants, image }) {
  const { open } = useAside();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedInitial, setSelectedInitial] = useState('');

  const sizeOptions = variants
    .map((v) => v.selectedOptions?.find((o) => o.name === 'Size')?.value)
    .filter(Boolean);

  const matchedVariant = variants.find((v) =>
    v.selectedOptions?.some((o) => o.name === 'Size' && o.value === selectedSize)
  );

  const canAdd = Boolean(matchedVariant?.id && selectedInitial);

  return (
    <div style={{ border: `1px solid ${borderCol}`, borderRadius: 12, overflow: "hidden", background: "white" }}>
      <div style={{
        width: "100%", aspectRatio: "4 / 3",
        background: image ? "white" : "linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {image ? (
          <Image
            data={image}
            sizes="(min-width: 900px) 500px, 100vw"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontFamily: playfair, fontSize: 64, color: darkText, opacity: 0.85 }}>
            {selectedInitial || ringLabel.charAt(0)}
          </span>
        )}
      </div>

      <div style={{ padding: "28px 28px 32px" }}>
        <h3 style={{ fontSize: 20, fontWeight: 500, color: darkText, margin: "0 0 4px" }}>{ringLabel}</h3>
        <p style={{ fontSize: 14, color: mutedText, margin: "0 0 24px" }}>Resin proof - £{RESIN_PRICE}</p>

        <div style={{ marginBottom: 22 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: darkText, marginBottom: 10, display: "block" }}>
            Ring size
          </span>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px",
              border: `1px solid ${borderCol}`, borderRadius: 8,
              background: "white", color: darkText, fontSize: 14,
              fontFamily: bodyFont, cursor: "pointer", appearance: "none",
            }}
          >
            <option value="">Select ring size</option>
            {sizeOptions.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 22 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: darkText, marginBottom: 10, display: "block" }}>
            Your initial
          </span>
          <select
            value={selectedInitial}
            onChange={(e) => setSelectedInitial(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px",
              border: `1px solid ${borderCol}`, borderRadius: 8,
              background: "white", color: darkText, fontSize: 14,
              fontFamily: bodyFont, cursor: "pointer", appearance: "none",
            }}
          >
            <option value="">Select initial</option>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <option key={letter} value={letter}>{letter}</option>
            ))}
          </select>
        </div>

        <CartForm
          route="/cart"
          action={CartForm.ACTIONS.LinesAdd}
          inputs={{
            lines: canAdd ? [{
              merchandiseId: matchedVariant.id,
              quantity: 1,
              attributes: [
                { key: 'Initial', value: selectedInitial },
                { key: 'Ring size', value: selectedSize },
                { key: 'Based on', value: basedOnProduct },
              ],
            }] : [],
          }}
        >
          {(fetcher) => {
            useEffect(() => {
              if (
                fetcher.state === 'idle' &&
                fetcher.data?.cart &&
                !fetcher.data?.errors?.length &&
                typeof window !== 'undefined' &&
                window.klaviyo
              ) {
                window.klaviyo.track('Added Resin Proof to Cart', {
                  $value: RESIN_PRICE,
                  ResinProductName: `Resin Proof - ${ringLabel}`,
                  ResinBasedOnProduct: basedOnProduct,
                  ResinSize: selectedSize,
                  ResinInitial: selectedInitial,
                  ResinPrice: RESIN_PRICE,
                  Quantity: 1,
                });
              }
            }, [fetcher.state, fetcher.data]);

            return (
              <button
                type="submit"
                disabled={!canAdd || fetcher.state !== 'idle'}
                onClick={() => { if (canAdd) open('cart'); }}
                style={{
                  width: "100%", padding: 16, border: "none", borderRadius: 8,
                  background: canAdd ? darkText : "#ccc",
                  color: "white", fontSize: 12, letterSpacing: "0.12em",
                  textTransform: "uppercase", fontWeight: 500,
                  fontFamily: bodyFont,
                  cursor: canAdd ? "pointer" : "default",
                }}
              >
                {fetcher.state !== 'idle' ? "Adding..." : `Add to bag - £${RESIN_PRICE}`}
              </button>
            );
          }}
        </CartForm>
      </div>
    </div>
  );
}

const RESIN_VARIANTS_QUERY = `#graphql
  query ResinProofPageVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      featuredImage { id url altText width height }
      variants(first: 30) {
        nodes {
          id
          availableForSale
          selectedOptions { name value }
        }
      }
    }
  }
`;
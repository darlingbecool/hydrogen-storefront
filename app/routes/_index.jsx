import {Link, useLoaderData} from 'react-router';

// ── Design tokens ──────────────────────────────────────────────────────────────
const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";
const borderColor = "#E8D7AE";

export const meta = () => {
  return [
    {title: 'Mercer 79 - Made-to-Order Gold Signet Rings'},
    {
      name: 'description',
      content: 'Bespoke 9ct gold signet rings, made to order and hand-crafted in the UK. Choose your initial, your gold, your size - made once, for you.',
    },
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  const data = await storefront.query(FEATURED_PRODUCTS_QUERY);
  const products = [data.product1, data.product2, data.product3].filter(Boolean);
  return {products};
}

export default function Homepage() {
  const {products} = useLoaderData();

  return (
    <>
      <style>{`
        /* ── Hero ── */
        .hero-section {
          background: linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 50%, #F5F2ED 100%);
          width: 100%;
          padding: 120px 80px 100px;
        }

        /* ── Featured products ── */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
          padding: 80px 80px;
          box-sizing: border-box;
        }
        .product-card {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .product-card-image {
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          background: #F5F2ED;
          margin-bottom: 16px;
        }
        .product-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .product-card:hover .product-card-image img {
          transform: scale(1.04);
        }

        /* ── CTA button ── */
        .hero-cta {
          display: inline-block;
          padding: 16px 44px;
          border: 1px solid ${darkText};
          background: transparent;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-family: ${bodyFont};
          color: ${darkText};
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .hero-cta:hover {
          background: ${darkText};
          color: #ffffff;
        }

        /* ── Homepage only: hide the newsletter divider line ── */
        .newsletter-divider {
          display: none;
        }
        .newsletter-section {
          padding-top: 40px !important;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .hero-section {
            padding: 72px 24px 64px;
          }
          .hero-section h1 {
            font-size: 40px !important;
          }
          .featured-grid {
            grid-template-columns: 1fr !important;
            padding: 48px 24px;
            gap: 40px;
          }
          .story-banner {
            min-height: 400px !important;
          }
          .story-banner h2 {
            font-size: 36px !important;
          }
        }

        /* ── Story banner ── */
        .story-banner {
          position: relative;
          width: 100%;
          min-height: 640px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 40%, #F0E6C8 70%, #F5F2ED 100%);
        }
        .story-banner-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s ease;
        }
        .story-banner:hover .story-banner-img {
          transform: scale(1.03);
        }
        .story-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(245, 242, 237, 0.82) 0%,
            rgba(245, 242, 237, 0.55) 50%,
            rgba(245, 242, 237, 0.15) 100%
          );
        }
        .story-banner-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1040px;
          margin: 0 auto;
          padding: 80px 80px;
        }
        .story-banner-cta {
          display: inline-block;
          padding: 14px 40px;
          border: 1px solid ${darkText};
          background: transparent;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-family: ${bodyFont};
          color: ${darkText};
          text-decoration: none;
          margin-top: 32px;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .story-banner-cta:hover {
          background: ${darkText};
          color: #ffffff;
        }
        @media (max-width: 768px) {
          .story-banner-content {
            padding: 60px 24px;
          }
          .story-banner-overlay {
            background: rgba(245, 242, 237, 0.7);
          }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="hero-section">
        <div style={{maxWidth: 1040, margin: '0 auto'}}>
          <p style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            color: goldAccent,
            fontWeight: 600,
            marginBottom: 28,
            fontFamily: bodyFont,
            textTransform: 'uppercase',
          }}>
            Mercer 79
          </p>

          <h1 style={{
            fontFamily: playfair,
            fontSize: 68,
            color: darkText,
            marginBottom: 28,
            lineHeight: 1.08,
            fontWeight: 400,
            maxWidth: 640,
          }}>
            Made to order.<br />Made to last.
          </h1>

          <div style={{
            width: 48,
            height: 1,
            background: goldAccent,
            marginBottom: 28,
          }} />
<p style={{
            fontSize: 17,
            color: subtleText,
            marginBottom: 44,
            lineHeight: 1.75,
            width: '100%',
            maxWidth: 480,
            boxSizing: 'border-box',
            fontFamily: bodyFont,
          }}>
            Bespoke gold signet rings, hand-crafted in the UK. The kind of thing you wear every day and never take off.
          </p>
        </div>
      </section>
      
  <div
  className="featured-grid"
  style={{
    gridTemplateColumns: `repeat(${products.length}, minmax(240px, 340px))`,
    justifyContent: 'center',
  }}
>
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>

      {/* ── STORY BANNER ─────────────────────────────────────────────────────── */}
      <Link to="/pages/about" className="story-banner">
        <img
          className="story-banner-img"
          src="https://cdn.shopify.com/s/files/1/1012/2549/6921/files/IMG_8654_2.jpg?v=1785944728"
          alt="Hand wearing layered gold signet rings and a necklace"
        />
        <div className="story-banner-overlay" />
        <div className="story-banner-content">
          <p style={{
            fontFamily: bodyFont,
            fontSize: 11,
            letterSpacing: '0.2em',
            color: goldAccent,
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            The story
          </p>
          <h2 style={{
            fontFamily: playfair,
            fontSize: 52,
            fontWeight: 400,
            color: darkText,
            lineHeight: 1.1,
            maxWidth: 520,
            marginBottom: 0,
          }}>
            A ring found in a drawer.<br />Never taken off since.
          </h2>
          <span className="story-banner-cta">Read the story</span>
        </div>
      </Link>
    </>
  );
}

// ── Product card ───────────────────────────────────────────────────────────────
function ProductCard({product}) {
  const price = product.priceRange.minVariantPrice;
  const formattedPrice = Math.round(parseFloat(price.amount));

  return (
    <Link to={`/products/${product.handle}`} className="product-card">
      <div className="product-card-image">
        {product.featuredImage?.url && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
          />
        )}
      </div>

      <p style={{
        fontFamily: playfair,
        fontSize: 17,
        fontWeight: 400,
        color: darkText,
        marginBottom: 6,
        letterSpacing: '0.01em',
      }}>
        {product.title}
      </p>

      <p style={{
        fontFamily: bodyFont,
        fontSize: 13,
        color: mutedText,
        margin: 0,
        letterSpacing: '0.04em',
      }}>
        £{formattedPrice.toLocaleString()}
      </p>
    </Link>
  );
}

// ── GraphQL query ──────────────────────────────────────────────────────────────
const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts {
    product1: product(handle: "no-1-oval-signet") {
      id title handle
      featuredImage { url altText }
      priceRange { minVariantPrice { amount currencyCode } }
    }
    product2: product(handle: "no-2-rectangular-signet") {
      id title handle
      featuredImage { url altText }
      priceRange { minVariantPrice { amount currencyCode } }
    }
    product3: product(handle: "no-3-flat-band") {
      id title handle
      featuredImage { url altText }
      priceRange { minVariantPrice { amount currencyCode } }
    }
  }
`;
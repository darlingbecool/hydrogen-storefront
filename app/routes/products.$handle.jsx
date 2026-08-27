import React, { useState, useRef, useEffect } from "react";
import { useLoaderData, useNavigate } from 'react-router';
import { Link } from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  CartForm,
  Money,
} from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { addToWishlist, removeFromWishlist, getWishlist } from '~/lib/wishlist';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const goldAccentText = darkText;
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";
const borderCol = "#E8D7AE";

// ── Uniform spacing between every major section in the right-hand column ──
const SECTION_GAP = 32;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ── Specifications, unique per product handle ──
const specificationsByProduct = {
  'no-1-oval-signet': [
    { label: "Style", value: "Oval signet" },
    { label: "Diamond setting", value: "Raised, not inset" },
    { label: "Gold", value: "9ct yellow gold" },
    { label: "Hallmarking", value: "Hallmarked at a UK Assay Office" },
    { label: "Finish", value: "High polish" },
    { label: "Face dimensions", value: "13mm × 10mm" },
    { label: "Band width", value: "2mm at narrowest" },
  ],
  'no-2-rectangular-signet': [
    { label: "Style", value: "Rectangular signet" },
    { label: "Diamond setting", value: "Flush-set" },
    { label: "Gold", value: "9ct yellow gold" },
    { label: "Hallmarking", value: "Hallmarked at a UK Assay Office" },
    { label: "Finish", value: "High polish" },
    { label: "Face dimensions", value: "13mm × 10.5mm" },
    { label: "Band width", value: "2mm at narrowest" },
  ],
};

export const meta = ({data}) => {
  return [
    {title: `${data?.product.title ?? 'Product'} | Mercer 79`},
    {
      name: 'description',
      content: `${data?.product.title ?? 'Mercer 79'} - a bespoke 9ct gold signet ring, made to order and hand-crafted in the UK.`,
    },
    { rel: 'canonical', href: `/products/${data?.product.handle}` },
  ];
};

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  if (!handle) throw new Error('Expected product handle to be defined');

  const isNo1 = handle === 'no-1-oval-signet';
  const isNo2 = handle === 'no-2-rectangular-signet';
  const resinHandle = isNo1 ? 'resin-proof-no-1' : isNo2 ? 'resin-proof-no-2' : null;

  const [{ product }, resinData] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    resinHandle
      ? storefront.query(RESIN_VARIANTS_QUERY, { variables: { handle: resinHandle } })
      : Promise.resolve(null),
  ]);

  if (!product?.id) throw new Response(null, {status: 404});
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {product, resinVariants: resinData?.product?.variants?.nodes ?? []};
}

function loadDeferredData({context, params}) {
  return {};
}

export default function Product() {
  const {product, resinVariants} = useLoaderData();
  const {open} = useAside();
  const navigate = useNavigate();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml} = product;

  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedInitial, setSelectedInitial] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [savedItemId, setSavedItemId] = useState(null);
  const cartFormRef = useRef(null);

  const sizeOption = selectedVariant.selectedOptions.find(opt => opt.name === "Size");
  const selectedSize = sizeOption?.value || "";

  const price = selectedVariant?.price?.amount || 0;
  const formattedPrice = Math.round(parseFloat(price));

  const productImages = product.media?.nodes
    ?.filter(node => node.image)
    ?.map(node => node.image) || [];
  const mainImage = productImages[activeThumb] || productImages[0] || product.featuredImage || selectedVariant.image;

  const canAdd = selectedInitial !== null && !!selectedVariant?.id;

  const resinProofHandle = product.handle === 'no-1-oval-signet'
    ? 'resin-proof-no-1'
    : 'resin-proof-no-2';

  const resinVariant = resinVariants?.[0] ?? null;

  const specifications = specificationsByProduct[product.handle] ?? [];

  useEffect(() => {
    if (selectedInitial && selectedSize) {
      const existing = getWishlist().find(
        (item) => item.handle === product.handle && item.size === selectedSize && item.initial === selectedInitial
      );
      setSavedItemId(existing ? existing.id : null);
    } else {
      setSavedItemId(null);
    }
  }, [selectedInitial, selectedSize, product.handle]);

  const handleWishlistToggle = () => {
    if (savedItemId) {
      removeFromWishlist(savedItemId);
      setSavedItemId(null);
    } else {
      const updated = addToWishlist({
        handle: product.handle,
        title: product.title,
        size: selectedSize,
        initial: selectedInitial,
        image: mainImage?.url,
        price: formattedPrice,
      });
      const newest = updated[updated.length - 1];
      setSavedItemId(newest.id);
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: mainImage?.url,
    sku: selectedVariant?.sku,
    brand: {
      "@type": "Brand",
      name: "Mercer 79",
    },
    offers: {
      "@type": "Offer",
      url: `https://mercer79.com/products/${product.handle}`,
      priceCurrency: selectedVariant?.price?.currencyCode || "GBP",
      price: selectedVariant?.price?.amount || "0",
      availability: selectedVariant?.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
  <div style={{ background: "white", minHeight: "100vh" }}>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
    <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px 80px;
        }
        .product-image-sticky {
          position: sticky;
          top: 100px;
          align-self: flex-start;
        }
        .initial-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 6px;
        }
        .product-right-col {
          width: 100%;
          min-width: 0;
        }
        .product-right-col form,
        .product-right-col form > * {
          width: 100% !important;
          display: block !important;
          box-sizing: border-box !important;
        }
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 20px !important;
          }
          .product-image-sticky {
            position: relative !important;
            top: 0 !important;
          }
          .initial-grid {
            grid-template-columns: repeat(9, 1fr) !important;
          }
          .initial-grid button {
            font-size: 11px !important;
            padding: 8px 4px !important;
          }
          .product-title { font-size: 32px !important; }
          .thumbnail-row { display: none !important; }
        }
      `}</style>

      <div className="product-grid">

        {/* LEFT: Image */}
        <div className="product-image-sticky">
          <div style={{ marginBottom: 24 }}>
            <div style={{
              width: "100%", aspectRatio: "1",
              background: "linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%)",
              overflow: "hidden",
              borderRadius: 8,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
            }}>
              {selectedInitial ? (
                <>
                  <p style={{ fontFamily: playfair, fontSize: 120, color: darkText, margin: 0, lineHeight: 1 }}>
                    {selectedInitial}
                  </p>
                  <p style={{ fontSize: 11, letterSpacing: "0.2em", color: subtleText, marginTop: 16, fontWeight: 600, textTransform: "uppercase" }}>
                    Mercer 79
                  </p>
                </>
              ) : mainImage ? (
                <img
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <>
                  <p style={{ fontFamily: playfair, fontSize: 36, color: darkText, margin: "0 0 12px" }}>
                    Your Initial
                  </p>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", color: subtleText, fontWeight: 600, textTransform: "uppercase" }}>
                    Select A–Z below
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="thumbnail-row">
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              {productImages.slice(0, 4).map((image, i) => (
                <button key={i} onClick={() => { setActiveThumb(i); setSelectedInitial(null); }}
                  style={{
                    flex: 1, maxWidth: 100, aspectRatio: "1",
                    border: activeThumb === i ? `2px solid ${darkText}` : `1px solid ${borderCol}`,
                    borderRadius: 8, background: "white", cursor: "pointer", overflow: "hidden", padding: 0
                  }}
                >
                  <img src={image.url} alt={image.altText || `Product image ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Details — every direct child section below uses SECTION_GAP for consistent rhythm */}
        <div className="product-right-col">

          {/* Title / price / description block */}
          <div style={{ marginBottom: SECTION_GAP }}>
            <h1 className="product-title" style={{ fontFamily: playfair, fontSize: 40, color: darkText, marginBottom: 12, fontWeight: 400, lineHeight: 1.2 }}>
              {title}
            </h1>
            <p style={{ fontSize: 24, color: darkText, fontWeight: 500, marginBottom: 20 }}>
              £{formattedPrice.toLocaleString()}
            </p>
            <div
  style={{ fontSize: 16, color: subtleText, lineHeight: 1.7 }}
  dangerouslySetInnerHTML={{__html: descriptionHtml}}
/>
          </div>

          <div style={{ height: 1, background: borderCol, marginBottom: SECTION_GAP }} />

          {/* Ring size */}
          <div style={{ marginBottom: SECTION_GAP }}>
            <p style={{
              fontFamily: bodyFont, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: goldAccentText, marginBottom: 16,
            }}>
              Ring size
            </p>
            <div style={{ position: "relative" }}>
  <select
    value={selectedSize}
    onChange={(e) => {
  const url = new URL(window.location.href);
  url.searchParams.set('Size', e.target.value);
  navigate(url.pathname + url.search, { replace: true, preventScrollReset: true });
}}
    style={{
      width: "100%", padding: "16px 20px",
      border: `1px solid ${borderCol}`,
      borderRadius: 8, background: "white", color: darkText, fontSize: 15,
      fontFamily: bodyFont, cursor: "pointer", appearance: "none",
      paddingRight: "50px"
    }}
  >
              <option value="">Select ring size</option>
              {productOptions
                .find(opt => opt.name === 'Size')
                ?.optionValues.map(({name}) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
  <svg
    width="12" height="8" viewBox="0 0 12 8" fill="none"
    style={{
      position: "absolute", right: 20, top: "50%",
      transform: "translateY(-50%)", pointerEvents: "none",
    }}
  >
    <path d="M1 1L6 6L11 1" stroke={darkText} strokeWidth="2" strokeLinecap="round" />
  </svg>
</div>
            <p style={{ fontSize: 13, color: mutedText, marginTop: 12, lineHeight: 1.5 }}>
              Not sure of your size? Get in touch and we'll{' '}
              <Link to="/pages/contact" style={{ color: darkText, textDecoration: "underline" }}>post you a ring sizer</Link>.
            </p>
          </div>

          {/* Initial selector */}
          <div style={{ marginBottom: SECTION_GAP }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{
                fontFamily: bodyFont, fontSize: 11, fontWeight: 600,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: goldAccentText, margin: 0,
              }}>
                Your initial
              </p>
              {selectedInitial && (
                <button onClick={() => setSelectedInitial(null)}
                  style={{ fontSize: 12, color: mutedText, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  Clear
                </button>
              )}
            </div>

            <div className="initial-grid">
              {alphabet.map((letter) => (
                <button key={letter} onClick={() => setSelectedInitial(letter)}
                aria-pressed={selectedInitial === letter}
                  style={{
                    aspectRatio: "1",
                    border: selectedInitial === letter ? `2px solid ${darkText}` : `1px solid ${borderCol}`,
                    borderRadius: 6,
                    background: selectedInitial === letter ? darkText : "white",
                    color: selectedInitial === letter ? "white" : darkText,
                    fontSize: 13,
                    fontWeight: selectedInitial === letter ? 600 : 400,
                    fontFamily: bodyFont,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag */}
          <div style={{ marginBottom: SECTION_GAP }}>
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesAdd}
              inputs={{
                lines: canAdd ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                    attributes: [
                      {key: 'Initial or Symbol', value: selectedInitial},
                    ],
                  },
                ] : [],
              }}
            >
              {(fetcher) => (
                <input type="hidden" name="_cart_form" value="1" ref={cartFormRef} />
              )}
            </CartForm>
            <button
              type="button"
              disabled={!canAdd}
              onClick={() => {
                if (canAdd) {
                  cartFormRef.current?.closest('form')?.requestSubmit();
                  open('cart');
                }
              }}
              style={{
                width: "100%",
                display: "block",
                boxSizing: "border-box",
                margin: 0,
                padding: 20,
                border: canAdd ? "none" : `1px solid ${borderCol}`,
                borderRadius: 8,
                background: !canAdd ? "transparent" : darkText,
                color: canAdd ? "white" : mutedText,
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
                fontFamily: bodyFont,
                cursor: canAdd ? "pointer" : "default",
                transition: "all 0.3s ease",
              }}
            >
              {!canAdd ? "Select size & initial to continue" : "Add to bag"}
            </button>
            <button
              type="button"
              disabled={!canAdd}
              onClick={handleWishlistToggle}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxSizing: "border-box",
                marginTop: 12,
                padding: 14,
                border: `1px solid ${borderCol}`,
                borderRadius: 8,
                background: "transparent",
                color: canAdd ? darkText : mutedText,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                fontFamily: bodyFont,
                cursor: canAdd ? "pointer" : "default",
                transition: "all 0.3s ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={savedItemId ? darkText : "none"} stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {savedItemId ? "Saved" : "Save this configuration"}
            </button>
          </div>

          {/* Trust bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px 0",
            borderTop: `1px solid ${borderCol}`, borderBottom: `1px solid ${borderCol}`,
            marginBottom: SECTION_GAP,
          }}>
            {["4–6 weeks", "Made by hand in the UK", "Complimentary UK delivery over £300"].map((item, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: subtleText, padding: "0 16px" }}>{item}</span>
                {i < arr.length - 1 && (
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: goldAccent, flexShrink: 0, display: "inline-block" }} />
                )}
              </div>
            ))}
          </div>

          {/* Accordions — resin proof, delivery & returns, care */}
          <div style={{ marginBottom: SECTION_GAP }}>
            {[
              {
                id: "resin", label: "Check the fit first",
                content: (
                  <div style={{ paddingLeft: 0 }}>
                    <p style={{ fontSize: 13, color: subtleText, lineHeight: 1.7, margin: "4px 0 16px" }}>
                      Want to check size and fit? We'll make a resin version of your ring in your chosen size and initial so you can check the fit and feel before ordering. Delivered in 1–2 weeks. If you go on to order the gold ring, we'll take the resin cost off the price.
                    </p>
                    {!selectedInitial || !selectedSize ? (
                      <p style={{ fontSize: 12, color: mutedText, fontStyle: "italic", margin: 0 }}>
                        Select your size and initial above to order a resin proof.
                      </p>
                    ) : (
                      <CartForm
                        route="/cart"
                        action={CartForm.ACTIONS.LinesAdd}
                        inputs={{
                          lines: [{
                            merchandiseId: resinVariant?.id ?? '',
                            quantity: 1,
                            attributes: [
                              { key: 'Initial', value: selectedInitial },
                              { key: 'Ring size', value: selectedSize },
                              { key: 'Based on', value: product.title },
                            ],
                          }],
                        }}
                      >
                        {(fetcher) => (
                          <button
                            type="submit"
                            disabled={!resinVariant}
                            onClick={() => { if (resinVariant) open('cart'); }}
                            style={{
                              padding: "12px 24px",
                              border: `1px solid ${darkText}`,
                              borderRadius: 8,
                              background: "transparent",
                              color: darkText,
                              fontSize: 11,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              cursor: "pointer",
                              fontFamily: bodyFont,
                            }}
                          >
                            {fetcher.state !== 'idle' ? "Adding..." : `Order resin proof — £36 (Size ${selectedSize}, Initial ${selectedInitial})`}
                          </button>
                        )}
                      </CartForm>
                    )}
                  </div>
                )
              },
              {
                id: "delivery", label: "Delivery & returns",
                content: (
                  <div style={{ paddingLeft: 0 }}>
                    <p style={{ fontSize: 13, color: subtleText, lineHeight: 1.6, margin: "4px 0", paddingLeft: 16, textIndent: -16 }}>· Sent via Royal Mail Special Delivery, tracked and insured</p>
                    <p style={{ fontSize: 13, color: subtleText, lineHeight: 1.6, margin: "4px 0", paddingLeft: 16, textIndent: -16 }}>· Complimentary UK delivery on all orders over £300</p>
                    <p style={{ fontSize: 13, color: subtleText, lineHeight: 1.6, margin: "4px 0", paddingLeft: 16, textIndent: -16 }}>· Made-to-order pieces cannot be returned</p>
                    <p style={{ fontSize: 13, color: subtleText, lineHeight: 1.6, margin: "4px 0 12px", paddingLeft: 16, textIndent: -16 }}>
                      · <Link to="/pages/delivery" style={{ color: darkText, textDecoration: "underline" }}>See our returns page for full details</Link>
                    </p>
                  </div>
                )
              },
              {
                id: "care", label: "Care",
                content: (
                  <div style={{ paddingLeft: 0 }}>

                    <p style={{ fontSize: 13, color: subtleText, lineHeight: 1.6, margin: "4px 0", paddingLeft: 16, textIndent: -16 }}>· Clean every few months with warm water, mild soap, and a soft toothbrush</p>
                    <p style={{ fontSize: 13, color: subtleText, lineHeight: 1.6, margin: "4px 0", paddingLeft: 16, textIndent: -16 }}>· Remove before heavy exercise, cleaning products, or applying perfume and lotions</p>
                    <p style={{ fontSize: 13, color: subtleText, lineHeight: 1.6, margin: "4px 0", paddingLeft: 16, textIndent: -16 }}>· Store in the box provided when not wearing</p>
                  </div>
                )
              },
            ].map((section) => (
              <div key={section.id} style={{ borderBottom: `1px solid ${borderCol}` }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === section.id ? null : section.id)}
                  style={{ width: "100%", padding: "16px 0", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: bodyFont }}
                >
                  <span style={{ fontSize: 15, color: darkText, fontWeight: 500 }}>{section.label}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={mutedText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: openAccordion === section.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>
                {openAccordion === section.id && (
                  <div style={{ paddingBottom: 16 }}>{section.content}</div>
                )}
              </div>
            ))}
          </div>

          {/* Concierge box */}
          <div style={{ marginBottom: SECTION_GAP, padding: 20, background: warmBg, borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 16 }}>
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none" stroke={goldAccent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M3 13.5V15l3-1.5h8A1.5 1.5 0 0015.5 12V5A1.5 1.5 0 0014 3.5H4A1.5 1.5 0 002.5 5v7A1.5 1.5 0 003 13.5z" />
              <path d="M6 7h6M6 9.5h4" />
            </svg>
            <div>
              <p style={{ fontSize: 15, color: darkText, fontWeight: 500, margin: "0 0 6px" }}>Questions about this piece?</p>
              <p style={{ fontSize: 13, color: subtleText, margin: 0, lineHeight: 1.6 }}>
                <Link to="/pages/contact" style={{ color: darkText, textDecoration: "underline" }}>Get in touch</Link> before you order - we're happy to talk through sizing, the making process, or any other questions.
              </p>
            </div>
          </div>

          {/* Specifications — last section, no trailing margin needed */}
          <div>
            <h3 style={{ fontFamily: playfair, fontSize: 24, color: darkText, marginBottom: 20, fontWeight: 400 }}>Specifications</h3>
            {specifications.map((spec, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderBottom: i < specifications.length - 1 ? `1px solid ${borderCol}` : "none", gap: 16 }}>
                <span style={{ fontSize: 15, color: darkText, flexShrink: 0 }}>{spec.label}</span>
                <span style={{ fontSize: 15, color: subtleText, textAlign: "right" }}>{spec.value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Analytics.ProductView
        data={{
          products: [{
            id: product.id, title: product.title,
            price: selectedVariant?.price.amount || '0',
            vendor: product.vendor,
            variantId: selectedVariant?.id || '',
            variantTitle: selectedVariant?.title || '',
            quantity: 1,
          }],
        }}
      />
    </div>
  );
}

const RESIN_VARIANTS_QUERY = `#graphql
  query ResinVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
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

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice { amount currencyCode }
    id
    image { __typename id url altText width height }
    price { amount currencyCode }
    product { title handle }
    selectedOptions { name value }
    sku title
    unitPrice { amount currencyCode }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id title vendor handle descriptionHtml description
    encodedVariantExistence encodedVariantAvailability
    collections(first: 1) {
      nodes { handle }
    }
    media(first: 10) {
      nodes {
        ... on MediaImage {
          id
          image { id url altText width height }
        }
      }
    }
    featuredImage { id url altText width height }
    options {
      name
      optionValues {
        name
        firstSelectableVariant { ...ProductVariant }
        swatch { color image { previewImage { url } } }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) { ...ProductVariant }
    seo { description title }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) { ...Product }
  }
  ${PRODUCT_FRAGMENT}
`;

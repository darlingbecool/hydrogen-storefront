import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {useState} from 'react';

// ── Design tokens ──────────────────────────────────────────────────────────────
const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";

export const meta = () => {
  return [{title: 'All Jewellery | Mercer 94'}];
};

export async function loader({context, request}) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 24});
  const {products} = await storefront.query(CATALOG_QUERY, {
    variables: {...paginationVariables},
  });
  return {products};
}

// ── Editorial tile image URLs ──────────────────────────────────────────────────
// Replace each src with your chosen image from Shopify Admin → Content → Files.
// Tiles span 2 columns and match the height of a product card (aspect-ratio 1:1 square).
const editorialImages = {
  tile1: 'https://cdn.shopify.com/s/files/1/1012/2549/6921/files/2.png?v=1772808285',
  tile2: 'https://cdn.shopify.com/s/files/1/1012/2549/6921/files/1.png?v=1772808284',
  tile3: 'https://cdn.shopify.com/s/files/1/1012/2549/6921/files/REPLACE_WITH_TILE_3_IMAGE.jpg',
};

export default function Collection() {
  const {products} = useLoaderData();
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── Build grid with editorial tile placement ───────────────────────────────
  // Layout: product | editorial(spans 2 cols) | product | product | product |
  //         editorial | remaining products...
  const gridItems = [];
  const nodes = products.nodes;

  if (nodes[0]) gridItems.push({type: 'product', product: nodes[0]});
  gridItems.push({type: 'editorial', id: 'tile1', src: editorialImages.tile1, alt: 'Mercer 94 editorial'});

  if (nodes[1]) gridItems.push({type: 'product', product: nodes[1]});
  if (nodes[2]) gridItems.push({type: 'product', product: nodes[2]});
  if (nodes[3]) gridItems.push({type: 'product', product: nodes[3]});
  gridItems.push({type: 'editorial', id: 'tile2', src: editorialImages.tile2, alt: 'Mercer 94 editorial'});

  let productCount = 4;
  for (let i = 4; i < nodes.length; i++) {
    gridItems.push({type: 'product', product: nodes[i]});
    productCount++;
    if (productCount % 9 === 4 && i < nodes.length - 1) {
      gridItems.push({type: 'editorial', id: 'tile3', src: editorialImages.tile3, alt: 'Mercer 94 editorial'});
    }
  }

  return (
    <div style={{background: 'white', minHeight: '100vh', paddingTop: '20px'}} className="collections-wrapper">
      <style>{`
        .collections-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px 80px;
        }

        /* Editorial tile spans 2 columns and matches full product card height */
        .editorial-tile {
          grid-column: span 2;
          overflow: hidden;
          border-radius: 12px;
          background: #F5F2ED;
          /* No fixed aspect-ratio — stretches to match the natural height
             of the product card sitting beside it (image + title + price + button) */
          min-height: 500px;
        }
        .editorial-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s ease;
        }
        .editorial-tile:hover img {
          transform: scale(1.03);
        }

        /* Hide first tile on mobile to avoid layout break */
        .editorial-tile-first {
          display: block;
        }

        @media (max-width: 1024px) {
          .collections-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .editorial-tile {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .collections-wrapper {
            padding-top: 0 !important;
          }
          .collections-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            padding: 20px;
          }
          .editorial-tile {
            grid-column: span 2;
            min-height: 240px;
          }
          .editorial-tile-first {
            display: none !important;
          }
          .product-category {
            font-size: 10px !important;
          }
          .product-title {
            font-size: 16px !important;
          }
          .product-price {
            font-size: 14px !important;
          }
          .product-view-btn {
            padding: 12px 20px !important;
            font-size: 12px !important;
          }
          .product-wishlist-btn {
            width: 36px !important;
            height: 36px !important;
            top: 12px !important;
            right: 12px !important;
          }
        }
      `}</style>

      <div className="collections-grid">
        {gridItems.map((item, index) => {
          if (item.type === 'editorial') {
            return <EditorialTile key={`editorial-${index}`} item={item} />;
          }
          return (
            <ProductCard
              key={item.product.id}
              product={item.product}
              isFavorite={favorites.has(item.product.id)}
              onToggleFavorite={() => toggleFavorite(item.product.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Editorial tile — image only, no text ───────────────────────────────────────
function EditorialTile({item}) {
  return (
    <div className={`editorial-tile ${item.id === 'tile1' ? 'editorial-tile-first' : ''}`}>
      <img src={item.src} alt={item.alt} />
    </div>
  );
}

// ── Product card ───────────────────────────────────────────────────────────────
function ProductCard({product, isFavorite, onToggleFavorite}) {
  const price = product.priceRange.minVariantPrice;
  const formattedPrice = Math.round(parseFloat(price.amount));
  const category = product.productType || 'JEWELLERY';

  return (
    <div>
      <Link to={`/products/${product.handle}`} style={{textDecoration: 'none', display: 'block'}}>
        <div style={{position: 'relative', marginBottom: 16}}>

          {/* Wishlist button */}
          <button
            className="product-wishlist-btn"
            onClick={(e) => { e.preventDefault(); onToggleFavorite(); }}
            style={{
              position: 'absolute', top: 16, right: 16, zIndex: 2,
              background: 'white', border: 'none', borderRadius: '50%',
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24"
              fill={isFavorite ? darkText : 'none'}
              stroke={darkText} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Product image */}
          <div style={{
            width: '100%', aspectRatio: '1',
            borderRadius: 16,
            backgroundImage: product.featuredImage?.url
              ? `url(${product.featuredImage.url})`
              : 'linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            {!product.featuredImage?.url && (
              <>
                <p style={{fontFamily: playfair, fontSize: 48, color: darkText, margin: 0, lineHeight: 1, letterSpacing: '0.05em'}}>
                  {product.title.charAt(0)}
                </p>
                <p style={{fontSize: 11, letterSpacing: '0.15em', color: subtleText, marginTop: 8, textTransform: 'uppercase'}}>
                  {category}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Product info */}
        <p className="product-category" style={{
          fontSize: 11, letterSpacing: '0.15em',
          color: goldAccent, fontWeight: 500,
          margin: '0 0 8px', textTransform: 'uppercase',
        }}>
          {category}
        </p>
        <h3 className="product-title" style={{
          fontFamily: playfair, fontSize: 18,
          color: darkText, margin: '0 0 6px',
          fontWeight: 400, lineHeight: 1.3,
        }}>
          {product.title}
        </h3>
        <p className="product-price" style={{
          fontSize: 16, color: darkText,
          fontWeight: 500, margin: '0 0 16px',
        }}>
          From £{formattedPrice.toLocaleString()}
        </p>
      </Link>

      {/* View details button */}
      <Link
        to={`/products/${product.handle}`}
        className="product-view-btn"
        style={{
          display: 'block', textAlign: 'center',
          padding: '14px 24px',
          border: `1px solid ${darkText}`,
          background: 'white', color: darkText,
          fontSize: 11, letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: bodyFont, cursor: 'pointer',
          transition: 'all 0.2s ease', textDecoration: 'none',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = darkText; e.currentTarget.style.color = 'white'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = darkText; }}
      >
        View Details
      </Link>
    </div>
  );
}

// ── GraphQL query ──────────────────────────────────────────────────────────────
const CATALOG_QUERY = `#graphql
  query Catalog($first: Int, $last: Int, $startCursor: String, $endCursor: String) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        handle
        description
        productType
        featuredImage {
          id
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

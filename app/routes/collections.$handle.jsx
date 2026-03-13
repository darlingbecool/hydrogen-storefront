import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables, Pagination, Money} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const warmBg = "#F5F2ED";

export const meta = ({data}) => {
  return [{title: `${data?.collection?.title ?? 'Collection'} | Mercer 94`}];
};

export async function loader({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  if (!handle) throw new Error('Expected collection handle');

  const paginationVariables = getPaginationVariables(request, {pageBy: 12});

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) throw new Response(null, {status: 404});
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {collection};
}

export default function Collection() {
  const {collection} = useLoaderData();

  return (
    <div style={{background: 'white', minHeight: '100vh'}}>
      <style>{`
        .collection-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px 80px;
        }
        @media (max-width: 768px) {
          .collection-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
            padding: 0 20px 60px !important;
          }
          .collection-hero {
            padding: 40px 20px 32px !important;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="collection-hero" style={{
        padding: '8px 32px 4px',
        maxWidth: 1200,
        margin: '0 auto',
        marginBottom: 48,
      }}>
        <h1 style={{
          fontFamily: bodyFont,
          fontSize: 16,
          fontWeight: 400,
          color: goldAccent,
          marginBottom: 16,
          lineHeight: 1.1,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          {collection.title}
        </h1>
        {collection.description && (
          <p style={{
            fontSize: 16,
            color: mutedText,
            lineHeight: 1.7,
            maxWidth: 560,
            margin: 0,
            fontFamily: bodyFont,
          }}>
            {collection.description}
          </p>
        )}
      </div>

      {/* Product Grid */}
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <div className="collection-grid">
              {nodes.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load more */}
            <div style={{textAlign: 'center', padding: '40px 0 80px'}}>
              <NextLink style={{
                display: 'inline-block',
                padding: '14px 40px',
                border: '1px solid #D4D0CA',
                borderRadius: 8,
                fontSize: 13,
                letterSpacing: '0.1em',
                color: darkText,
                textDecoration: 'none',
                fontFamily: bodyFont,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = darkText;
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = darkText;
              }}
              >
                {isLoading ? 'Loading...' : 'LOAD MORE'}
              </NextLink>
            </div>
          </>
        )}
      </Pagination>
    </div>
  );
}

function ProductCard({product}) {
  const price = product.priceRange?.minVariantPrice;
  const image = product.featuredImage;

  return (
    <Link
      to={`/products/${product.handle}`}
      style={{textDecoration: 'none', display: 'block'}}
    >
      <div
        style={{cursor: 'pointer'}}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        {/* Square image with rounded corners */}
        <div style={{
          width: '100%',
          aspectRatio: '1',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%)',
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          {image ? (
            <img
              src={image.url}
              alt={image.altText || product.title}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}>
              <p style={{
                fontFamily: playfair,
                fontSize: 32,
                color: darkText,
                opacity: 0.3,
                margin: 0,
              }}>M</p>
            </div>
          )}
        </div>

        {/* Product info */}
        <p style={{
          fontFamily: playfair,
          fontSize: 18,
          color: darkText,
          marginBottom: 6,
          fontWeight: 400,
        }}>
          {product.title}
        </p>
        {price && (
          <p style={{fontSize: 15, color: mutedText}}>
            From <Money data={price} />
          </p>
        )}
      </div>
    </Link>
  );
}

const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          id
          title
          handle
          featuredImage { url altText }
          priceRange {
            minVariantPrice { amount currencyCode }
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
  }
`;

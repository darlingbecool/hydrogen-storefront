import {Link, useLoaderData} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const warmBg = "#F5F2ED";

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: `Mercer 79 | Journal`}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, request}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 10,
  });

  const [{blogs}] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        ...paginationVariables,
      },
    }),
  ]);

  return {blogs};
}

function loadDeferredData({context}) {
  return {};
}

export default function Blogs() {
  /** @type {LoaderReturnData} */
  const {blogs} = useLoaderData();

  return (
    <div
      style={{
        background: warmBg,
        minHeight: '60vh',
        padding: '96px 24px',
      }}
    >
      <div style={{maxWidth: 640, margin: '0 auto', textAlign: 'center'}}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            color: goldAccent,
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: 16,
            fontFamily: bodyFont,
          }}
        >
          Mercer 79
        </p>
        <h1
          style={{
            fontFamily: playfair,
            fontSize: 32,
            fontWeight: 400,
            color: darkText,
            margin: '0 0 40px',
          }}
        >
          Journal
        </h1>

        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <PaginatedResourceSection connection={blogs}>
            {({node: blog}) => (
              <Link
                key={blog.handle}
                prefetch="intent"
                to={`/blogs/${blog.handle}`}
                style={{
                  fontFamily: playfair,
                  fontSize: 22,
                  fontWeight: 400,
                  color: darkText,
                  textDecoration: 'none',
                  padding: '16px 0',
                  borderBottom: '1px solid #E8D7AE',
                }}
              >
                {blog.title}
              </Link>
            )}
          </PaginatedResourceSection>
        </div>
      </div>
    </div>
  );
}

const BLOGS_QUERY = `#graphql
  query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        handle
        seo {
          title
          description
        }
      }
    }
  }
`;

/** @typedef {BlogsQuery['blogs']['nodes'][0]} BlogNode */

/** @typedef {import('./+types/blogs._index').Route} Route */
/** @typedef {import('storefrontapi.generated').BlogsQuery} BlogsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
import {Link, useLoaderData} from 'react-router';
import {Image, getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";
const warmBg = "#F5F2ED";
const borderTone = "#E8D7AE";

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `Mercer 79 | ${data?.blog.title ?? 'Journal'}`}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, request, params}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 6,
  });

  if (!params.blogHandle) {
    throw new Response(`blog not found`, {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: params.blogHandle,
        ...paginationVariables,
      },
    }),
  ]);

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.blogHandle, data: blog});

  return {blog};
}

function loadDeferredData({context}) {
  return {};
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function Blog() {
  /** @type {LoaderReturnData} */
  const {blog} = useLoaderData();
  const {articles} = blog;

  return (
    <div style={{background: 'white'}}>
      {/* ── Header ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${warmBg} 0%, ${borderTone} 50%, ${warmBg} 100%)`,
          padding: '96px 80px 72px',
          textAlign: 'center',
        }}
        className="journal-hero"
      >
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
            fontSize: 44,
            color: darkText,
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          The journal
        </h1>
        <p
          style={{
            fontSize: 15,
            color: subtleText,
            maxWidth: 440,
            margin: '20px auto 0',
            lineHeight: 1.7,
            fontFamily: bodyFont,
          }}
        >
          Notes on craft, history, and the pieces we make.
        </p>
      </section>

      {/* ── Article grid ── */}
      <section style={{padding: '72px 80px 96px'}} className="journal-grid-section">
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <div className="journal-grid">
            <PaginatedResourceSection connection={articles}>
              {({node: article, index}) => (
                <ArticleItem
                  article={article}
                  key={article.id}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
              )}
            </PaginatedResourceSection>
          </div>
        </div>
      </section>

      <style>{`
        .journal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px 32px;
        }
        @media (max-width: 900px) {
          .journal-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .journal-hero {
            padding: 64px 24px 48px !important;
          }
          .journal-hero h1 {
            font-size: 32px !important;
          }
          .journal-grid-section {
            padding: 48px 24px 64px !important;
          }
        }
        .journal-article-link:hover .journal-article-image img {
          transform: scale(1.04);
        }
        .journal-article-link:hover .journal-article-title {
          color: ${goldAccent};
        }
      `}</style>
    </div>
  );
}

function ArticleItem({article, loading}) {
  const publishedAt = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  const excerpt = stripHtml(article.contentHtml).slice(0, 110);

  return (
    <Link
      to={`/blogs/${article.blog.handle}/${article.handle}`}
      className="journal-article-link"
      style={{textDecoration: 'none', color: 'inherit', display: 'block'}}
    >
      {article.image && (
        <div
          className="journal-article-image"
          style={{
            aspectRatio: '4/3',
            overflow: 'hidden',
            background: warmBg,
            marginBottom: 16,
          }}
        >
          <Image
            alt={article.image.altText || article.title}
            aspectRatio="4/3"
            data={article.image}
            loading={loading}
            sizes="(min-width: 900px) 33vw, 100vw"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
            }}
          />
        </div>
      )}
      <h3
        className="journal-article-title"
        style={{
          fontFamily: playfair,
          fontSize: 19,
          fontWeight: 400,
          color: darkText,
          margin: '0 0 8px',
          lineHeight: 1.35,
          transition: 'color 0.2s ease',
        }}
      >
        {article.title}
      </h3>
      {excerpt && (
        <p
          style={{
            fontSize: 13.5,
            color: mutedText,
            lineHeight: 1.65,
            margin: '0 0 10px',
            fontFamily: bodyFont,
          }}
        >
          {excerpt}
          {excerpt.length === 110 ? '…' : ''}
        </p>
      )}
      <p
        style={{
          fontSize: 11,
          color: mutedText,
          letterSpacing: '0.04em',
          margin: 0,
          fontFamily: bodyFont,
        }}
      >
        {publishedAt}
      </p>
    </Link>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }

      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle._index').Route} Route */
/** @typedef {import('storefrontapi.generated').ArticleItemFragment} ArticleItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
import {Link, useLoaderData} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `Mercer 79 | ${data?.article.title ?? 'Journal'}`}];
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
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: {blogHandle, articleHandle},
    }),
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;

  return {article};
}

function loadDeferredData({context}) {
  return {};
}

export default function Article() {
  /** @type {LoaderReturnData} */
  const {article} = useLoaderData();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div style={{background: 'white'}}>
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '56px 24px 96px',
        }}
        className="journal-article-page"
      >
        <Link
          to="/blogs/journal"
          className="journal-back-link"
          style={{
            display: 'inline-block',
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: mutedText,
            textDecoration: 'none',
            marginBottom: 32,
            fontFamily: bodyFont,
          }}
        >
          ← Back to the journal
        </Link>

        <h1
          style={{
            fontFamily: playfair,
            fontSize: 38,
            fontWeight: 400,
            color: darkText,
            lineHeight: 1.2,
            margin: '0 0 16px',
          }}
        >
          {title}
        </h1>

        <div
          style={{
            fontSize: 13,
            color: mutedText,
            fontFamily: bodyFont,
            letterSpacing: '0.03em',
            marginBottom: 40,
          }}
        >
          <time dateTime={article.publishedAt}>{publishedDate}</time>
          {author?.name ? (
            <>
              {' '}
              &middot; <span>{author.name}</span>
            </>
          ) : null}
        </div>

        {image && (
          <div
            style={{
              marginBottom: 40,
              marginLeft: -24,
              marginRight: -24,
            }}
            className="journal-article-hero-image"
          >
            <Image
              data={image}
              sizes="(min-width: 728px) 680px, 100vw"
              loading="eager"
              style={{width: '100%', height: 'auto', display: 'block'}}
            />
          </div>
        )}

        <div
          dangerouslySetInnerHTML={{__html: contentHtml}}
          className="journal-article-body"
        />
      </div>

      <style>{`
        .journal-back-link:hover {
          color: ${goldAccent};
        }
        .journal-article-body {
          font-family: ${bodyFont};
          font-size: 16px;
          line-height: 1.75;
          color: #2A2A2A;
        }
        .journal-article-body p {
          margin: 0 0 24px;
        }
        .journal-article-body h2 {
          font-family: ${playfair};
          font-size: 26px;
          font-weight: 400;
          color: ${darkText};
          margin: 48px 0 20px;
          line-height: 1.3;
        }
        .journal-article-body h3 {
          font-family: ${playfair};
          font-size: 21px;
          font-weight: 400;
          color: ${darkText};
          margin: 36px 0 16px;
          line-height: 1.35;
        }
        .journal-article-body a {
          color: ${darkText};
          text-decoration: underline;
          text-decoration-color: ${goldAccent};
          text-underline-offset: 3px;
        }
        .journal-article-body img {
          width: 100%;
          height: auto;
          margin: 40px 0;
        }
        .journal-article-body blockquote {
          margin: 40px 0;
          padding-left: 24px;
          border-left: 2px solid ${goldAccent};
          font-family: ${playfair};
          font-size: 20px;
          font-style: italic;
          color: ${darkText};
          line-height: 1.5;
        }
        .journal-article-body ul,
        .journal-article-body ol {
          margin: 0 0 24px;
          padding-left: 24px;
        }
        .journal-article-body li {
          margin-bottom: 10px;
        }
        @media (max-width: 600px) {
          .journal-article-page {
            padding: 40px 20px 64px !important;
          }
          .journal-article-page h1 {
            font-size: 28px !important;
          }
          .journal-article-hero-image {
            margin-left: -20px !important;
            margin-right: -20px !important;
          }
        }
      `}</style>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle.$articleHandle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
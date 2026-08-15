import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';

// Design constants
const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";

/**
 * Returns a map of all line items and their children.
 * @param {CartLine[]} lines
 * @return {import("/Users/kate/Mercer 94/app/components/CartMain").LineItemChildrenMap}
 */
function getLineItemChildrenMap(lines) {
  const children = {};
  for (const line of lines) {
    if ('parentRelationship' in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ('lineComponents' in line) {
      const children = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(children)) {
        if (!children[parentId]) children[parentId] = [];
        children[parentId].push(...childIds);
      }
    }
  }
  return children;
}

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 * @param {CartMainProps}
 */
export function CartMain({layout, cart: originalCart}) {
  const cart = useOptimisticCart(originalCart);
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const childrenMap = getLineItemChildrenMap(cart?.lines?.nodes ?? []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <CartEmpty hidden={linesCount} layout={layout} />
      
      {linesCount ? (
        <>
          {/* Cart Items - Scrollable */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: layout === 'aside' ? '32px' : '40px',
          }}>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}>
              {(cart?.lines?.nodes ?? []).map((line) => {
                if ('parentRelationship' in line && line.parentRelationship?.parent) {
                  return null;
                }
                return (
                  <CartLineItem
                    key={line.id}
                    line={line}
                    layout={layout}
                    childrenMap={childrenMap}
                  />
                );
              })}
            </ul>
          </div>

          {/* Cart Summary - Fixed at bottom */}
          {cartHasItems && <CartSummary cart={cart} layout={layout} />}
        </>
      ) : null}
    </div>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
function CartEmpty({hidden = false}) {
  const {close} = useAside();
  
  if (hidden) return null;

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 32px',
    }}>
      <div>
        <div style={{ 
          fontSize: 64, 
          opacity: 0.2, 
          marginBottom: 24 
        }}>
          🛍
        </div>
        <h3 style={{
          fontFamily: playfair,
          fontSize: 24,
          color: darkText,
          marginBottom: 12,
          fontWeight: 400,
        }}>
          Your bag is empty
        </h3>
        <p style={{
          fontSize: 15,
          color: mutedText,
          marginBottom: 32,
          lineHeight: 1.6,
        }}>
          Discover our collection of hand-crafted jewellery
        </p>
        <Link
          to="/"
          onClick={close}
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            border: `2px solid ${darkText}`,
            background: 'white',
            color: darkText,
            textDecoration: 'none',
            borderRadius: 8,
            fontSize: 13,
            letterSpacing: '0.1em',
            fontWeight: 500,
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
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
}

/** @typedef {'page' | 'aside'} CartLayout */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 * }} CartMainProps
 */
/** @typedef {{[parentId: string]: CartLine[]}} LineItemChildrenMap */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartLineItem').CartLine} CartLine */

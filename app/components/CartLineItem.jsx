import {CartForm, Image} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const subtleText = "#4A4A4A";

/**
 * A single line item in the cart.
 * @param {{
 *   layout: CartLayout;
 *   line: CartLine;
 *   childrenMap: LineItemChildrenMap;
 * }}
 */
export function CartLineItem({layout, line, childrenMap}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;

  // Pull out the engraved initial if it exists
  // This was set as a line item attribute when the customer added to bag
  const engravingAttr = line.attributes?.find(a => a.key === 'Initial or Symbol');
  return (
    <li style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr',
      gap: 20,
      padding: '28px 0',
      borderBottom: '1px solid #F0EDE8',
      listStyle: 'none',
    }}>

      {/* ── Product Image: circular, matches product page style ── */}
      <Link
        to={lineItemUrl}
        onClick={() => layout === 'aside' && close()}
        style={{ display: 'block', flexShrink: 0 }}
      >
        <div style={{
          width: 90,
          height: 90,
          borderRadius: 8,
          overflow: 'hidden',
         background: 'linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%)',
        }}>
          {image ? (
            <Image
              alt={title}
              data={image}
              width={90}
              height={90}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            // If no image, show the engraved initial in the circle
            // — mirrors the product page preview
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: playfair,
              fontSize: engravingAttr ? 36 : 11,
              color: darkText,
              letterSpacing: engravingAttr ? 0 : '0.1em',
            }}>
              {engravingAttr ? engravingAttr.value : 'NO IMAGE'}
            </div>
          )}
        </div>
      </Link>

      {/* ── Item Details ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 90,
      }}>
        <div>
          {/* Product name */}
          <Link
            to={lineItemUrl}
            onClick={() => layout === 'aside' && close()}
            style={{
              fontFamily: playfair,
              fontSize: 17,
              color: darkText,
              fontWeight: 400,
              marginBottom: 4,
              textDecoration: 'none',
              display: 'block',
              lineHeight: 1.3,
            }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            {product.title}
          </Link>

          {/* Variant options e.g. "18ct Yellow Gold · M" */}
          <div style={{
            fontSize: 13,
            color: mutedText,
            marginBottom: engravingAttr ? 4 : 8,
            lineHeight: 1.4,
          }}>
            {selectedOptions
              .filter(opt => opt.value !== 'Default Title')
              .map((option) => (
                <div key={option.name} style={{
                fontSize: 12,
                color: darkText,
                marginBottom: 4,
                letterSpacing: '0.05em',
                fontWeight: 500,
              }}>
                {option.name}: {option.value}
              </div>
            ))}
          </div>

          {/* Engraved initial — shown as a subtle note if present */}
          {engravingAttr && (
            <div style={{
              fontSize: 12,
              color: darkText,
              marginBottom: 8,
              letterSpacing: '0.05em',
              fontWeight: 500,
            }}>
              Initial: {engravingAttr.value}
            </div>
          )}

          {/* Price */}
          <div style={{
            fontSize: 16,
            color: darkText,
            fontWeight: 500,
          }}>
            <ProductPrice price={line?.cost?.totalAmount} />
          </div>
        </div>

        {/* Quantity + Remove */}
        <CartLineQuantity line={line} />
      </div>

      {/* Child line items (e.g. gift wrapping add-ons) */}
      {lineItemChildren ? (
        <div style={{ gridColumn: '1 / -1', paddingLeft: 110 }}>
          <ul style={{ listStyle: 'none', margin: '8px 0 0', padding: 0 }}>
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

/**
 * Quantity stepper + remove button
 * @param {{line: CartLine}}
 */
function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginTop: 12,
    }}>
      {/* Stepper: − qty + */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #D4D0CA',
        borderRadius: 6,
        overflow: 'hidden',
      }}>
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            style={{
              background: 'none',
              border: 'none',
              width: 32,
              height: 32,
              fontSize: 18,
              color: darkText,
              cursor: quantity <= 1 || isOptimistic ? 'not-allowed' : 'pointer',
              padding: 0,
              lineHeight: 1,
              opacity: quantity <= 1 || isOptimistic ? 0.25 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            −
          </button>
        </CartLineUpdateButton>

        <span style={{
          fontSize: 14,
          color: darkText,
          width: 28,
          textAlign: 'center',
          fontFamily: bodyFont,
          borderLeft: '1px solid #E8E4DE',
          borderRight: '1px solid #E8E4DE',
          lineHeight: '32px',
          height: 32,
          display: 'block',
        }}>
          {quantity}
        </span>

        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Increase quantity"
            disabled={!!isOptimistic}
            style={{
              background: 'none',
              border: 'none',
              width: 32,
              height: 32,
              fontSize: 18,
              color: darkText,
              cursor: isOptimistic ? 'not-allowed' : 'pointer',
              padding: 0,
              lineHeight: 1,
              opacity: isOptimistic ? 0.25 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </button>
        </CartLineUpdateButton>
      </div>

      {/* Remove */}
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

function CartLineRemoveButton({lineIds, disabled}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        disabled={disabled}
        type="submit"
        style={{
          background: 'none',
          border: 'none',
          fontSize: 12,
          color: mutedText,
          cursor: disabled ? 'not-allowed' : 'pointer',
          textDecoration: 'underline',
          fontFamily: bodyFont,
          letterSpacing: '0.05em',
          opacity: disabled ? 0.3 : 1,
          padding: 0,
        }}
        onMouseEnter={(e) => !disabled && (e.target.style.color = darkText)}
        onMouseLeave={(e) => (e.target.style.color = mutedText)}
      >
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({children, lines}) {
  const lineIds = lines.map((line) => line.id);
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function getUpdateKey(lineIds) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('~/components/CartMain').LineItemChildrenMap} LineItemChildrenMap */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */

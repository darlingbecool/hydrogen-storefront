import {CartForm, Money} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {useFetcher} from 'react-router';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";

/**
 * The sticky footer of the cart drawer.
 * Contains subtotal, discount/gift card inputs, and checkout button.
 * @param {CartSummaryProps}
 */
export function CartSummary({cart, layout}) {
  return (
    <div style={{
      borderTop: '1px solid #E8E4DE',
      padding: layout === 'aside' ? '24px 32px 32px' : '32px 40px 40px',
      background: 'white',
      flexShrink: 0,
    }}>

      {/* Subtotal row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 6,
      }}>
        <span style={{
          fontSize: 13,
          color: mutedText,
          letterSpacing: '0.08em',
          fontFamily: bodyFont,
          textTransform: 'uppercase',
        }}>
          Subtotal
        </span>
        <span style={{
          fontFamily: playfair,
          fontSize: 24,
          color: darkText,
          fontWeight: 400,
        }}>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost.subtotalAmount} />
          ) : (
            '£0.00'
          )}
        </span>
      </div>

      <p style={{
        fontSize: 12,
        color: mutedText,
        marginBottom: 24,
        fontFamily: bodyFont,
        letterSpacing: '0.02em',
      }}>
        Shipping and taxes calculated at checkout
      </p>

      {/* Discount codes */}
      <CartDiscounts discountCodes={cart?.discountCodes} />

      {/* Gift cards */}
      <CartGiftCard giftCardCodes={cart?.appliedGiftCards} />

      {/* Checkout button */}
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />

      {/* Reassurance note */}
      <p style={{
        fontSize: 11,
        color: mutedText,
        textAlign: 'center',
        marginTop: 16,
        letterSpacing: '0.05em',
        fontFamily: bodyFont,
        fontStyle: 'italic',
      }}>
        ✦ Handmade to order · 4–6 week lead time ✦
      </p>
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <a
      href={checkoutUrl}
      target="_self"
      style={{
        display: 'block',
        width: '100%',
        padding: '18px 0',
        background: darkText,
        color: 'white',
        borderRadius: 8,
        fontSize: 13,
        letterSpacing: '0.15em',
        fontWeight: 500,
        fontFamily: bodyFont,
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'background 0.25s ease',
        boxSizing: 'border-box',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = goldAccent}
      onMouseLeave={(e) => e.currentTarget.style.background = darkText}
    >
      PROCEED TO CHECKOUT
    </a>
  );
}

function CartDiscounts({discountCodes}) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

      const discountFetcher = useFetcher({key: 'cart-discount-update'});
  const discountError = discountFetcher.data?.errors?.[0]?.message;

  return (
    <div style={{ marginBottom: 12 }}>
      {/* Applied discount codes */}
      {codes.length > 0 && (
        <UpdateDiscountForm>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 14px',
            background: '#F9F7F4',
            borderRadius: 6,
            marginBottom: 8,
            border: `1px solid ${goldAccent}40`,
          }}>
            <code style={{
              fontSize: 13,
              color: darkText,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
            }}>
              {codes.join(', ')}
            </code>
            <button
              type="submit"
              aria-label="Remove discount"
              style={{
                background: 'none',
                border: 'none',
                fontSize: 12,
                color: mutedText,
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: bodyFont,
              }}
            >
              Remove
            </button>
          </div>
        </UpdateDiscountForm>
      )}

      {/* Discount input */}
      <UpdateDiscountForm discountCodes={codes} fetcherKey="cart-discount-update">
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            id="discount-code-input"
            type="text"
            name="discountCode"
            placeholder="Discount code"
            style={{
              flex: 1,
              padding: '11px 14px',
              border: '1px solid #D4D0CA',
              borderRadius: 6,
              fontSize: 13,
              fontFamily: bodyFont,
              outline: 'none',
              color: darkText,
            }}
            onFocus={(e) => e.target.style.border = `1px solid ${goldAccent}`}
            onBlur={(e) => e.target.style.border = '1px solid #D4D0CA'}
          />
          <button
            type="submit"
            style={{
              padding: '11px 18px',
              background: 'white',
              color: darkText,
              border: `1px solid ${darkText}`,
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              fontFamily: bodyFont,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = darkText; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = darkText; }}
          >
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
      {discountError && (
        <p role="alert" style={{ fontSize: 12, color: '#c0392b', marginTop: -4, marginBottom: 8 }}>
          {discountError}
        </p>
      )}
    </div>
  );
}

function UpdateDiscountForm({discountCodes, fetcherKey, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{ discountCodes: discountCodes || [] }}
      fetcherKey={fetcherKey}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({giftCardCodes}) {
  const giftCardCodeInput = useRef(null);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});

  useEffect(() => {
    if (giftCardAddFetcher.data && giftCardCodeInput.current) {
      giftCardCodeInput.current.value = '';
    }
  }, [giftCardAddFetcher.data]);

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Applied gift cards */}
      {giftCardCodes && giftCardCodes.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {giftCardCodes.map((giftCard) => (
            <RemoveGiftCardForm key={giftCard.id} giftCardId={giftCard.id}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: '#F9F7F4',
                borderRadius: 6,
                marginBottom: 8,
                border: `1px solid ${goldAccent}40`,
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <code style={{ fontSize: 13, color: darkText, fontFamily: 'monospace' }}>
                    ***{giftCard.lastCharacters}
                  </code>
                  <span style={{ fontSize: 13, color: mutedText }}>
                    <Money data={giftCard.amountUsed} />
                  </span>
                </div>
                <button
                  type="submit"
                  style={{
                    background: 'none', border: 'none', fontSize: 12,
                    color: mutedText, cursor: 'pointer', textDecoration: 'underline',
                    fontFamily: bodyFont,
                  }}
                >
                  Remove
                </button>
              </div>
            </RemoveGiftCardForm>
          ))}
        </div>
      )}

      {/* Gift card input */}
      <AddGiftCardForm fetcherKey="gift-card-add">
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
            style={{
              flex: 1,
              padding: '11px 14px',
              border: '1px solid #D4D0CA',
              borderRadius: 6,
              fontSize: 13,
              fontFamily: bodyFont,
              outline: 'none',
              color: darkText,
            }}
            onFocus={(e) => e.target.style.border = `1px solid ${goldAccent}`}
            onBlur={(e) => e.target.style.border = '1px solid #D4D0CA'}
          />
          <button
            type="submit"
            disabled={giftCardAddFetcher.state !== 'idle'}
            style={{
              padding: '11px 18px',
              background: 'white',
              color: darkText,
              border: `1px solid ${darkText}`,
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.08em',
              cursor: giftCardAddFetcher.state !== 'idle' ? 'not-allowed' : 'pointer',
              fontFamily: bodyFont,
              opacity: giftCardAddFetcher.state !== 'idle' ? 0.5 : 1,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { if (giftCardAddFetcher.state === 'idle') { e.currentTarget.style.background = darkText; e.currentTarget.style.color = 'white'; }}}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = darkText; }}
          >
            Apply
          </button>
        </div>
      </AddGiftCardForm>
      {giftCardAddFetcher.data?.errors?.[0]?.message && (
        <p role="alert" style={{ fontSize: 12, color: '#c0392b', marginTop: -4, marginBottom: 8 }}>
          {giftCardAddFetcher.data.errors[0].message}
        </p>
      )}
    </div>
  );
}

function AddGiftCardForm({fetcherKey, children}) {
  return (
    <CartForm fetcherKey={fetcherKey} route="/cart" action={CartForm.ACTIONS.GiftCardCodesAdd}>
      {children}
    </CartForm>
  );
}

function RemoveGiftCardForm({giftCardId, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{ giftCardCodes: [giftCardId] }}
    >
      {children}
    </CartForm>
  );
}

/** @typedef {{ cart: OptimisticCart<CartApiQueryFragment | null>; layout: CartLayout; }} CartSummaryProps */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */

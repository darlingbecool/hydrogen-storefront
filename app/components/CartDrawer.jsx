import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';

// Design constants
const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const warmBg = "#F5F2ED";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";

export function CartDrawer({isOpen, onClose, cart}) {
  if (!cart) return null;

  const itemCount = cart.lines?.nodes?.length || 0;
  const subtotal = cart.cost?.subtotalAmount?.amount || '0';
  const currencyCode = cart.cost?.subtotalAmount?.currencyCode || 'GBP';

  return (
    <>
      {/* Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
          zIndex: 1000,
        }}
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 480,
          height: '100vh',
          background: 'white',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '32px 32px 24px',
          borderBottom: '1px solid #E8E4DE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              fontFamily: playfair,
              fontSize: 28,
              color: darkText,
              fontWeight: 400,
              display: 'inline',
            }}>
              Your Bag
            </h2>
            <span style={{
              fontSize: 16,
              color: mutedText,
              marginLeft: 12,
            }}>
              ({itemCount})
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 28,
              color: darkText,
              cursor: 'pointer',
              lineHeight: 1,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.color = goldAccent}
            onMouseLeave={(e) => e.target.style.color = darkText}
          >
            ×
          </button>
        </div>

        {/* Items or Empty State */}
        {itemCount === 0 ? (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '80px 32px',
          }}>
            <div>
              <div style={{ fontSize: 64, opacity: 0.2, marginBottom: 24 }}>🛍</div>
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
                Discover our collection of hand-crafted jewelry
              </p>
              <Link
                to="/collections/all"
                onClick={onClose}
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
        ) : (
          <>
            {/* Cart Items */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: 32,
            }}>
              {cart.lines.nodes.map((line) => (
                <CartItem key={line.id} line={line} />
              ))}
            </div>

            {/* Footer */}
            <div style={{
              borderTop: '1px solid #E8E4DE',
              padding: 32,
              background: warmBg,
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}>
                <span style={{ fontSize: 16, color: mutedText }}>Subtotal</span>
                <span style={{ fontSize: 24, color: darkText, fontWeight: 500 }}>
                  {currencyCode === 'GBP' ? '£' : '$'}{parseFloat(subtotal).toFixed(2)}
                </span>
              </div>
              <p style={{
                fontSize: 13,
                color: mutedText,
                marginBottom: 24,
              }}>
                Shipping and taxes calculated at checkout
              </p>
              <a
                href={cart.checkoutUrl}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: 18,
                  background: darkText,
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  letterSpacing: '0.15em',
                  fontWeight: 500,
                  fontFamily: bodyFont,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'center',
                  textDecoration: 'none',
                  marginBottom: 12,
                }}
                onMouseEnter={(e) => e.target.style.background = goldAccent}
                onMouseLeave={(e) => e.target.style.background = darkText}
              >
                PROCEED TO CHECKOUT
              </a>
              <Link
                to="/cart"
                onClick={onClose}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: 14,
                  color: darkText,
                  textDecoration: 'underline',
                  marginTop: 12,
                }}
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function CartItem({line}) {
  const {merchandise, quantity} = line;
  const {product, title: variantTitle, image, price} = merchandise;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '100px 1fr',
      gap: 20,
      paddingBottom: 24,
      marginBottom: 24,
      borderBottom: '1px solid #E8E4DE',
    }}>
      {/* Product Image */}
      <div style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        border: '4px solid rgba(180,175,165,0.25)',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%)',
      }}>
        {image ? (
          <Image
            data={image}
            width={100}
            height={100}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: mutedText,
          }}>
            NO IMAGE
          </div>
        )}
      </div>

      {/* Item Details */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          fontSize: 16,
          color: darkText,
          fontWeight: 500,
          marginBottom: 6,
        }}>
          {product.title}
        </div>
        <div style={{
          fontSize: 14,
          color: mutedText,
          marginBottom: 12,
        }}>
          {variantTitle}
        </div>
        <div style={{
          fontSize: 16,
          color: darkText,
          fontWeight: 500,
          marginBottom: 12,
        }}>
          {price.currencyCode === 'GBP' ? '£' : '$'}{parseFloat(price.amount).toFixed(2)}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 'auto',
        }}>
          {/* Quantity Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            border: '1px solid #D4D0CA',
            borderRadius: 6,
            padding: '6px 12px',
          }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: 18,
                color: darkText,
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
              }}
            >
              −
            </button>
            <span style={{
              fontSize: 14,
              color: darkText,
              minWidth: 20,
              textAlign: 'center',
            }}>
              {quantity}
            </span>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: 18,
                color: darkText,
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
              }}
            >
              +
            </button>
          </div>
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: 13,
              color: mutedText,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onMouseEnter={(e) => e.target.style.color = darkText}
            onMouseLeave={(e) => e.target.style.color = mutedText}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

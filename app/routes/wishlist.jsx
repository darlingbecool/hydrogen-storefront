import {useState, useEffect} from 'react';
import {Link} from 'react-router';
import {getWishlist, removeFromWishlist} from '~/lib/wishlist';

const playfair = "'Playfair Display', serif";
const bodyFont = "system-ui, -apple-system, sans-serif";
const darkText = "#1A1A1A";
const goldAccent = "#D4AF37";
const mutedText = "#6A6A6A";
const borderCol = "#E8D7AE";

export const meta = () => {
  return [
    {title: 'Wishlist | Mercer 79'},
    {
      name: 'description',
      content: "Your saved Mercer 79 configurations.",
    },
  ];
};

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(getWishlist());
    setLoaded(true);

    const handleUpdate = () => setItems(getWishlist());
    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);

  const handleRemove = (id) => {
    const updated = removeFromWishlist(id);
    setItems(updated);
  };

  if (!loaded) return null;

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 32px 100px' }}>

        <h1 style={{
          fontFamily: playfair,
          fontSize: 42,
          fontWeight: 400,
          color: darkText,
          marginBottom: 8,
          marginTop: 0,
        }}>
          Your Wishlist
        </h1>

        {items.length === 0 ? (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: mutedText, marginBottom: 24, fontFamily: bodyFont }}>
              Nothing saved yet.
            </p>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                padding: '12px 28px',
                border: `1px solid ${darkText}`,
                background: 'white',
                color: darkText,
                textDecoration: 'none',
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: bodyFont,
              }}
            >
              Continue Browsing
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 24, marginTop: 40 }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: 20,
                  padding: 20,
                  border: `1px solid ${borderCol}`,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <div style={{
                  width: 88,
                  height: 88,
                  flexShrink: 0,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#F5F2ED',
                }}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: playfair, fontSize: 17, color: darkText, margin: '0 0 6px' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 13, color: mutedText, margin: '0 0 4px', fontFamily: bodyFont }}>
                    Size {item.size} · Initial {item.initial}
                  </p>
                  <p style={{ fontSize: 14, color: darkText, margin: 0, fontFamily: bodyFont }}>
                    £{item.price?.toLocaleString()}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Link
                    to={`/products/${item.handle}?Size=${item.size}`}
                    style={{
                      padding: '10px 20px',
                      background: darkText,
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: 11,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: bodyFont,
                      textAlign: 'center',
                      borderRadius: 6,
                    }}
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleRemove(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: mutedText,
                      fontSize: 12,
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      fontFamily: bodyFont,
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
import {Await, Link, useLocation} from 'react-router';
import {Suspense, useId, useState, useEffect} from 'react';
import {Aside, useAside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {CartMain} from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

// ── Design tokens ──────────────────────────────────────────────────────────────
const playfair = `'Playfair Display', serif`;
const bodyFont = `system-ui, -apple-system, sans-serif`;
const darkText = '#1A1A1A';
const goldAccent = '#D4AF37';
const mutedText = '#6A6A6A';
const borderColor = '#E8D7AE';
const NAV_HEIGHT = '60px';

// ── Navigation data (unchanged from your original) ────────────────────────────
const navSections = [
  {
  title: 'SHOP',
  items: [
    {label: 'No. 1 Oval Signet', path: '/products/no-1-oval-signet'},
    {label: 'No. 2 Rectangular Signet', path: '/products/no-2-rectangular-signet'},
    {label: 'Bespoke', path: '/bespoke'},
  ],
},
  {
    title: 'ABOUT',
    items: [
      {label: 'Our Story', path: '/pages/about'},
      {label: 'Size Guide', path: '/pages/size-guide'},
      {label: 'Care Guide', path: '/pages/care'},
      {label: 'FAQs', path: '/pages/faqs'},
    ],
  },
  {
    title: 'INFO',
    items: [
      {label: 'Delivery & Returns', path: '/pages/delivery'},
      {label: 'Terms & Conditions', path: '/pages/terms'},
      {label: 'Privacy Policy', path: '/pages/privacy'},
    ],
  },
];

// ── Page Layout ────────────────────────────────────────────────────────────────
export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div style={{background: 'white', minHeight: '100vh'}}>
      <Aside.Provider>
  <AsideGlobalizer />
  <AutoCloseOnNavigate onMenuClose={() => setMenuOpen(false)} />
  <CartAside cart={cart} />
  <SearchAside />

        {/* Top navigation bar */}
        <TopNav
          cart={cart}
          isLoggedIn={isLoggedIn}
          onMenuClick={() => setMenuOpen(true)}
        />

        {/* Left slide-in menu */}
        <SlideMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          cart={cart}
          isLoggedIn={isLoggedIn}
        />

        {/* Main content — paddingTop offsets the fixed nav bar */}
        <main style={{paddingTop: NAV_HEIGHT}}>
          {children}
        </main>

        <Footer
          footer={footer}
          header={header}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside.Provider>
    </div>
  );
}

// ── Expose Aside context globally (unchanged) ─────────────────────────────────
function AsideGlobalizer() {
  const aside = useAside();
  useEffect(() => {
    window.Aside = aside;
    return () => { delete window.Aside; };
  }, [aside]);
  return null;
}
function AutoCloseOnNavigate({onMenuClose}) {
  const {close} = useAside();
  const location = useLocation();

  useEffect(() => {
    close();
    onMenuClose();
  }, [location.pathname]);

  return null;
}

// ── Top navigation bar ─────────────────────────────────────────────────────────
function TopNav({cart, isLoggedIn, onMenuClick}) {
  const {open} = useAside();

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: NAV_HEIGHT,
        background: 'white',
        borderBottom: `1px solid ${borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 50,
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
      }}>

        {/* LEFT — hamburger */}
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '4px',
            color: darkText, display: 'flex', alignItems: 'center',
          }}
        >
          <HamburgerIcon />
        </button>

        {/* CENTRE — brand name, absolutely centred so it never shifts */}
        <Link
          to="/"
          style={{
            position: 'absolute', left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: playfair,
            fontSize: '19px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: darkText,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s ease',
          }}
          className="brand-wordmark"
        >
          MERCER 79
        </Link>

        {/* RIGHT — account, search, wishlist, bag (hidden on mobile — lives in slide menu instead) */}
        <div className="nav-icons-desktop" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <Link
            to="/account"
            aria-label={isLoggedIn ? 'Account' : 'Sign in'}
            className="nav-icon-btn"
            style={{
              color: darkText, display: 'flex', alignItems: 'center',
              textDecoration: 'none', transition: 'color 0.2s ease',
            }}
          >
            <AccountIcon />
          </Link>

          <NavIconButton label="Search" onClick={() => open('search')}>
            <SearchIcon />
          </NavIconButton>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="nav-icon-btn"
            style={{
              color: darkText, display: 'flex', alignItems: 'center',
              textDecoration: 'none', transition: 'color 0.2s ease',
              position: 'relative',
            }}
          >
            <WishlistIcon />
          </Link>

          <NavIconButton label="Bag" onClick={() => open('cart')}>
            <BagIcon />
            <Suspense fallback={null}>
              <Await resolve={cart}>
                {(resolvedCart) => {
                  const count = resolvedCart?.totalQuantity || 0;
                  return count > 0 ? (
                    <span style={{
                      position: 'absolute', top: '0px', right: '0px',
                      background: darkText, color: 'white',
                      borderRadius: '50%', width: 14, height: 14,
                      fontSize: 9, fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: bodyFont, lineHeight: 1,
                    }}>
                      {count > 9 ? '9+' : count}
                    </span>
                  ) : null;
                }}
              </Await>
            </Suspense>
          </NavIconButton>
        </div>
      </nav>

      <style>{`
        .brand-wordmark:hover { color: ${goldAccent} !important; }
        .nav-icon-btn:hover { color: ${goldAccent} !important; }
        .nav-icon-btn:hover svg { stroke: ${goldAccent}; }
        .slide-menu-link:hover { color: ${darkText} !important; opacity: 0.7; }

        @media (max-width: 768px) {
          nav { padding: 0 20px !important; }
          .nav-icons-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}

// Small reusable icon button
function NavIconButton({label, onClick, children}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="nav-icon-btn"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '4px', color: darkText,
        display: 'flex', alignItems: 'center',
        position: 'relative', transition: 'color 0.2s ease',
      }}
    >
      {children}
    </button>
  );
}

// ── Left slide-in menu ─────────────────────────────────────────────────────────
// Content mirrors your old desktop sidebar exactly:
// account, search, wishlist, SHOP/ABOUT/INFO accordion sections, tagline.
function SlideMenu({isOpen, onClose, cart, isLoggedIn}) {
  const {open} = useAside();
  const [openSections, setOpenSections] = useState({
    SHOP: true,
    ABOUT: false,
    INFO: false,
  });

  const toggleSection = (title) => {
    setOpenSections((prev) => ({...prev, [title]: !prev[title]}));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 98,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer — slides in from the LEFT */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        width: 300,
        background: 'white',
        zIndex: 99,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '28px 28px 32px',
      }}>

        {/* Header row — brand name + close button */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 36,
        }}>
          <Link
            to="/"
            onClick={onClose}
            style={{
              fontFamily: playfair,
              fontSize: 16, fontWeight: 400,
              letterSpacing: '0.2em',
              color: darkText, textDecoration: 'none',
            }}
          >
            MERCER 79
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', padding: '4px',
              color: darkText,
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Icons — centred, with gold divider beneath. Always visible in menu. */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 28,
          paddingBottom: 28,
          marginBottom: 8,
          borderBottom: `1px solid ${borderColor}`,
        }}>
          <Link
            to="/account"
            onClick={onClose}
            aria-label={isLoggedIn ? 'Account' : 'Sign in'}
            className="nav-icon-btn"
            style={{
              color: darkText, display: 'flex', alignItems: 'center',
              textDecoration: 'none', transition: 'color 0.2s ease',
            }}
          >
            <AccountIcon />
          </Link>

          <NavIconButton label="Search" onClick={() => { open('search'); onClose(); }}>
            <SearchIcon />
          </NavIconButton>
          <Link
            to="/wishlist"
            onClick={onClose}
            aria-label="Wishlist"
            className="nav-icon-btn"
            style={{
              color: darkText, display: 'flex', alignItems: 'center',
              textDecoration: 'none', transition: 'color 0.2s ease',
              position: 'relative',
            }}
          >
            <WishlistIcon />
          </Link>
          <NavIconButton label="Bag" onClick={() => { open('cart'); onClose(); }}>
            <BagIcon />
            <Suspense fallback={null}>
              <Await resolve={cart}>
                {(resolvedCart) => {
                  const count = resolvedCart?.totalQuantity || 0;
                  return count > 0 ? (
                    <span style={{
                      position: 'absolute', top: '0px', right: '0px',
                      background: darkText, color: 'white',
                      borderRadius: '50%', width: 14, height: 14,
                      fontSize: 9, fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: bodyFont, lineHeight: 1,
                    }}>
                      {count > 9 ? '9+' : count}
                    </span>
                  ) : null;
                }}
              </Await>
            </Suspense>
          </NavIconButton>
        </div>

        {/* Accordion nav sections */}
        <div style={{flex: 1}}>
          {navSections.map((section) => {
            const isOpenSection = openSections[section.title];
            return (
              <div key={section.title} style={{borderBottom: '1px solid #E8E4DE'}}>

                {/* Section header */}
                <div
                  onClick={() => toggleSection(section.title)}
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px 0',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontFamily: bodyFont,
                    fontSize: 11, letterSpacing: '0.15em',
                    color: darkText, fontWeight: 600,
                    textTransform: 'uppercase',
                  }}>
                    {section.title}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12"
                    fill="none" stroke={mutedText}
                    strokeWidth="1.5" strokeLinecap="round"
                    style={{
                      transition: 'transform 0.3s ease',
                      transform: isOpenSection ? 'rotate(180deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                    }}
                  >
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                </div>

                {/* Section items */}
                <div style={{
                  maxHeight: isOpenSection ? `${section.items.length * 44}px` : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  {section.items.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className="slide-menu-link"
                      style={{
                        display: 'block',
                        padding: '11px 0 11px 16px',
                        fontSize: 14,
                        color: mutedText,
                        textDecoration: 'none',
                        fontFamily: bodyFont,
                        letterSpacing: '0.02em',
                        borderBottom: index < section.items.length - 1
                          ? '1px solid #F0EDE8'
                          : 'none',
                        transition: 'color 0.2s',
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: bodyFont,
          fontSize: 11, color: mutedText,
          textAlign: 'center', letterSpacing: '0.08em',
          marginTop: 40, marginBottom: 0,
        }}>
          Hand-crafted in the UK
        </p>
      </div>
    </>
  );
}

// ── Cart aside ─────────────────────────────────────────────────────────────────
function CartAside({cart}) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart...</p>}>
        <Await resolve={cart}>
          {(cart) => <CartMain cart={cart} layout="aside" />}
        </Await>
      </Suspense>
    </Aside>
  );
}

// ── Search aside (unchanged from your original) ────────────────────────────────
function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <button onClick={goToSearch}>Search</button>
            </>
          )}
        </SearchFormPredictive>
        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;
            if (state === 'loading' && term.current) return <div>Loading...</div>;
            if (!total) return <SearchResultsPredictive.Empty term={term} />;
            return (
              <>
                <SearchResultsPredictive.Queries queries={queries} queriesDatalistId={queriesDatalistId} />
                <SearchResultsPredictive.Products products={products} closeSearch={closeSearch} term={term} />
                <SearchResultsPredictive.Collections collections={collections} closeSearch={closeSearch} term={term} />
                <SearchResultsPredictive.Pages pages={pages} closeSearch={closeSearch} term={term} />
                <SearchResultsPredictive.Articles articles={articles} closeSearch={closeSearch} term={term} />
                {term.current && total ? (
                  <Link onClick={closeSearch} to={`${SEARCH_ENDPOINT}?q=${term.current}`}>
                    <p>View all results for <q>{term.current}</q> &nbsp;→</p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

// ── SVG icons ──────────────────────────────────────────────────────────────────
function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 22 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h16l-1.5 14H4.5L3 7z" />
      <path d="M7.5 7V5a3.5 3.5 0 0 1 7 0v2" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/**
 * @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

// ── Design tokens (matches PageLayout.jsx) ─────────────────────────────────────
const playfair = `'Playfair Display', serif`;
const bodyFont = `system-ui, -apple-system, sans-serif`;
const darkText = '#1A1A1A';
const goldAccent = '#D4AF37';
const mutedText = '#6A6A6A';
const borderColor = '#E8D7AE';

export function shouldRevalidate() {
  return true;
}
/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  const {customerAccount} = context;
  const {data, errors} = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });
  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }
  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}
export default function AccountLayout() {
  /** @type {LoaderReturnData} */
  const {customer} = useLoaderData();
  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';
  return (
    <div
      className="account"
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 40px 100px',
      }}
    >
      <h1
        style={{
          fontFamily: playfair,
          fontWeight: 400,
          fontSize: '32px',
          color: darkText,
          letterSpacing: '0.01em',
          margin: '0 0 28px',
        }}
      >
        {heading}
      </h1>
      <AccountMenu />
      <div style={{marginTop: '40px'}}>
        <Outlet context={{customer}} />
      </div>
      <style>{`
        .account-nav-link { transition: color 0.2s ease; }
        .account-nav-link:hover { color: ${goldAccent} !important; }
        .account-signout-btn { transition: background 0.2s ease, color 0.2s ease; }
        .account-signout-btn:hover { background: ${darkText} !important; color: white !important; }
      `}</style>
    </div>
  );
}
function AccountMenu() {
  function isActiveStyle({isActive, isPending}) {
    return {
      fontFamily: bodyFont,
      fontSize: '13px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      textDecoration: 'none',
      fontWeight: isActive ? 600 : 400,
      color: isPending ? mutedText : isActive ? goldAccent : darkText,
    };
  }
  return (
    <nav
      role="navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        paddingBottom: '24px',
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <NavLink to="/account/orders" className="account-nav-link" style={isActiveStyle}>
        Orders
      </NavLink>
      <NavLink to="/account/profile" className="account-nav-link" style={isActiveStyle}>
        Profile
      </NavLink>
      <NavLink to="/account/addresses" className="account-nav-link" style={isActiveStyle}>
        Addresses
      </NavLink>
      <Logout />
    </nav>
  );
}
function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      <button
        type="submit"
        className="account-signout-btn"
        style={{
          background: 'none',
          border: `1px solid ${darkText}`,
          borderRadius: '2px',
          color: darkText,
          fontFamily: bodyFont,
          fontSize: '12px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '7px 16px',
          cursor: 'pointer',
        }}
      >
        Sign out
      </button>
    </Form>
  );
}
/** @typedef {import('./+types/account').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';
/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Profile'}];
};
/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  context.customerAccount.handleAuthStatus();
  return {};
}
/**
 * @param {Route.ActionArgs}
 */
export async function action({request, context}) {
  const {customerAccount} = context;
  if (request.method !== 'PUT') {
    return data({error: 'Method not allowed'}, {status: 405});
  }
  const form = await request.formData();
  try {
    const customer = {};
    const validInputKeys = ['firstName', 'lastName'];
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key] = value;
      }
    }
    // update customer and possibly password
    const {data, errors} = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
          language: customerAccount.i18n.language,
        },
      },
    );
    if (errors?.length) {
      throw new Error(errors[0].message);
    }
    if (!data?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }
    return {
      error: null,
      customer: data?.customerUpdate?.customer,
    };
  } catch (error) {
    return data(
      {error: error.message, customer: null},
      {
        status: 400,
      },
    );
  }
}
export default function AccountProfile() {
  const account = useOutletContext();
  const {state} = useNavigation();
  /** @type {ActionReturnData} */
  const action = useActionData();
  const customer = action?.customer ?? account?.customer;
  return (
    <div className="account-profile">
      <h2>My profile</h2>
      <Form method="PUT">
        <legend>Personal information</legend>
        <fieldset>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            aria-label="First name"
            defaultValue={customer.firstName ?? ''}
            minLength={2}
          />
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            aria-label="Last name"
            defaultValue={customer.lastName ?? ''}
            minLength={2}
          />
        </fieldset>
        {action?.error ? (
          <p className="account-form-error">
            <small>{action.error}</small>
          </p>
        ) : null}
        <button type="submit" disabled={state !== 'idle'} className="account-submit-btn">
          {state !== 'idle' ? 'Updating' : 'Update'}
        </button>
      </Form>
      <AccountFormBrandStyles />
    </div>
  );
}

// ── Brand styling shared by account form pages ─────────────────────────────────
function AccountFormBrandStyles() {
  const playfair = `'Playfair Display', serif`;
  const bodyFont = `system-ui, -apple-system, sans-serif`;
  const darkText = '#1A1A1A';
  const goldAccent = '#D4AF37';
  const mutedText = '#6A6A6A';
  const borderColor = '#E8D7AE';

  return (
    <style>{`
      .account-profile h2,
      .account-addresses h2 {
        font-family: ${playfair};
        font-weight: 400;
        font-size: 22px;
        color: ${darkText};
        margin: 0 0 28px;
      }
      .account-profile legend,
      .account-addresses legend {
        font-family: ${bodyFont};
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: ${mutedText};
        padding: 0 4px;
      }
      .account-profile fieldset,
      .account-addresses fieldset {
        border: 1px solid ${borderColor};
        border-radius: 2px;
        padding: 24px;
        max-width: 420px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
      }
      .account-profile label,
      .account-addresses label {
        font-family: ${bodyFont};
        font-size: 13px;
        color: ${mutedText};
        display: block;
        margin-bottom: 6px;
      }
      .account-profile input,
      .account-addresses input {
        width: 100%;
        font-family: ${bodyFont};
        font-size: 14px;
        color: ${darkText};
        border: 1px solid ${borderColor};
        border-radius: 2px;
        padding: 10px 12px;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.2s ease;
      }
      .account-profile input:focus,
      .account-addresses input:focus {
        border-color: ${goldAccent};
      }
      .account-submit-btn {
        background: ${darkText};
        color: white;
        border: none;
        border-radius: 2px;
        font-family: ${bodyFont};
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 11px 26px;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .account-submit-btn:hover {
        background: ${goldAccent};
      }
      .account-submit-btn:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .account-form-error {
        font-family: ${bodyFont};
        font-size: 13px;
        color: #B3261E;
        margin: 0 0 16px;
      }
    `}</style>
  );
}
/**
 * @typedef {{
 *   error: string | null;
 *   customer: CustomerFragment | null;
 * }} ActionResponse
 */
/** @typedef {import('customer-accountapi.generated').CustomerFragment} CustomerFragment */
/** @typedef {import('@shopify/hydrogen/customer-account-api-types').CustomerUpdateInput} CustomerUpdateInput */
/** @typedef {import('./+types/account.profile').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */

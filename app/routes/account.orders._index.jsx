import {
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';
import {useRef} from 'react';
import {
  Money,
  getPaginationVariables,
  flattenConnection,
} from '@shopify/hydrogen';
import {
  buildOrderSearchQuery,
  parseOrderFilters,
  ORDER_FILTER_FIELDS,
} from '~/lib/orderFilters';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Orders'}];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({request, context}) {
  const {customerAccount} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const url = new URL(request.url);
  const filters = parseOrderFilters(url.searchParams);
  const query = buildOrderSearchQuery(filters);

  const {data, errors} = await customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables,
      query,
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw Error('Customer orders not found');
  }

  return {customer: data.customer, filters};
}

export default function Orders() {
  /** @type {LoaderReturnData} */
  const {customer, filters} = useLoaderData();
  const {orders} = customer;

  return (
    <div className="orders">
      <OrderSearchForm currentFilters={filters} />
      <OrdersTable orders={orders} filters={filters} />
      <OrdersBrandStyles />
    </div>
  );
}

/**
 * @param {{
 *   orders: CustomerOrdersFragment['orders'];
 *   filters: OrderFilterParams;
 * }}
 */
function OrdersTable({orders, filters}) {
  const hasFilters = !!(filters.name || filters.confirmationNumber);

  return (
    <div className="acccount-orders" aria-live="polite">
      {orders?.nodes.length ? (
        <PaginatedResourceSection connection={orders}>
          {({node: order}) => <OrderItem key={order.id} order={order} />}
        </PaginatedResourceSection>
      ) : (
        <EmptyOrders hasFilters={hasFilters} />
      )}
    </div>
  );
}

/**
 * @param {{hasFilters?: boolean}}
 */
function EmptyOrders({hasFilters = false}) {
  return (
    <div className="orders-empty">
      {hasFilters ? (
        <>
          <p>No orders found matching your search.</p>
          <p>
            <Link to="/account/orders" className="orders-empty-link">
              Clear filters &nbsp;→
            </Link>
          </p>
        </>
      ) : (
        <>
          <p>You haven&apos;t placed any orders yet.</p>
          <p>
            <Link to="/collections" className="orders-empty-link">
              Start Shopping &nbsp;→
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

/**
 * @param {{
 *   currentFilters: OrderFilterParams;
 * }}
 */
function OrderSearchForm({currentFilters}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSearching =
    navigation.state !== 'idle' &&
    navigation.location?.pathname?.includes('orders');
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    const name = formData.get(ORDER_FILTER_FIELDS.NAME)?.toString().trim();
    const confirmationNumber = formData
      .get(ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER)
      ?.toString()
      .trim();

    if (name) params.set(ORDER_FILTER_FIELDS.NAME, name);
    if (confirmationNumber)
      params.set(ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER, confirmationNumber);

    setSearchParams(params);
  };

  const hasFilters = currentFilters.name || currentFilters.confirmationNumber;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="order-search-form"
      aria-label="Search orders"
    >
      <fieldset className="order-search-fieldset">
        <legend className="order-search-legend">Filter Orders</legend>

        <div className="order-search-inputs">
          <input
            type="search"
            name={ORDER_FILTER_FIELDS.NAME}
            placeholder="Order #"
            aria-label="Order number"
            defaultValue={currentFilters.name || ''}
            className="order-search-input"
          />
          <input
            type="search"
            name={ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER}
            placeholder="Confirmation #"
            aria-label="Confirmation number"
            defaultValue={currentFilters.confirmationNumber || ''}
            className="order-search-input"
          />
        </div>

        <div className="order-search-buttons">
          <button
            type="submit"
            disabled={isSearching}
            className="order-search-submit"
          >
            {isSearching ? 'Searching' : 'Search'}
          </button>
          {hasFilters && (
            <button
              type="button"
              disabled={isSearching}
              className="order-search-clear"
              onClick={() => {
                setSearchParams(new URLSearchParams());
                formRef.current?.reset();
              }}
            >
              Clear
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
}

/**
 * @param {{order: OrderItemFragment}}
 */
function OrderItem({order}) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;
  return (
    <div className="order-item">
      <div className="order-item-main">
        <Link to={`/account/orders/${btoa(order.id)}`} className="order-item-number">
          Order #{order.number}
        </Link>
        <p className="order-item-date">
          {new Date(order.processedAt).toDateString()}
        </p>
        {order.confirmationNumber && (
          <p className="order-item-meta">
            Confirmation: {order.confirmationNumber}
          </p>
        )}
        <p className="order-item-meta">
          {order.financialStatus}
          {fulfillmentStatus ? ` · ${fulfillmentStatus}` : ''}
        </p>
      </div>
      <div className="order-item-side">
        <Money data={order.totalPrice} className="order-item-price" />
        <Link to={`/account/orders/${btoa(order.id)}`} className="order-item-link">
          View Order &nbsp;→
        </Link>
      </div>
    </div>
  );
}

// ── Brand styling for this page's markup, scoped via class names ──────────────
function OrdersBrandStyles() {
  const playfair = `'Playfair Display', serif`;
  const bodyFont = `system-ui, -apple-system, sans-serif`;
  const darkText = '#1A1A1A';
  const goldAccent = '#D4AF37';
  const mutedText = '#6A6A6A';
  const borderColor = '#E8D7AE';

  return (
    <style>{`
      .order-search-form {
        margin-bottom: 40px;
      }
      .order-search-fieldset {
        border: 1px solid ${borderColor};
        border-radius: 2px;
        padding: 24px;
        max-width: 520px;
      }
      .order-search-legend {
        font-family: ${playfair};
        font-size: 16px;
        font-weight: 400;
        color: ${darkText};
        padding: 0 8px;
      }
      .order-search-inputs {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }
      .order-search-input {
        flex: 1;
        min-width: 160px;
        font-family: ${bodyFont};
        font-size: 14px;
        color: ${darkText};
        border: 1px solid ${borderColor};
        border-radius: 2px;
        padding: 10px 12px;
        outline: none;
        transition: border-color 0.2s ease;
      }
      .order-search-input:focus {
        border-color: ${goldAccent};
      }
      .order-search-buttons {
        display: flex;
        gap: 12px;
      }
      .order-search-submit {
        background: ${darkText};
        color: white;
        border: none;
        border-radius: 2px;
        font-family: ${bodyFont};
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 10px 22px;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .order-search-submit:hover {
        background: ${goldAccent};
      }
      .order-search-submit:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .order-search-clear {
        background: none;
        border: 1px solid ${borderColor};
        border-radius: 2px;
        color: ${mutedText};
        font-family: ${bodyFont};
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 10px 22px;
        cursor: pointer;
        transition: color 0.2s ease, border-color 0.2s ease;
      }
      .order-search-clear:hover {
        color: ${darkText};
        border-color: ${darkText};
      }

      .orders-empty p {
        font-family: ${bodyFont};
        font-size: 15px;
        color: ${mutedText};
        margin: 0 0 12px;
      }
      .orders-empty-link {
        font-family: ${bodyFont};
        font-size: 13px;
        letter-spacing: 0.06em;
        color: ${darkText};
        text-decoration: none;
        border-bottom: 1px solid ${darkText};
        padding-bottom: 2px;
        transition: color 0.2s ease, border-color 0.2s ease;
      }
      .orders-empty-link:hover {
        color: ${goldAccent};
        border-color: ${goldAccent};
      }

      .order-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
        flex-wrap: wrap;
        padding: 20px 0;
        border-bottom: 1px solid ${borderColor};
      }
      .order-item-number {
        font-family: ${playfair};
        font-size: 18px;
        color: ${darkText};
        text-decoration: none;
      }
      .order-item-number:hover {
        color: ${goldAccent};
      }
      .order-item-date {
        font-family: ${bodyFont};
        font-size: 13px;
        color: ${mutedText};
        margin: 6px 0 0;
      }
      .order-item-meta {
        font-family: ${bodyFont};
        font-size: 13px;
        color: ${mutedText};
        margin: 4px 0 0;
      }
      .order-item-side {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
      }
      .order-item-price {
        font-family: ${bodyFont};
        font-size: 15px;
        font-weight: 600;
        color: ${darkText};
      }
      .order-item-link {
        font-family: ${bodyFont};
        font-size: 12px;
        letter-spacing: 0.06em;
        color: ${darkText};
        text-decoration: none;
        border-bottom: 1px solid ${darkText};
        padding-bottom: 1px;
        transition: color 0.2s ease, border-color 0.2s ease;
      }
      .order-item-link:hover {
        color: ${goldAccent};
        border-color: ${goldAccent};
      }
    `}</style>
  );
}

/**
 * @typedef {{
 *   customer: CustomerOrdersFragment;
 *   filters: OrderFilterParams;
 * }} OrdersLoaderData
 */

/** @typedef {import('./+types/account.orders._index').Route} Route */
/** @typedef {import('~/lib/orderFilters').OrderFilterParams} OrderFilterParams */
/** @typedef {import('customer-accountapi.generated').CustomerOrdersFragment} CustomerOrdersFragment */
/** @typedef {import('customer-accountapi.generated').OrderItemFragment} OrderItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

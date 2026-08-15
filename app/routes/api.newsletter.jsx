import {data} from 'react-router';

const KLAVIYO_LIST_ID = 'XQfekx';

/**
 * @param {Route.ActionArgs}
 */
export async function action({request, context}) {
  if (request.method !== 'POST') {
    return data({error: 'Method not allowed'}, {status: 405});
  }

  const formData = await request.formData();
  const email = formData.get('email');

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return data({error: 'Please enter a valid email address.'}, {status: 400});
  }

  const apiKey = context.env.KLAVIYO_PRIVATE_API_KEY;

  if (!apiKey) {
    console.error('KLAVIYO_PRIVATE_API_KEY is not set');
    return data(
      {error: 'Something went wrong. Please try again shortly.'},
      {status: 500},
    );
  }

  try {
    const response = await fetch(
      'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
      {
        method: 'POST',
        headers: {
          Authorization: `Klaviyo-API-Key ${apiKey}`,
          'Content-Type': 'application/json',
          revision: '2024-10-15',
        },
        body: JSON.stringify({
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              profiles: {
                data: [
                  {
                    type: 'profile',
                    attributes: {
                      email,
                      subscriptions: {
                        email: {
                          marketing: {
                            consent: 'SUBSCRIBED',
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
            relationships: {
              list: {
                data: {
                  type: 'list',
                  id: KLAVIYO_LIST_ID,
                },
              },
            },
          },
        }),
      },
    );

    // Klaviyo returns 202 Accepted for this endpoint on success — it's an async job
    if (!response.ok && response.status !== 202) {
      const errorDetails = await response.text();
      console.error('Klaviyo API error:', errorDetails);
      return data(
        {error: 'Something went wrong. Please try again shortly.'},
        {status: 500},
      );
    }

    return data({success: true});
  } catch (err) {
    console.error('Failed to subscribe to Klaviyo:', err);
    return data(
      {error: 'Something went wrong. Please try again shortly.'},
      {status: 500},
    );
  }
}

/** @typedef {import('./+types/api.newsletter').Route} Route */

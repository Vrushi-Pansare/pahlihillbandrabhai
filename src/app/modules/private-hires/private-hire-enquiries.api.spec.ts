import {
  PrivateHireEnquiriesApi,
  type PrivateHireEnquiryPayload,
} from './private-hire-enquiries.api';

const payload: PrivateHireEnquiryPayload = {
  name: 'Amelia Thompson',
  email: 'amelia.thompson@example.com',
  phone: '+44 7700 900582',
  eventDate: '2026-10-17',
  partySize: 28,
  space: 'Full venue',
  message: 'Anniversary dinner with a drinks reception.',
};

describe('PrivateHireEnquiriesApi', () => {
  it('posts the backend enquiry contract as JSON', async () => {
    const fetchFn = jasmine
      .createSpy('fetch')
      .and.resolveTo(new Response(null, { status: 201 }));
    const api = new PrivateHireEnquiriesApi(
      'http://localhost:55071/api/v1/public/pahli-hill/enquiries',
      fetchFn,
    );

    await api.submit(payload);

    expect(fetchFn).toHaveBeenCalledOnceWith(
      'http://localhost:55071/api/v1/public/pahli-hill/enquiries',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );
  });

  it('rejects an unsuccessful backend response', async () => {
    const fetchFn = jasmine
      .createSpy('fetch')
      .and.resolveTo(new Response(null, { status: 429 }));
    const api = new PrivateHireEnquiriesApi(
      'http://localhost:55071/api/v1/public/pahli-hill/enquiries',
      fetchFn,
    );

    await expectAsync(api.submit(payload)).toBeRejectedWithError(
      'Unable to submit enquiry.',
    );
  });

  it('calls the browser fetch function with its required window binding', async () => {
    const originalFetch = window.fetch;
    window.fetch = function (this: Window) {
      if (this !== window) {
        return Promise.reject(new TypeError('Illegal invocation'));
      }
      return Promise.resolve(new Response(null, { status: 201 }));
    } as typeof fetch;

    try {
      const api = new PrivateHireEnquiriesApi(
        'http://localhost:55071/api/v1/public/pahli-hill/enquiries',
      );

      await expectAsync(api.submit(payload)).toBeResolved();
    } finally {
      window.fetch = originalFetch;
    }
  });
});

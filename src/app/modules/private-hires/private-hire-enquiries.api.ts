export interface PrivateHireEnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  eventDate?: string;
  partySize?: number;
  space?: 'Restaurant' | 'Bar' | 'Full venue' | 'Not sure yet';
  message?: string;
}

type FetchFn = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export class PrivateHireEnquiriesApi {
  constructor(
    private readonly endpoint: string,
    private readonly fetchFn: FetchFn = (input, init) =>
      window.fetch(input, init),
  ) {}

  async submit(payload: PrivateHireEnquiryPayload): Promise<void> {
    const response = await this.fetchFn(this.endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Unable to submit enquiry.');
    }
  }
}

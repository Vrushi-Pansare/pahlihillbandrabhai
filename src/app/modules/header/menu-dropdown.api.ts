export interface DropdownValue {
  code: string;
  label: string;
  description: string | null;
  sortOrder: number;
  parentCode: string | null;
  metadata: unknown;
}

interface DropdownValuesResponse {
  success: boolean;
  data: DropdownValue[];
}

type FetchFn = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export class MenuDropdownApi {
  constructor(
    private readonly endpoint: string,
    private readonly fetchFn: FetchFn = (input, init) =>
      window.fetch(input, init),
  ) {}

  async load(code: string): Promise<DropdownValue[]> {
    const response = await this.fetchFn(this.endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Unable to load menu dropdown.');
    }

    const body = (await response.json()) as DropdownValuesResponse;
    if (!body.success || !Array.isArray(body.data)) {
      throw new Error('Unable to load menu dropdown.');
    }

    return [...body.data].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

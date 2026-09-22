export interface MenuProduct {
  id: string;
  name: string;
  description: string | null;
  unitPrice: number | null;
  category: { code: string; label: string } | null;
  allergen: { code: string; label: string } | null;
  tags: { code: string; label: string } | null;
  brand: { code: string; label: string } | null;
  group: { code: string; label: string } | null;
  productImages: string[];
}

interface ListingResponse {
  success: boolean;
  data: MenuProduct[];
}

type FetchFn = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export class MenuListingApi {
  constructor(
    private readonly endpoint: string,
    private readonly fetchFn: FetchFn = (input, init) =>
      window.fetch(input, init),
  ) {}

  async load(
    categoryLabel: string,
    allergenLabel?: string,
  ): Promise<MenuProduct[]> {
    const filters = [{ recordPath: 'categoryId', value: categoryLabel }];
    if (allergenLabel) {
      filters.push({ recordPath: 'allergenId', value: allergenLabel });
    }

    return this.post({ moduleCode: 'product', filters });
  }

  async loadAll(): Promise<MenuProduct[]> {
    return this.post({ moduleCode: 'product' });
  }

  private async post(body: Record<string, unknown>): Promise<MenuProduct[]> {
    const response = await this.fetchFn(this.endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Unable to load menu items.');
    }

    const parsed = (await response.json()) as ListingResponse;
    if (!parsed.success || !Array.isArray(parsed.data)) {
      throw new Error('Unable to load menu items.');
    }

    return parsed.data;
  }
}

export type CatalogItemDto = {
  id: string;
  category: string;
  name: string;
  spec: string;
  priceK: number;
  maxQuantity: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function fetchCatalog(): Promise<CatalogItemDto[]> {
  const res = await fetch(`${API_URL}/catalog`);
  if (!res.ok) {
    throw new Error(`Failed to load catalog (status ${res.status})`);
  }
  return res.json();
}

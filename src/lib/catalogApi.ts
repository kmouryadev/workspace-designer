import axios from "axios";

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
  try {
    const res = await axios.get<CatalogItemDto[]>(`${API_URL}/catalog`);
    return res.data;
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    throw new Error(`Failed to load catalog${status ? ` (status ${status})` : ""}`);
  }
}

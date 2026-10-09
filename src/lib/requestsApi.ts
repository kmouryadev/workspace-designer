import axios from "axios";

export type RequestDetailDto = {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  location: string;
  startDate: string;
  duration: string;
  message?: string;
  setupDesk?: string | null;
  setupChair?: string | null;
  setupItems?: Record<string, number>;
  monthlyTotalK: number;
  periodTotalK: number;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function fetchRequestById(id: string): Promise<RequestDetailDto> {
  const res = await axios.get<RequestDetailDto>(`${API_URL}/requests/${encodeURIComponent(id)}`);
  return res.data;
}

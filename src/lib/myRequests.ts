export type MyRequestSummary = {
  id: string;
  fullName: string;
  location: string;
  startDate: string;
  duration: string;
  periodTotalK: number;
  createdAt: string;
};

const STORAGE_KEY = "monis-rent:my-requests";
const MAX_SAVED = 50;

export function saveMyRequest(summary: MyRequestSummary): void {
  try {
    const existing = getMyRequests();
    const next = [summary, ...existing.filter((item) => item.id !== summary.id)].slice(0, MAX_SAVED);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable (e.g. private browsing) — history just won't persist
  }
}

export function getMyRequests(): MyRequestSummary[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as MyRequestSummary[];
  } catch {
    return [];
  }
}

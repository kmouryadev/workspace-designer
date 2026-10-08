export function encodeSetup(desk: string | null, chair: string | null, qty: Record<string, number>): string {
  const params = new URLSearchParams();
  if (desk) params.set("d", desk);
  if (chair) params.set("c", chair);
  const accessoryList = Object.entries(qty)
    .filter(([, quantity]) => quantity > 0)
    .map(([itemId, quantity]) => `${itemId}:${quantity}`)
    .join(",");
  if (accessoryList) params.set("q", accessoryList);
  return params.toString();
}

export function decodeSetup(params: URLSearchParams): {
  desk: string | null;
  chair: string | null;
  qty: Record<string, number>;
} {
  const desk = params.get("d") || null;
  const chair = params.get("c") || null;
  const qty: Record<string, number> = {};
  const accessoryList = params.get("q");
  if (accessoryList) {
    for (const pair of accessoryList.split(",")) {
      const [itemId, quantity] = pair.split(":");
      if (itemId && quantity) qty[itemId] = parseInt(quantity, 10) || 0;
    }
  }
  return { desk, chair, qty };
}

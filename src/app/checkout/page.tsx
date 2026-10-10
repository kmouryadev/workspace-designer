import { Suspense } from "react";
import { CheckoutContent } from "@/components/organisms/CheckoutContent";

export const instant = false;

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}

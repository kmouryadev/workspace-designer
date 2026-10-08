import { Suspense } from "react";
import { CheckoutContent } from "@/components/organisms/CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}

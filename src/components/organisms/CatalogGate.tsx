"use client";

import { useEffect, type ReactNode } from "react";
import { useWorkspace } from "@/store/workspace";
import { Button } from "@/components/ui/Button";

export function CatalogGate({ children }: { children: ReactNode }) {
  const catalog = useWorkspace((state) => state.catalog);
  const catalogError = useWorkspace((state) => state.catalogError);
  const loadCatalog = useWorkspace((state) => state.loadCatalog);

  useEffect(() => {
    if (!catalog && !catalogError) {
      loadCatalog();
    }
  }, [catalog, catalogError, loadCatalog]);

  if (catalogError) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-center">
        <div>
          <p className="text-[14px] font-bold text-ink">Couldn&apos;t load the catalog</p>
          <p className="mt-1 text-[12px] text-ink-soft">{catalogError}</p>
          <Button variant="primary" size="sm" onClick={() => loadCatalog()} className="mt-3">
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (!catalog) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-center text-[13px] text-ink-soft">
        Loading workspace designer…
      </div>
    );
  }

  return <>{children}</>;
}

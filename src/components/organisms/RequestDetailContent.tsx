"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchRequestById, type RequestDetailDto } from "@/lib/requestsApi";
import { DURATIONS } from "@/lib/duration";
import { rp } from "@/data/items";
import { useWorkspace } from "@/store/workspace";
import { RoomStage } from "@/components/organisms/RoomStage";
import { ChevronLeftIcon } from "@/assets/icons";
import { Heading, Typography } from "@/components/ui/Typography";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-[13px]">
      <Typography muted>{label}</Typography>
      <span className="font-medium text-ink text-right">{value}</span>
    </div>
  );
}

export function RequestDetailContent({ id }: { id: string }) {
  const [request, setRequest] = useState<RequestDetailDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const catalog = useWorkspace((state) => state.catalog)!; // non-null: CatalogGate guarantees this

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchRequestById(id)
      .then((data) => {
        if (!cancelled) setRequest(data);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't find that request. It may not exist, or the backend is unreachable.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const durationLabel = request ? DURATIONS.find((option) => option.id === request.duration)?.label ?? request.duration : "";

  return (
    <main id="main-content" className="mx-auto w-full flex-1 px-4 py-6 min-[1100px]:px-8">
      <Link
        href="/request"
        className="mb-3 flex items-center gap-1 text-[13px] font-semibold text-ink-soft hover:text-ink"
      >
        <ChevronLeftIcon />
        Back to My Requests
      </Link>

      {loading && (
        <div className="flex flex-1 items-center justify-center rounded-[20px] border border-line bg-panel p-8 text-center text-[13px] text-ink-soft">
          Loading request…
        </div>
      )}

      {!loading && error && (
        <div className="rounded-[20px] border border-error-border bg-error-bg p-5 text-center">
          <p className="text-[14px] font-bold text-error-text">Couldn&apos;t load this request</p>
          <p className="mt-1 text-[12px] text-error-text">{error}</p>
        </div>
      )}

      {!loading && request && (
        <div className="grid grid-cols-1 gap-5 min-[900px]:grid-cols-[1fr_360px]">
          <RoomStage
            desk={request.setupDesk ?? null}
            chair={request.setupChair ?? null}
            qty={request.setupItems ?? {}}
            catalog={catalog}
          />

          <div className="rounded-[20px] border border-line bg-panel p-5">
            <div className="flex items-center justify-between gap-2">
              <Heading as="h1" size="md">
                {request.id}
              </Heading>
              <span className="text-[12px] text-ink-soft">{new Date(request.createdAt).toLocaleString()}</span>
            </div>

            <div className="mt-4 divide-y divide-line border-t border-line">
              <Row label="Full name" value={request.fullName} />
              <Row label="Email" value={request.email} />
              <Row label="WhatsApp" value={request.whatsapp} />
              <Row label="Delivery location" value={request.location} />
              <Row label="Start date" value={request.startDate} />
              <Row label="Rental duration" value={durationLabel} />
              {request.message && <Row label="Message" value={request.message} />}
            </div>

            <div className="mt-4 space-y-1.5 border-t border-line pt-3">
              <div className="flex items-center justify-between text-[13px]">
                <Typography muted>Monthly rate</Typography>
                <span className="font-bold text-ink">{rp(request.monthlyTotalK)}</span>
              </div>
              <div className="flex items-center justify-between text-[15px]">
                <span className="font-semibold text-ink">Period total</span>
                <span className="font-bold text-ink">{rp(request.periodTotalK)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyRequests, type MyRequestSummary } from "@/lib/myRequests";
import { rp } from "@/data/items";
import { Heading, Typography } from "@/components/ui/Typography";

export function MyRequestsContent() {
  const [requests, setRequests] = useState<MyRequestSummary[] | null>(null);

  useEffect(() => {
    setRequests(getMyRequests());
  }, []);

  return (
    <main id="main-content" className="mx-auto w-full max-w-[720px] flex-1 px-4 py-6 min-[1100px]:px-8">
      <Heading as="h1" size="md">
        My Requests
      </Heading>
      <Typography muted className="mt-1">
        Rental requests you&apos;ve submitted from this browser.
      </Typography>

      {requests && requests.length === 0 && (
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-line py-12 text-center">
          <p className="text-[14px] font-bold text-ink">Nothing here yet</p>
          <Typography size="sm" muted className="mt-1">
            Submit a rental request to see it here.
          </Typography>
        </div>
      )}

      {requests && requests.length > 0 && (
        <div className="mt-6 space-y-2">
          {requests.map((item) => (
            <Link
              key={item.id}
              href={`/request/${item.id}`}
              className="block rounded-xl border border-line bg-panel p-4 transition-colors hover:border-gold-text"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-ink">{item.id}</span>
                <span className="text-[12px] text-ink-soft">{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2 text-[13px] text-ink-soft">
                <span>
                  {item.location} · {item.duration}
                </span>
                <span className="font-semibold text-ink">{rp(item.periodTotalK)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

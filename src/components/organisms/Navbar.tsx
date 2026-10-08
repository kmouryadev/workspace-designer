"use client";

import Link from "next/link";
import { useWorkspace } from "@/store/workspace";
import { LogoMark } from "@/assets/icons";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const reset = useWorkspace((state) => state.reset);

  return (
    <header className="bg-navy">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 min-[1100px]:px-8">
        <Link href="/" aria-label="monis.rent Workspace Designer, go to builder" className="flex items-center gap-3">
          <LogoMark size={36} />
          <div className="leading-tight">
            <p className="font-heading text-[15px] font-extrabold text-white">monis.rent</p>
            <p className="text-[11px] font-medium text-white/60">Workspace Designer</p>
          </div>
        </Link>

        <Button variant="outline-light" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>
    </header>
  );
}

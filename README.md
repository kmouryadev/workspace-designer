# Workspace Designer for monis.rent

A web app where a customer designs a rented home-office setup (desk, chair, monitors, lighting, plants and a few lifestyle extras), sees it update live in a room, sends a rental request, and can look back at their past requests. Built for monis.rent, which rents office furniture and equipment in Bali.

**Live app:** https://workspace-designer-drab.vercel.app/

**Repository:** https://github.com/kmouryadev/workspace-designer

**Backend:** https://github.com/kmouryadev/workspace-designer-backend

## Approach, tech choices and what's next

**Approach.** The customer builds a setup in three steps on one page (Setup, Accessories, Summary), then sends a rental request on a second page. Everything on the builder page runs from one store, so the room preview and the running total update the moment an item changes, with no page loads in between. The room is drawn from layered SVGs that sit in fixed slots, so items never overlap whatever combination is chosen. Monitors share one zone with set layouts (up to 3 standard monitors, or 1 ultrawide), and anything that would not fit shows a clear message instead. The item catalog and rental request submissions are backed by a real API (see the backend repo above), not static sample data.

**Tech choices.** Next.js (App Router) with TypeScript, Tailwind CSS v4 and Zustand, deployed on Vercel. State lives in Zustand because the builder is one page with several linked views (panel, stage, summary), which keeps the code short. The catalog is fetched once on load and cached in the store; axios handles all requests to the backend.

**With more time.** Real monis.rent photos and current prices, availability by date and location, a real AI room render, and room placement for the lifestyle extras (see [Future improvements](#future-improvements)).

## User flow

The builder at `/` switches between three steps with state, so the stage and totals update instantly:

1. **Setup:** choose a desk, a chair and monitors.
2. **Accessories:** choose lighting, plants, coffee station, surfboards, motorcycles and relax zone items.
3. **Summary:** review the setup, change quantities, see the monthly total.

`/checkout` is step 4. It has a rental request form (name, contact details, delivery location, start date, rental duration) with validation, a real submit to the backend, and a confirmation screen with the request ID the backend generated. The chosen setup travels to the form in the URL (`?d=...&c=...&q=...`), so the link can be shared.

`/request` lists every request submitted from the current browser (saved to `localStorage` on each successful submit). Clicking one opens `/request/[id]`, which fetches that request's full details live from the backend and renders the same room preview used on the builder page, so the customer can see exactly what they asked for.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS v4, with design tokens and fonts set as theme variables in `src/assets/styles/globals.css` |
| State | Zustand (`src/store/workspace.ts`) |
| HTTP client | axios (`src/lib/catalogApi.ts`, `src/lib/requestsApi.ts`) |
| Backend | Separate Node/Express API — see `workspace-designer-backend` |
| Hosting | Vercel |

## Project structure

```
src/
  app/                  Routes (/, /checkout, /request, /request/[id]) and the root layout
  assets/               Stage and item SVG art, shared icons, global styles
  components/
    ui/                 Reusable primitives: Button, Typography, form fields,
                        tiles, list rows, stepper, category rail
    organisms/          Composed sections: Navbar, CatalogGate, Stage, RoomStage,
                        OptionsPanel, SummaryList, OrderSummary, CheckoutContent,
                        MyRequestsContent, RequestDetailContent
  data/                 Item/stage layout helpers; catalog data itself comes from the backend
  lib/                  catalogApi/requestsApi (backend calls), myRequests (localStorage
                        history), checkout validation, duration pricing, URL encoding
  store/                Zustand store for builder state and the fetched catalog
```

## Getting started

Requires Node.js 18.18 or newer, and the backend running (see `workspace-designer-backend`'s README) — the builder won't load without it.

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To check a production build:

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.local.example` to `.env.local` and adjust as needed:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | Base URL of the backend API |

## Notes on scope

- **Sample art, real data.** The SVG artwork in `src/assets/art.tsx` and the desk/chair slot positions in `src/data/items.ts` are sample visuals. The item names, specs and prices themselves come live from the backend's catalog.
- **AI View.** The "AI View" toggle on the stage is a placeholder. It opens an overlay that says the feature is under maintenance. There is no AI render call in this MVP.
- **My Requests is per-browser.** There's no login system, so "My Requests" is backed by `localStorage`, not an account. It only shows requests submitted from that browser; clearing site data loses the list (the requests themselves still exist on the backend, just not listed here). The detail view at `/request/[id]` works for any valid id, since the backend's lookup endpoint is intentionally public — see that repo's README for the tradeoff this implies.

## Accessibility

- The category rail is a real tab and tabpanel pair, navigable with the arrow keys.
- The AI View overlay is a labelled dialog. Focus moves into it on open, returns to the trigger on close, and Escape closes it.
- Selectable tiles use two sibling controls (a full-card button and a separate quantity stepper) instead of nesting interactive elements.
- Form errors show an icon and text, link back to the field, and use `aria-invalid` and `role="alert"`.
- All routes have a skip-to-content link and page-level headings.

## Future improvements

- Real photos and current pricing from monis.rent instead of flat SVG art and sample Rp figures.
- Availability by date and location instead of an always-available catalog.
- A real AI room render behind the "AI View" toggle.
- Room placement for the lifestyle extras (coffee, surfboards, motorcycles, relax zone). They currently show as cards, not objects in the scene.
- A "share this setup" button. The URL encoding on `/checkout` already lays the groundwork.
- Real accounts instead of per-browser `localStorage`, so request history follows the customer across devices.

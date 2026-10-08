# Workspace Designer for monis.rent

A web app where a customer designs a rented home-office setup (desk, chair, monitors, lighting, plants and a few lifestyle extras), sees it update live in a room, and sends a rental request. Built for monis.rent, which rents office furniture and equipment in Bali.

**Live app:** https://workspace-designer-drab.vercel.app/

**Repository:** https://github.com/kmouryadev/workspace-designer

## Approach, tech choices and what's next

**Approach.** The customer builds a setup in three steps on one page (Setup, Accessories, Summary), then sends a rental request on a second page. Everything on the builder page runs from one store, so the room preview and the running total update the moment an item changes, with no page loads in between. The room is drawn from layered SVGs that sit in fixed slots, so items never overlap whatever combination is chosen. Monitors share one zone with set layouts (up to 3 standard monitors, or 1 ultrawide), and anything that would not fit shows a clear message instead.

**Tech choices.** Next.js (App Router) with TypeScript, Tailwind CSS v4 and Zustand, deployed on Vercel. State lives in Zustand because the builder is one page with several linked views (panel, stage, summary), which keeps the code short. Prices, specs and artwork live in one data file, so adding an item means adding one entry.

**With more time.** Real monis.rent photos and current prices, a backend that stores rental requests and notifies the team, availability by date and location, a real AI room render, and room placement for the lifestyle extras (see [Future improvements](#future-improvements)).

## User flow

The builder at `/` switches between three steps with state, so the stage and totals update instantly:

1. **Setup:** choose a desk, a chair and monitors.
2. **Accessories:** choose lighting, plants, coffee station, surfboards, motorcycles and relax zone items.
3. **Summary:** review the setup, change quantities, see the monthly total.

`/checkout` is step 4. It has a rental request form (name, contact details, delivery location, start date, rental duration) with validation, a mock submit and a confirmation screen with a generated request ID. The chosen setup travels to the form in the URL (`?d=...&c=...&q=...`), so the link can be shared and no backend is needed.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS v4, with design tokens and fonts set as theme variables in `src/assets/styles/globals.css` |
| State | Zustand (`src/store/workspace.ts`) |
| Hosting | Vercel |

## Project structure

```
src/
  app/                  Routes (/ and /checkout) and the root layout
  assets/               Stage and item SVG art, shared icons, global styles
  components/
    ui/                 Reusable primitives: Button, Typography, form fields,
                        tiles, list rows, stepper, category rail
    organisms/          Composed sections: Navbar, Stage, OptionsPanel,
                        SummaryList, OrderSummary, CheckoutContent
  data/                 Item catalog, pricing and the no-overlap stage layout
  lib/                  Checkout validation, duration pricing, URL encoding
  store/                Zustand store for builder state
```

## Getting started

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To check a production build:

```bash
npm run build
npm start
```

## Notes on scope

These parts are placeholders on purpose:

- **Sample data.** Prices, item specs and the SVG artwork in `src/data/items.ts` and `src/assets/art.tsx` are sample data. They are not a real monis.rent catalog or price list.
- **AI View.** The "AI View" toggle on the stage is a placeholder. It opens an overlay that says the feature is under maintenance. There is no AI render call in this MVP.
- **Rental request form.** "Submit Rental Request" is a mock and there is no backend. A valid form waits briefly, then shows a confirmation with a generated request ID (`MR-#####`). Nothing is stored or sent. The form also simulates a failed send now and then, so the "couldn't send" error state can be seen, and "Try again" recovers from it.

## Accessibility

- The category rail is a real tab and tabpanel pair, navigable with the arrow keys.
- The AI View overlay is a labelled dialog. Focus moves into it on open, returns to the trigger on close, and Escape closes it.
- Selectable tiles use two sibling controls (a full-card button and a separate quantity stepper) instead of nesting interactive elements.
- Form errors show an icon and text, link back to the field, and use `aria-invalid` and `role="alert"`.
- Both routes have a skip-to-content link and page-level headings.

## Future improvements

- Real photos and current pricing from monis.rent instead of flat SVG art and sample Rp figures.
- A backend for rental requests: store them, notify the team by email or WhatsApp, and confirm availability.
- Availability by date and location instead of an always-available catalog.
- A real AI room render behind the "AI View" toggle.
- Room placement for the lifestyle extras (coffee, surfboards, motorcycles, relax zone). They currently show as cards, not objects in the scene.
- A "share this setup" button. The URL encoding on `/checkout` already lays the groundwork. 
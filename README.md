# Aurelia

A premium, fully responsive concept website for **Aurelia**, a fictional modern
European restaurant in Mayfair, London. Built with Next.js App Router, React and
hand-authored CSS Modules — no UI or animation libraries.

> **Concept project.** The restaurant, address, phone number, people, reviews and
> imagery are illustrative. The reservation form is a front-end demonstration: it
> validates input and shows a confirmation summary, but it is **not connected to a
> backend**, sends and stores nothing, and never holds a table.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Other scripts: `npm run typecheck` (TypeScript, no emit).

Requires Node.js 20+. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin so
canonical URLs, Open Graph metadata, the sitemap and JSON-LD use the real domain.
It defaults to `https://aurelia-mayfair.example.com`.

## Design system

All theme-dependent colours are CSS custom properties declared in
`app/globals.css`. There are two independently art-directed palettes:

| Token group | Light | Dark |
| --- | --- | --- |
| Surfaces | warm cream paper (`#f6f1e7` → `#fcf8f1`) | deep espresso (`#131110` → `#25201a`) |
| Ink | charcoal (`#211c16`) | warm white (`#f3ece1`) |
| Accent | burnt amber (`#8a4c1d`) | brass (`#d7a262`) |
| Primary button | charcoal fill / cream text | brass fill / espresso text |
| Lines | sand (`#ded3c2`) | warm charcoal (`#352e26`) |

Component styles only reference tokens (`var(--ink)`, `var(--surface)`,
`var(--accent)` …), so a palette change happens in one place. Form controls use
the stronger `--field-border` token to satisfy non-text contrast.

Typography:

- **Fraunces** for display headings, with the `SOFT` and `WONK` variable axes.
- **Manrope** for body copy and UI labels.
- Fluid sizing via `clamp()`; the header height is tokenised as `--header-h`.

## Theming

- An inline script in `<head>` (`app/layout.tsx`) applies the stored theme from
  `localStorage` (`aurelia-theme`) or the OS `prefers-color-scheme` **before first
  paint**, preventing a flash of the wrong theme.
- `components/theme/ThemeToggle.tsx` updates `data-theme`, persists the choice,
  follows OS changes while no explicit choice is stored, and syncs across tabs via
  the `storage` event.
- A short `theme-transition` class animates colour changes; it is skipped when
  `prefers-reduced-motion: reduce` is set.
- `color-scheme` and `theme-color` are set per theme for native controls and
  browser chrome.

## Structure

```
app/
  layout.tsx        fonts, metadata, theme bootstrap, header/footer shell
  page.tsx          section composition + Restaurant JSON-LD
  globals.css       design tokens, both themes, base styles, utilities
  sitemap.ts        sitemap
  robots.ts         robots rules
  icon.svg          favicon
components/
  layout/           Header (sticky nav, scroll spy, mobile dialog), Footer
  sections/         Hero, About, Menu, Specialities, Gallery, Testimonials,
                    Reservation, Contact
  theme/            ThemeToggle
  ui/               Icons, Logo, Reveal, SectionHeading
lib/
  site.ts           brand, contact, address, hours, nav, booking options
  content.ts        dishes, dietary tags, signatures, gallery, testimonials
public/images/      curated, locally served photography
```

## Interactions and accessibility

- Semantic landmarks, one `h1`, labelled sections, a skip link and visible focus
  styles throughout.
- Sticky desktop navigation with scroll-spy `aria-current`; below 1024px a native
  `<dialog>` mobile sheet with scroll lock and focus return.
- Menu filters are `aria-pressed` buttons with a polite live region announcing the
  result count. Filtering works with keyboard activation and remounts the grid for
  a subtle entrance animation.
- Gallery uses a native `<dialog>` lightbox: arrow-key navigation, Escape/close
  button, backdrop click, and focus moved to the close control.
- The reservation form validates name, phone, email, date (no past dates, no
  Mondays, up to six months ahead), time, guests and request length. Errors use
  `aria-invalid`/`aria-describedby`, submit focuses the first invalid field, and
  the result panel is announced with `role="status"`. The success panel explicitly
  states that nothing was sent or stored.
- Animations use CSS transforms/opacity and `IntersectionObserver`; all motion is
  disabled under `prefers-reduced-motion`.
- Below-the-fold images are lazy-loaded; the hero image is prioritised. Images use
  fixed aspect-ratio containers to avoid layout shift.
- Colour contrast was checked with axe-core: **zero WCAG 2.1 A/AA violations** in
  both themes at mobile and desktop widths.

## Imagery

Photography is stored locally in `public/images` and served through `next/image`
(AVIF/WebP, responsive sizes, quality tuned per use). The photographs are from
[Unsplash](https://unsplash.com) and are used here for demonstration only; they
are not tied to a real restaurant. Replace them with licensed brand photography
before any commercial use.

## Known limitation

There is no bookings backend. To take real reservations, connect the form to a
booking provider or API, handle server-side validation and spam protection, and
replace the demo success message with the provider's confirmation state.

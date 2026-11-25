# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run build` / `npm run preview` — production build to `dist/` and local preview
- Node version is pinned in `.nvmrc` (`engines` requires >=22.23.4)
- No test runner or linter is configured. Type checking via `npx astro check` needs `@astrojs/check` installed first.

## Stack decisions

- Astro with Tailwind v4 (via `@tailwindcss/vite`, no `tailwind.config`). Interactive UI is planned as React islands — not installed yet; don't introduce Vue or Next.
- Light mode only: don't add dark-mode tokens or `dark:` variants.
- TypeScript uses `astro/tsconfigs/strict`.

## Architecture

NoMoFOMO is a news aggregator: items come from sources, sources belong to categories.

- **Data flow:** pages call `src/lib/feed.ts` (`getHomepageData`), which joins the static mocks in `src/data/mocks/*.json` into `ResolvedItem`s (item + source + category) defined in `src/lib/types.ts`. `feed.ts` is the seam where real fetching will replace the mocks — keep its return shapes stable. Mock items use `ageMinutes` instead of a date so relative times stay realistic.
- **Design system:** the source of truth is the NoMoFOMO Basic design system artifact (https://claude.ai/artifact/P9RNKr1G9sK7Lr4ELNX7jX). It is implemented as Tailwind tokens in `src/styles/global.css`, which resets Tailwind's colours, fonts, radii and shadows (`--color-*: initial` etc.) — only the tokens defined there exist: colours `white`, `black`, `primary`, `secondary`; the `text-h1`…`text-meta` styles; one radius, plain `rounded` (8px); no shadow utilities. `src/pages/styleguide.astro` is the living style guide; update it when tokens or `ui/` components change.
- **Typography:** Geist only, set once on `body` via `font-sans`; components don't set a font family. Loaded through Astro's `fonts` config in `astro.config.mjs` and `<Font>` in `src/layouts/Base.astro`.
- **Colour rules:** `primary` is for actions, links, active nav and focus; `secondary` is only for unread dots and counters and always takes `black` text (it fails contrast as text on white). Cards are `white` with a `black` border; hover changes the border to `primary` — no lift, no shadow. Categories have a `hue` in the data model, but the current design doesn't use it.
- **Copy rules (brand book):** source types are limited to `SOURCE_TYPES` in `src/lib/design.ts`; item times go through `formatItemTime` in `src/lib/format.ts` (relative under 24 h, then "Yesterday", then a short date).

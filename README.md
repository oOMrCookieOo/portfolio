# Portfolio, Isslem Maali

Vite + React 19 + Tailwind v4 + shadcn/ui. Static build, no server.

```bash
npm run dev        # http://localhost:5173
npm run build      # dist/
npm run preview
npm run typecheck
```

## Make it yours

The fast way is to not type any of it. Hand your CV to an AI along with `src/data.ts`
and ask it to refill that file with your own record, keeping every export, type and
field name exactly as they are. It is one flat file of plain objects, so a model
rewrites it in a single pass and you paste the result straight over the original.

Something like:

```
Here are my CV and my portfolio's src/data.ts.
Rewrite data.ts with my details. Keep the same exports, types and field names,
change only the values. Omit href and preview where I have no live link or
screenshot.
```

Then pick a layout with `?variant=`, pick a palette from the switcher pill, drop your
photo in as `public/me.webp`, and that is the site. The tables further down list the
variants and the palettes.

Two things to check by hand afterwards, because a model will happily invent both:
every `href` should resolve, and every `tags` entry should be a tool you have actually
used.

## Where things are

- `src/data.ts` is the only file with content in it. Name, bio, jobs, projects, links, stack. Edit there.
- `src/components/*` one file per section.
- `src/components/PageLayout.tsx` the shipped layout. `Sidebar.tsx` is the sticky column.
- `src/components/ui/*` shadcn components. `button` and `badge` are retuned to this project. `github-activity` came from the rare-ui registry.
- `src/components/reui/scrollspy.tsx` from the reui registry, with one local fix noted in the file.
- `src/hooks/useSmoothScroll.ts` Lenis, skipped when the visitor prefers reduced motion.
- `src/components/SmoothCursor.tsx` the custom cursor, ported from hpbrn.com.
- `src/prototype/*` the other layouts. Off by default, see below.

## The shipped layout

Sticky identity column on the left (avatar, name, rotating role, location, status, rail,
socials). Content on the right in this order: About, Commits, Tech stack, Experience,
Projects, Education, Get in touch.

The rail marks the section you are looking at. It uses reui's Scrollspy rather than an
IntersectionObserver band, because a band in the middle of the viewport can never be
reached by a short section at the bottom of the page, so the last item never lit up on a
tall screen.

Anchor clicks are handed to Lenis, not to the scrollspy. The vendored component
scrolls with window.scrollTo, which Lenis overrides on its next frame, so links
moved the page a few pixels and stopped. It now takes handleClicks={false} and
Lenis handles the jump via its anchors option.

## The other layouts

Fifteen alternatives are kept. They are off by default and load as their own chunk, so a
normal visit never downloads them.

```
?prototypes=1     show the switcher pill on any build
?variant=E        jump straight to one layout
```

Dev always shows the pill. Left and right arrow keys cycle it. The pill also carries the
six palettes and the custom cursor toggle.

| Key | Layout |
| --- | --- |
| A | avatar and a meta grid |
| B | editorial, name at poster scale |
| C | info panel on the left |
| D | commit graph as the hero |
| E | serif italic name, prose |
| F | A plus a cursor spotlight |
| G J K L O | sticky sidebar, five different headers |
| H | labelled columns of links |
| I | short and long bio |
| M | cover page with a numbered index |
| N | datasheet: one claim, spec block, counted figures, expandable record |
| **P** | **what ships** |

P renders `PageLayout` itself, so there is one source of truth for the real page.

To retire the alternatives later, delete `src/prototype/` and the `showPrototypes` branch
in `App.tsx`. Nothing in the shipped page imports from that folder.

## Routes

| Path | What |
| --- | --- |
| `/` | the portfolio |
| `/components` | the registry blocks, with live previews and install commands |

Routing is 40 lines in `src/router.tsx`: read the pathname, listen for popstate,
intercept clicks on internal links. Hash links are left alone because the section
rail uses them. Static hosts need the SPA fallback, which is why `public/_redirects`
(Netlify, Cloudflare Pages) and `vercel.json` are in the repo.

## Registry

`registry.json` at the root is the manifest; `npx shadcn build` inlines the sources
into `public/r/*.json`. Add a block by writing it under `registry/<name>/`, adding an
entry to the manifest, and rebuilding. Set `REGISTRY_ORIGIN` in
`src/registry-index.ts` to the deployed domain or the copy buttons hand out a dead URL.

## Palettes

Six full pairings, not just swapped accents. Ground, text, hairlines and one signal
colour, tuned separately for light and dark: graphite and emerald, ink and cobalt, slate
and amber, forest and sage, oxide and brick, mono. The choice is remembered and applied
before first paint.

## Still needed

- `public/me.jpg`, square, 400px or more. Without it the avatar falls back to an `IM` monogram.
- Project screenshots at `public/projects/`, otherwise the cards keep their gradient placeholder.
- Check the public email in `src/data.ts`. It is the one from the CV, not the Foxcode address.
- The phone number is in the footer. Delete it from `src/data.ts` if you would rather not publish it.

## Deploy

Any static host. `npm run build`, then serve `dist/`. Cloudflare Pages, Netlify and Vercel
all need `npm run build` and the `dist` directory, nothing else.

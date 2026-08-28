# Making your components installable

How the shadcn registry works, and how to add a block to this one.

## The mechanism

There is no registry service. A registry is **static JSON files on a URL**. That is the
whole thing.

When someone runs:

```bash
npx shadcn@latest add https://isslem.dev/r/app-shell.json
```

the CLI:

1. `GET`s that URL.
2. Reads `components.json` in **their** project to learn where files go (`aliases.ui`,
   `aliases.components`, `aliases.lib`, `tailwind.css`).
3. Installs everything in the item's `dependencies` with their package manager.
4. Recursively resolves `registryDependencies`. A bare name like `"sidebar"` resolves
   against shadcn's own registry; a full URL resolves against anyone's.
5. Writes each entry in `files` to disk, rewriting `@/` imports to match their aliases.
6. Merges any `cssVars` and `css` into their stylesheet.

Nothing is published anywhere. No account, no npm package, no version tags. Serving the
JSON **is** the publish.

## This repo's setup

```
registry.json                    the manifest you edit
registry/<block>/*.tsx           the sources
public/r/<block>.json            generated, served as-is
src/registry-index.ts            what the components page lists
```

Build step:

```bash
npx shadcn@latest build          # registry.json -> public/r/*.json
```

Vite serves `public/` unchanged, so after a deploy every block is live at
`https://<domain>/r/<name>.json`.

## Adding a block, start to finish

### 1. Write the source

Put it in `registry/<name>/`. The only imports allowed are:

- real npm packages (`lucide-react`, etc.)
- `@/lib/utils` for `cn`
- `@/components/ui/*` for shadcn primitives you declare as `registryDependencies`

**Everything app-specific has to be inverted into a prop or a slot.** This is the actual
work; the JSON takes two minutes. From the `app-shell` extraction:

| Was | Became |
| --- | --- |
| `usePathname()` from the app's i18n router | `pathname: string` prop |
| `Link` from the app's router | `linkComponent?: ElementType` prop, defaults to `a` |
| `NavUser`, `LocaleSwitcher`, `TrialPill` | `headerRight?: ReactNode` slot |
| `AppCommandMenu` | `commandMenu?: ReactNode` slot |
| `BreadcrumbProvider` + context | `crumbs?: Crumb[]` prop, derived from the pathname when omitted |
| `useTranslations('chrome')` | labels come from the nav data the caller passes |

If a block needs global CSS, prefer shipping it **inside the component** rather than
asking the installer to paste rules. `smooth-cursor` injects one `<style>` tag on mount,
so it installs with zero CSS wiring. The alternative is the `css` / `cssVars` fields in
the manifest, which the CLI merges into their stylesheet.

### 2. Add a mock and a demo

- `<name>.mock.ts` for realistic sample data, not lorem.
- `<name>.demo.tsx` that renders standalone: no providers, no router, no fetches.

The demo is what the components page and `/components/<slug>` render, so it doubles as
your documentation.

### 3. Add the manifest entry

```json
{
  "name": "project-showcase",
  "type": "registry:block",
  "title": "Project showcase",
  "description": "One sentence on what it is and what is unusual about it.",
  "dependencies": ["lucide-react"],
  "registryDependencies": ["sidebar", "breadcrumb"],
  "files": [
    {
      "path": "registry/project-showcase/project-showcase.tsx",
      "type": "registry:component",
      "target": "components/ui/project-showcase.tsx"
    }
  ]
}
```

`files[].type` decides the destination folder:

| type | lands in |
| --- | --- |
| `registry:ui` | `components/ui` |
| `registry:component` | `components` |
| `registry:block` | `components` |
| `registry:lib` | `lib` |
| `registry:hook` | `hooks` |
| `registry:page`, `registry:file` | wherever `target` says, and `target` is required |

`target` overrides the folder. Use it for subfolders, the way `app-shell` puts everything
in `components/app-shell/`.

### 4. Build and list it

```bash
npx shadcn@latest build
```

Then add it to `blocks` in `src/registry-index.ts` and the `DEMOS` map in
`src/pages/demos.ts` so it shows on the components page.

### 5. Test it like a stranger

This is the step that catches everything:

```bash
npm create vite@latest probe -- --template react-ts
cd probe
npx shadcn@latest init
npx shadcn@latest add http://localhost:5173/r/app-shell.json   # or the deployed URL
npx tsc --noEmit
```

If that fails, the block is broken no matter how well it works here.

## Before you ship, check

- [ ] `grep -rE "@/features|@/shared|@/i18n|next-intl|next/" registry/` returns nothing
- [ ] The demo runs with no provider, router or network
- [ ] Every npm import appears in `dependencies`
- [ ] Every `@/components/ui/*` import appears in `registryDependencies`
- [ ] `npx tsc --noEmit` passes
- [ ] `npx shadcn@latest build` regenerated `public/r/`
- [ ] Installed into a throwaway project and compiled there

## Hosting requirements

- **`Content-Type: application/json`** and **CORS open** (`Access-Control-Allow-Origin: *`).
  Static hosts do both by default. A custom server or Worker might not.
- **The JSON must not be rewritten to `index.html`.** This repo's `vercel.json` excludes
  `/r/*` from the SPA fallback for exactly that reason; `public/_redirects` is a `200`
  rewrite, which leaves real files alone.
- Private registries are possible: the consumer adds a namespace with headers in their
  `components.json` and keeps the token in their environment.

```json
"registries": {
  "@acme": {
    "url": "https://acme.dev/r/{name}.json",
    "headers": { "Authorization": "Bearer ${ACME_TOKEN}" }
  }
}
```

## Namespaces, the nicer install

Consumers register the registry once:

```json
"registries": {
  "@isslem": "https://isslem.dev/r/{name}.json"
}
```

Then they install by short name:

```bash
npx shadcn@latest add @isslem/app-shell
```

That is the same mechanism that made `npx shadcn add @reui/c-scrollspy-1` work in this
repo.

## Versioning

There is none built in. The URL is the version. Options, cheapest first:

1. **Just update the JSON.** Fine while nobody depends on it.
2. **Keep old copies**: `r/app-shell.json` and `r/app-shell-v1.json`. Crude and it works.
3. **Tag by path**: `r/v2/app-shell.json`, leaving `r/v1/` frozen.

Breaking a prop after someone installed it costs them nothing until they reinstall, since
they own the code by then. That is the upside of the whole model.

## Gotchas hit while building this

- **`npx shadcn add --overwrite` is not surgical.** It replaced the project's retuned
  `button.tsx` with the stock one twice. Back up customised primitives first, or answer
  the prompt instead of passing the flag.
- **Registry code is not automatically portable code.** Both extractions here were 90%
  stripping app coupling and 10% JSON.
- **A block that uses `position: fixed` escapes any preview box.** The components page
  wraps previews in `contain: paint` + a transform to create a containing block. Worth
  knowing if you preview your own blocks anywhere.
- **`shadcn build` inlines file contents at build time.** Editing `registry/` without
  rebuilding leaves stale JSON in `public/r/`. Rebuild before every deploy.

## The blocks in here now

| Block | Type | Notable |
| --- | --- | --- |
| `app-shell` | `registry:block` | Extracted from a production back office. Router agnostic. |
| `smooth-cursor` | `registry:component` | Zero dependencies, injects its own stylesheet, `scope` prop bounds it to one element. |
| `project-showcase` | `registry:block` | One rAF loop, no state on pointer move. |

Set `REGISTRY_ORIGIN` in `src/registry-index.ts` to the deployed domain, or the copy
buttons on the components page hand out a dead URL.

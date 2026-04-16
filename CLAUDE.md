# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hugo static site for a private lawyer's practice (89095688888.ru). Russian-language site (`ru-RU`). Site title: «Юридические услуги». No theme — all layouts are custom in `layouts/`. Timezone: `Europe/Moscow`.

## Commands

- **Dev server:** `make hugo_serve` (port 1313, full re-render on changes, `--cleanDestinationDir --ignoreCache --disableFastRender`)
- **Build:** `hugo` (output to `public/`)
- **Clean build:** `make pd` (clears `public/` then builds)
- **Create section:** `make section Название` (transliterates Cyrillic to Latin for the directory name, creates `content/<transliterated>/_index.md`)
- **Create post:** `make newpost Название` (same transliteration, creates `content/<transliterated>.md`)
- **Git push shortcut:** `make gp commit message here`

Minimum Hugo version: 0.146.0 (CI uses 0.149.0 extended).

## Architecture

### Templates (`layouts/`)

- **Base:** `baseof.html` — html skeleton: `head.html` partial, `header.html`, `{{ block "main" }}`, `footer.html`.
- **Page types:**
  - `home.html` — renders `content/_index.md` content + iterates `site.Sections` with `showOnMain = true`, calling `section-home.html` partial for each.
  - `page.html` — breadcrumbs, title, Russian-localized date (using `data/months.toml`), content, tags via `terms.html` partial.
  - `section.html` — breadcrumbs, title, content, lists child `.Pages` with title links and summaries.
  - `taxonomy.html`, `term.html` — taxonomy layouts.

### Partials (`layouts/_partials/`)

| Partial | Purpose |
|---------|---------|
| `head.html` | `<head>`: charset, viewport, title (`Page | Site` or just `Site` for home), includes `head/description.html`, `head/css.html`, `head/js.html` |
| `header.html` | Phone number as logo link (`8 (909) 568-88-88`), main menu, burger toggle button |
| `footer.html` | Footer menu, privacy notice (no cookies), sitemap link with page count, copyright 2007–current year |
| `menu.html` | Recursive menu walker — renders `<nav><ul>` with active/ancestor CSS classes. Accepts `menuID` + `page` dict |
| `breadcrumbs.html` | `<nav aria-label="breadcrumb">` — Home → ancestors → current page |
| `section-home.html` | Section preview card: title link, description, summary, first 5 child pages sorted by weight |
| `terms.html` | Renders taxonomy terms (e.g. tags) assigned to a page |

### Menus (defined in `hugo.toml`)

- **main:** Консультация (`yuridicheskaya-konsultaciya`), Услуги (`uslugi`)
- **footer:** Политика конфиденциальности (`/privacy-policy.html`), Условия использования (`/terms-of-service.html`)

### Assets

- `assets/css/main.css`, `assets/js/main.js` — processed through Hugo pipes, no external build toolchain.
- **Fonts** in `static/fonts/`: Cuprum (Regular/Bold/Italic), Oswald (ExtraLight/Regular/SemiBold), Playfair Display + SC (Regular/Bold/Italic), Russo One.

### Data

- `data/months.toml` — Russian month names in genitive case (января, февраля, …). Used by `page.html` for human-readable date formatting.

### Content structure

- **Sections** (`content/<name>/_index.md`): `nasledstvennye_spory` (Наследственные споры), `zashhita_prav_potrebitelja` (Защита прав потребителя).
- **Standalone pages** (`content/<name>.md`): `yuridicheskaya-konsultaciya.md`.
- **Homepage** (`content/_index.md`): title «Главная», description about lawyer services.
- Front matter format: TOML (`+++`). Key params: `title`, `date`, `draft`, `description`, `showOnMain`, `weight`.

### Hugo config (`hugo.toml`)

- `uglyURLs = true` — pages produce `.html` extensions.
- `enableRobotsTXT = true`, `disableHugoGeneratorInject = true`.
- `buildDrafts = false`, `buildFuture = false`, `buildExpired = false`.

## Deployment

GitHub Actions workflow (`.github/workflows/hugo.yml`): builds and deploys to GitHub Pages on push to `main`. CI environment: Hugo 0.149.0 extended, Go 1.25.0, Node.js 22.18.0, Dart Sass 1.91.0. Uses Hugo cache between builds.

## Content Conventions

- All content is in Russian. Directory/file names use transliterated Latin (Cyrillic → ASCII via Makefile `sed` rules, spaces → underscores, lowercased).
- Archetype default (`archetypes/default.md`) sets `draft = false` and `showOnMain = false`.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hugo static site for a private lawyer's practice (89095688888.ru). Russian-language site. No theme — all layouts are custom in `layouts/`.

## Commands

- **Dev server:** `make hugo_serve` (port 1313, full re-render on changes)
- **Build:** `hugo` (output to `public/`)
- **Clean build:** `make pd` (clears `public/` then builds)
- **Create section:** `make section Название` (transliterates Cyrillic to Latin for the directory name, creates `content/<transliterated>/_index.md`)
- **Create post:** `make newpost Название` (same transliteration, creates `content/<transliterated>.md`)
- **Git push shortcut:** `make gp commit message here`

Minimum Hugo version: 0.146.0 (CI uses 0.149.0 extended).

## Architecture

- **No theme** — all templates live in `layouts/`. Base template is `baseof.html` (head, header, main block, footer).
- **Partials** in `layouts/_partials/`: `head.html`, `header.html`, `footer.html`, `menu.html`, `breadcrumbs.html`, `section-home.html`, `terms.html`. CSS/JS includes are sub-partials under `_partials/head/`.
- **Assets:** `assets/css/main.css` and `assets/js/main.js` — no build toolchain, just Hugo pipes.
- **Content types:** sections (`content/<name>/_index.md`) and standalone pages (`content/<name>.md`). Front matter uses TOML (`+++`).
- **Homepage sections:** Sections appear on the home page when their `_index.md` has `showOnMain = true`. Rendered via `section-home.html` partial (shows first 5 pages sorted by weight).
- **URL style:** `uglyURLs = true` — pages produce `.html` extensions (e.g., `/page.html`).

## Deployment

GitHub Actions workflow (`.github/workflows/hugo.yml`) builds and deploys to GitHub Pages on push to `main`.

## Content Conventions

- All content is in Russian. Directory/file names use transliterated Latin (Cyrillic → ASCII via Makefile rules).
- Archetype default (`archetypes/default.md`) sets `draft = false` and `showOnMain = false`.

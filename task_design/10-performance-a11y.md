# Фаза 10 — Производительность и доступность ⬜

**Цель:** Lighthouse Performance ≥ 95, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95. Для статического Hugo-сайта это достижимо.

**Зависит от:** все предыдущие фазы (правим то, что получилось).

## Шрифты

- [ ] **10.1.** `font-display: swap` во всех `@font-face` блоках [main.css:1-41](../assets/css/main.css) — сейчас нет, текст остаётся невидимым до загрузки шрифта (FOIT).
- [ ] **10.2.** Preload критичных шрифтов в [head.html](../layouts/_partials/head.html): `<link rel="preload" href="/fonts/Cuprum-Regular.woff2" as="font" type="font/woff2" crossorigin>` — только для body-шрифта, не для всех начертаний.
- [ ] **10.3.** Удалить неиспользуемые начертания. Проверить через Grep по CSS, какие `font-weight` / `font-style` реально применяются. В `static/fonts/` — Oswald, Russo One, Playfair SC, Italic-варианты — много; убрать неиспользуемые.
- [ ] **10.4.** Subset шрифтов только на кириллицу + латиницу-базу: `subset=cyrillic,latin`. Это урезает вес `.woff2` в 2–3 раза. Инструмент: `pyftsubset` или онлайн [fontsquirrel webfont generator](https://www.fontsquirrel.com/tools/webfont-generator).

## CSS/JS

- [ ] **10.5.** Проверить, что Hugo-пайплайны минифицируют `main.css` и `main.js` на продакшене: `{{ $style := resources.Get "css/main.css" | minify | fingerprint }}`. Если нет — подключить в [head/css.html](../layouts/_partials/head/css.html).
- [ ] **10.6.** Критический CSS на первый экран — inline в `<style>` в `<head>`. Остальное — асинхронно через `<link rel="preload" as="style" onload="this.rel='stylesheet'">`.
- [ ] **10.7.** `main.js` — сейчас 14 строк, всё ок. По мере добавления (маска телефона, модалка, sticky-header) держать под 5 КБ. Если вырастет — разнести на модули и грузить `defer`.
- [ ] **10.8.** `defer` на `<script>` в [head/js.html](../layouts/_partials/head/js.html) (проверить, что стоит).

## Изображения

- [ ] **10.9.** Все растровые изображения через Hugo image processing: `{{ $img := resources.Get "img/hero.jpg" }}{{ $webp := $img.Resize "1200x webp q85" }}` + `<picture>` с AVIF → WebP → JPEG.
- [ ] **10.10.** `loading="lazy"` на всех изображениях ниже первого экрана. Hero-фото — `fetchpriority="high"`.
- [ ] **10.11.** Явные `width` и `height` на всех `<img>` чтобы избежать CLS (cumulative layout shift).
- [ ] **10.12.** SVG иконки — inline (не `<img src="*.svg">`), чтобы стилизовались через CSS (`currentColor`).

## A11y

- [ ] **10.13.** `:focus-visible` стили на всех интерактивных элементах (см. [03-design-system.md:3.15](03-design-system.md)). Без них keyboard-навигация невозможна.
- [ ] **10.14.** Skip-link: первый элемент `<body>` — `<a href="#main" class="skip-link">Перейти к содержанию</a>`, скрытый визуально до фокуса.
- [ ] **10.15.** Семантика: `<main>`, `<nav aria-label>`, `<section aria-labelledby>` — проверить наличие на всех шаблонах.
- [ ] **10.16.** `aria-current="page"` на активном пункте меню (в дополнение к CSS-классу).
- [ ] **10.17.** `alt` на всех изображениях. Декоративные — `alt=""`.
- [ ] **10.18.** Контраст — проверить пары в [03-design-system.md:3.2](03-design-system.md).
- [ ] **10.19.** `prefers-reduced-motion`: обернуть все `transition`, `animation`, `scroll-behavior: smooth` в медиа-запрос, отключать при reduced-motion.
- [ ] **10.20.** Lang на всех страницах: уже стоит `lang="{{ site.Language.LanguageCode }}"` в [baseof.html:2](../layouts/baseof.html) — проверить, что выдаёт `ru`.
- [ ] **10.21.** Формы: `<label for>` на всех input'ах, `aria-describedby` на полях с подсказками (см. [07-contact-form.md:7.1](07-contact-form.md)).
- [ ] **10.22.** Таблицы (если появятся в контенте) — `<caption>`, `<th scope>`.

## HTTP и кеш

- [ ] **10.23.** Если деплой через GitHub Pages — headers контролировать не можем; если через Cloudflare Pages / Netlify — добавить `_headers`:
  - `/fonts/*` — `Cache-Control: public, max-age=31536000, immutable`
  - `/css/*`, `/js/*` с fingerprint — `immutable`
  - `/` — `max-age=0, must-revalidate`
- [ ] **10.24.** Preconnect / dns-prefetch к доменам сторонних ресурсов (Яндекс.Метрика, карты, Telegram CDN), если подключаются.

## Метрики

- [ ] **10.25.** Измерить Core Web Vitals до и после через [PageSpeed Insights](https://pagespeed.web.dev/). Цели: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- [ ] **10.26.** Настроить простую аналитику без cookies — [Plausible](https://plausible.io) self-hosted или [Umami](https://umami.is). Яндекс.Метрика — опционально, но ломает заявление про cookies в футере.

## Критерий готовности

- Lighthouse на main-странице: Performance ≥ 95, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95.
- axe DevTools (Chrome extension) — 0 issues.
- Keyboard navigation проходит всю главную без мыши, все CTA доступны.
- Все изображения имеют alt, явные размеры, lazy-load где нужно.

## Риск

Оптимизация шрифтов — самый большой потенциал для ускорения, но subset может убрать нужные символы (украинские, казахские буквы, если внезапно понадобятся). Оставить fallback `sans-serif` в `font-family`.

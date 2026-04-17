# Фаза 1 — Техническая часть `<head>` ⬜

**Цель:** привести `<head>` к современному состоянию. Влияет на SEO, превью в мессенджерах, иконку во вкладке, корректное отображение на iOS.

**Зависит от:** ничего. Можно делать первой.

## Шаги

### Viewport и базовые мета

- [ ] **1.1.** В [head.html](../layouts/_partials/head.html) заменить `<meta name="viewport" content="width=device-width">` на `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
- [ ] **1.2.** Добавить `<meta name="theme-color" content="#495867">` (совпадает с `--sea-slate`; актуально для мобильного Chrome и PWA).
- [ ] **1.3.** Добавить `<meta name="format-detection" content="telephone=no">` — отключаем авто-распознавание номеров iOS (у нас есть свой `tel:`-линк).

### Favicon-набор

- [ ] **1.4.** Сгенерировать набор: `favicon.ico` (32×32), `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png`, `safari-pinned-tab.svg`, `site.webmanifest`.
- [ ] **1.5.** Положить в `static/` (Hugo копирует корнем).
- [ ] **1.6.** Прописать ссылки в `head.html`.

### OpenGraph + Twitter Card

- [ ] **1.7.** В `head.html` добавить: `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`, `og:locale = ru_RU`, `twitter:card = summary_large_image`.
- [ ] **1.8.** `og:image` по умолчанию — `static/og-default.jpg` (1200×630, название сайта + телефон + фото/логотип). На страницах услуг можно переопределять через front-matter параметр `image`.

### Canonical

- [ ] **1.9.** Добавить `<link rel="canonical" href="{{ .Permalink }}">`.

### Уборка

- [ ] **1.10.** Убрать из [footer.html](../layouts/_partials/footer.html) блок «Генерация sitemap: …» и `len .Site.RegularPages` — это служебная информация, не для прод-футера.
- [ ] **1.11.** Перенести ссылку на sitemap.xml в `<link rel="sitemap" …>` в `<head>`.
- [ ] **1.12.** Пересмотреть строку «Сайт не использует Cookie…» — после появления формы и возможных Яндекс.Метрика/Карт это станет неправдой (см. решение 5, 10 из [00-decisions.md](00-decisions.md)).

## Критерий готовности

- Lighthouse не ругается на viewport и favicon.
- При шаринге ссылки в Telegram/WhatsApp появляется превью с картинкой.
- `view-source:` содержит canonical, OG-теги, apple-touch-icon.

## Риск

При добавлении `viewport-fit=cover` и `theme-color` на iPhone меняется поведение safe-area. Если после изменения появятся обрезания контента — добавить `padding: env(safe-area-inset-*)` в `.container`.

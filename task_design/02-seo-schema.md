# Фаза 2 — SEO и Schema.org ⬜

**Цель:** разметить сайт структурированными данными. Для локального юриста это даёт прирост в выдаче Яндекса и Google, plus rich snippets (рейтинг, телефон, часы прямо в выдаче).

**Зависит от:** [00-decisions.md](00-decisions.md) (реш. 10, 11 — адрес и часы работы).

## Шаги

### LegalService / Attorney (главная и сквозная)

- [ ] **2.1.** Создать `layouts/_partials/schema/legal-service.html` с JSON-LD:
  - `@type: LegalService`, `name`, `description`, `url`, `telephone`, `image`, `priceRange`.
  - `address: PostalAddress` — если есть офис (реш. 10).
  - `openingHoursSpecification` — из реш. 11.
  - `areaServed` — город/регион приёма.
  - `sameAs` — ссылки на профили (2ГИС, Яндекс.Карты, соцсети).
- [ ] **2.2.** Подключить на главной (в [home.html](../layouts/home.html)) и в футере через [head.html](../layouts/_partials/head.html) — решить, где именно (обычно достаточно только на главной).

### BreadcrumbList

- [ ] **2.3.** Обновить [breadcrumbs.html](../layouts/_partials/breadcrumbs.html) — дописать JSON-LD рядом с визуальной разметкой.
- [ ] **2.4.** Проверить через [validator.schema.org](https://validator.schema.org) и Яндекс.Вебмастер.

### Article для контентных страниц

- [ ] **2.5.** На страницах разделов/статей добавить `@type: Article` с `author`, `datePublished`, `dateModified`, `headline`, `image`.
- [ ] **2.6.** Источник данных — front-matter текущих `.md`.

### FAQPage

- [ ] **2.7.** Для страниц, где есть блок «Частые вопросы» (если добавим), разметить `@type: FAQPage`. Отдельный shortcode `{{< faq >}}`.

### Техническое SEO

- [ ] **2.8.** Убрать `<time>` из [page.html:11](../layouts/page.html) для страниц-услуг — дата создаёт впечатление устаревания. Оставить только для типа `post` / `blog` (если появится).
- [ ] **2.9.** Проверить и при необходимости сгенерировать `robots.txt` (у нас `enableRobotsTXT = true` — но шаблона нет). Добавить `Sitemap:` и `Host:`.
- [ ] **2.10.** Title-формула в [head.html:3](../layouts/_partials/head.html) — добавить город: `{{ .Title }} | Юрист в <Город> | {{ site.Title }}`. Решить, где брать название города (site.Params).
- [ ] **2.11.** `meta description` — проверить, что [head/description.html](../layouts/_partials/head/description.html) даёт осмысленный fallback на главной и разделах.

## Критерий готовности

- Яндекс.Вебмастер → «Микроразметка» показывает `LegalService` без ошибок.
- Google Rich Results Test зелёный для главной и одной карточки услуги.
- В выдаче по брендовому запросу появляется телефон и часы работы (проверяется через месяц).

## Риск

JSON-LD с неверными данными (например, `address` без улицы, когда офиса нет) Google может проигнорировать всю разметку. Если офиса нет — использовать `LegalService` без `address`, а `areaServed` указать как регион обслуживания.

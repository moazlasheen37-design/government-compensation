# الصندوق الحكومي — Official Website

Bilingual (Arabic RTL / English LTR) website for the Government Fund for Covering Damages Resulting from Rapid Transport Vehicle Accidents. Built with React 18, Vite 5 and React Router 6.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

**Deployment:** this is a single-page app. The host must serve `index.html` for every route (SPA fallback). Otherwise, reloading a page such as `/news` returns a 404.

## QA scripts

These scripts need Microsoft Edge installed (it is used through `playwright-core`). Start the dev server first.

```bash
npm run qa:layout     # all routes × AR/EN × 7 widths: console errors, failed requests, horizontal overflow, screenshots → qa-shots/
npm run qa:interact   # 32 interaction checks (nav, dropdowns, language, font size, search, filters, forms, mobile menu)
```

## Structure

```
src/
  assets/brand/       official logo (logo.jpg original, logo.png transparent background, logo.webp optimised)
  assets/images/      interim photography (see "Assets" below)
  components/
    common/           Icon, Button, SectionHeading, PageHero, Breadcrumbs, PendingTag, SearchField, FilterChips, Pagination…
    layout/           UtilityBar, MainHeader, SearchOverlay, MainFooter, BackToTop
    navigation/       DesktopNavigation, MobileNavigation
    cards/            ServiceCard, CoverageCard, NewsCard, DocumentCard, ContactCard, Portrait
    sections/         ProcessSteps, Timeline, FAQAccordion, CTABanner
    forms/            ComplaintForm, ContactForm, FileDrop, shared validation hook
  context/            LanguageContext (t / pick / L / formatDate), AccessibilityContext (font scale)
  data/               ALL content — site, coverage, procedures, news, documents, faq, board
  i18n/               ar.js / en.js UI dictionaries
  pages/              one folder per route
  routes/             route table (inner pages are code-split)
  styles/             tokens.css (design tokens) → base → layout → components → pages
  utils/              api (submission service), validation, Arabic-aware search, search index
```

## Content management

All content lives in `src/data/*.js` as bilingual `{ ar, en }` objects, so it can later be loaded from a CMS or API without changing components.

The site does not invent official information. Where official content was missing:

- the item is flagged in data (`pending: true` or `sample: true`)
- it shows a visible gold **"بانتظار المحتوى الرسمي"** tag, or a blue **"محتوى تجريبي"** tag for sample news

| To publish… | Edit | How |
|---|---|---|
| Official PDFs | `data/documents.js` + `public/documents/` | Laws, forms and board decisions downloaded from iaf.gov.eg. An entry with `file: null` shows its title without a download button. |
| Board members | `data/board.js` | Set `name`, `position`, `bio`, `photo` (an imported image), `pending: false`. |
| News | `data/news.js` | Official items from iaf.gov.eg with their original dates. Images live in `public/images/news`. |
| FAQ answers | `data/faq.js` | Replace `a`, remove `pending: true`. |
| Social links | `data/site.js` → `SOCIAL` | Set `url`. Icons stay non-clickable until then. |
| Address / hours | `data/site.js` → `CONTACT` | Fill in the fields. Contact page placeholders read from here. |

## Forms

The complaint, inquiry and contact forms validate on the client: required fields, Egyptian phone format (Arabic-Indic digits are accepted), email format, minimum lengths, and attachment type, size and count.

No backend is connected. On submit, the form tells the user plainly that the request was **not stored or sent**. It then offers a pre-filled email to `info@iaf.gov.eg` and the Fund's official phone number.

To connect a backend, set `VITE_API_URL` in `.env`. `src/utils/api.js` will then POST `multipart/form-data` to `${VITE_API_URL}/requests`.

## Assets

The official logo is used unaltered. `logo.png` is the supplied JPG with only its outer white background made transparent, so it can sit on the navy footer. `logo.webp` is a resized copy.

The photographs in `assets/images/` are **interim crops of the approved homepage concept**, upscaled from low resolution. Replace them with high-resolution originals under the same file names. `scripts/prepare-assets.cjs` documents how they were produced.

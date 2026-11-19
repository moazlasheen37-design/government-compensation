// Interaction smoke tests for key behaviours.
// Usage: node scripts/interact.mjs http://localhost:5173
import { chromium } from 'playwright-core';

const base = process.argv[2] || 'http://localhost:5173';
const b = await chromium.launch({ channel: 'msedge' });
const results = [];
const check = (name, ok, extra = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name} ${extra}`);
const errs = [];
const watch = (p) => {
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
};

// ---------- Desktop ----------
let ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let p = await ctx.newPage();
watch(p);
await p.goto(base + '/', { waitUntil: 'networkidle' });
const hrefs = await p.$$eval('header a[href^="/"], footer a[href^="/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
const bad = [];
for (const h of hrefs) {
  await p.goto(base + h, { waitUntil: 'networkidle' });
  if (await p.$('.not-found')) bad.push(h);
}
check(`all ${hrefs.length} header/footer links resolve`, bad.length === 0, bad.join(','));
check('no link to the removed forms page', !hrefs.some((h) => h.includes('forms-documents')));

await p.goto(base + '/news', { waitUntil: 'networkidle' });
check('active nav item on /news', (await p.$eval('.desk-nav a.active', (a) => a.textContent)) === 'الأخبار');

await p.goto(base + '/', { waitUntil: 'networkidle' });
const navLabels = await p.$$eval('.desk-nav__list > li > .desk-nav__link', (els) => els.map((e) => e.textContent.trim()));
check('8 main navigation items', navLabels.length === 8, navLabels.join(' | '));
await p.locator('.desk-nav__item.has-menu button').first().click();
await p.waitForTimeout(350);
check('dropdown opens on click', await p.locator('.desk-nav__item.is-open .desk-nav__menu-link').first().isVisible());
await p.keyboard.press('Escape');
check('dropdown closes on Escape', !(await p.$('.desk-nav__item.is-open')));

check('header has no search button', (await p.locator('.site-header__actions .icon-btn:not(.site-header__burger)').count()) === 0);
check('header shows logo only (no brand text)', !(await p.$('.brand__text')));
const homeBlocks = await p.$$eval('main > *', (els) => els.map((e) => e.className));
check(
  'homepage: hero, about, chairman, news, CTA',
  homeBlocks.length === 5 && /home-hero/.test(homeBlocks[0]) && /home-about/.test(homeBlocks[1]) && /home-chair/.test(homeBlocks[2]) && /home-news/.test(homeBlocks[3]) && !!(await p.$('main .cta-banner')),
  homeBlocks.join(' | '),
);
check('homepage has no FAQ / steps / coverage', !(await p.$('.home-faq, .quick-access, .home-coverage, .process-band')));
const footerCols = await p.$$eval('.site-footer__col h2', (els) => els.map((e) => e.textContent.trim()));
check('footer: no legal column', !footerCols.includes('معلومات قانونية'), footerCols.join(' | '));
check('footer: only Facebook and X under Contact', (await p.locator('.site-footer__contact .social li').count()) === 2);

await p.click('.utility-bar .lang-switch');
const dirEn = await p.evaluate(() => [document.documentElement.dir, document.documentElement.lang].join());
const navEn = await p.locator('.desk-nav__link').first().textContent();
check('language → EN sets ltr/en and translates nav', dirEn === 'ltr,en' && navEn === 'Home', `${dirEn} ${navEn}`);
await p.reload({ waitUntil: 'networkidle' });
check('language persists after reload', (await p.evaluate(() => document.documentElement.lang)) === 'en');
await p.click('.utility-bar .lang-switch');
check('language → AR restores rtl', (await p.evaluate(() => document.documentElement.dir)) === 'rtl');

const fs0 = await p.evaluate(() => getComputedStyle(document.documentElement).fontSize);
await p.locator('.utility-bar .font-tools button').nth(2).click();
const fs1 = await p.evaluate(() => getComputedStyle(document.documentElement).fontSize);
check('font size increase', parseFloat(fs1) > parseFloat(fs0), `${fs0} → ${fs1}`);
await p.locator('.utility-bar .font-tools button').nth(1).click();

check('static hero: no slider dots or pause button', !(await p.$('.home-hero__dots, .home-hero__pause, .home-hero__progress')));
const newsCols = await p.$eval('.home-news .news-grid', (g) => getComputedStyle(g).gridTemplateColumns.split(' ').length);
check('home news: 3 columns on desktop', newsCols === 3, String(newsCols));

// Compensation procedures
await p.goto(base + '/compensation-procedures', { waitUntil: 'networkidle' });
check('procedures: no section menu below hero', !(await p.$('.anchor-nav')));
check('procedures: 5 eligibility cases', (await p.locator('.elig-card').count()) === 5);
check('procedures: 3 document groups', (await p.locator('.doc-group').count()) === 3);
const formLinks = await p.$$eval('#documents a[download]', (as) => as.map((a) => a.getAttribute('href')));
check('procedures: 2 official form downloads', formLinks.length === 2, formLinks.join(','));
for (const href of formLinks) {
  const r = await p.request.get(base + href);
  check(`form file served ${href}`, r.ok() && (r.headers()['content-type'] || '').includes('msword'));
}
const acc = p.locator('#faq .accordion__trigger').nth(1);
await acc.click();
check('accordion expands', (await acc.getAttribute('aria-expanded')) === 'true');

await p.goto(base + '/forms-documents', { waitUntil: 'networkidle' });
check('old forms URL redirects to procedures', p.url().includes('/compensation-procedures'));

await p.goto(base + '/coverage-cases', { waitUntil: 'networkidle' });
check('coverage: tab menu removed', !(await p.$('.case-tabs')));
check('coverage: 3 case sections kept', (await p.locator('.case-section').count()) === 3);

// News
await p.goto(base + '/news', { waitUntil: 'networkidle' });
check('news: no category tabs or filters', !(await p.$('.chips, .toolbar, #news-search')));
check('news: official items listed', (await p.locator('.news-grid .news-card').count()) === 5);
await p.goto(base + '/news/disbursement-of-2024-settlements', { waitUntil: 'networkidle' });
check('news details renders + related', (await p.locator('.news-grid .news-card').count()) === 3);
await p.goto(base + '/news/does-not-exist', { waitUntil: 'networkidle' });
check('unknown news slug → 404', !!(await p.$('.not-found')));

// Laws
await p.goto(base + '/laws-and-regulations', { waitUntil: 'networkidle' });
check('laws: no tabs / filters', !(await p.$('.chips, .legal-cats, .toolbar')));
check('laws: 10 documents in 2 groups', (await p.locator('.doc-rows .doc-card').count()) === 10 && (await p.locator('.doc-group-list').count()) === 2);
const lawLinks = await p.$$eval('a[download]', (as) => as.map((a) => a.getAttribute('href')));
let lawBad = [];
for (const href of lawLinks) {
  const r = await p.request.get(base + href);
  if (!r.ok() || !(r.headers()['content-type'] || '').includes('pdf')) lawBad.push(href);
}
check(`laws: ${lawLinks.length} PDF downloads served`, lawLinks.length === 9 && lawBad.length === 0, lawBad.join(','));

// Board
await p.goto(base + '/board-of-directors', { waitUntil: 'networkidle' });
check('board: no overview section', !(await p.$('.board-overview')));
check('board: 6 composition entries', (await p.locator('.member').count()) === 6);
check('board: 9 decision downloads', (await p.locator('.board-docs a[download]').count()) === 9);

await p.goto(base + '/faq', { waitUntil: 'networkidle' });
await p.locator('.faq-cats button', { hasText: 'حالات الاستحقاق' }).click();
check('faq category filter', (await p.locator('.faq-group').count()) === 1);

await p.goto(base + '/complaints', { waitUntil: 'networkidle' });
await p.click('.form button[type=submit]');
const nErr = await p.locator('.field__error').count();
check('complaint form shows required errors', nErr >= 5, `(${nErr})`);
check('first invalid field focused', (await p.evaluate(() => document.activeElement?.name)) === 'fullName');
for (const n of ['nationalId', 'address', 'submissionDate']) check(`complaint field present: ${n}`, !!(await p.$(`[name=${n}]`)));
await p.fill('[name=fullName]', 'محمد أحمد');
await p.fill('[name=nationalId]', '12345');
await p.locator('[name=address]').focus();
check('invalid national ID message', ((await p.locator('.has-error .field__error').allTextContents()).join()).includes('الرقم القومي') || (await p.locator('.has-error .field__error').allTextContents()).join().includes('14'));
await p.fill('[name=nationalId]', '29801011234567');
await p.fill('[name=address]', '20 شارع عماد الدين، القاهرة');
await p.fill('[name=phone]', '123');
await p.locator('[name=subject]').focus();
check('invalid phone message', ((await p.locator('.has-error .field__error').first().textContent()) || '').includes('هاتف'));
await p.fill('[name=phone]', '01012345678');
await p.fill('[name=subject]', 'تأخر الرد على الطلب');
await p.fill('[name=details]', 'تقدمت بطلب تعويض منذ فترة ولم أتلق ردًا حتى الآن، أرجو المتابعة.');
await p.setInputFiles('#complaint-attachments', { name: 'test.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4') });
check('attachment listed', (await p.locator('.file-list li').count()) === 1);
await p.setInputFiles('#complaint-attachments', { name: 'bad.exe', mimeType: 'application/x-msdownload', buffer: Buffer.from('x') });
check('bad attachment rejected', await p.isVisible('.file-drop__errors'));
await p.check('[name=consent]', { force: true });
await p.click('.form button[type=submit]');
await p.waitForSelector('.submit-result', { timeout: 3000 });
const mailto = await p.getAttribute('.submit-result a.btn', 'href');
check('honest not-connected result + mailto fallback', (await p.isVisible('.submit-result--info')) && mailto.startsWith('mailto:info@iaf.gov.eg'));
await p.locator('.seg-tabs__tab').nth(1).click();
check('inquiry tab switches form', (await p.$eval('[name=requestType]', (s) => s.value)) === 'inquiry');

await p.goto(base + '/contact', { waitUntil: 'networkidle' });
await p.fill('[name=email]', 'bad@');
await p.click('.form button[type=submit]');
check('contact form email validation', (await p.locator('.field__error').allTextContents()).join().includes('بريد'));
check('official phone link present', !!(await p.$('a[href="tel:+20225775739"]')));
check('Tanta branch listed', (await p.textContent('main')).includes('طنطا'));
await ctx.close();

// ---------- Mobile ----------
ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
p = await ctx.newPage();
watch(p);
await p.goto(base + '/', { waitUntil: 'networkidle' });
await p.click('.site-header__burger');
await p.waitForTimeout(500);
check('mobile menu opens', await p.isVisible('.mobile-nav.is-open .mobile-nav__panel'));
await p.locator('.mobile-nav__list button').first().click();
await p.waitForTimeout(350);
await p.locator('.mobile-nav__sub a', { hasText: 'اتصل بنا' }).click();
await p.waitForURL('**/contact');
await p.waitForTimeout(500);
check('mobile submenu navigates & closes', !(await p.$('.mobile-nav.is-open')));
await p.click('.site-header__burger');
await p.waitForTimeout(400);
await p.keyboard.press('Escape');
await p.waitForTimeout(400);
check('mobile menu closes on Escape', !(await p.$('.mobile-nav.is-open')));
await ctx.close();
await b.close();

console.log(results.join('\n'));
console.log(errs.length ? 'RUNTIME ERRORS:\n' + errs.join('\n') : 'No runtime errors');

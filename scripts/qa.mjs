// QA: visits every route at multiple widths in AR and EN, captures screenshots,
// console errors, failed requests, and horizontal overflow.
// Usage: node scripts/qa.mjs <baseUrl> <outDir> [widths] [routes]
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] || 'http://localhost:5173';
const out = process.argv[3] || 'qa-shots';
const widths = (process.argv[4] || '1440,390').split(',').map(Number);
const routes = (process.argv[5] || '/,/about,/compensation-procedures,/coverage-cases,/laws-and-regulations,/board-of-directors,/news,/news/disbursement-of-2024-settlements,/complaints,/contact,/faq,/missing-page').split(',');
const langs = (process.env.LANGS || 'ar,en').split(',');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge' });
const report = [];
for (const lang of langs) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    await ctx.addInitScript((l) => localStorage.setItem('iaf-lang', l), lang);
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('requestfailed', (r) => errors.push('REQFAIL ' + r.url()));
    for (const r of routes) {
      errors.length = 0;
      await page.goto(base + r, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
      await page.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible')));
      await page.waitForTimeout(250);
      const overflow = await page.evaluate(() => {
        const dw = document.documentElement.clientWidth;
        const bad = [];
        document.querySelectorAll('body *').forEach((el) => {
          const rc = el.getBoundingClientRect();
          if (rc.width && (rc.right > dw + 1 || rc.left < -1) && getComputedStyle(el).position !== 'fixed') {
            let p = el.parentElement, clipped = false;
            while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o !== 'visible') { clipped = true; break; } p = p.parentElement; }
            if (!clipped) bad.push(`${el.tagName}.${(el.className && el.className.baseVal === undefined ? el.className : '').toString().slice(0, 40)} [${Math.round(rc.left)},${Math.round(rc.right)}]`);
          }
        });
        return { scrollW: document.documentElement.scrollWidth, dw, bad: bad.slice(0, 6) };
      });
      const name = `${lang}-${w}-${r === '/' ? 'home' : r.slice(1).replace(/\//g, '_')}.png`;
      if (!process.env.NOSHOT) await page.screenshot({ path: path.join(out, name), fullPage: true });
      report.push({ lang, w, r, errors: [...errors], overflow: overflow.scrollW > overflow.dw ? overflow : null, bad: overflow.bad });
    }
    await ctx.close();
  }
}
await browser.close();
for (const x of report) {
  const issues = [];
  if (x.errors.length) issues.push('ERR: ' + x.errors.join(' | ').slice(0, 400));
  if (x.overflow) issues.push(`OVERFLOW scrollW=${x.overflow.scrollW} > ${x.overflow.dw}`);
  if (x.bad.length) issues.push('OUTSIDE: ' + x.bad.join('; '));
  console.log(`${x.lang} ${x.w} ${x.r} ${issues.length ? '\n   ' + issues.join('\n   ') : 'OK'}`);
}

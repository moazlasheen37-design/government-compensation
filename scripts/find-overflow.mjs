import { chromium } from 'playwright-core';
const [,, url, w, lang] = process.argv;
const b = await chromium.launch({ channel: 'msedge' });
const ctx = await b.newContext({ viewport: { width: +w, height: 900 } });
await ctx.addInitScript((l) => localStorage.setItem('iaf-lang', l), lang);
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
console.log(await p.evaluate(() => {
  const dw = document.documentElement.clientWidth; const r = [];
  document.querySelectorAll('body *').forEach((el) => { const rc = el.getBoundingClientRect(); if (rc.right > dw + 1 || rc.left < -1) r.push(el.tagName + '.' + String(el.className.baseVal ?? el.className).slice(0, 50) + ' ' + Math.round(rc.left) + '..' + Math.round(rc.right)); });
  return r.filter((x) => !x.includes('mobile-nav')).slice(0, 15).join('\n');
}));
await b.close();

// One-off asset preparation: crops interim photography from the approved concept
// and creates a transparent-background copy of the official logo (corner flood-fill only).
const sharp = require('sharp');
const path = require('path');
const out = (f) => path.join(__dirname, '..', 'src', 'assets', 'images', f);
const crops = {
  'hero-accident.jpg': [14, 162, 420, 198],
  'building.jpg': [46, 530, 400, 152],
  'case-death.jpg': [40, 750, 100, 118],
  'case-disability.jpg': [335, 750, 100, 118],
  'case-medical.jpg': [630, 750, 100, 118],
  'news-highway.jpg': [38, 1122, 166, 62],
  'news-meeting.jpg': [223, 1122, 166, 62],
  'news-signing.jpg': [409, 1122, 166, 62],
  'contact-headset.jpg': [32, 1322, 140, 172],
};
(async () => {
  for (const [name, [left, top, width, height]] of Object.entries(crops)) {
    await sharp(path.join(__dirname, 'concept.png'))
      .extract({ left, top, width, height })
      .resize({ width: width * 2.5, kernel: 'lanczos3' })
      .sharpen({ sigma: 0.8 })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(out(name));
    console.log('wrote', name);
  }
  // Transparent logo: flood-fill near-white from the image border only.
  const src = path.join(__dirname, '..', 'src', 'assets', 'brand', 'logo.jpg');
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const seen = new Uint8Array(W * H);
  const isBg = (i) => data[i * 4] > 232 && data[i * 4 + 1] > 232 && data[i * 4 + 2] > 232;
  const stack = [];
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p] || !isBg(p)) continue;
    seen[p] = 1;
    data[p * 4 + 3] = 0;
    const x = p % W, y = (p / W) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < W - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - W);
    if (y < H - 1) stack.push(p + W);
  }
  // soften the edge: semi-transparent for light pixels adjacent to removed area
  await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '..', 'src', 'assets', 'brand', 'logo.png'));
  console.log('wrote logo.png');
})();

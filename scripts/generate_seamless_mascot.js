import sharp from 'sharp';

async function generateSeamlessCleanMascot() {
  // We extract from hero_bg_banner.jpg
  // Emblem starts at x=540, so let's start at x=480
  const left = 480;
  const top = 0;
  const width = 1024 - left; // 544px wide
  const height = 534;

  const { data, info } = await sharp('public/hero_bg_banner.jpg')
    .extract({ left, top, width, height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const rgba = Buffer.alloc(w * h * 4);

  // In this crop:
  // x=0 corresponds to x=480 of hero_bg_banner.jpg.
  // The 3D emblem starts around x = 540 - 480 = 60.
  // So for x from 0 to 55, we can smoothly fade in from alpha 0 to alpha 255!
  // At the bottom: y=487 is the baseline.
  // For y >= 487, background is pure white (r >= 248, g >= 248, b >= 248).
  // The legs are yellow/amber/brown/grey (not white).

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sIdx = (y * w + x) * 3;
      const dIdx = (y * w + x) * 4;
      const r = data[sIdx], g = data[sIdx + 1], b = data[sIdx + 2];

      rgba[dIdx] = r;
      rgba[dIdx + 1] = g;
      rgba[dIdx + 2] = b;

      let a = 255;

      // 1. Smooth fade on the left edge (x from 0 to 50)
      if (x < 50 && y < 487) {
        a = Math.round(255 * (x / 50));
      }

      // 2. Below y=487: pure white background keyed out cleanly
      if (y >= 487) {
        if (r >= 249 && g >= 249 && b >= 249) {
          a = 0; // Pure white background is transparent
        } else if (r >= 240 && g >= 240 && b >= 240) {
          // Soft edge for subtle shadow
          const maxVal = Math.max(r, g, b);
          a = Math.round((255 - maxVal) * (255 / 15));
        } else {
          // 100% solid untouched chicken leg/claw/toe/shank!
          a = 255;
        }
      }

      rgba[dIdx + 3] = a;
    }
  }

  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/hero_mascot_seamless.png');

  console.log(`Saved public/hero_mascot_seamless.png (${w}x${h})`);
}

generateSeamlessCleanMascot().catch(console.error);

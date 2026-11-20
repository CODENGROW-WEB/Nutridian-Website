import sharp from 'sharp';

async function removeHeroBg() {
  const left = 520, top = 0, width = 504, height = 534;
  const { data, info } = await sharp('public/hero_bg_banner.jpg')
    .extract({ left, top, width, height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const alpha = new Uint8Array(w * h);
  alpha.fill(255); // start opaque

  function isSubjectPixel(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return false;
    const idx = (y * w + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // 1. Red 3D Emblem and Comb (Red colors)
    // Red comb and outer emblem ring have strong red, low green and blue
    if (r > 160 && g < 100 && b < 90) {
      return true;
    }

    // 2. 3D Orange Emblem block / bevel
    // The left block of the 3D 'N' is between x=22 and x=115, y=55 and y=390
    if (x >= 20 && x <= 120 && y >= 55 && y <= 390) {
      // Orange 3D block has high R (180-255), medium G (50-140), low B (< 60)
      if (r > 180 && g >= 40 && g <= 145 && b < 60) {
        return true;
      }
    }

    // 3. Orange/Yellow Emblem inner sunburst
    // Only inside the emblem arc: x between 80 and 460, y between 60 and 400
    if (x >= 80 && x <= 460 && y >= 60 && y <= 400) {
      // Golden orange interior of the emblem: R > 210, G: 100-175, B < 65
      if (r > 210 && g >= 95 && g <= 175 && b < 65) {
        return true;
      }
    }

    // 4. White / Grey Chickens Feathers & Bodies
    // Rooster is roughly x: 50 to 250, y: 120 to 420
    // Hen is roughly x: 180 to 450, y: 180 to 460
    if (x >= 50 && x <= 455 && y >= 100 && y <= 470) {
      // White feathers: high lightness and high blue relative to peach
      if (r > 165 && g > 165 && b > 160 && Math.abs(r - b) < 60) {
        return true;
      }
      // Feather shadow (grey/neutral):
      if (r > 110 && g > 110 && b > 110 && Math.abs(r - g) < 22 && Math.abs(g - b) < 22 && Math.abs(r - b) < 22) {
        return true;
      }
      // Eyes, dark beak details
      if (r < 100 && g < 100 && b < 100) {
        return true;
      }
    }

    // 5. Chicken Legs, Feet, Claws & Toes
    // Feet are strictly located at x: 90 to 410, y: 360 to 520
    if (x >= 90 && x <= 410 && y >= 360 && y <= 520) {
      // Yellow shanks and toes: R > 160, G: 110-210, B: 30-110, (r - b > 80)
      if (r > 160 && g >= 110 && g <= 210 && b <= 120 && (r - b) > 60) {
        return true;
      }
      // Shaded / joint areas of the claws
      if (r > 120 && g >= 80 && g <= 160 && b <= 90 && (r - b) > 40) {
        return true;
      }
      // Feet ground contact shadow and subtle reflection directly under the claws
      if (y >= 490 && y <= 525) {
        // Soft contact shadow: darker than pure white floor (avg < 245) and not peach
        const avg = (r + g + b) / 3;
        if (avg < 244 && (r - b) > 15) {
          return true;
        }
      }
    }

    return false;
  }

  // Determine alpha for each pixel:
  // We can do a dual approach:
  // 1) Mark subject pixels
  // 2) Flood-fill background from edges to clear everything outside the subject
  const isSubject = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (isSubjectPixel(x, y)) {
        isSubject[y * w + x] = 1;
      }
    }
  }

  // Flood fill background from the image borders
  const isBg = new Uint8Array(w * h);
  const queue = [];

  // Seed entire perimeter (top, bottom, left, right)
  for (let x = 0; x < w; x++) {
    if (!isSubject[0 * w + x]) { isBg[0 * w + x] = 1; queue.push(x, 0); }
    if (!isSubject[(h - 1) * w + x]) { isBg[(h - 1) * w + x] = 1; queue.push(x, h - 1); }
  }
  for (let y = 0; y < h; y++) {
    if (!isSubject[y * w + 0]) { isBg[y * w + 0] = 1; queue.push(0, y); }
    if (!isSubject[y * w + (w - 1)]) { isBg[y * w + (w - 1)] = 1; queue.push(w - 1, y); }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy], [cx - 1, cy],
      [cx, cy + 1], [cx, cy - 1]
    ];
    for (let [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nidx = ny * w + nx;
        if (!isBg[nidx] && !isSubject[nidx]) {
          isBg[nidx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  console.log(`Flood fill reached ${head / 2} background pixels out of ${w * h}`);

  // Refine alpha:
  // If isBg is true -> alpha 0
  // If isSubject is true -> alpha 255
  // Edge anti-aliasing feathering (1-2px)
  const finalAlpha = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (isBg[idx]) {
        finalAlpha[idx] = 0;
      } else {
        // Check distance to nearest background pixel for 1.5px anti-aliasing
        let bgCount = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy, nx = x + dx;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              if (isBg[ny * w + nx]) bgCount++;
            }
          }
        }
        if (bgCount > 0) {
          finalAlpha[idx] = Math.max(30, Math.round(255 * (1 - bgCount / 10)));
        } else {
          finalAlpha[idx] = 255;
        }
      }
    }
  }

  // Build RGBA output buffer
  const rgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sIdx = (y * w + x) * 3;
      const dIdx = (y * w + x) * 4;
      rgba[dIdx] = data[sIdx];
      rgba[dIdx + 1] = data[sIdx + 1];
      rgba[dIdx + 2] = data[sIdx + 2];
      rgba[dIdx + 3] = finalAlpha[y * w + x];
    }
  }

  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/hero_chicken_transparent.png');

  console.log('Saved refined public/hero_chicken_transparent.png');
}

removeHeroBg().catch(console.error);

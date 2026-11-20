import sharp from 'sharp';

async function generateCleanCutout() {
  const left = 520, top = 0, width = 504, height = 534;
  const { data, info } = await sharp('public/hero_bg_banner.jpg')
    .extract({ left, top, width, height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  // 1. Calculate minX and maxX for each row y
  const minX = new Int32Array(h);
  const maxX = new Int32Array(h);
  minX.fill(-1);
  maxX.fill(-1);

  function isBackground(r, g, b, y) {
    if (y < 485) {
      // Peach background
      // R: 235-255, G: 165-225, B: 105-175, with |r - b| > 60 and |r - g| < 75
      if (r >= 235 && g >= 165 && g <= 225 && b >= 105 && b <= 175 && (r - g) < 75) {
        return true;
      }
      return false;
    } else {
      // White floor
      if (r >= 248 && g >= 248 && b >= 245) return true;
      // Also peach background that might touch near bottom
      if (r >= 235 && g >= 165 && b >= 105 && b <= 175 && (r - g) < 75) return true;
      return false;
    }
  }

  for (let y = 0; y < h; y++) {
    // If y is clearly above comb/emblem or below feet:
    if (y < 58 || y > 522) {
      continue;
    }

    // Find minX from left
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (!isBackground(r, g, b, y)) {
        minX[y] = x;
        break;
      }
    }

    // Find maxX from right
    for (let x = w - 1; x >= 0; x--) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (!isBackground(r, g, b, y)) {
        maxX[y] = x;
        break;
      }
    }
  }

  // Smooth the boundary curves so there are no 1px jitter artifacts
  const smoothMinX = new Float32Array(h);
  const smoothMaxX = new Float32Array(h);

  for (let y = 58; y <= 522; y++) {
    let sumMin = 0, countMin = 0;
    let sumMax = 0, countMax = 0;
    for (let dy = -2; dy <= 2; dy++) {
      const ny = y + dy;
      if (ny >= 58 && ny <= 522) {
        if (minX[ny] !== -1) { sumMin += minX[ny]; countMin++; }
        if (maxX[ny] !== -1) { sumMax += maxX[ny]; countMax++; }
      }
    }
    smoothMinX[y] = countMin > 0 ? sumMin / countMin : minX[y];
    smoothMaxX[y] = countMax > 0 ? sumMax / countMax : maxX[y];
  }

  const alpha = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    if (y < 58 || y > 522) {
      // Row is completely transparent
      continue;
    }

    const curMin = smoothMinX[y];
    const curMax = smoothMaxX[y];

    if (curMin === -1 || curMax === -1 || curMin > curMax) {
      continue;
    }

    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];

      // Outside horizontal boundary
      if (x < curMin - 1 || x > curMax + 1) {
        continue;
      }

      // Smooth left edge
      let edgeAlpha = 255;
      if (x < curMin + 1) {
        edgeAlpha = Math.round(255 * Math.max(0, Math.min(1, (x - (curMin - 1)) / 2)));
      }
      // Smooth right edge
      if (x > curMax - 1) {
        edgeAlpha = Math.min(edgeAlpha, Math.round(255 * Math.max(0, Math.min(1, ((curMax + 1) - x) / 2))));
      }

      // Smooth top edge (y near 58)
      if (y < 61) {
        edgeAlpha = Math.min(edgeAlpha, Math.round(255 * ((y - 57) / 4)));
      }
      // Smooth bottom edge (y near 522)
      if (y > 519) {
        edgeAlpha = Math.min(edgeAlpha, Math.round(255 * ((523 - y) / 4)));
      }

      // If at bottom floor (y >= 490):
      // If pixel is pure white floor inside the boundary, fade it smoothly so the feet sit naturally
      if (y >= 490) {
        if (r >= 250 && g >= 250 && b >= 248) {
          // Pure white floor between toes: make transparent
          edgeAlpha = 0;
        } else if (r >= 242 && g >= 242 && b >= 240) {
          // Very faint floor reflection
          edgeAlpha = Math.min(edgeAlpha, Math.round(180 * (250 - ((r + g + b) / 3)) / 8));
        }
      }

      alpha[y * w + x] = edgeAlpha;
    }
  }

  // Build RGBA output
  const rgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sIdx = (y * w + x) * 3;
      const dIdx = (y * w + x) * 4;
      rgba[dIdx] = data[sIdx];
      rgba[dIdx + 1] = data[sIdx + 1];
      rgba[dIdx + 2] = data[sIdx + 2];
      rgba[dIdx + 3] = alpha[y * w + x];
    }
  }

  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/hero_chicken_clean_cutout.png');

  console.log('Saved public/hero_chicken_clean_cutout.png successfully!');
}

generateCleanCutout().catch(console.error);

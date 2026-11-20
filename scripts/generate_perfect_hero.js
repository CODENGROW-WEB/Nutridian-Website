import sharp from 'sharp';

async function generatePerfectHeroCutout() {
  const left = 520, top = 0, width = 504, height = 534;
  const { data, info } = await sharp('public/hero_bg_banner.jpg')
    .extract({ left, top, width, height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  function isSubjectPixel(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return false;
    const idx = (y * w + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];

    if (y < 58 || y > 522) return false;

    // 1. Rooster & Hen Comb / Wattles (Red)
    if (y < 260 && r > 160 && g < 85 && b < 85) return true;

    // 2. Nutridian 3D Emblem (Red circular arc, Orange 3D block, Orange interior)
    if (r > 180 && b <= 70 && y < 450) return true;

    // 3. Chicken Feathers (White / Grey on body)
    if (y < 455) {
      if (r > 160 && g > 160 && b >= 165 && Math.abs(r - b) < 65) return true;
      if (r > 110 && g > 110 && b > 110 && Math.abs(r - g) < 22 && Math.abs(g - b) < 22) return true;
    }

    // 4. Yellow Legs, Shanks, Claws & Ground Contact Shadow
    if (y >= 360 && y <= 522 && x >= 95 && x <= 365) {
      // Yellow shanks and toes
      if (r > 130 && g >= 75 && b <= 125 && (r - b) > 35) return true;
      // Darker joint / shaded parts of the shanks
      const avg = (r + g + b) / 3;
      if (avg < 175 && (r - b) > 20) return true;
      // Soft contact shadow directly under claws on floor
      if (y >= 485 && avg >= 170 && avg < 246 && (r - b) > 15 && b < 210) return true;
    }

    return false;
  }

  // Scan minX and maxX for each row y
  const minX = new Int32Array(h);
  const maxX = new Int32Array(h);
  minX.fill(-1);
  maxX.fill(-1);

  for (let y = 58; y <= 522; y++) {
    for (let x = 0; x < w; x++) {
      if (isSubjectPixel(x, y)) {
        minX[y] = x;
        break;
      }
    }
    for (let x = w - 1; x >= 0; x--) {
      if (isSubjectPixel(x, y)) {
        maxX[y] = x;
        break;
      }
    }
  }

  // Smooth the boundary horizontally
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
      continue;
    }

    const curMin = smoothMinX[y];
    const curMax = smoothMaxX[y];

    if (curMin === -1 || curMax === -1 || curMin > curMax) {
      continue;
    }

    for (let x = 0; x < w; x++) {
      if (x < curMin - 1 || x > curMax + 1) {
        continue;
      }

      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const avg = (r + g + b) / 3;

      // In the lower legs region (y >= 430):
      // Cleanly identify the peach background or white floor between the legs
      if (y >= 430) {
        // Pure white floor between toes / around feet
        if (y >= 485 && r >= 247 && g >= 247 && b >= 244) {
          continue;
        }
        // Peach background between legs
        if (r >= 232 && g >= 165 && b >= 120 && (r - g) < 75 && avg > 175 && (r - b) < 95) {
          // Check if this pixel is inside a leg:
          // A leg pixel has (r - b) > 40 AND either b <= 110 or avg < 165
          const isLeg = (r > 130 && g >= 75 && b <= 110 && (r - b) > 35) || (avg < 165 && (r - b) > 20);
          if (!isLeg) {
            continue; // Transparent background between legs!
          }
        }
      }

      // Anti-aliased outer edge
      let edgeAlpha = 255;
      if (x < curMin + 1) {
        edgeAlpha = Math.round(255 * Math.max(0, Math.min(1, (x - (curMin - 1)) / 2)));
      }
      if (x > curMax - 1) {
        edgeAlpha = Math.min(edgeAlpha, Math.round(255 * Math.max(0, Math.min(1, ((curMax + 1) - x) / 2))));
      }

      // Smooth top edge
      if (y < 61) {
        edgeAlpha = Math.min(edgeAlpha, Math.round(255 * Math.max(0, (y - 57) / 4)));
      }
      // Smooth bottom edge
      if (y > 519) {
        edgeAlpha = Math.min(edgeAlpha, Math.round(255 * Math.max(0, (523 - y) / 4)));
      }

      // Faint floor reflection under the claws (soft fade)
      if (y >= 485 && avg >= 238 && avg < 247) {
        edgeAlpha = Math.min(edgeAlpha, Math.round(170 * (247 - avg) / 9));
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
    .toFile('public/hero_chicken_full.png');

  console.log('Successfully generated public/hero_chicken_full.png with background removed!');
}

generatePerfectHeroCutout().catch(console.error);

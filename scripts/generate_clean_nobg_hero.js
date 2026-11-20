import sharp from 'sharp';

async function generateCleanNoBgHero() {
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
    const avg = (r + g + b) / 3;

    if (y < 58 || y > 522) return false;

    // 1. Comb & Wattles
    if (y < 260 && r > 160 && g < 85 && b < 85) return true;

    // 2. Nutridian 3D Emblem (Red arc, 3D block, Orange sunburst)
    if (r > 180 && b <= 70 && y < 455) return true;

    // 3. Chicken Feathers (Rooster down to y=420, Hen down to y=460)
    if (y < 460) {
      if (r > 140 && g > 140 && b >= 140 && Math.abs(r - b) < 65) return true;
      if (r > 100 && g > 100 && b > 100 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25) return true;
      // Dark eye/beak details
      if (r < 100 && g < 100 && b < 100) return true;
    }

    // 4. Yellow / Golden / Brown Shanks, Claws & Toes
    if (y >= 360 && y <= 522 && x >= 95 && x <= 365) {
      // Shanks and claws (even in shadow where r >= 85)
      if (r >= 85 && g >= 50 && b <= 120 && (r - b) > 25 && r >= g) return true;
      // Lighter yellow toes
      if (r > 130 && g >= 75 && b <= 125 && (r - b) > 30) return true;
    }

    return false;
  }

  // Scan minX and maxX
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

  // Smooth boundary
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
    if (y < 58 || y > 522) continue;

    const curMin = smoothMinX[y];
    const curMax = smoothMaxX[y];
    if (curMin === -1 || curMax === -1 || curMin > curMax) continue;

    for (let x = 0; x < w; x++) {
      if (x < curMin - 1 || x > curMax + 1) continue;

      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const avg = (r + g + b) / 3;

      // In the lower legs region (y >= 455):
      // Only keep pixels inside the actual 4 legs and feet
      if (y >= 455) {
        const inRoosterLeft = (x >= 105 && x <= 175);
        const inRoosterRight = (x >= 160 && x <= 235);
        const inHenLeft = (x >= 235 && x <= 295);
        const inHenRight = (x >= 290 && x <= 355);

        if (!inRoosterLeft && !inRoosterRight && !inHenLeft && !inHenRight) {
          continue; // Outside any leg/foot bounding box
        }

        // Inside a leg/foot box, check if it's the actual shank/claw
        const isLeg = (r >= 85 && g >= 50 && b <= 120 && (r - b) > 25 && r >= g);
        if (!isLeg) {
          continue; // Background between toes/shanks
        }
      }

      // Between rooster legs (x between 140 and 175, y >= 410 to 455)
      if (y >= 410 && y < 455 && x >= 140 && x <= 175) {
        // Peach background between rooster legs
        if (r >= 235 && g >= 165 && b >= 115 && (r - g) < 75 && avg > 175) {
          continue;
        }
      }

      let edgeAlpha = 255;
      if (x < curMin + 1) {
        edgeAlpha = Math.round(255 * Math.max(0, Math.min(1, (x - (curMin - 1)) / 2)));
      }
      if (x > curMax - 1) {
        edgeAlpha = Math.round(255 * Math.max(0, Math.min(1, ((curMax + 1) - x) / 2)));
      }
      if (y < 61) {
        edgeAlpha = Math.min(edgeAlpha, Math.round(255 * Math.max(0, (y - 57) / 4)));
      }

      alpha[y * w + x] = edgeAlpha;
    }
  }

  // Find exact bottom-most row of claws
  let maxClawY = 0;
  for (let y = h - 1; y >= 0; y--) {
    for (let x = 0; x < w; x++) {
      if (alpha[y * w + x] > 50) {
        maxClawY = y;
        break;
      }
    }
    if (maxClawY > 0) break;
  }

  // Crop height to maxClawY + 1 so claws reach the bottom edge
  const outH = maxClawY + 1;
  const rgba = Buffer.alloc(w * outH * 4);
  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < w; x++) {
      const sIdx = (y * w + x) * 3;
      const dIdx = (y * w + x) * 4;
      rgba[dIdx] = data[sIdx];
      rgba[dIdx + 1] = data[sIdx + 1];
      rgba[dIdx + 2] = data[sIdx + 2];
      rgba[dIdx + 3] = alpha[y * w + x];
    }
  }

  await sharp(rgba, { raw: { width: w, height: outH, channels: 4 } })
    .png()
    .toFile('public/hero_chicken_nobg.png');

  await sharp(rgba, { raw: { width: w, height: outH, channels: 4 } })
    .png()
    .toFile('public/hero_chicken_full.png');

  console.log(`Saved public/hero_chicken_nobg.png and hero_chicken_full.png: ${w}x${outH}`);
}

generateCleanNoBgHero().catch(console.error);

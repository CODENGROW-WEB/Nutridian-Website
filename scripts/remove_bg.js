import sharp from 'sharp'

async function processImage() {
  const inputPath = './public/poultry.png'
  const outputPath = './public/poultry_transparent.png'

  const image = sharp(inputPath)
  const metadata = await image.metadata()
  
  // Ensure image is uncompressed raw RGBA buffer
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixelCount = info.width * info.height

  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4
    const r = data[offset]
    const g = data[offset + 1]
    const b = data[offset + 2]

    // Calculate lightness
    const avg = (r + g + b) / 3

    // White background thresholding
    if (r > 220 && g > 220 && b > 220) {
      if (avg > 242) {
        data[offset + 3] = 0 // Fully transparent
      } else {
        // Soft edge anti-aliasing
        const factor = (242 - avg) / (242 - 220)
        data[offset + 3] = Math.floor(255 * factor)
      }
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .png()
    .toFile(outputPath)

  console.log(`Processed image saved to ${outputPath}`)
}

processImage().catch(console.error)

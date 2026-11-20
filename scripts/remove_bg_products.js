import sharp from 'sharp'
import path from 'path'

const files = ['god_n.png', 'nutriquinol.png', 'avirom.png']

async function processProducts() {
  for (const file of files) {
    const inputPath = `./public/${file}`
    const outputPath = `./public/${path.parse(file).name}_clean.png`

    const image = sharp(inputPath)
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

      const avg = (r + g + b) / 3

      // White background threshold
      if (r > 225 && g > 225 && b > 225) {
        if (avg > 245) {
          data[offset + 3] = 0
        } else {
          const factor = (245 - avg) / (245 - 225)
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

    console.log(`Processed ${file} -> ${outputPath}`)
  }
}

processProducts().catch(console.error)

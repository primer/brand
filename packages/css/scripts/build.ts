import path from 'path'
import fs from 'fs/promises'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

const SOURCE_DIR = '../react/src'
const OUTPUT_DIR = 'components'
// Add folder names in packages/react that are not official components or should not be compiled
const SKIP_FOLDERS = ['recipes']

async function build(): Promise<void> {
  await fs.mkdir(OUTPUT_DIR, {recursive: true})

  const cssFiles = await findCssFiles(SOURCE_DIR)

  for (const file of cssFiles) {
    const relativePath = path.relative(SOURCE_DIR, file)

    // removing the module part of the the file name make it cleaner
    const outputPath = path.join(OUTPUT_DIR, relativePath.replace('.module.css', '.css'))

    await fs.mkdir(path.dirname(outputPath), {recursive: true})

    const css = await fs.readFile(file, 'utf8')

    // we need to process using same postcss config as the react version
    const result = await postcss([autoprefixer]).process(css, {
      from: file,
      to: outputPath,
    })

    await fs.writeFile(outputPath, result.css)
  }
}

async function findCssFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  const entries = await fs.readdir(dir, {withFileTypes: true})

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (SKIP_FOLDERS.includes(entry.name)) {
        continue
      }
      files.push(...(await findCssFiles(fullPath)))
    } else if (entry.name.endsWith('.module.css') && !entry.name.match(/.*\..*\.module\.css$/)) {
      files.push(fullPath)
    }
  }

  return files
}

build().catch(console.error)

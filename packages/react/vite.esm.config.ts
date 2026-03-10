import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {libInjectCss} from 'vite-plugin-lib-inject-css'
import {resolve} from 'path'
import {createHash} from 'crypto'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'

function generateScopedName(localName: string, filename: string): string {
  // css-loader uses the filename without extension for [name].
  // For "Button.module.css" this produces "Button-module".
  const basename = filename.replace(/^.*[\\/]/, '') // strip directory
  const name = basename.replace(/\.css$/, '').replace(/\./g, '-') // "Button.module.css" -> "Button-module"

  // Normalize to a path relative to src/ so hashes are stable across machines and checkout paths.
  const srcRoot = resolve(__dirname, 'src')
  const relativePath = filename.startsWith(srcRoot) ? filename.slice(srcRoot.length) : filename
  const normalizedPath = relativePath.replace(/\\/g, '/')

  const hash = createHash('md5')
    .update(`${normalizedPath}\n${localName}`)
    .digest('base64')
    .slice(0, 5)
    .replace(/[/+]/g, '_')

  return `Primer_Brand__${name}__${localName}___${hash}`
}

export default defineConfig({
  plugins: [react({jsxRuntime: 'automatic'}), libInjectCss()],
  css: {
    modules: {
      generateScopedName,
    },
    postcss: {
      plugins: [
        postcssPresetEnv({
          features: {
            'logical-properties-and-values': false,
            'has-pseudo-class': false,
          },
        }),
        autoprefixer(),
      ],
    },
  },
  build: {
    outDir: 'esm',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.esm.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      // These dependencies should be ignored by bundler
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^@primer\/behaviors($|\/)/, /^@oddbird\/popover-polyfill($|\/)/],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: assetInfo => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return '[name]-[hash][extname]'
          }
          return '[name][extname]'
        },
      },
    },
  },
})

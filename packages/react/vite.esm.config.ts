import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {libInjectCss} from 'vite-plugin-lib-inject-css'
import {resolve} from 'path'
import {createHash} from 'crypto'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'

/**
 * Custom CSS Modules scoped-name generator that matches the Webpack UMD build
 * naming convention: Primer_Brand__[name]__[local]___[hash:base64:5]
 *
 * Note: Webpack's css-loader uses its own WASM-based MD4 implementation.
 * Since the ESM build is consumed via a separate import path (`/esm`),
 * internal consistency (JS referencing matching CSS) is what matters —
 * not cross-build hash identity. We use MD5 as the hash function here.
 */
function generateScopedName(localName: string, filename: string): string {
  // css-loader uses the filename without extension for [name].
  // For "Button.module.css" this produces "Button-module".
  const basename = filename.replace(/^.*[\\/]/, '') // strip directory
  const name = basename.replace(/\.css$/, '').replace(/\./g, '-') // "Button.module.css" -> "Button-module"

  const hash = createHash('md5').update(`${filename}\n${localName}`).digest('base64').slice(0, 5).replace(/[/+]/g, '_')

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
      // Externalize peer dependencies and their subpaths.
      // @primer/brand-primitives is intentionally NOT externalized —
      // its CSS token imports are bundled into per-component stylesheets.
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@primer\/behaviors($|\/)/,
        /^@oddbird\/popover-polyfill($|\/)/,
        /^@primer\/octicons-react($|\/)/,
      ],
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

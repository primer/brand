/**
 * Vite isn't optimized for CJS dependencies, so we need to use a plugin to
 * enable interop. This is a temporary solution and documented on Remix website:
 * https://remix.run/docs/en/main/guides/vite#esm--cjs
 */
import {vitePlugin as remix} from '@remix-run/dev'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {cjsInterop} from 'vite-plugin-cjs-interop'

export default defineConfig({
  plugins: [
    cjsInterop({
      // List of CJS dependencies that require interop
      dependencies: ['@primer/react-brand'],
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
})

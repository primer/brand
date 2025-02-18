/** @type {import('next').NextConfig} */
import withDoctocat from '@primer/doctocat-nextjs/doctocat.config.js'
export default {
  ...withDoctocat({
    transpilePackages: ['@primer/doctocat-nextjs'],
    output: 'export',
    basePath:
      process.env.GITHUB_ACTIONS === 'true' && process.env.IS_PROD
        ? '/brand/next'
        : process.env.IS_PREVIEW
          ? '/next'
          : '',
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
  }),
}

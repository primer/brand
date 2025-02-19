/** @type {import('next').NextConfig} */
import withDoctocat from '@primer/doctocat-nextjs/doctocat.config.js'
export default {
  ...withDoctocat({
    transpilePackages: ['@primer/doctocat-nextjs'],
    output: 'export',
    basePath: process.env.GITHUB_ACTIONS === 'true' ? '/brand/next' : '',
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
  }),
}

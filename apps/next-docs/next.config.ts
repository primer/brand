/** @type {import('next').NextConfig} */
import withDoctocat from '@primer/doctocat-nextjs/doctocat.config.js'
export default {
  ...withDoctocat({
    transpilePackages: ['@primer/doctocat-nextjs'],
    output: 'export',
    basePath: process.env.IS_PROD ? '/brand/next' : '',
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
  }),
}

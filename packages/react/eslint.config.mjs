import rootConfig from '../../eslint.config.mjs'

export default [
  ...rootConfig,
  {
    ignores: ['docs/**'], // docs generated and bundled in the package, not published docs
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['vite.*.config.ts'],
    rules: {
      'import/no-nodejs-modules': 'off',
    },
  },
]

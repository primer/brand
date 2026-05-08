import rootConfig from '../../eslint.config.mjs'

export default [
  ...rootConfig,
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

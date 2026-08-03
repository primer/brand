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
    files: ['src/**/*.figma.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.figma.json'],
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

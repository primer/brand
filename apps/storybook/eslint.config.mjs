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
    files: ['scripts/**/*'],
    rules: {
      'no-console': 'off',
      'import/no-nodejs-modules': 'off',
      'import/no-namespace': 'off',
    },
  },
]

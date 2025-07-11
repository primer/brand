import base from '../../.eslintrc'

export default {
  ...base,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['scripts/**/*'],
      rules: {
        'no-console': 'off',
        'import/no-nodejs-modules': 'off',
      },
    },
  ],
}

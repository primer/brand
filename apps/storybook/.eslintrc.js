module.exports = {
  extends: ['../../.eslintrc.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['scripts/**/*'],
      rules: {
        'no-console': 'off',
        'import/no-nodejs-modules': 'off',
        'import/no-namespace': 'off',
      },
    },
  ],
}

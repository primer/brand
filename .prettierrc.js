module.exports = {
  ...require('@github/prettier-config'),
  overrides: [
    {
      files: 'src/tokens/**/*.js',
      options: {
        singleQuote: false,
      },
    },
  ],
}

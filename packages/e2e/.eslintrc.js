const base = require('../../.eslintrc')

module.exports = {
  ...base,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
}

const base = require('../../.eslintrc')

module.exports = {
  ...base,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    ...base.rules,
    'primer-react/no-system-props': 0,
  },
}

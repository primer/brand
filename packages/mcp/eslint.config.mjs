import rootConfig from '../../eslint.config.mjs'

export default [
  ...rootConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
      },
    },
    rules: {
      // MCP tool descriptions and tool output are machine-facing protocol text,
      // not localized end-user UI copy, so the i18n / HTML-escaping rules do not apply.
      'i18n-text/no-en': 'off',
      'github/unescaped-html-literal': 'off',
      // This is a Node server: builtin modules and the SDK's subpath exports are expected.
      'import/no-namespace': 'off',
      'import/no-nodejs-modules': 'off',
      // Subpath resolution of the SDK's exports map is validated by tsc, not the eslint resolver.
      'import/no-unresolved': 'off',
    },
  },
]

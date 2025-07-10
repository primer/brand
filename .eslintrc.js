module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:import/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:github/recommended',
    'plugin:github/browser',
    'plugin:primer-react/recommended',
  ],
  ignorePatterns: [
    'node_modules',
    '.cache',
    'coverage/**/*',
    'storybook-static/**/*',
    'dist/**/*',
    'lib/**/*',
    'types/**/*',
    'integration-tests/**/*',
  ],
  globals: {
    __DEV__: 'readonly',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  // rules which apply to JS, TS, etc.
  rules: {
    'filenames/match-regex': 0,
    'eslint-comments/no-unused-disable': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react-hooks/exhaustive-deps': 'error',
    camelcase: [
      'error',
      {
        allow: ['dark_dimmed'],
      },
    ],
  },
  overrides: [
    // rules which apply only to JS
    {
      files: ['**/*.{js,jsx}'],
      rules: {
        'eslint-comments/no-use': 0,
        'import/no-namespace': 0,
        'no-shadow': 0,
        'import/no-commonjs': 0,
        'import/no-nodejs-modules': 0,
        'no-unused-vars': [
          'error',
          {
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    // rules for style-dictionary JS source files
    {
      files: ['src/tokens/**/*.js'],
      rules: {
        'prettier/prettier': 0,
      },
    },
    // rules which apply only to TS
    {
      parserOptions: {
        project: 'tsconfig.json',
      },
      files: ['**/*.{ts,tsx}'],
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-unnecessary-condition': 2,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    // rules which apply only to TSX tests
    {
      files: ['**/*.test.{ts,tsx}'],
      rules: {
        'i18n-text/no-en': 0,
      },
    },
    // rules which apply only to TSX storybook stories
    {
      files: ['**/*.stories.{ts,tsx}'],
      rules: {
        'i18n-text/no-en': 0,
      },
    },
    // rules which apply only to TS scripts
    {
      files: ['scripts/*.{ts,tsx}'],
      rules: {
        'import/no-nodejs-modules': [
          'error',
          {
            allow: ['path', 'fs'],
          },
        ],
      },
    },
    // rules which apply only to Markdown
    {
      files: ['**/*.{md,mdx}'],
      extends: ['plugin:mdx/recommended'],
      settings: {
        'mdx/code-blocks': true,
      },
      rules: {
        'prettier/prettier': 0,
      },
    },
    // rules which apply only to Markdown code blocks
    {
      files: ['**/*.{md,mdx}/**'],
      parserOptions: {
        project: false,
      },
      rules: {
        camelcase: 0,
        'import/no-unresolved': 0,
        'no-constant-condition': 0,
        'no-console': 0,
        'no-empty-pattern': 0,
        'no-unused-vars': 0,
        'no-undef': 0,
        'react/no-unescaped-entities': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-no-undef': 0,
        'react/jsx-key': 0,
        'react/jsx-no-comment-textnodes': 0,
        'i18n-text/no-en': 0,
        'import/no-anonymous-default-export': 0,
        'import/extensions': 0,
        'prettier/prettier': 0,
        '@typescript-eslint/no-unnecessary-condition': 0,
        '@typescript-eslint/no-unused-vars': 0,
        'no-redeclare': 0,
        'github/a11y-svg-has-accessible-name': 0,
      },
    },
    // rules which apply only to Figma code connect files
    {
      files: ['**/*.figma.tsx'],
      rules: {
        'github/unescaped-html-literal': 0,
        'i18n-text/no-en': 0,
      },
    },
  ],
}

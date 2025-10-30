import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import primerReactPlugin from 'eslint-plugin-primer-react'
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments'
import {FlatCompat} from '@eslint/eslintrc'
import {fileURLToPath} from 'url'
import {dirname} from 'path'
import {noEnglishTextRule} from './packages/repo-configs/custom-lint-rules/no-english-text.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config(
  js.configs.recommended,

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      '.cache/**',
      'coverage/**',
      'storybook-static/**',
      'dist/**',
      'lib/**',
      'types/**',
      'integration-tests/**',
      'out/**',
      '.next/**',
      'next-env.d.ts',
      'playwright-test-results/**',
      'playwright-report/**',
      '**/CHANGELOG.md',
    ],
  },

  // Use FlatCompat to extend github plugin configs
  ...compat.extends('plugin:github/recommended', 'plugin:github/browser').map(config => {
    // We've vendored the i18n-text rule for `no english-text`, as OSS version doesn't work with ESLint v9.
    // It's also been turned off in our house rules, so this makes sure that we use our custom implementation.
    if (config.plugins && config.plugins['i18n-text']) {
      return {
        ...config,
        plugins: {
          ...config.plugins,
          'i18n-text': {
            rules: {
              ...config.plugins['i18n-text'].rules,
              'no-en': noEnglishTextRule,
            },
          },
        },
      }
    }
    return config
  }),
  {
    rules: {
      'i18n-text/no-en': 'error', // Turns back on, as it's otherwise disabled in GitHub plugin
      'no-prototype-builtins': 'off', // TODO: Replace hasOwnProperty usage after ESLint v9 migration
    },
  },

  // Base configuration for all files
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      'primer-react': primerReactPlugin,
      'eslint-comments': eslintCommentsPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        __DEV__: 'readonly',
        // Node.js globals for CommonJS files
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './packages/*/tsconfig.json', './apps/*/tsconfig.json'],
        },
        node: true,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...primerReactPlugin.configs.recommended.rules,
      'filenames/match-regex': 'off',
      'eslint-comments/no-unused-disable': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'i18n-text/no-en': 'error',
      camelcase: [
        'error',
        {
          allow: ['dark_dimmed'],
        },
      ],
    },
  },

  // JavaScript files configuration
  {
    files: ['**/*.{js,jsx,cjs,mjs}'],
    rules: {
      'eslint-comments/no-use': 'off',
      'import/no-namespace': 'off',
      'no-shadow': 'off',
      'import/no-commonjs': 'off',
      'import/no-nodejs-modules': 'off',
      'no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // TypeScript files configuration
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-require-imports': 'off', // TODO: Remove after project entirely on ESM imports
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Test files configuration
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'i18n-text/no-en': 'off',
    },
  },

  // Storybook files configuration
  {
    files: ['**/*.stories.{ts,tsx}', '**/storybook/**/*.{js,ts}'],
    rules: {
      'i18n-text/no-en': 'off',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['storybook/test', 'storybook/theming', 'storybook/viewport', 'storybook/actions'],
        },
      ],
    },
  },

  // Script files configuration
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

  // Style dictionary source files
  {
    files: ['src/tokens/**/*.js'],
    rules: {
      'prettier/prettier': 'off',
    },
  },

  // MDX files configuration
  ...compat.extends('plugin:mdx/recommended').map(config => ({
    ...config,
    files: ['**/*.{md,mdx}'],
    ignores: ['**/node_modules/**'],
  })),
  {
    files: ['**/*.{md,mdx}'],
    ignores: ['**/node_modules/**'],
    settings: {
      'mdx/code-blocks': true,
      'mdx/language-mapper': {},
    },
    languageOptions: {
      parserOptions: {
        extensions: ['.md', '.mdx'],
      },
    },
    rules: {
      'prettier/prettier': 'off',
      // Disable import validation that requires parsing node_modules
      'import/namespace': 'off',
      'import/no-deprecated': 'off',
      'import/named': 'off',
      'import/default': 'off',
    },
  },

  // MDX code blocks configuration
  {
    files: ['**/*.{md,mdx}/**'],
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
    rules: {
      camelcase: 'off',
      'import/no-unresolved': 'off',
      'no-constant-condition': 'off',
      'no-console': 'off',
      'no-empty-pattern': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-undef': 'off',
      'react/jsx-key': 'off',
      'react/jsx-no-comment-textnodes': 'off',
      'i18n-text/no-en': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/extensions': 'off',
      'prettier/prettier': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-redeclare': 'off',
      'github/a11y-svg-has-accessible-name': 'off',
    },
  },

  // Figma code connect files
  {
    files: ['**/*.figma.tsx'],
    rules: {
      'github/unescaped-html-literal': 'off',
      'i18n-text/no-en': 'off',
    },
  },
)

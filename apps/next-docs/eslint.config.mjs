import rootConfig from '../../eslint.config.mjs'

export default [
  ...rootConfig,
  {
    ignores: ['out/', '.next/', 'node_modules/', 'next-env.d.ts'],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@next/next/no-img-element': 'off',
      'primer-react/no-system-props': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-undef': 'off',
      'jsx-a11y/html-has-lang': 'off',
      'react/no-unescaped-entities': 'off',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^@primer/react-brand', '^@primer/react'],
        },
      ],
    },
  },
]

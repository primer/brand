module.exports = {
  // extends: ['next/core-web-vitals'], // Reenable after upgrading prettier to v3+
  ignorePatterns: ['out/', '.next/', 'node_modules/'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended'],
      rules: {
        // Disable unused vars rule for MDX code usage
        // 'no-unused-vars': 'off',
      },
    },
    {
      files: ['next-env.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
      },
    },
  ],
  rules: {
    '@next/next/no-img-element': 'off',
    'primer-react/no-system-props': 'off',
    'react/react-in-jsx-scope': 'off', // TODO remove once next/core-web-vitals is reenabled
    'react/jsx-no-undef': 'off', // TODO Off due to sideloaded components
    'jsx-a11y/html-has-lang': 'off', // Off to suppress false positives in code blocks
    'react/no-unescaped-entities': 'off', // TODO reenable once base config is reenabled
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^@primer/react-brand'],
      },
    ],
  },
}

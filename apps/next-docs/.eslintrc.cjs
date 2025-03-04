module.exports = {
  //extends: ['next/core-web-vitals'], // To reenable after upgrading prettier to v3+
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
      },
    ],
    '@next/next/no-img-element': 'off',
    'primer-react/no-system-props': 'off',
    'react/react-in-jsx-scope': 'off', // TODO remove once next/core-web-vitals is reenabled
    'react/jsx-no-undef': 'off', // TODO Off due to sideloaded components
    'jsx-a11y/html-has-lang': 'off', // Off to suppress false positives in code blocks
    'import/extensions': 'off', // TODO reenable once base config is reenabled
    'react/no-unescaped-entities': 'off', // TODO reenable once base config is reenabled
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^@primer/react-brand'],
      },
    ],
  },
}

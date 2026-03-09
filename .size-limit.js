module.exports = [
  {
    name: 'UMD — full bundle (JS)',
    path: 'packages/react/lib/index.js',
  },
  {
    name: 'UMD — full bundle (CSS)',
    path: 'packages/react/lib/css/main.css',
  },
  {
    name: 'ESM — full bundle (JS + CSS)',
    path: 'packages/react/esm/**/*.{js,css}',
  },
  {
    name: 'ESM — tree-shaken simple (Button)',
    path: 'packages/react/esm/index.esm.js',
    import: '{ Button }',
    modifyEsbuildConfig(config) {
      config.external = ['react', 'react-dom']
      return config
    },
  },
  {
    name: 'ESM — tree-shaken complex (ActionMenu)',
    path: 'packages/react/esm/index.esm.js',
    import: '{ ActionMenu }',
    modifyEsbuildConfig(config) {
      config.external = ['react', 'react-dom']
      return config
    },
  },
]

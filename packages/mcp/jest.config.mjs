/**
 * Jest config for the ESM TypeScript MCP server.
 */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  // Allows NodeNext-style `./example.js` specifiers to resolve to the `./example.ts` source.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          verbatimModuleSyntax: false,
          types: ['node', 'jest'],
        },
      },
    ],
  },
  // eslint-disable-next-line github/unescaped-html-literal
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  clearMocks: true,
}

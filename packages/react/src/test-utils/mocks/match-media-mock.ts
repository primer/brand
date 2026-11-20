/**
 * Jest mock for matchMedia
 * @see https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 * @example:
 *  import 'relative-path-to/match-media-mock'
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    get matches() {
      const minWidth = /^\(min-width: ([\d.]+)rem\)$/.exec(query)
      return minWidth ? window.innerWidth >= Number(minWidth[1]) * 16 : false
    },
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

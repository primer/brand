jest.mock('@oddbird/popover-polyfill/fn', () => ({
  apply: jest.fn(),
  isSupported: jest.fn().mockReturnValue(false),
}))

const colorModeAttributes = require('./color-mode-attributes')

// eslint-disable-next-line i18n-text/no-en
describe('Design tokens', () => {
  it('can create functional color mode tokens correctly', () => {
    /*
     * example style dictionary input
     * creates one token for each of the following modes: light, dark, and light_high_contrast
     */
    const mockDictionary = {
      properties: {
        brand: {
          text: {
            color: {
              example: {
                value: 'gray',
                dark: 'white',
                // eslint-disable-next-line camelcase
                light_high_contrast: 'black',
                filePath: 'path-to-properties.json',
                isSource: true,
                original: {
                  value: 'gray',
                  dark: 'white',
                },
                name: 'brand-text-color-example',
                attributes: {},
                path: ['brand', 'text', 'color', 'example'],
              },
            },
          },
        },
      },
      allProperties: [
        {
          value: 'gray',
          dark: 'white',
          // eslint-disable-next-line camelcase
          light_high_contrast: 'black',
          filePath: 'path-to-properties.json',
          isSource: true,
          original: {
            value: 'gray',
            dark: 'white',
            // eslint-disable-next-line camelcase
            light_high_contrast: 'black',
          },
          name: 'brand-text-color-example',
          attributes: {},
          path: ['brand', 'text', 'color', 'example'],
        },
      ],
      tokens: {
        brand: {
          text: {
            color: {
              example: {
                value: 'gray',
                dark: 'white',
                // eslint-disable-next-line camelcase
                light_high_contrast: 'black',
                filePath: 'path-to-properties.json',
                isSource: true,
                original: {
                  value: 'gray',
                  dark: 'white',
                },
                name: 'brand-text-color-example',
                attributes: {},
                path: ['brand', 'text', 'color', 'example'],
              },
            },
          },
        },
      },
      allTokens: [
        {
          value: 'gray',
          dark: 'white',
          // eslint-disable-next-line camelcase
          light_high_contrast: 'black',
          filePath: 'path-to-properties.json',
          isSource: true,
          original: {
            value: 'gray',
            dark: 'white',
            // eslint-disable-next-line camelcase
            light_high_contrast: 'black',
          },
          name: 'brand-text-color-example',
          attributes: {},
          path: ['brand', 'text', 'color', 'example'],
        },
      ],
      _properties: {
        brand: {
          text: {
            color: {
              example: {
                value: 'gray',
                dark: 'white',
                filePath: 'path-to-properties.json',
                isSource: true,
                original: {
                  value: 'gray',
                  dark: 'white',
                },
                name: 'brand-text-color-example',
                attributes: {},
                path: ['brand', 'text', 'color', 'example'],
              },
            },
          },
        },
      },
    }

    const mockFileConfig = {
      destination: 'tokens/functional/texts/text/colors-with-modes.css',
      options: {
        outputReferences: false,
        containsRawHSL: false,
      },
    }

    const mockOptions = {
      outputReferences: false,
      containsRawHSL: false,
    }

    const output = colorModeAttributes({dictionary: mockDictionary, file: mockFileConfig, options: mockOptions})

    const expectedOutput = `
:root,
[data-color-mode="light"] {
  --brand-text-color-example: gray;
}

[data-color-mode="light_high_contrast"] {
  --brand-text-color-example: black;
}

[data-color-mode="dark"] {
  --brand-text-color-example: white;
}
`.trim()

    // remove timestamp and trim
    const cleanOutput = output.split('\n').slice(4).join('\n').trim()

    expect(cleanOutput).toBe(expectedOutput)
  })

  it('can create color scale tokens correctly using HSL', () => {
    /**
     * Source properties as input and later transformed into SD:
     * {
        "base": {
          "color": {
            "scale": {
              "gray": {
                "0": {
                  "value": "210 25% 98%",
                  "dark": "210 67% 96%",
                  "dark_dimmed": "210 57% 96%"
                },
                "1": {
                  "value": "210 24% 93%",
                  "dark": "210 17% 82%",
                  "dark_dimmed": "210 19% 87%"
                },
                "2": {
                  "value": "210 16% 85%",
                  "dark": "212 14% 73%",
                  "dark_dimmed": "212 15% 63%"
                }
              }
            }
          }
        }
      }
     */
    const mockDictionary = {
      properties: {
        base: {
          color: {
            scale: {
              gray: {
                0: {
                  value: '210 25% 98%',
                  dark: '210 67% 96%',
                  dark_dimmed: '210 57% 96%',
                  filePath: 'tokens/base/colors/color-scales.json',
                  isSource: true,
                  original: {
                    value: '210 25% 98%',
                    dark: '210 67% 96%',
                    dark_dimmed: '210 57% 96%',
                  },
                  name: 'base-color-scale-gray-0',
                  attributes: {},
                  path: ['base', 'color', 'scale', 'gray', '0'],
                },
                1: {
                  value: '210 24% 93%',
                  dark: '210 17% 82%',
                  dark_dimmed: '210 19% 87%',
                  filePath: 'tokens/base/colors/color-scales.json',
                  isSource: true,
                  original: {
                    value: '210 24% 93%',
                    dark: '210 17% 82%',
                    dark_dimmed: '210 19% 87%',
                  },
                  name: 'base-color-scale-gray-1',
                  attributes: {},
                  path: ['base', 'color', 'scale', 'gray', '1'],
                },
                2: {
                  value: '210 16% 85%',
                  dark: '212 14% 73%',
                  dark_dimmed: '212 15% 63%',
                  filePath: 'tokens/base/colors/color-scales.json',
                  isSource: true,
                  original: {
                    value: '210 16% 85%',
                    dark: '212 14% 73%',
                    dark_dimmed: '212 15% 63%',
                  },
                  name: 'base-color-scale-gray-2',
                  attributes: {},
                  path: ['base', 'color', 'scale', 'gray', '2'],
                },
              },
            },
          },
        },
      },
      allProperties: [
        {
          value: '210 25% 98%',
          dark: '210 67% 96%',
          dark_dimmed: '210 57% 96%',
          filePath: 'tokens/base/colors/color-scales.json',
          isSource: true,
          original: {
            value: '210 25% 98%',
            dark: '210 67% 96%',
            dark_dimmed: '210 57% 96%',
          },
          name: 'base-color-scale-gray-0',
          attributes: {},
          path: ['base', 'color', 'scale', 'gray', '0'],
        },
        {
          value: '210 24% 93%',
          dark: '210 17% 82%',
          dark_dimmed: '210 19% 87%',
          filePath: 'tokens/base/colors/color-scales.json',
          isSource: true,
          original: {
            value: '210 24% 93%',
            dark: '210 17% 82%',
            dark_dimmed: '210 19% 87%',
          },
          name: 'base-color-scale-gray-1',
          attributes: {},
          path: ['base', 'color', 'scale', 'gray', '1'],
        },
        {
          value: '210 16% 85%',
          dark: '212 14% 73%',
          dark_dimmed: '212 15% 63%',
          filePath: 'tokens/base/colors/color-scales.json',
          isSource: true,
          original: {
            value: '210 16% 85%',
            dark: '212 14% 73%',
            dark_dimmed: '212 15% 63%',
          },
          name: 'base-color-scale-gray-2',
          attributes: {},
          path: ['base', 'color', 'scale', 'gray', '2'],
        },
      ],
      tokens: {
        base: {
          color: {
            scale: {
              gray: {
                0: {
                  value: '210 25% 98%',
                  dark: '210 67% 96%',
                  dark_dimmed: '210 57% 96%',
                  filePath: 'tokens/base/colors/color-scales.json',
                  isSource: true,
                  original: {
                    value: '210 25% 98%',
                    dark: '210 67% 96%',
                    dark_dimmed: '210 57% 96%',
                  },
                  name: 'base-color-scale-gray-0',
                  attributes: {},
                  path: ['base', 'color', 'scale', 'gray', '0'],
                },
                1: {
                  value: '210 24% 93%',
                  dark: '210 17% 82%',
                  dark_dimmed: '210 19% 87%',
                  filePath: 'tokens/base/colors/color-scales.json',
                  isSource: true,
                  original: {
                    value: '210 24% 93%',
                    dark: '210 17% 82%',
                    dark_dimmed: '210 19% 87%',
                  },
                  name: 'base-color-scale-gray-1',
                  attributes: {},
                  path: ['base', 'color', 'scale', 'gray', '1'],
                },
                2: {
                  value: '210 16% 85%',
                  dark: '212 14% 73%',
                  dark_dimmed: '212 15% 63%',
                  filePath: 'tokens/base/colors/color-scales.json',
                  isSource: true,
                  original: {
                    value: '210 16% 85%',
                    dark: '212 14% 73%',
                    dark_dimmed: '212 15% 63%',
                  },
                  name: 'base-color-scale-gray-2',
                  attributes: {},
                  path: ['base', 'color', 'scale', 'gray', '2'],
                },
              },
            },
          },
        },
      },
      allTokens: [
        {
          value: '210 25% 98%',
          dark: '210 67% 96%',
          dark_dimmed: '210 57% 96%',
          filePath: 'tokens/base/colors/color-scales.json',
          isSource: true,
          original: {
            value: '210 25% 98%',
            dark: '210 67% 96%',
            dark_dimmed: '210 57% 96%',
          },
          name: 'base-color-scale-gray-0',
          attributes: {},
          path: ['base', 'color', 'scale', 'gray', '0'],
        },
        {
          value: '210 24% 93%',
          dark: '210 17% 82%',
          dark_dimmed: '210 19% 87%',
          filePath: 'tokens/base/colors/color-scales.json',
          isSource: true,
          original: {
            value: '210 24% 93%',
            dark: '210 17% 82%',
            dark_dimmed: '210 19% 87%',
          },
          name: 'base-color-scale-gray-1',
          attributes: {},
          path: ['base', 'color', 'scale', 'gray', '1'],
        },
        {
          value: '210 16% 85%',
          dark: '212 14% 73%',
          dark_dimmed: '212 15% 63%',
          filePath: 'tokens/base/colors/color-scales.json',
          isSource: true,
          original: {
            value: '210 16% 85%',
            dark: '212 14% 73%',
            dark_dimmed: '212 15% 63%',
          },
          name: 'base-color-scale-gray-2',
          attributes: {},
          path: ['base', 'color', 'scale', 'gray', '2'],
        },
      ],
      _properties: {
        base: {
          color: {
            scale: {
              gray: {
                0: {
                  value: '210 25% 98%',
                  dark: '210 67% 96%',
                  dark_dimmed: '210 57% 96%',
                  filePath: 'tokens/base/colors/color-scales.json',
                  isSource: true,
                  original: {
                    value: '210 25% 98%',
                    dark: '210 67% 96%',
                    dark_dimmed: '210 57% 96%',
                  },
                  name: 'base-color-scale-gray-0',
                  attributes: {},
                  path: ['base', 'color', 'scale', 'gray', '0'],
                },
                1: {
                  value: '210 24% 93%',
                  dark: '210 17% 82%',
                  dark_dimmed: '210 19% 87%',
                  filePath: 'tokens/base/colors/color-scales.json',
                  isSource: true,
                  original: {
                    value: '210 24% 93%',
                    dark: '210 17% 82%',
                    dark_dimmed: '210 19% 87%',
                  },
                  name: 'base-color-scale-gray-1',
                  attributes: {},
                  path: ['base', 'color', 'scale', 'gray', '1'],
                },
                2: {
                  value: '210 16% 85%',
                  dark: '212 14% 73%',
                  dark_dimmed: '212 15% 63%',
                  filePath: 'tokens/base/colors/color-scales.json',
                  isSource: true,
                  original: {
                    value: '210 16% 85%',
                    dark: '212 14% 73%',
                    dark_dimmed: '212 15% 63%',
                  },
                  name: 'base-color-scale-gray-2',
                  attributes: {},
                  path: ['base', 'color', 'scale', 'gray', '2'],
                },
              },
            },
          },
        },
      },
    }

    const mockFileConfig = {
      destination: 'tokens/base/colors/color-scales.json',
      options: {
        outputReferences: false,
        containsRawHSL: false,
      },
    }

    const mockOptions = {
      outputReferences: false,
      containsRawHSL: true, // The important bit! This indicates that there are raw HSL values being used
    }

    const output = colorModeAttributes({dictionary: mockDictionary, file: mockFileConfig, options: mockOptions})

    const expectedOutput = `
:root,
[data-color-mode="light"] {
  --base-color-scale-gray-0-hsl: 210 25% 98%;
  --base-color-scale-gray-0: hsl(210, 25%, 98%);
  --base-color-scale-gray-1-hsl: 210 24% 93%;
  --base-color-scale-gray-1: hsl(210, 24%, 93%);
  --base-color-scale-gray-2-hsl: 210 16% 85%;
  --base-color-scale-gray-2: hsl(210, 16%, 85%);
}

[data-color-mode="dark"] {
  --base-color-scale-gray-0-hsl: 210 67% 96%;
  --base-color-scale-gray-0: hsl(210, 67%, 96%);
  --base-color-scale-gray-1-hsl: 210 17% 82%;
  --base-color-scale-gray-1: hsl(210, 17%, 82%);
  --base-color-scale-gray-2-hsl: 212 14% 73%;
  --base-color-scale-gray-2: hsl(212, 14%, 73%);
}

[data-color-mode="dark_dimmed"] {
  --base-color-scale-gray-0-hsl: 210 57% 96%;
  --base-color-scale-gray-0: hsl(210, 57%, 96%);
  --base-color-scale-gray-1-hsl: 210 19% 87%;
  --base-color-scale-gray-1: hsl(210, 19%, 87%);
  --base-color-scale-gray-2-hsl: 212 15% 63%;
  --base-color-scale-gray-2: hsl(212, 15%, 63%);
}    
`.trim()

    // remove timestamp and trim
    const cleanOutput = output.split('\n').slice(4).join('\n').trim()

    expect(cleanOutput).toBe(expectedOutput)
  })
})

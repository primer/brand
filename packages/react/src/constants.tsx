export const Colors = [
  'default',
  'blue',
  'coral',
  'green',
  'gray',
  'indigo',
  'lemon',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow',
] as const

export const BiColorGradients = ['blue-purple', 'green-blue', 'pink-blue', 'purple-red', 'red-orange'] as const
export const TriColorGradients = ['green-blue-purple'] as const

// TODO: consider generating the scale from  style dictionary and serve from the brand-primitives package
export const BaseSizeScale = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 64, 80, 96, 112, 128] as const
// biome-ignore lint/correctness/noUnusedVariables: TODO - Use or remove this type alias
type BaseSizeScale = (typeof BaseSizeScale)[number]

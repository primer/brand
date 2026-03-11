declare module '*.module.css' {
  const classes: {[key: string]: string}
  export default classes
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

type AnyString = string & NonNullable<unknown>

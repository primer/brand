declare module '*.module.css' {
  const classes: {[key: string]: string}
  export default classes
}

declare module '*.png'

// TODO: Get this working
declare namespace JSX {
  interface IntrinsicElements {
    // eslint-disable-next-line max-len
    'video-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>
  }
}

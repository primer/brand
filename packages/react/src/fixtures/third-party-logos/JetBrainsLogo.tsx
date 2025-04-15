import React from 'react'
type JetBrainsLogoProps = React.SVGProps<SVGSVGElement>

export const JetBrainsLogo = (props: JetBrainsLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 65 66"
    focusable="false"
    aria-label="Jetbrains icon"
    {...props}
  >
    <linearGradient id="a" gradientUnits="userSpaceOnUse" x1=".863282" x2="63.5984" y1="64.4524" y2="2.59072">
      <stop offset="0" stopColor="#ff9419" />
      <stop offset=".43" stopColor="#ff021d" />
      <stop offset=".99" stopColor="#e600ff" />
    </linearGradient>
    <clipPath id="b">
      <path d="m0 .752441h65v65h-65z" />
    </clipPath>
    <g clipPath="url(#b)">
      <path
        d="m20.6578 4.46963-16.94061 16.94067c-2.37656 2.3765-3.71719 5.6062-3.71719 8.9781v30.2859c0 2.8031 2.275 5.0781 5.07812 5.0781h30.28598c3.3718 0 6.5914-1.3406 8.9781-3.7171l16.9406-16.9407c2.3766-2.3765 3.7172-5.6062 3.7172-8.9781v-30.28593c0-2.80313-2.275-5.078129-5.0781-5.078129h-30.286c-3.3718 0-6.5914 1.340629-8.9781 3.717189z"
        fill="url(#a)"
      />
      <path d="m48.75 17.0024h-40.625v40.625h40.625z" fill="#000" />
      <path d="m30.4688 48.4868h-17.2657v4.0625h17.2657z" fill="#fff" />
    </g>
  </svg>
)

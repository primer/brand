import React from 'react'
type NeoVimLogoProps = React.SVGProps<SVGSVGElement>

export const NeoVimLogo = (props: NeoVimLogoProps) => (
  <svg
    focusable="false"
    aria-label="NeoVim icon"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 602 734"
    version="1.1"
    {...props}
  >
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
        <stop stopColor="#16B0ED" stopOpacity="0.800235524" offset="0%" />
        <stop stopColor="#0F59B2" stopOpacity="0.83700023" offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2">
        <stop stopColor="#7DB643" offset="0%" />
        <stop stopColor="#367533" offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-3">
        <stop stopColor="#88C649" stopOpacity="0.8" offset="0%" />
        <stop stopColor="#439240" stopOpacity="0.84" offset="100%" />
      </linearGradient>
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="mark-copy" transform="translate(2.000000, 3.000000)">
        <path
          d="M0,155.5704 L155,-1 L154.999997,727 L0,572.237919 L0,155.5704 Z"
          id="Left---green"
          fill="url(#linearGradient-1)"
        />
        <path
          d="M443.060403,156.982405 L600,-1 L596.818792,727 L442,572.219941 L443.060403,156.982405 Z"
          id="Right---blue"
          fill="url(#linearGradient-2)"
          transform="translate(521.000000, 363.500000) scale(-1, 1) translate(-521.000000, -363.500000) "
        />
        <path
          d="M154.986294,0 L558,615.189696 L445.224605,728 L42,114.172017 L154.986294,0 Z"
          id="Cross---blue"
          fill="url(#linearGradient-3)"
        />
        <path
          d="M155,283.83232 L154.786754,308 L31,124.710606 L42.4619486,113 L155,283.83232 Z"
          id="Shadow"
          fillOpacity="0.13"
          fill="#000000"
        />
      </g>
    </g>
  </svg>
)

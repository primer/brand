import React from 'react'
import {BaseStyles} from '@primer/react'
import {ColorThemeProvider} from '../../../components/content/ColorThemeContext'
import {createGlobalStyle} from 'styled-components'
import '../../../../../../packages/react/lib/css/main.css'
import '../../../../../../packages/fonts/fonts.css'

// Doctocat global styles https://github.com/primer/doctocat/blob/main/theme/src/components/wrap-page-element.js
const GlobalStyles = createGlobalStyle`
  .footnotes {
    font-size: var(--brand-text-size-200);
    color: var(--brand-color-text-subtle);

    ol {
      padding-left: var(--base-size-16);
    }

  .footnote-backref {
      font-family: var(--brand-fontStack-monospace);
      margin-left: var(--base-size-4);
      text-decoration: none;
    }
  }
`

// Shadowing this Doctocat file
function wrapPageElement({element}) {
  return (
    <ColorThemeProvider>
      <BaseStyles>
        <GlobalStyles />
        {element}
      </BaseStyles>
    </ColorThemeProvider>
  )
}

export default wrapPageElement

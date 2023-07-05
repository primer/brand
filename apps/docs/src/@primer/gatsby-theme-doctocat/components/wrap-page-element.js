import React from 'react'
import {BaseStyles, themeGet} from '@primer/react'
import {ColorThemeProvider} from '../../../components/content/ColorThemeContext'
import {createGlobalStyle} from 'styled-components'
import '../../../../../../packages/react/lib/css/main.css'
import '../../../../../../packages/fonts/fonts.css'

// Adding global styles for footnotes

const GlobalStyles = createGlobalStyle`
  .footnotes {
    font-size: ${themeGet('fontSizes.1')};
    color: ${themeGet('colors.fg.subtle')};

    ol {
      padding-left: ${themeGet('space.3')};
    }

  .footnote-backref {
      font-family: ${themeGet('fonts.mono')};
      margin-left: 2px;
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

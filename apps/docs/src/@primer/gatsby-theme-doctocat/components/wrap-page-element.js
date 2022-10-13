import React from 'react'
import {BaseStyles} from '@primer/react'
import {ColorThemeProvider} from '../../../components/content/ColorThemeContext'
import '../../../../../../packages/react/lib/css/main.css'
import '../../../../../../packages/fonts/fonts.css'

// Shadowing this Doctocat file

function wrapPageElement({element}) {
  return (
    <ColorThemeProvider>
      <BaseStyles>{element}</BaseStyles>
    </ColorThemeProvider>
  )
}

export default wrapPageElement

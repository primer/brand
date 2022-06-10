import React from 'react'
import {BaseStyles} from '@primer/react'
import {ColorThemeProvider} from '../../../components/content/ColorThemeContext'
import '../../../../../lib/css/main.css'
import '../../../../../fonts/fonts.css'

// Shadowing this Doctocat file

function wrapPageElement({element}) {
  return (
    <ColorThemeProvider>
      <BaseStyles>{element}</BaseStyles>
    </ColorThemeProvider>
  )
}

export default wrapPageElement

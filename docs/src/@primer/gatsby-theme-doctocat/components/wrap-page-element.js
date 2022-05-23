import React from 'react'
import {BaseStyles} from '@primer/react'
import {ColorThemeProvider} from '../../../components/content/ColorThemeContext'

// Shadowing this Doctocat file

function wrapPageElement({element}) {
  return (
    <ColorThemeProvider>
      <BaseStyles>{element}</BaseStyles>
    </ColorThemeProvider>
  )
}

export default wrapPageElement

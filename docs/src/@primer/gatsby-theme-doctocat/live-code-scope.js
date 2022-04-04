import * as doctocatComponents from '@primer/gatsby-theme-doctocat'
import * as octicons from '@primer/octicons-react'
import * as primerComponents from '@primer/react-brand'

const {default: _, ...octiconComponents} = octicons

const scopes = {
  ...doctocatComponents,
  ...primerComponents,
  ...octiconComponents,
}

export default scopes

// url=https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=14825-1968&t=R95Qkrf0BUjsetcA-11
// source=src/LogoSuite/LogoSuite.tsx
// component=LogoSuite

import figma from 'figma'

const instance = figma.selectedInstance
const align = instance.getEnum('align', {
  start: 'start',
  center: undefined,
  justify: 'justify',
})
const hasDivider = instance.getBoolean('hasDivider?', {
  true: undefined,
  false: false,
})

const heading = instance.getBoolean('heading?')
  ? figma.code`<LogoSuite.Heading>${instance.getString('headingText')}</LogoSuite.Heading>`
  : figma.code`<LogoSuite.Heading visuallyHidden>${instance.getString('headingText')}</LogoSuite.Heading>`
const description = instance.getBoolean('description?')
  ? figma.code`<LogoSuite.Description>${instance.findText('Description').__render__()}</LogoSuite.Description>`
  : undefined

const showLogoBar = instance.getBoolean('showLogoBar?')
const logoBar = instance.findInstance('Logobar')
const logoPlaceholder = figma.code`<svg viewBox="0 0 120 32" role="img" aria-label="Logo placeholder">
  <rect width="120" height="32" rx="4" />
</svg>`
const logoExamples = Array.from({length: 4}, () => logoPlaceholder)
const logobar =
  showLogoBar && logoBar.type !== 'ERROR'
    ? figma.code`<LogoSuite.Logobar${figma.helpers.react.renderProp(
        'variant',
        logoBar.getEnum('variant', {muted: undefined, emphasis: 'emphasis'}),
      )}${figma.helpers.react.renderProp('marquee', logoBar.getBoolean('marquee?', {true: true, false: undefined}))}>
        ${logoExamples}
      </LogoSuite.Logobar>`
    : showLogoBar
    ? logoBar.__render__()
    : undefined

export default {
  id: 'LogoSuite',
  imports: ["import { LogoSuite } from '@primer/react-brand'"],
  example: figma.code`<LogoSuite${figma.helpers.react.renderProp('align', align)}${figma.helpers.react.renderProp(
    'hasDivider',
    hasDivider,
  )}>
        ${heading}
        ${description}
        ${logobar}
      </LogoSuite>`,
}

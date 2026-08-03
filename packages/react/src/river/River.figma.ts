// url=https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=375-8463
// component=River

import figma from 'figma'

const align = figma.selectedInstance.getEnum('align', {
  start: 'start',
  center: 'center',
  end: 'end',
})
const imageTextRatio = figma.selectedInstance.getEnum('imageTextRatio', {
  '50:50': '50:50',
  '60:40': '60:40',
})
const content = (function () {
  const nestedLayer0 = figma.selectedInstance.findInstance('Content')
  return {
    headingText: nestedLayer0.type !== 'ERROR' ? nestedLayer0.findText('Heading').__render__() : undefined,
    descriptionText: nestedLayer0.type !== 'ERROR' ? nestedLayer0.findText('Description').__render__() : undefined,
    link:
      nestedLayer0.type !== 'ERROR'
        ? nestedLayer0.getBoolean('link?', {
            true: figma.helpers.react.jsxElement('<Link href="#">Link text</Link>'),
            false: undefined,
          })
        : undefined,
  }
})()

export default {
  id: 'River',
  imports: ["import { Heading, River, Text } from '@primer/react-brand'"],
  example: figma.code`<River${figma.helpers.react.renderProp('align', align)}${figma.helpers.react.renderProp(
    'imageTextRatio',
    imageTextRatio,
  )}>
      <River.Content>
        <>
          <Heading>${figma.helpers.react.renderChildren(content.headingText)}</Heading>
          <Text>${figma.helpers.react.renderChildren(content.descriptionText)}</Text>
          ${figma.helpers.react.renderChildren(content.link)}
        </>
      </River.Content>
      <River.Visual rounded>
        <img src="https://raw.githubusercontent.com/primer/brand/refs/heads/main/apps/next-docs/public/images/placeholder.png" alt="alt description"/>
      </River.Visual>
    </River>`,
  metadata: {nestable: true},
}

import React from 'react'
import {Meta} from '@storybook/react'
import {Bento} from '.'
import {Link} from '../Link'
import placeholderImage from '../fixtures/images/placeholder-600x400.png'

import {CopilotIcon} from '@primer/octicons-react'
import {HeadingSizes, HeadingTags} from '../Heading'

export default {
  title: 'Components/Bento',
  component: Bento,
} as Meta<typeof Bento>

export const Default = () => (
  <Bento>
    <Bento.Item rowSpan={{xsmall: 4, small: 5}} flow={{xsmall: 'row', small: 'row'}}>
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}} leadingVisual={<CopilotIcon />}>
        <Bento.Heading>
          Push what&apos;s possible with GitHub Copilot, the world&apos;s most trusted and widely adopted AI developer
          tool.
        </Bento.Heading>
        <Link href="#">Learn more about Copilot</Link>
      </Bento.Content>
    </Bento.Item>
  </Bento>
)

export const Playground = ({
  contentVisible,
  contentLeadingVisualVisible,
  contentLinkVisible,
  contentPadding,
  contentHorizontalAlign,
  contentVerticalAlign,
  headingText,
  headingAs,
  headingSize,
  visualVisible,
  visualFillMedia,
  visualPosition,
  visualPadding,
  ...args
}) => (
  <Bento>
    <Bento.Item {...args}>
      {contentVisible && (
        <Bento.Content
          leadingVisual={contentLeadingVisualVisible && <CopilotIcon />}
          padding={contentPadding}
          horizontalAlign={contentHorizontalAlign}
          verticalAlign={contentVerticalAlign}
        >
          <Bento.Heading as={headingAs} size={headingSize}>
            {headingText}
          </Bento.Heading>
          {contentLinkVisible && <Link href="#">Call to action</Link>}
        </Bento.Content>
      )}

      {visualVisible && (
        <Bento.Visual fillMedia={visualFillMedia} position={visualPosition} padding={visualPadding}>
          <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
        </Bento.Visual>
      )}
    </Bento.Item>
  </Bento>
)
Playground.storyName = 'Playground'
Playground.args = {
  flow: 'column',
  colorMode: 'light',
  visualAsBackground: false,
  order: 'default',
  contentVisible: true,
  contentLeadingVisualVisible: true,
  contentLinkVisible: true,
  contentPadding: 'normal',
  contentHorizontalAlign: 'start',
  contentVerticalAlign: 'center',
  headingText: 'Heading',
  headingAs: 'h2',
  headingSize: '3',
  visualVisible: true,
  visualFillMedia: true,
  visualPosition: '50% 50%',
  visualPadding: undefined,
}
Playground.argTypes = {
  flow: {
    options: ['row', 'column'],
    control: 'radio',
    table: {
      category: 'Bento.Item',
    },
  },
  colorMode: {
    options: ['light', 'dark'],
    control: 'radio',
    table: {
      category: 'Bento.Item',
    },
  },
  visualAsBackground: {
    control: 'boolean',
    table: {
      category: 'Bento.Item',
    },
  },
  order: {
    options: ['default', 'reverse'],
    control: 'radio',
    table: {
      category: 'Bento.Item',
    },
  },
  contentVisible: {
    name: 'visible',
    control: 'boolean',
    table: {
      category: 'Bento.Content',
    },
  },
  contentLeadingVisualVisible: {
    name: 'leadingVisual visible',
    control: 'boolean',
    table: {
      category: 'Bento.Content',
    },
  },
  contentLinkVisible: {
    name: 'Link visible',
    control: 'boolean',
    table: {
      category: 'Bento.Content',
    },
  },
  contentPadding: {
    name: 'padding',
    options: ['condensed', 'normal', 'spacious'],
    control: 'radio',
    table: {
      category: 'Bento.Content',
    },
  },
  contentHorizontalAlign: {
    name: 'horizontalAlign',
    options: ['start', 'center', 'end'],
    control: 'inline-radio',
    table: {
      category: 'Bento.Content',
    },
  },
  contentVerticalAlign: {
    name: 'verticalAlign',
    options: ['start', 'center', 'end'],
    control: 'inline-radio',
    table: {
      category: 'Bento.Content',
    },
  },
  headingText: {
    name: 'text',
    control: 'text',
    table: {
      category: 'Bento.Heading',
    },
  },
  headingAs: {
    name: 'as',
    control: 'inline-radio',
    options: HeadingTags,
    table: {
      category: 'Bento.Heading',
    },
  },
  headingSize: {
    name: 'size',
    control: 'inline-radio',
    options: HeadingSizes,
    table: {
      category: 'Bento.Heading',
    },
  },
  visualVisible: {
    name: 'visible',
    control: 'boolean',
    table: {
      category: 'Bento.Visual',
    },
  },
  visualFillMedia: {
    name: 'fillMedia',
    control: 'boolean',
    table: {
      category: 'Bento.Visual',
    },
  },
  visualPosition: {
    name: 'position',
    control: 'text',
    table: {
      category: 'Bento.Visual',
    },
  },
  visualPadding: {
    name: 'padding',
    options: [undefined, 'condensed', 'normal', 'spacious'],
    control: 'radio',
    table: {
      category: 'Bento.Visual',
    },
  },
}

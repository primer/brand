import React from 'react'
import {Meta} from '@storybook/react'

import {ShowcaseBlock} from './ShowcaseBlock'

export default {
  title: 'Evergreen templates/Blocks/Showcase',
  component: ShowcaseBlock,
} as Meta<typeof ShowcaseBlock>

export const Default = () => (
  <ShowcaseBlock
    items={[
      {
        heading: 'Attribute commits with collaborators easily',
        content:
          'Quickly add co-authors to your commit. Great for pairing and excellent for sending a little love/credit to that special someone who helped fix that gnarly bug of yours. See the attribution on the history page, undo an accidental attribution, and see the co-authors on github.com',
        imageSrc: 'https://desktop.github.com/images/upgrade/co-authoring.png',
        imageAlt: 'Image of Co-Authoring Feature for Desktop',
      },

      {
        heading: 'Checkout branches with pull requests and view CI statuses',
        content:
          "See all open pull requests for your repositories and check them out as if they were a local branch, even if they're from upstream branches or forks. See which pull requests pass commit status checks, too!",
        imageSrc: 'https://desktop.github.com/images/upgrade/pr-checks.png',
        imageAlt: 'Image of Pull Request List and CI Check Feature',
      },

      {
        heading: 'Syntax highlighted diffs',
        content:
          'The new GitHub Desktop supports syntax highlighting when viewing diffs for a variety of different languages.',
        imageSrc: 'https://desktop.github.com/images/upgrade/syntax-highlighting.png',
        imageAlt: 'Image of Syntax Highlighted Diff Feature',
      },
    ]}
  />
)

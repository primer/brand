import React from 'react'
import {Meta} from '@storybook/react'

import {FooterBannerBlock} from './FooterBannerBlock'

export default {
  title: 'Evergreen templates/Blocks/Footer banner',
  component: FooterBannerBlock,
} as Meta<typeof FooterBannerBlock>

export const Default = () => (
  <FooterBannerBlock
    heading="Ready for best-in-class enterprise security?"
    description="GitHub provides end-to-end DevSecOps, where security is embedded directly into the developer workflow—empowering you to ship secure software fast."
    primaryCTA={{
      label: 'Explore GitHub Advanced Security',
      href: '#',
    }}
  />
)

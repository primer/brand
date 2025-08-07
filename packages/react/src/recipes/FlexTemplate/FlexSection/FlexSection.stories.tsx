import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {ColorModesEnum} from '../../../ThemeProvider'
import {themeDetailsMap} from '../helpers'
import {FlexSection} from './FlexSection'

export default {
  title: 'Recipes/FlexTemplate/FlexSection',
  component: FlexSection,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          // disable color-contrast rule as the IDE is presentational
          {
            id: 'color-contrast',
            enabled: false,
            element: 'breakout-with-ide',
          },
        ],
      },
    },
  },
  args: {
    gridOverlay: false,
    colorMode: ColorModesEnum.LIGHT,
    accentColor: 'ai',

    sectionIntroAlign: 'center',
    sectionIntroVisible: true,
    sectionIntroText: [
      <b key="highlighted-text">Here we explain why this came to be.</b>,
      ` This is a short statement about the intention
    of the feature and why we think it's cool, keep it real.`,
    ],

    pillarVisible: true,
    pillarBackground: false,

    logoSuiteVisible: true,

    prose: {
      visible: true,
      text: `
        <p>
          <a href="https://docs.github.com/en/enterprise-server@3.5/admin/overview/about-github-enterprise-server">GitHub Enterprise Server</a>
          is the self-hosted version of GitHub Enterprise. It is installed on-premises or on a private
          cloud and provides organizations with a secure and customizable source code management and
          collaboration platform.
        </p>

        <p>
          One of the key advantages of GitHub Enterprise Server is that it provides organizations with
          complete control over their source code and data. Organizations can choose where to store their
          repositories and can control who has access to them. Administrators can also customize the
          platform to meet specific needs, such as integrating other tools or implementing custom
          workflows.
        </p>

        <p>
          GitHub Enterprise Server also offers enhanced security and compliance features. Organizations
          can configure their instance to meet their specific security requirements, such as using LDAP or
          SAML for authentication, setting up two-factor authentication, or implementing network security
          measures. Compliance features are also included, such as audit logs, access controls, and
          vulnerability scanning.
        </p>
      `,
    },

    rivers: [
      {
        visible: true,
        type: 'breakout',
        title: 'Dive into the first sub feature with a river',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar.',
        ctaText: 'Learn more',
      },
      {
        visible: true,
        type: 'start',
        title: 'Dive into the first sub feature with a river',
        description:
          'Here we explain why this came to be. This is a short statement about the intention of the feature and why we think its cool, keep it real.',
        ctaText: 'Learn more',
      },
      {
        visible: true,
        type: 'start',
        title: 'Dive into the first sub feature with a river',
        description:
          'Here we explain why this came to be. This is a short statement about the intention of the feature and why we think its cool, keep it real.',
        ctaText: 'Learn more',
      },
      {
        visible: true,
        type: 'start',
        title: 'Dive into the first sub feature with a river',
        description:
          'Here we explain why this came to be. This is a short statement about the intention of the feature and why we think its cool, keep it real.',
        ctaText: 'Learn more',
      },
    ],

    testimonialVisible: true,
    testimonialQuantity: 1,

    ctaBannerVisible: true,
    ctaBannerShowBg: true,

    cardsVisible: true,
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    gridOverlay: {
      name: 'enable grid overlay',
      control: 'boolean',
      table: {
        category: 'General',
      },
    },
    colorMode: {
      name: 'mode',
      control: 'inline-radio',
      options: [ColorModesEnum.LIGHT, ColorModesEnum.DARK],
      table: {
        category: 'Theming',
      },
    },
    accentColor: {
      name: 'theme',
      control: 'radio',
      options: Object.keys(themeDetailsMap),
      table: {
        category: 'Theming',
      },
    },
    /**
     * Section intro
     */
    sectionIntroAlign: {
      control: 'inline-radio',
      options: ['start', 'center'],
      name: 'align',
      table: {
        category: 'Section: Introduce',
      },
    },
    sectionIntroText: {
      control: 'text',
      name: 'text',
      table: {
        category: 'Section: Introduce',
      },
    },
    sectionIntroVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: Introduce',
      },
    },
    /**
     * Pillars
     */
    pillarVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: Pillars',
      },
    },
    pillarBackground: {
      control: 'boolean',
      name: 'hasBackground',
      table: {
        category: 'Section: Pillars',
      },
    },
    /**
     * LogoSuite
     */
    logoSuiteVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: LogoSuite',
      },
    },
    /**
     * Testimonial
     */
    testimonialVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: Testimonial',
      },
    },
    testimonialQuantity: {
      control: 'inline-radio',
      options: [1, 2],
      name: 'quantity',
      table: {
        category: 'Section: Testimonial',
      },
    },
    /**
     * CTABanner
     */
    ctaBannerVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: CTABanner',
      },
    },
    ctaBannerShowBg: {
      control: 'boolean',
      name: 'showBg',
      table: {
        category: 'Section: CTABanner',
      },
    },
    /**
     * Cards
     */
    cardsVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: Cards',
      },
    },
  },
} as Meta<typeof FlexSection>

export const FlexSectionDefault: StoryFn<typeof FlexSection> = args => <FlexSection {...args} />

FlexSectionDefault.storyName = 'Default'
FlexSectionDefault.args = {
  variant: 'Default',
}

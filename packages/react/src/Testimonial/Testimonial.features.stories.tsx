import React from 'react'
import type {StoryObj} from '@storybook/react'
import {Trans, useTranslation} from 'react-i18next'

import {Testimonial, TestimonialProps} from '.'
import {Box, Grid, Stack, Text, ThemeProvider} from '..'
import hubotAvatar from '../fixtures/images/avatar-hubot.png'
import styles from './Testimonial.stories.module.css'

type MetaProps = TestimonialProps

const meta = {component: Testimonial, title: 'Components/Testimonial/Features'}
export default meta

type Story = StoryObj<MetaProps>

export const Avatar: Story = {
  render: function AvatarExample() {
    const {t} = useTranslation('Testimonial')

    return (
      <div style={{width: 400, maxWidth: '100%'}}>
        <Testimonial>
          <Testimonial.Quote>{t('automationQuote')}</Testimonial.Quote>
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
        </Testimonial>
      </div>
    )
  },
}

export const ColoredQuoteMark: Story = {
  args: {
    quoteMarkColor: 'blue',
  },
  render: function ColoredQuoteMarkExample(args) {
    const {t} = useTranslation('Testimonial')

    return (
      <div style={{width: 400, maxWidth: '100%'}}>
        <Testimonial {...args}>
          <Testimonial.Quote>{t('lunchQuote')}</Testimonial.Quote>
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
        </Testimonial>
      </div>
    )
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: function LargeExample(args) {
    const {t} = useTranslation('Testimonial')

    return (
      <div style={{width: 720, maxWidth: '100%'}}>
        <Testimonial {...args}>
          <Testimonial.Quote>{t('automationQuote')}</Testimonial.Quote>
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
        </Testimonial>
      </div>
    )
  },
}

export const LargeHighlightedPortion: Story = {
  args: {
    size: 'large',
  },
  render: function LargeHighlightedPortionExample(args) {
    const {t} = useTranslation('Testimonial')

    return (
      <div style={{width: 720, maxWidth: '100%'}}>
        <Testimonial {...args}>
          <Testimonial.Quote>
            <Trans t={t} i18nKey="automationHighlighted" components={{highlight: <b />}} />
          </Testimonial.Quote>
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
        </Testimonial>
      </div>
    )
  },
}

export const Variants: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: function VariantsExample({hasBorder}) {
    const {t} = useTranslation('Testimonial')

    return (
      <Stack
        direction={{
          narrow: 'vertical',
          wide: 'horizontal',
        }}
        padding="none"
        gap="none"
      >
        <ThemeProvider colorMode="dark">
          <Box
            backgroundColor="default"
            paddingBlockStart={128}
            paddingBlockEnd={128}
            paddingInlineStart={48}
            paddingInlineEnd={48}
          >
            <Testimonial variant="subtle" hasBorder={hasBorder}>
              <Testimonial.Quote>
                <Trans t={t} i18nKey="automationHighlighted" components={{highlight: <b />}} />
              </Testimonial.Quote>
              <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
              <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            </Testimonial>
          </Box>
          <Box
            backgroundColor="subtle"
            paddingBlockStart={128}
            paddingBlockEnd={128}
            paddingInlineStart={48}
            paddingInlineEnd={48}
          >
            <Testimonial variant="default" hasBorder={hasBorder}>
              <Testimonial.Quote>
                <Trans t={t} i18nKey="automationHighlighted" components={{highlight: <b />}} />
              </Testimonial.Quote>
              <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
              <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            </Testimonial>
          </Box>
        </ThemeProvider>
        <ThemeProvider>
          <Box
            backgroundColor="default"
            paddingBlockStart={128}
            paddingBlockEnd={128}
            paddingInlineStart={48}
            paddingInlineEnd={48}
          >
            <Testimonial variant="subtle" hasBorder={hasBorder}>
              <Testimonial.Quote>
                <Trans t={t} i18nKey="automationHighlighted" components={{highlight: <b />}} />
              </Testimonial.Quote>
              <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
              <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            </Testimonial>
          </Box>
          <Box
            backgroundColor="subtle"
            paddingBlockStart={128}
            paddingBlockEnd={128}
            paddingInlineStart={48}
            paddingInlineEnd={48}
          >
            <Testimonial variant="default" hasBorder={hasBorder}>
              <Testimonial.Quote>
                <Trans t={t} i18nKey="automationHighlighted" components={{highlight: <b />}} />
              </Testimonial.Quote>
              <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
              <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            </Testimonial>
          </Box>
        </ThemeProvider>
      </Stack>
    )
  },
}

export const VariantsWithoutBorder: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: function VariantsWithoutBorderExample({hasBorder = false}) {
    const {t} = useTranslation('Testimonial')

    return (
      <Stack
        direction={{
          narrow: 'vertical',
          wide: 'horizontal',
        }}
        padding="none"
        gap="none"
      >
        <ThemeProvider colorMode="dark">
          <Box
            backgroundColor="default"
            paddingBlockStart={128}
            paddingBlockEnd={128}
            paddingInlineStart={48}
            paddingInlineEnd={48}
          >
            <Testimonial variant="subtle" hasBorder={hasBorder}>
              <Testimonial.Quote>
                <Trans t={t} i18nKey="automationHighlighted" components={{highlight: <b />}} />
              </Testimonial.Quote>
              <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
              <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            </Testimonial>
          </Box>
          <Box
            backgroundColor="subtle"
            paddingBlockStart={128}
            paddingBlockEnd={128}
            paddingInlineStart={48}
            paddingInlineEnd={48}
          >
            <Testimonial variant="default" hasBorder={hasBorder}>
              <Testimonial.Quote>
                <Trans t={t} i18nKey="automationHighlighted" components={{highlight: <b />}} />
              </Testimonial.Quote>
              <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
              <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            </Testimonial>
          </Box>
        </ThemeProvider>
        <ThemeProvider>
          <Box
            backgroundColor="default"
            paddingBlockStart={128}
            paddingBlockEnd={128}
            paddingInlineStart={48}
            paddingInlineEnd={48}
          >
            <Testimonial variant="subtle" hasBorder={hasBorder}>
              <Testimonial.Quote>
                <Trans t={t} i18nKey="automationHighlighted" components={{highlight: <b />}} />
              </Testimonial.Quote>
              <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
              <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            </Testimonial>
          </Box>
          <Box
            backgroundColor="subtle"
            paddingBlockStart={128}
            paddingBlockEnd={128}
            paddingInlineStart={48}
            paddingInlineEnd={48}
          >
            <Testimonial variant="default" hasBorder={hasBorder}>
              <Testimonial.Quote>
                <Trans t={t} i18nKey="automationHighlighted" components={{highlight: <b />}} />
              </Testimonial.Quote>
              <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
              <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            </Testimonial>
          </Box>
        </ThemeProvider>
      </Stack>
    )
  },
}

export const Expressive: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: function ExpressiveExample() {
    const {t} = useTranslation('Testimonial')

    return (
      <Grid enableGutters={false}>
        <Grid.Column className={styles.expressiveContainer} span={12}>
          <Testimonial variant="expressive" size="large">
            <Testimonial.Quote>
              <Trans t={t} i18nKey="picturesHighlighted" components={{highlight: <em />}} />
            </Testimonial.Quote>
            <Testimonial.Link href="#">{t('readStory')}</Testimonial.Link>
            <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          </Testimonial>
        </Grid.Column>
      </Grid>
    )
  },
}

export const SpeakerNameScrollingAnimation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: function SpeakerNameScrollingAnimationExample() {
    const {t} = useTranslation('Testimonial')

    return (
      <div className={styles.speakerNameAnimation}>
        <Text className={styles.speakerNameAnimationPrompt}>{t('scrollDown')}</Text>
        <Grid enableGutters={false}>
          <Grid.Column className={styles.expressiveContainer} span={12}>
            <Testimonial variant="expressive" size="large">
              <Testimonial.Quote>
                <Trans t={t} i18nKey="picturesHighlighted" components={{highlight: <em />}} />
              </Testimonial.Quote>
              <Testimonial.Link href="#">{t('readStory')}</Testimonial.Link>
              <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
              <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
            </Testimonial>
          </Grid.Column>
        </Grid>
      </div>
    )
  },
}

export const ExpressiveTablet: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    viewport: {value: 'ipad'},
  },
  render: function ExpressiveTabletExample() {
    const {t} = useTranslation('Testimonial')

    return (
      <Grid enableGutters={false}>
        <Grid.Column className={styles.expressiveContainer} span={12}>
          <Testimonial variant="expressive" size="large">
            <Testimonial.Quote>
              <Trans t={t} i18nKey="picturesHighlighted" components={{highlight: <em />}} />
            </Testimonial.Quote>
            <Testimonial.Link href="#">{t('readStory')}</Testimonial.Link>
            <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          </Testimonial>
        </Grid.Column>
      </Grid>
    )
  },
}

export const ExpressiveMobile: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: function ExpressiveMobileExample() {
    const {t} = useTranslation('Testimonial')

    return (
      <Grid enableGutters={false}>
        <Grid.Column className={styles.expressiveContainer} span={12}>
          <Testimonial variant="expressive" size="large">
            <Testimonial.Quote>
              <Trans t={t} i18nKey="picturesHighlighted" components={{highlight: <em />}} />
            </Testimonial.Quote>
            <Testimonial.Link href="#">{t('readStory')}</Testimonial.Link>
            <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          </Testimonial>
        </Grid.Column>
      </Grid>
    )
  },
}

export const ExpressiveDark: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <ThemeProvider colorMode="dark">
        <Box backgroundColor="default">
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  render: function ExpressiveDarkExample() {
    const {t} = useTranslation('Testimonial')

    return (
      <Grid enableGutters={false}>
        <Grid.Column className={styles.expressiveContainer} span={12}>
          <Testimonial variant="expressive" size="large">
            <Testimonial.Quote>
              <Trans t={t} i18nKey="picturesHighlighted" components={{highlight: <em />}} />
            </Testimonial.Quote>
            <Testimonial.Link href="#">{t('readStory')}</Testimonial.Link>
            <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
            <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          </Testimonial>
        </Grid.Column>
      </Grid>
    )
  },
}

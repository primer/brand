import React from 'react'
import type {StoryFn, Meta} from '@storybook/react'
import {Section} from '.'
import {Hero, Stack, SectionIntro, Text, ThemeProvider} from '..'
import styles from './Section.features.module.css'

import darkHeroBg from '../fixtures/images/background-dark-collaboration.webp'
import lightHeroBg from '../fixtures/images/background-light-collaboration.webp'
import backgroundCopilotSection from '../fixtures/images/background-copilot-section-dark.webp'
import backgroundCopiloMasktSection from '../fixtures/images/background-copilot-mask-section-dark.svg'

export default {
  title: 'Components/Section/Features',
  component: Section,
} as Meta<typeof Section>

export const DefaultPadding: StoryFn<typeof Section> = () => {
  return (
    <>
      <Section className={styles.paddingItem}>
        <Text as="div" className={styles.paddingInnerItem}>
          Default padding
        </Text>
      </Section>
    </>
  )
}

export const paddingVariants: StoryFn<typeof Section> = () => {
  return (
    <Stack direction="vertical" padding="none">
      <Section paddingBlockStart="none" paddingBlockEnd="none" className={styles.paddingItem}>
        <Text as="div" className={styles.paddingInnerItem}>
          No padding
        </Text>
      </Section>
      <Section paddingBlockStart="condensed" paddingBlockEnd="condensed" className={styles.paddingItem}>
        <Text as="div" className={styles.paddingInnerItem}>
          Condensed padding
        </Text>
      </Section>
      <Section paddingBlockStart="normal" paddingBlockEnd="normal" className={styles.paddingItem}>
        <Text as="div" className={styles.paddingInnerItem}>
          Normal padding
        </Text>
      </Section>
      <Section paddingBlockStart="spacious" paddingBlockEnd="spacious" className={styles.paddingItem}>
        <Text as="div" className={styles.paddingInnerItem}>
          Spacious padding
        </Text>
      </Section>
    </Stack>
  )
}

export const IndependentPadding: StoryFn<typeof Section> = () => {
  return (
    <>
      <Section paddingBlockStart="condensed" paddingBlockEnd="spacious" className={styles.paddingItem}>
        <Text as="div" className={styles.paddingInnerItem}>
          Section with condensed padding top and spacious padding bottom
        </Text>
      </Section>
    </>
  )
}

export const ResponsivePadding: StoryFn<typeof Section> = () => {
  return (
    <>
      <Section
        paddingBlockStart={{narrow: 'spacious', regular: 'none', wide: 'condensed'}}
        paddingBlockEnd={{narrow: 'condensed', regular: 'normal', wide: 'spacious'}}
        className={styles.paddingItem}
      >
        <Text as="div" className={styles.paddingInnerItem}>
          Section with responsive paddings
        </Text>
      </Section>
    </>
  )
}

export const WithFullWidthContainer: StoryFn<typeof Section> = () => {
  return (
    <Section fullWidth className={styles.paddingItem}>
      <Text as="div" className={styles.paddingInnerItem}>
        Full width container
      </Text>
    </Section>
  )
}

export const BackgroundColor: StoryFn<typeof Section> = () => {
  return (
    <>
      <Section backgroundColor="subtle">
        <SectionIntro align="center">
          <SectionIntro.Heading size="2">A section with a predefined background color</SectionIntro.Heading>
        </SectionIntro>
      </Section>
    </>
  )
}

export const CustomBackgroundColor: StoryFn<typeof Section> = () => {
  return (
    <>
      <Section backgroundColor="#FFF8F8">
        <SectionIntro align="center">
          <SectionIntro.Heading size="2">A section with a custom background color</SectionIntro.Heading>
        </SectionIntro>
      </Section>
    </>
  )
}

export const ResponsiveBackgroundColor: StoryFn<typeof Section> = () => {
  return (
    <>
      <Section backgroundColor={{narrow: 'subtle', regular: '#F8F8Ff', wide: '#FFF8F8'}}>
        <SectionIntro align="center">
          <SectionIntro.Heading size="2">A section with a custom responsive background colors</SectionIntro.Heading>
        </SectionIntro>
      </Section>
    </>
  )
}

export const BackgroundImage: StoryFn<typeof Section> = () => {
  return (
    <Section backgroundColor="default" backgroundImageSrc={lightHeroBg} backgroundImagePosition="top center">
      <SectionIntro align="center">
        <SectionIntro.Heading size="2">A section with a background image</SectionIntro.Heading>
      </SectionIntro>
    </Section>
  )
}

export const MultipleBackgroundImages: StoryFn<typeof Section> = () => {
  return (
    <ThemeProvider colorMode="dark">
      <Section
        paddingBlockStart="spacious"
        paddingBlockEnd="spacious"
        backgroundColor="default"
        backgroundImageSrc={[backgroundCopiloMasktSection, backgroundCopilotSection]}
        backgroundImagePosition={['bottom -1px center', 'center']}
        backgroundImageSize={['auto', 'cover']}
      >
        <SectionIntro align="center">
          <SectionIntro.Heading size="2">A section with multiple background images</SectionIntro.Heading>
        </SectionIntro>
      </Section>
      <Section backgroundColor="default">
        <SectionIntro align="center">
          <SectionIntro.Heading size="2">Another section</SectionIntro.Heading>
        </SectionIntro>
      </Section>
    </ThemeProvider>
  )
}

export const Rounded: StoryFn<typeof Section> = () => {
  return (
    <>
      <ThemeProvider colorMode="dark">
        <Section backgroundColor="default" backgroundImageSrc={darkHeroBg} backgroundImagePosition="top center">
          <Hero align="center">
            <Hero.Heading>Just a regular section</Hero.Heading>
            <Hero.Description>(See rounded section below)</Hero.Description>
          </Hero>
        </Section>
      </ThemeProvider>
      <Section backgroundColor="default" rounded>
        <SectionIntro align="center">
          <SectionIntro.Heading>A section with rounded corners</SectionIntro.Heading>
          <SectionIntro.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore
          </SectionIntro.Description>
        </SectionIntro>
      </Section>
    </>
  )
}

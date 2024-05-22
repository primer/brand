import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {Section} from '.'
import {Stack, SectionIntro, Text, ThemeProvider} from '..'
import styles from './Section.features.module.css'

import backgroundStars from '../fixtures/images/background-stars.png'

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
      <Section backgroundColor="var(--brand-color-canvas-inset)">
        <SectionIntro>
          <SectionIntro.Heading>A section with a custom background color</SectionIntro.Heading>
        </SectionIntro>
      </Section>
    </>
  )
}

export const BackgroundImage: StoryFn<typeof Section> = () => {
  return (
    <ThemeProvider colorMode="dark">
      <Section
        backgroundImageSrc={`url(${backgroundStars})`}
        backgroundImagePosition="top center"
        style={{minHeight: '800px'}}
      >
        <SectionIntro>
          <SectionIntro.Heading>A section with a custom background image</SectionIntro.Heading>
        </SectionIntro>
      </Section>
    </ThemeProvider>
  )
}

export const Rounded: StoryFn<typeof Section> = () => {
  return (
    <>
      <Section
        backgroundImageSrc={`url(${backgroundStars})`}
        backgroundImagePosition="top center"
        style={{minHeight: '60vh'}}
      >
        <ThemeProvider colorMode="dark">
          <SectionIntro>
            <SectionIntro.Heading>Section 1</SectionIntro.Heading>
            <SectionIntro.Description>Section description.</SectionIntro.Description>
          </SectionIntro>
        </ThemeProvider>
      </Section>
      <Section backgroundColor="var(--brand-color-canvas-default)" rounded>
        <SectionIntro>
          <SectionIntro.Heading>Section 2 is rounded</SectionIntro.Heading>
          <SectionIntro.Description>Section description.</SectionIntro.Description>
        </SectionIntro>
      </Section>
    </>
  )
}

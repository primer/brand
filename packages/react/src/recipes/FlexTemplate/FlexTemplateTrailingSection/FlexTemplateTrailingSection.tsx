import React from 'react'
import {
  Section,
  Grid,
  Stack,
  FAQ,
  FAQGroup,
  Footnotes,
  CTABanner,
  Button,
  type PrimerBrandButtonType,
  Card,
  Box,
  SectionIntro,
  Prose,
} from '../../..'
import type {FlexTemplateData, FlexTemplateCard, FlexTemplateFootnote} from '../FlexTemplate.types'

import styles from './FlexTemplateTrailingSection.module.css'

export type FlexTemplateTrailingSectionProps = {
  template: FlexTemplateData
}

export function FlexTemplateTrailingSection({template}: FlexTemplateTrailingSectionProps) {
  const ctaBannerFields = template.ctaBanner
  const ctaBannerCardsSource = ctaBannerFields?.cards ?? template.ctaBannerCards ?? []
  const ctaBannerCards = ctaBannerCardsSource.filter(Boolean) as FlexTemplateCard[]
  const ctaBannerSectionIntro = ctaBannerFields?.sectionIntro ?? template.ctaBannerSectionIntro
  const faqFields = template.faq
  const footnotes = (template.footnotes ?? []).filter(Boolean) as FlexTemplateFootnote[]
  const visualSettings = template.visualSettings ?? {}

  type ResolvedFaqEntry = {
    key: string
    heading?: string
    items: React.ReactElement[]
  }

  const resolvedFaqEntries = (faqFields?.faqs ?? [])
    .map<ResolvedFaqEntry | null>((faqEntry, faqIndex) => {
      const blocks = faqEntry.blocks
      const questions = blocks.flatMap(block => block.questions)
      const questionsWithCopy = questions.filter(questionEntry => Boolean(questionEntry.question))

      if (questionsWithCopy.length === 0) return null

      const faqItems = questionsWithCopy
        .map((questionEntry, questionIndex) => {
          const answerContent = questionEntry.answer
          const renderedAnswer =
            typeof answerContent === 'string' ? <Prose html={`<p>${answerContent}</p>`} /> : answerContent

          if (!renderedAnswer) {
            return null
          }

          return (
            <FAQ.Item key={`${questionEntry.title ?? questionEntry.question}-${questionIndex}`}>
              <FAQ.Question>{questionEntry.question}</FAQ.Question>
              <FAQ.Answer>{renderedAnswer}</FAQ.Answer>
            </FAQ.Item>
          )
        })
        .filter(Boolean) as React.ReactElement[]

      if (faqItems.length === 0) return null

      return {
        key: `${faqEntry.title ?? faqEntry.heading}-${faqIndex}`,
        heading: faqEntry.heading,
        items: faqItems,
      }
    })
    .filter(Boolean) as ResolvedFaqEntry[]

  const hasMultipleFaqEntries = resolvedFaqEntries.length > 1

  const trailingSectionBackgroundColor = visualSettings.trailingSectionBackgroundColor || 'default'
  const trailingSectionRoundedCorners = visualSettings.trailingSectionRoundedCorners || false

  const primaryButtonLabel = ctaBannerFields?.callToActionPrimary?.text
  const secondaryButtonLabel = ctaBannerFields?.callToActionSecondary?.text
  const ctaButtons: PrimerBrandButtonType[] = []

  if (primaryButtonLabel) {
    ctaButtons.push(
      <Button key="primary" variant={ctaBannerFields.callToActionPrimary?.variant ?? 'primary'}>
        {primaryButtonLabel}
      </Button>,
    )
  }

  if (secondaryButtonLabel) {
    ctaButtons.push(<Button key="secondary">{secondaryButtonLabel}</Button>)
  }

  return (
    <Section
      backgroundColor={trailingSectionBackgroundColor}
      paddingBlockStart="normal"
      paddingBlockEnd="none"
      rounded={trailingSectionRoundedCorners}
    >
      <Grid className={styles.trailingSectionGrid}>
        {ctaBannerFields && (
          <Grid.Column>
            <CTABanner
              hasShadow={false}
              align={ctaBannerFields.align ?? 'center'}
              backgroundColor={ctaBannerFields.backgroundColor}
              {...(ctaBannerFields.backgroundImageSrc && {
                backgroundImageSrc: ctaBannerFields.backgroundImageSrc,
              })}
            >
              {ctaBannerFields.heading && <CTABanner.Heading size="2">{ctaBannerFields.heading}</CTABanner.Heading>}
              {ctaBannerFields.description && (
                <CTABanner.Description>{ctaBannerFields.description}</CTABanner.Description>
              )}
              {ctaButtons.length > 0 ? <CTABanner.ButtonGroup>{ctaButtons}</CTABanner.ButtonGroup> : null}
            </CTABanner>

            {ctaBannerCards.length > 0 && (
              <Box className={styles.ctaBannerCards}>
                {ctaBannerSectionIntro && (
                  <SectionIntro
                    align={ctaBannerSectionIntro.align ?? 'center'}
                    fullWidth={ctaBannerSectionIntro.fullWidth ?? false}
                    className={styles.ctaBannerSectionIntro}
                  >
                    {ctaBannerSectionIntro.label && (
                      <SectionIntro.Label
                        size={ctaBannerSectionIntro.labelSize ?? 'medium'}
                        color={ctaBannerSectionIntro.labelColor ?? 'default'}
                      >
                        {typeof ctaBannerSectionIntro.label === 'string'
                          ? ctaBannerSectionIntro.label
                          : ctaBannerSectionIntro.label.text}
                      </SectionIntro.Label>
                    )}
                    {ctaBannerSectionIntro.heading && (
                      <SectionIntro.Heading size={ctaBannerSectionIntro.headingSize ?? '3'}>
                        {ctaBannerSectionIntro.heading}
                      </SectionIntro.Heading>
                    )}
                    {ctaBannerSectionIntro.description && (
                      <SectionIntro.Description>{ctaBannerSectionIntro.description}</SectionIntro.Description>
                    )}
                    {ctaBannerSectionIntro.linkText && ctaBannerSectionIntro.linkHref && (
                      <SectionIntro.Link
                        variant={ctaBannerSectionIntro.linkVariant ?? 'accent'}
                        href={ctaBannerSectionIntro.linkHref}
                      >
                        {ctaBannerSectionIntro.linkText}
                      </SectionIntro.Link>
                    )}
                  </SectionIntro>
                )}

                <Grid>
                  {ctaBannerCards.map((card, index) => (
                    <Grid.Column
                      key={index}
                      span={{
                        xsmall: 12,
                        small: 12,
                        medium: 6,
                        large: 4,
                        xlarge: 4,
                        xxlarge: 4,
                      }}
                    >
                      <Card
                        href={card.href || '#'}
                        fullWidth
                        hasBorder={false}
                        {...(card.ctaText ? {ctaText: card.ctaText} : {})}
                      >
                        {card.imageSrc && <Card.Image src={card.imageSrc} alt={card.imageAlt ?? ''} />}
                        {card.heading && <Card.Heading>{card.heading}</Card.Heading>}
                        {card.description && <Card.Description>{card.description}</Card.Description>}
                      </Card>
                    </Grid.Column>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid.Column>
        )}

        {faqFields && resolvedFaqEntries.length > 0 && (
          <Grid.Column>
            {hasMultipleFaqEntries ? (
              <FAQGroup>
                {faqFields.heading && <FAQGroup.Heading>{faqFields.heading}</FAQGroup.Heading>}
                {resolvedFaqEntries.map(entry => (
                  <FAQ key={entry.key}>
                    {entry.heading && <FAQ.Heading>{entry.heading}</FAQ.Heading>}
                    {entry.items}
                  </FAQ>
                ))}
              </FAQGroup>
            ) : (
              resolvedFaqEntries.map(entry => (
                <FAQ key={entry.key}>
                  {faqFields.heading && <FAQ.Heading>{faqFields.heading}</FAQ.Heading>}
                  {entry.heading && <FAQ.Subheading align="start">{entry.heading}</FAQ.Subheading>}
                  {entry.items}
                </FAQ>
              ))
            )}
          </Grid.Column>
        )}

        <Grid.Column>
          <Stack direction="vertical" gap="normal" padding="none">
            {footnotes.length > 0 && (
              <Footnotes>
                {footnotes.map(footnote => (
                  <Footnotes.Item key={footnote.id} id={footnote.id} {...(footnote.href ? {href: footnote.href} : {})}>
                    {footnote.copy}
                  </Footnotes.Item>
                ))}
              </Footnotes>
            )}
          </Stack>
        </Grid.Column>
      </Grid>
    </Section>
  )
}

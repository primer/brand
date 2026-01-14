import React from 'react'

import {Box, Grid, Hero, SubNav} from '../..'
import {FlexSection} from './FlexSection'
import {FlexTemplateTrailingSection} from './FlexTemplateTrailingSection'
import type {FlexTemplatePage, FlexTemplateData, FlexTemplateSection} from './FlexTemplate.types'

import styles from './FlexTemplate.module.css'
import {RedlineBackground} from '../../component-helpers'

export type FlexTemplateProps = {
  page: FlexTemplatePage
  className?: string
}

export function FlexTemplate({page, className}: FlexTemplateProps) {
  const templateFields: FlexTemplateData = page.template

  const heroFields = templateFields.hero ?? {}
  const heroBackgroundImage = templateFields.heroBackgroundImage
  const subnavFields = templateFields.subnav
  const sections = (templateFields.sections ?? []).filter(Boolean) as FlexTemplateSection[]

  const heroLabel = heroFields.label
  const heroLabelFields = heroLabel ? (typeof heroLabel === 'string' ? {text: heroLabel} : heroLabel) : undefined

  const heroPrimaryAction = heroFields.callToActionPrimary
  const heroSecondaryAction = heroFields.callToActionSecondary

  const heroImageAlt = heroFields.image?.description ?? (heroBackgroundImage?.image.description || '')

  const heroImagePositionSource = heroFields.imagePosition ?? heroBackgroundImage?.imagePosition
  const heroImagePosition = heroImagePositionSource?.includes('inline') ? 'inline-end' : 'block-end'
  const heroImageSrc = heroFields.imageSrc || heroBackgroundImage?.image.file.url

  const heroDescriptionVariant = heroFields.descriptionVariant === 'default' ? 'default' : 'muted'

  const subnavHeadingFields = subnavFields?.heading
  const subnavSubheadingFields = subnavFields?.subheading
  const subnavLinks = subnavFields?.links ?? []

  const heroDescription = heroFields.description

  return (
    <div className={className}>
      {/** Fake global header spacer */}
      <RedlineBackground height={72 + 32 + 42} />
      <div>
        {subnavFields ? (
          <SubNav hasShadow={Boolean(subnavFields.hasShadow)}>
            {subnavHeadingFields?.text ? (
              <SubNav.Heading
                href={subnavHeadingFields.href}
                {...(subnavHeadingFields.openInNewTab ? {target: '_blank', rel: 'noreferrer'} : {})}
              >
                {subnavHeadingFields.text}
              </SubNav.Heading>
            ) : null}
            {subnavSubheadingFields?.text ? (
              <SubNav.SubHeading
                href={subnavSubheadingFields.href}
                {...(subnavSubheadingFields.openInNewTab ? {target: '_blank', rel: 'noreferrer'} : {})}
              >
                {subnavSubheadingFields.text}
              </SubNav.SubHeading>
            ) : null}
            {subnavLinks.map((link, index) => {
              if (!link.text) return null
              return (
                <SubNav.Link
                  key={`${link.text}-${index}`}
                  href={link.href}
                  variant="default" // Appears to be configurable in SWP, but set to default for all pages
                  {...(link.openInNewTab ? {target: '_blank', rel: 'noreferrer'} : {})}
                >
                  {link.text}
                </SubNav.Link>
              )
            })}
          </SubNav>
        ) : null}
      </div>
      <div>
        <Grid>
          <Grid.Column>
            <Box paddingBlockEnd={80}>
              <Hero align={heroFields.align ?? 'start'} className={styles.hero}>
                {heroLabelFields?.text ? (
                  <Hero.Label animation="blinking-cursor" color={heroLabelFields.color}>
                    {heroLabelFields.text}
                  </Hero.Label>
                ) : null}
                {heroFields.heading ? <Hero.Heading>{heroFields.heading}</Hero.Heading> : null}
                {heroDescription ? (
                  <Hero.Description variant={heroDescriptionVariant}>{heroDescription}</Hero.Description>
                ) : null}
                {heroPrimaryAction?.href && heroPrimaryAction.text ? (
                  <Hero.PrimaryAction
                    variant={heroFields.callToActionPrimaryVariant ?? 'primary'}
                    href={heroPrimaryAction.href}
                    {...(heroPrimaryAction.openInNewTab ? {target: '_blank', rel: 'noreferrer'} : {})}
                  >
                    {heroPrimaryAction.text}
                  </Hero.PrimaryAction>
                ) : null}
                {heroSecondaryAction?.href && heroSecondaryAction.text ? (
                  <Hero.SecondaryAction
                    variant={heroFields.callToActionSecondaryVariant ?? 'secondary'}
                    href={heroSecondaryAction.href}
                    {...(heroSecondaryAction.openInNewTab ? {target: '_blank', rel: 'noreferrer'} : {})}
                  >
                    {heroSecondaryAction.text}
                  </Hero.SecondaryAction>
                ) : null}
                {heroImageSrc ? (
                  <Hero.Image position={heroImagePosition} src={heroImageSrc} alt={heroImageAlt} />
                ) : null}
              </Hero>
            </Box>
          </Grid.Column>
        </Grid>

        {sections.map(section => (
          <FlexSection key={section.id} component={section} />
        ))}

        <FlexTemplateTrailingSection template={templateFields} />
        {/**
         * Fake global footer spacer
         */}
        <RedlineBackground style={{height: 600, display: 'flex', flexDirection: 'column', gap: 'var(--base-size-32)'}}>
          <RedlineBackground
            style={{height: 84, marginTop: 'auto', backgroundColor: 'var(--brand-color-border-default)'}}
          />
        </RedlineBackground>
      </div>
    </div>
  )
}

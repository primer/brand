import React, {useCallback, useRef} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Accordion, AccordionRootProps, AccordionToggleColors} from '.'
import {Box, Stack, UnorderedList} from '../'
import {useTranslation} from 'react-i18next'

const meta: Meta = {
  title: 'Components/Accordion/Features',
  component: Accordion,
}
export default meta

export const Composition: StoryObj = {
  render: function CompositionComponent() {
    const {t} = useTranslation('Accordion')

    return (
      <>
        <Accordion>
          <Accordion.Heading>{t('github_startups_offer')}</Accordion.Heading>
          <Accordion.Content>
            <p>
              {t('github_startups_offer_answer')}{' '}
              <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
                {t('here')}
              </a>
              .
            </p>
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Heading>{t('who_eligible')}</Accordion.Heading>
          <Accordion.Content>
            <p>{t('who_eligible_answer')}</p>
            <UnorderedList>
              <UnorderedList.Item>{t('must_be_associated')}</UnorderedList.Item>
              <UnorderedList.Item>{t('self_funded')}</UnorderedList.Item>
              <UnorderedList.Item>{t('not_current_customer')}</UnorderedList.Item>
              <UnorderedList.Item>{t('no_previous_credits')}</UnorderedList.Item>
            </UnorderedList>
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Heading>{t('startup_not_eligible')}</Accordion.Heading>
          <Accordion.Content>
            <p>
              {t('startup_not_eligible_answer')}{' '}
              <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
                {t('here')}
              </a>
              .
            </p>
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Heading>{t('become_partner')}</Accordion.Heading>
          <Accordion.Content>
            <p>{t('become_partner_answer')}</p>
            <p>
              {' '}
              <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
                {t('apply_here')}
              </a>
              .
            </p>
          </Accordion.Content>
        </Accordion>
      </>
    )
  },
}

export const ToggleColors: StoryObj = {
  parameters: {
    colorMode: 'all',
  },
  render: function ToggleColorsComponent() {
    const {t} = useTranslation('Accordion')

    return (
      <Stack direction="vertical">
        <Box backgroundColor="default" padding="condensed">
          {AccordionToggleColors.map(color => (
            <Accordion key={color}>
              <Accordion.Heading toggleColor={color}>
                {t('Toggle color')}: {color}
              </Accordion.Heading>
              <Accordion.Content>
                <p>{t('Description')}</p>
              </Accordion.Content>
            </Accordion>
          ))}
        </Box>
      </Stack>
    )
  },
}

const headings = [
  "What's included in the GitHub for Startups offer?",
  'Who is eligible to apply?',
  'What if my startup is not eligible? Are there other resources for me?',
  'How can my organization become a GitHub for Startups partner?',
]

export const AlwaysExactlyOnePanelOpen: StoryObj = {
  render: function AlwaysExactlyOnePanelOpenComponent() {
    const {t} = useTranslation('Accordion')
    const containerRef = useRef<HTMLDivElement>(null)

    const onClick = useCallback<NonNullable<AccordionRootProps['onClick']>>(e => {
      // Prevent closing of an open accordion
      if (e.currentTarget.open) {
        e.preventDefault()
        return
      }

      if (!containerRef.current) return

      // Close all other accordions
      const openAccordions = containerRef.current.querySelectorAll('details[open]')
      for (const openAccordion of openAccordions) {
        if (openAccordion !== e.currentTarget) {
          openAccordion.removeAttribute('open')
        }
      }
    }, [])

    const onKeyDownCapture = useCallback<NonNullable<AccordionRootProps['onKeyDownCapture']>>(e => {
      // Prevent the escape key from closing the accordion
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
      }
    }, [])

    return (
      <div ref={containerRef}>
        {headings.map((heading, index) => (
          <Accordion key={index} open={index === 0} onClick={onClick} onKeyDownCapture={onKeyDownCapture}>
            <Accordion.Heading>{String(t(heading))}</Accordion.Heading>
            <Accordion.Content>
              <p>{t('lorem_ipsum')}</p>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
    )
  },
}

export const ExclusiveUsingNameAttribute: StoryObj = {
  render: function ExclusiveUsingNameAttributeComponent() {
    const {t} = useTranslation('Accordion')

    return (
      <>
        {headings.map((heading, index) => (
          <Accordion key={index} name="exclusive">
            <Accordion.Heading>{String(t(heading))}</Accordion.Heading>
            <Accordion.Content>
              <p>{t('lorem_ipsum')}</p>
            </Accordion.Content>
          </Accordion>
        ))}
      </>
    )
  },
}

export const ExclusiveWithoutUsingNameAttribute: StoryObj = {
  render: function ExclusiveWithoutUsingNameAttributeComponent() {
    const {t} = useTranslation('Accordion')
    const containerRef = useRef<HTMLDivElement>(null)

    const onClick = useCallback<NonNullable<AccordionRootProps['onClick']>>(e => {
      if (!containerRef.current) return

      // Close all other accordions
      const openAccordions = containerRef.current.querySelectorAll('details[open]')
      for (const openAccordion of openAccordions) {
        if (openAccordion !== e.currentTarget) {
          openAccordion.removeAttribute('open')
        }
      }
    }, [])

    return (
      <div ref={containerRef}>
        {headings.map((heading, index) => (
          <Accordion key={index} onClick={onClick}>
            <Accordion.Heading>{String(t(heading))}</Accordion.Heading>
            <Accordion.Content>
              <p>{t('lorem_ipsum')}</p>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
    )
  },
}

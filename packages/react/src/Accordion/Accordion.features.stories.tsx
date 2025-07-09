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
    const {t} = useTranslation()

    return (
      <>
        <Accordion>
          <Accordion.Heading>{t("What's included in the GitHub for Startups offer?")}</Accordion.Heading>
          <Accordion.Content>
            <p>
              {t(
                'All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and 50% off year two. Learn more about the features and capabilities of GitHub Enterprise',
              )}{' '}
              <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
                {t('here')}
              </a>
              .
            </p>
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Heading>{t('Who is eligible to apply?')}</Accordion.Heading>
          <Accordion.Content>
            <p>{t('Startups who meet the following criteria are eligible to apply for the program:')}</p>
            <UnorderedList>
              <UnorderedList.Item>
                {t('Must be associated with a current GitHub for Startups partner.')}
              </UnorderedList.Item>
              <UnorderedList.Item>{t('Self-funded or funded (Seed-Series A)')}</UnorderedList.Item>
              <UnorderedList.Item>{t('Not a current GitHub Enterprise customer')}</UnorderedList.Item>
              <UnorderedList.Item>
                {t('Must not have previously received credits for GitHub Enterprise')}
              </UnorderedList.Item>
            </UnorderedList>
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Heading>
            {t('What if my startup is not eligible? Are there other resources for me?')}
          </Accordion.Heading>
          <Accordion.Content>
            <p>
              If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise,
              please feel to sign up for a trial{' '}
              <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
                here
              </a>
              .
            </p>
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Heading>
            {t(
              'How can my organization become a GitHub for Startups partner?',
              'How can my organization become a GitHub for Startups partner?',
            )}
          </Accordion.Heading>
          <Accordion.Content>
            <p>
              {t(
                'Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups program.',
                'Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups program.',
              )}
            </p>
            <p>
              {' '}
              <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
                {t('Apply here')}
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
    const {t} = useTranslation()

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
    const {t} = useTranslation()
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
              <p>
                {t(
                  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quidem veniam vero omnis consequuntur cum quae libero dolor dicta odio in, corporis perspiciatis nesciunt facere. Eius vero culpa quae itaque?',
                )}
              </p>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
    )
  },
}

export const ExclusiveUsingNameAttribute: StoryObj = {
  render: function ExclusiveUsingNameAttributeComponent() {
    const {t} = useTranslation()

    return (
      <>
        {headings.map((heading, index) => (
          <Accordion key={index} name="exclusive">
            <Accordion.Heading>{String(t(heading))}</Accordion.Heading>
            <Accordion.Content>
              <p>
                {t(
                  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quidem veniam vero omnis consequuntur cum quae libero dolor dicta odio in, corporis perspiciatis nesciunt facere. Eius vero culpa quae itaque?',
                )}
              </p>
            </Accordion.Content>
          </Accordion>
        ))}
      </>
    )
  },
}

export const ExclusiveWithoutUsingNameAttribute: StoryObj = {
  render: function ExclusiveWithoutUsingNameAttributeComponent() {
    const {t} = useTranslation()
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
              <p>
                {t(
                  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quidem veniam vero omnis consequuntur cum quae libero dolor dicta odio in, corporis perspiciatis nesciunt facere. Eius vero culpa quae itaque?',
                )}
              </p>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
    )
  },
}

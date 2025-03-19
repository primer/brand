import React, {useCallback, useRef} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Accordion, AccordionRootProps, AccordionToggleColors} from '.'
import {Box, Stack, UnorderedList} from '../'

const meta: Meta = {
  title: 'Components/Accordion/Features',
  component: Accordion,
}
export default meta

export const Composition: StoryObj = {
  render: () => (
    <>
      <Accordion>
        <Accordion.Heading>What&apos;s included in the GitHub for Startups offer?</Accordion.Heading>
        <Accordion.Content>
          <p>
            All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and 50%
            off year two. Learn more about the features and capabilities of GitHub Enterprise{' '}
            <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
              here
            </a>
            .
          </p>
        </Accordion.Content>
      </Accordion>
      <Accordion>
        <Accordion.Heading>Who is eligible to apply?</Accordion.Heading>
        <Accordion.Content>
          <p>Startups who meet the following criteria are eligible to apply for the program:</p>
          <UnorderedList>
            <UnorderedList.Item>Must be associated with a current GitHub for Startups partner.</UnorderedList.Item>
            <UnorderedList.Item>Self-funded or funded (Seed-Series A)</UnorderedList.Item>
            <UnorderedList.Item>Not a current GitHub Enterprise customer</UnorderedList.Item>
            <UnorderedList.Item>Must not have previously received credits for GitHub Enterprise</UnorderedList.Item>
          </UnorderedList>
        </Accordion.Content>
      </Accordion>
      <Accordion>
        <Accordion.Heading>What if my startup is not eligible? Are there other resources for me?</Accordion.Heading>
        <Accordion.Content>
          <p>
            If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise, please
            feel to sign up for a trial{' '}
            <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
              here
            </a>
            .
          </p>
        </Accordion.Content>
      </Accordion>
      <Accordion>
        <Accordion.Heading>How can my organization become a GitHub for Startups partner?</Accordion.Heading>
        <Accordion.Content>
          <p>
            Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups
            program.
          </p>
          <p>
            {' '}
            <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
              Apply here
            </a>
            .
          </p>
        </Accordion.Content>
      </Accordion>
    </>
  ),
}

export const ToggleColors: StoryObj = {
  parameters: {
    colorMode: 'all',
  },
  render: () => {
    return (
      <Stack direction="vertical">
        <Box backgroundColor="default" padding="condensed">
          {AccordionToggleColors.map(color => (
            <Accordion key={color}>
              <Accordion.Heading toggleColor={color}>Toggle color: {color}</Accordion.Heading>
              <Accordion.Content>
                <p>Description</p>
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
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const containerRef = useRef<HTMLDivElement>(null)

    // eslint-disable-next-line react-hooks/rules-of-hooks
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
            <Accordion.Heading>{heading}</Accordion.Heading>
            <Accordion.Content>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quidem veniam vero omnis
                consequuntur cum quae libero dolor dicta odio in, corporis perspiciatis nesciunt facere. Eius vero culpa
                quae itaque?
              </p>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
    )
  },
}

export const ExclusiveUsingNameAttribute: StoryObj = {
  render: () => (
    <>
      {headings.map((heading, index) => (
        <Accordion key={index} name="exclusive">
          <Accordion.Heading>{heading}</Accordion.Heading>
          <Accordion.Content>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quidem veniam vero omnis consequuntur
              cum quae libero dolor dicta odio in, corporis perspiciatis nesciunt facere. Eius vero culpa quae itaque?
            </p>
          </Accordion.Content>
        </Accordion>
      ))}
    </>
  ),
}

export const ExclusiveWithoutUsingNameAttribute: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const containerRef = useRef<HTMLDivElement>(null)

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
            <Accordion.Heading>{heading}</Accordion.Heading>
            <Accordion.Content>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quidem veniam vero omnis
                consequuntur cum quae libero dolor dicta odio in, corporis perspiciatis nesciunt facere. Eius vero culpa
                quae itaque?
              </p>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
    )
  },
}

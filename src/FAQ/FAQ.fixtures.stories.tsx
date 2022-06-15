import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {FAQ} from '.'
import {Accordion, Text} from '..'
import {Container} from '../component-helpers'

export default {
  title: 'Components/FAQ/fixtures',
  component: FAQ
} as ComponentMeta<typeof FAQ>

type FixtureData = {
  question: string
  answer: React.ReactElement | React.ReactElement[]
}[]

const fixtureData: FixtureData = [
  {
    question: 'This is my first super sweet question',
    answer: (
      <p>
        Vestibulum at dolor justo.{' '}
        <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
          Curabitur
        </a>{' '}
        dictum feugiat elit, vitae vestibulum orci vestibulum sed. Donec interdum ligula at nisi rhoncus malesuada et
        non eros.
      </p>
    )
  },
  {
    question: 'This is my second super sweet question',
    answer: (
      <React.Fragment>
        <p>
          Vestibulum at dolor justo.{' '}
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            Curabitur
          </a>{' '}
          dictum feugiat elit, vitae vestibulum orci vestibulum sed. Donec interdum ligula at nisi rhoncus malesuada et
          non eros.
        </p>
        <ol>
          <li>
            <Text size="300" variant="muted">
              Must be associated with a current GitHub for Startups partner.
            </Text>
          </li>
          <li>
            <Text size="300" variant="muted">
              Self-funded or funded (Seed-Series A)
            </Text>
          </li>
          <li>
            <Text size="300" variant="muted">
              Not a current GitHub Enterprise customer
            </Text>
          </li>
          <li>
            <Text size="300" variant="muted">
              Must not have previously received credits for GitHub Enterprise
            </Text>
          </li>
        </ol>
      </React.Fragment>
    )
  },
  {
    question: 'This is my third super sweet question',
    answer: (
      <React.Fragment>
        <p>
          Vestibulum at dolor justo.{' '}
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            Curabitur
          </a>{' '}
          dictum feugiat elit, vitae vestibulum orci vestibulum sed. Donec interdum ligula at nisi rhoncus malesuada et
          non eros.
        </p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      </React.Fragment>
    )
  }
]

export const AllClosed: ComponentStory<typeof FAQ> = () => {
  return (
    <Container>
      <FAQ>
        <FAQ.Heading>Frequently asked&nbsp;questions</FAQ.Heading>
        <>
          {fixtureData.map(({question, answer}) => {
            return (
              <Accordion key={question} open={false}>
                <Accordion.Heading>{question}</Accordion.Heading>
                <Accordion.Content>{answer}</Accordion.Content>
              </Accordion>
            )
          })}
        </>
      </FAQ>
    </Container>
  )
}

export const AllOpen: ComponentStory<typeof FAQ> = () => {
  return (
    <Container>
      <FAQ>
        <FAQ.Heading>Frequently asked&nbsp;questions</FAQ.Heading>
        <>
          {fixtureData.map(({question, answer}) => {
            return (
              <Accordion key={question} open={true}>
                <Accordion.Heading>{question}</Accordion.Heading>
                <Accordion.Content>{answer}</Accordion.Content>
              </Accordion>
            )
          })}
        </>
      </FAQ>
    </Container>
  )
}

export const HeadingLeftAligned: ComponentStory<typeof FAQ> = () => {
  return (
    <Container>
      <FAQ>
        <FAQ.Heading align="left">Frequently asked&nbsp;questions</FAQ.Heading>
        <>
          {fixtureData.map(({question, answer}) => {
            return (
              <Accordion key={question}>
                <Accordion.Heading>{question}</Accordion.Heading>
                <Accordion.Content>{answer}</Accordion.Content>
              </Accordion>
            )
          })}
        </>
      </FAQ>
    </Container>
  )
}

export const LargeHeading: ComponentStory<typeof FAQ> = () => {
  return (
    <Container>
      <FAQ>
        <FAQ.Heading size="large">Frequently asked&nbsp;questions</FAQ.Heading>
        <>
          {fixtureData.map(({question, answer}) => {
            return (
              <Accordion key={question}>
                <Accordion.Heading>{question}</Accordion.Heading>
                <Accordion.Content>{answer}</Accordion.Content>
              </Accordion>
            )
          })}
        </>
      </FAQ>
    </Container>
  )
}

export const LargeHeadingLeftAligned: ComponentStory<typeof FAQ> = () => {
  return (
    <Container>
      <FAQ>
        <FAQ.Heading size="large" align="left">
          Frequently asked&nbsp;questions
        </FAQ.Heading>
        <>
          {fixtureData.map(({question, answer}) => {
            return (
              <Accordion key={question}>
                <Accordion.Heading>{question}</Accordion.Heading>
                <Accordion.Content>{answer}</Accordion.Content>
              </Accordion>
            )
          })}
        </>
      </FAQ>
    </Container>
  )
}

export const WithGroups: ComponentStory<typeof FAQ> = () => {
  return (
    <Container>
      <FAQ>
        <FAQ.Heading size="large" align="left">
          Frequently asked&nbsp;questions
        </FAQ.Heading>
        <>
          {['one', 'two', 'three'].map(group => (
            <>
              <FAQ.Subheading>{`Group subheading ${group}`}</FAQ.Subheading>
              {fixtureData.map(({question, answer}) => {
                return (
                  <Accordion key={question}>
                    <Accordion.Heading>{question}</Accordion.Heading>
                    <Accordion.Content>{answer}</Accordion.Content>
                  </Accordion>
                )
              })}
            </>
          ))}
        </>
      </FAQ>
    </Container>
  )
}

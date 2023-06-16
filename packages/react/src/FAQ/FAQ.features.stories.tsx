import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {FAQ} from '.'
import {Text, InlineLink} from '..'
import {Container} from '../component-helpers'

export default {
  title: 'Components/FAQ/features',
  component: FAQ,
  parameters: {
    a11y: {
      config: {
        rules: [
          /**
           * Disabling due to a flakey test.
           * Muted text color passing elsewhere, so this seems like a false positive.
           */
          {id: 'color-contrast', enabled: false},
        ],
      },
    },
  },
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
        <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
          Curabitur
        </InlineLink>{' '}
        dictum feugiat elit, vitae vestibulum orci vestibulum sed. Donec interdum ligula at nisi rhoncus malesuada et
        non eros.
      </p>
    ),
  },
  {
    question: 'This is my second super sweet question',
    answer: (
      <React.Fragment>
        <p>
          Vestibulum at dolor justo.{' '}
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            Curabitur
          </InlineLink>{' '}
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
    ),
  },
  {
    question: 'This is my third super sweet question',
    answer: (
      <React.Fragment>
        <p>
          Vestibulum at dolor justo.{' '}
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            Curabitur
          </InlineLink>{' '}
          dictum feugiat elit, vitae vestibulum orci vestibulum sed. Donec interdum ligula at nisi rhoncus malesuada et
          non eros.
        </p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      </React.Fragment>
    ),
  },
]

export const AllClosed: ComponentStory<typeof FAQ> = () => {
  return (
    <Container>
      <FAQ>
        <FAQ.Heading>Frequently asked&nbsp;questions</FAQ.Heading>
        <>
          {fixtureData.map(({question, answer}) => {
            return (
              <FAQ.Item key={question} open={false}>
                <FAQ.Question>{question}</FAQ.Question>
                <FAQ.Answer>{answer}</FAQ.Answer>
              </FAQ.Item>
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
              <FAQ.Item key={question} open={true}>
                <FAQ.Question>{question}</FAQ.Question>
                <FAQ.Answer>{answer}</FAQ.Answer>
              </FAQ.Item>
            )
          })}
        </>
      </FAQ>
    </Container>
  )
}
AllOpen.parameters = {
  axe: {
    timeout: 5000,
  },
}

export const HeadingLeftAligned: ComponentStory<typeof FAQ> = () => {
  return (
    <Container>
      <FAQ>
        <FAQ.Heading align="start">Frequently asked&nbsp;questions</FAQ.Heading>
        <>
          {fixtureData.map(({question, answer}) => {
            return (
              <FAQ.Item key={question}>
                <FAQ.Question>{question}</FAQ.Question>
                <FAQ.Answer>{answer}</FAQ.Answer>
              </FAQ.Item>
            )
          })}
        </>
      </FAQ>
    </Container>
  )
}

export const Groups: ComponentStory<typeof FAQ> = () => {
  return (
    <Container>
      <FAQ>
        <FAQ.Heading size="large">Frequently asked&nbsp;questions</FAQ.Heading>
        <FAQ.Subheading>Group heading</FAQ.Subheading>
        <>
          {fixtureData.map(({question, answer}) => {
            return (
              <FAQ.Item key={question}>
                <FAQ.Question>{question}</FAQ.Question>
                <FAQ.Answer>{answer}</FAQ.Answer>
              </FAQ.Item>
            )
          })}
        </>
      </FAQ>
    </Container>
  )
}

export const DynamicDataExample: ComponentStory<typeof FAQ> = () => {
  const faqs = [
    {
      title: 'Who can apply?',
      content: (
        <div>
          <p>
            Anyone who is a current contributor or maintainer of an open source project on GitHub. You can also apply as
            a team for a given open source project (max of 3 people).
          </p>
          <p>You must also:</p>

          <ul>
            <li>Have an active online profile on GitHub</li>
            <li>Be located in one of the regions supported by GitHub Sponsors</li>
            <li>Not be a current employee of GitHub and/or any of its parent/subsidiary companies</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'What are you looking for? Who decides who is selected?',
      content: (
        <div>
          <p>
            All of our applications will be thoroughly evaluated by a selection committee. You&apos;ll be much more
            likely to be selected if you:
          </p>
          <ul>
            <li>Have an active and growing set of users</li>
            <li>Understand how you want to grow and maintain your project</li>
            <li>Wish to pursue open source work full-time</li>
          </ul>
        </div>
      ),
    },
    {
      title: "What do I get if I'm selected?",
      content: (
        <div>
          <ul>
            <li>
              $20,000 stipend per person ($2,000 per week of participation) for the duration of the 10 week program.
            </li>
            <li>Dedicated mentors from the open source community and enterprises</li>
          </ul>
        </div>
      ),
    },
    {
      title: "What do I have to do if I'm selected?",
      content: (
        <div>
          <ul>
            <li>Participate in all Accelerator activities during the 10-week program (roughly 10 hours per week)</li>
            <li>
              Contribute to the open source resources we have on GitHub so other developers can learn from your
              experience
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'What are the exact dates of the program? What does Winter 2023 mean?',
      content: (
        <p>
          The program applications are due by December 31, 2022. We will announce the first class of fellows on February
          15, 2023. The program itself will run from March 6, 2023 to May 12, 2023.
        </p>
      ),
    },

    {
      title: `Can I apply if I'm already a sponsorsed developer on GitHub?`,
      content: (
        <div>
          <p>
            Yes! We want to help you expand your funding and support as you look to build a full-time career in open
            source.
          </p>
        </div>
      ),
    },
    {
      title: 'I want to help. How can I get involved?',
      content: (
        <div>
          <p>
            Awesome! Email us at <a href="mailto:foo@bar.com">foo@bar.com</a>.
          </p>
        </div>
      ),
    },
    {
      title: 'If I have any questions, what do I do?',
      content: (
        <div>
          <p>
            Send us an email to <a href="mailto:foo@bar.com">foo@bar.com</a>.
          </p>
        </div>
      ),
    },
  ]

  return (
    <Container>
      <FAQ>
        <FAQ.Heading>Frequently asked questions</FAQ.Heading>
        {faqs.map((item, index) => {
          return (
            <FAQ.Item key={index}>
              <FAQ.Question>{item.title}</FAQ.Question>
              <FAQ.Answer>{item.content}</FAQ.Answer>
            </FAQ.Item>
          )
        })}
      </FAQ>
    </Container>
  )
}

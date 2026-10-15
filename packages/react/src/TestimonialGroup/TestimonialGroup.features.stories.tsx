import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {TestimonialGroup} from './TestimonialGroup'
import {Testimonial} from '../Testimonial'
import monaAvatar from '../fixtures/images/avatar-mona.png'
import hubotAvatar from '../fixtures/images/avatar-hubot.png'

const meta = {
  title: 'Components/TestimonialGroup/Features',
  component: TestimonialGroup,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<typeof TestimonialGroup>

export default meta
type Story = StoryObj<typeof TestimonialGroup>

export const Minimal: Story = {
  render: () => (
    <TestimonialGroup autoPlay={process.env.NODE_ENV !== 'test'}>
      <Testimonial variant="minimal">
        <Testimonial.Quote>
          GitHub brings our code, conversations, and security checks into one place. Our developers spend less time
          switching between tools and more time reviewing changes, sharing knowledge, and building features that matter
          to our customers.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
      <Testimonial variant="minimal">
        <Testimonial.Quote>
          We used to lose valuable time waiting for feedback and tracking down the context behind a change. With pull
          requests and automated checks in the same workflow, our teams can review work earlier, resolve issues
          together, and release with greater confidence.
        </Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt="" />
        <Testimonial.Name position="Mona's Sidekick">Hubot</Testimonial.Name>
      </Testimonial>
    </TestimonialGroup>
  ),
}

export const DefaultVariant: Story = {
  render: () => (
    <TestimonialGroup autoPlay={process.env.NODE_ENV !== 'test'}>
      <Testimonial variant="default">
        <Testimonial.Quote>
          GitHub brings our code, conversations, and security checks into one place. Our developers spend less time
          switching between tools and more time reviewing changes, sharing knowledge, and building features that matter
          to our customers.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
      <Testimonial variant="default">
        <Testimonial.Quote>
          We used to lose valuable time waiting for feedback and tracking down the context behind a change. With pull
          requests and automated checks in the same workflow, our teams can review work earlier, resolve issues
          together, and release with greater confidence.
        </Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt="" />
        <Testimonial.Name position="Mona's Sidekick">Hubot</Testimonial.Name>
      </Testimonial>
    </TestimonialGroup>
  ),
}

export const Subtle: Story = {
  render: () => (
    <TestimonialGroup autoPlay={process.env.NODE_ENV !== 'test'}>
      <Testimonial variant="subtle">
        <Testimonial.Quote>
          GitHub brings our code, conversations, and security checks into one place. Our developers spend less time
          switching between tools and more time reviewing changes, sharing knowledge, and building features that matter
          to our customers.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
      <Testimonial variant="subtle">
        <Testimonial.Quote>
          We used to lose valuable time waiting for feedback and tracking down the context behind a change. With pull
          requests and automated checks in the same workflow, our teams can review work earlier, resolve issues
          together, and release with greater confidence.
        </Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt="" />
        <Testimonial.Name position="Mona's Sidekick">Hubot</Testimonial.Name>
      </Testimonial>
    </TestimonialGroup>
  ),
}

export const Expressive: Story = {
  render: () => (
    <TestimonialGroup autoPlay={process.env.NODE_ENV !== 'test'}>
      <Testimonial variant="expressive" size="large">
        <Testimonial.Quote>
          GitHub Advanced Security <em>empowers our developers</em> to detect and fix vulnerabilities earlier,
          accelerating our time to market and boosting developer satisfaction.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
      <Testimonial variant="expressive" size="large">
        <Testimonial.Quote>
          <b>GitHub helps us ensure that we have our security controls baked into our pipelines</b> all the way from the
          first line of code we&apos;re writing.
        </Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt="" />
        <Testimonial.Name position="Mona's Sidekick">Hubot</Testimonial.Name>
      </Testimonial>
    </TestimonialGroup>
  ),
}

export const ManualNavigation: Story = {
  render: () => (
    <TestimonialGroup autoPlay={false}>
      <Testimonial>
        <Testimonial.Quote>
          GitHub brings our code, conversations, and security checks into one place. Our developers spend less time
          switching between tools and more time reviewing changes, sharing knowledge, and building features that matter
          to our customers.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
      <Testimonial>
        <Testimonial.Quote>
          We used to lose valuable time waiting for feedback and tracking down the context behind a change. With pull
          requests and automated checks in the same workflow, our teams can review work earlier, resolve issues
          together, and release with greater confidence.
        </Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt="" />
        <Testimonial.Name position="Mona's Sidekick">Hubot</Testimonial.Name>
      </Testimonial>
    </TestimonialGroup>
  ),
}

export const SingleTestimonial: Story = {
  render: () => (
    <TestimonialGroup autoPlay={process.env.NODE_ENV !== 'test'}>
      <Testimonial>
        <Testimonial.Quote>
          Shared components give us a consistent foundation without limiting what our teams can build. We can focus on
          the details of the customer experience instead of rebuilding the same patterns for every project.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
    </TestimonialGroup>
  ),
}

export const Narrow: Story = {
  globals: {viewport: {value: 'iphonexr'}},
  render: () => (
    <TestimonialGroup autoPlay={false}>
      <Testimonial>
        <Testimonial.Quote>
          GitHub brings our code, conversations, and security checks into one place. Our developers spend less time
          switching between tools and more time reviewing changes, sharing knowledge, and building features that matter
          to our customers.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
      <Testimonial>
        <Testimonial.Quote>
          We used to lose valuable time waiting for feedback and tracking down the context behind a change. With pull
          requests and automated checks in the same workflow, our teams can review work earlier, resolve issues
          together, and release with greater confidence.
        </Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt="" />
        <Testimonial.Name position="Mona's Sidekick">Hubot</Testimonial.Name>
      </Testimonial>
    </TestimonialGroup>
  ),
}

export const Dark: Story = {
  parameters: {colorMode: 'dark'},
  render: () => (
    <TestimonialGroup autoPlay={false}>
      <Testimonial>
        <Testimonial.Quote>
          GitHub brings our code, conversations, and security checks into one place. Our developers spend less time
          switching between tools and more time reviewing changes, sharing knowledge, and building features that matter
          to our customers.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
      <Testimonial>
        <Testimonial.Quote>
          Shared components give us a consistent foundation without limiting what our teams can build. We can focus on
          the details of the customer experience instead of rebuilding the same patterns for every project.
        </Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt="" />
        <Testimonial.Name position="Mona's Sidekick">Hubot</Testimonial.Name>
      </Testimonial>
    </TestimonialGroup>
  ),
}

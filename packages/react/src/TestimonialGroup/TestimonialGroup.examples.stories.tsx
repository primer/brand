import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {TestimonialGroup} from './TestimonialGroup'
import {Testimonial} from '../Testimonial'
import monaAvatar from '../fixtures/images/avatar-mona.png'
import hubotAvatar from '../fixtures/images/avatar-hubot.png'

const meta = {
  title: 'Components/TestimonialGroup/Examples',
  component: TestimonialGroup,
} satisfies Meta<typeof TestimonialGroup>

export default meta
type Story = StoryObj<typeof TestimonialGroup>

export const CustomerTestimonials: Story = {
  render: () => (
    <TestimonialGroup aria-label="Customer testimonials">
      <Testimonial size="large">
        <Testimonial.Quote>
          With the time savings Copilot unlocks, our developers are empowered to spend more time on the tasks they enjoy
          the most &mdash; creative-problem solving, innovative projects and experimentation.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
      <Testimonial size="large">
        <Testimonial.Quote>
          GitHub has been critical to evolving our software development lifecycle. We now average about 4,000 commits
          daily, a speed that just wouldn&rsquo;t have been possible otherwise.
        </Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt="" />
        <Testimonial.Name position="Mona's Sidekick">Hubot</Testimonial.Name>
      </Testimonial>
      <Testimonial size="large">
        <Testimonial.Quote>
          GitHub helps us build better solutions, faster. And in the end, it&rsquo;s our clients who benefit.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
      <Testimonial size="large">
        <Testimonial.Quote>
          GitHub is one of the de facto tools that engineers want to use, and because of that, we don&rsquo;t have long,
          expensive onboarding periods or productivity gaps.
        </Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt="" />
        <Testimonial.Name position="Mona's Sidekick">Hubot</Testimonial.Name>
      </Testimonial>
      <Testimonial size="large">
        <Testimonial.Quote>
          With GitHub Copilot, our developers stay in the flow state and keep momentum instead of clawing through code
          libraries or documentation.
        </Testimonial.Quote>
        <Testimonial.Avatar src={monaAvatar} alt="" />
        <Testimonial.Name position="Chief Octocat">Mona Lisa</Testimonial.Name>
      </Testimonial>
    </TestimonialGroup>
  ),
}

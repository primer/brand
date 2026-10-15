import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {TestimonialGroup} from './TestimonialGroup'
import {Testimonial} from '../Testimonial'
import monaAvatar from '../fixtures/images/avatar-mona.png'
import hubotAvatar from '../fixtures/images/avatar-hubot.png'

const meta = {
  title: 'Components/TestimonialGroup',
  component: TestimonialGroup,
  parameters: {layout: 'fullscreen'},
  argTypes: {
    autoPlay: {control: 'boolean'},
    defaultActiveIndex: {control: {type: 'number', min: 0, max: 2}},
    children: {control: false},
    labels: {control: 'object'},
  },
} satisfies Meta<typeof TestimonialGroup>

export default meta
type Story = StoryObj<typeof TestimonialGroup>

export const Default: Story = {
  render: () => (
    <TestimonialGroup autoPlay={process.env.NODE_ENV !== 'test'}>
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

export const Playground: Story = {
  args: {autoPlay: true, defaultActiveIndex: 0, 'aria-label': 'Team testimonials'},
  render: args => (
    <TestimonialGroup {...args} autoPlay={process.env.NODE_ENV === 'test' ? false : args.autoPlay}>
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

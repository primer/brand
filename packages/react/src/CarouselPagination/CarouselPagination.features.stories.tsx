import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {CarouselPagination} from './CarouselPagination'
import baseMeta from './CarouselPagination.stories'
import {Text} from '../Text'

const meta = {
  ...baseMeta,
  title: 'Components/CarouselPagination/Features',
} satisfies Meta<typeof CarouselPagination>

export default meta
type Story = StoryObj<typeof meta>

export const LastItem: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(4)
    return (
      <CarouselPagination aria-label="Choose item" itemCount={5} activeIndex={activeIndex} onChange={setActiveIndex} />
    )
  },
}

export const Looping: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(0)
    return (
      <CarouselPagination
        aria-label="Choose item"
        itemCount={5}
        activeIndex={activeIndex}
        loop
        onChange={setActiveIndex}
      />
    )
  },
}

export const Dark: Story = {
  parameters: {colorMode: 'dark'},
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(2)
    return (
      <CarouselPagination aria-label="Choose item" itemCount={5} activeIndex={activeIndex} onChange={setActiveIndex} />
    )
  },
}

export const Narrow: Story = {
  globals: {viewport: {value: 'iphone5'}},
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(0)
    return (
      <CarouselPagination aria-label="Choose item" itemCount={5} activeIndex={activeIndex} onChange={setActiveIndex} />
    )
  },
}

export const ManyItems: Story = {
  globals: {viewport: {value: 'iphone5'}},
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(0)
    return (
      <CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={activeIndex} onChange={setActiveIndex} />
    )
  },
}

export const CustomLabels: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(0)
    return (
      <CarouselPagination
        aria-label="Choose testimonial"
        itemCount={5}
        activeIndex={activeIndex}
        labels={{
          previous: 'Previous testimonial',
          next: 'Next testimonial',
          item: 'Testimonial {current} of {total}',
        }}
        onChange={setActiveIndex}
      />
    )
  },
}

export const HiddenIfSingleItem: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(0)
    return (
      <>
        <CarouselPagination
          aria-label="Choose item"
          itemCount={1}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
        <Text>No pagination appears if there is only one item.</Text>
      </>
    )
  },
}

export const HiddenIfNoItems: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(0)
    return (
      <>
        <CarouselPagination
          aria-label="Choose item"
          itemCount={0}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
        <Text>No pagination appears if there are no items.</Text>
      </>
    )
  },
}

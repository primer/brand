import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {expect, fn, within} from 'storybook/test'
import {CarouselPagination} from './CarouselPagination'

const meta = {
  title: 'Components/CarouselPagination',
  component: CarouselPagination,
  parameters: {layout: 'padded'},
  args: {
    itemCount: 5,
    activeIndex: 0,
    loop: false,
    'aria-label': 'Choose item',
    onChange: fn(),
  },
  argTypes: {
    itemCount: {control: {type: 'number', min: 0, max: 30, step: 1}},
    activeIndex: {control: {type: 'number', min: 0, step: 1}},
    loop: {control: 'boolean'},
    labels: {control: 'object'},
    itemAttributesBuilder: {control: false},
  },
} satisfies Meta<typeof CarouselPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = React.useState(0)
    return (
      <CarouselPagination aria-label="Choose item" itemCount={5} activeIndex={activeIndex} onChange={setActiveIndex} />
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const navigation = canvas.getByRole('group', {name: 'Choose item'})
    const indicators = canvas.getAllByRole('button', {name: /^Go to item /})
    const navigationBounds = navigation.getBoundingClientRect()
    await expect(navigationBounds.width).toBe(155)
    await expect(navigationBounds.height).toBe(42)

    for (const [index, indicator] of indicators.entries()) {
      const bounds = indicator.getBoundingClientRect()
      await expect(bounds.width).toBe(indicator.getAttribute('aria-current') === 'true' ? 15 : 6)
      await expect(bounds.height).toBe(6)
      if (index > 0) {
        await expect(bounds.left - indicators[index - 1].getBoundingClientRect().right).toBeCloseTo(6)
      }
    }
  },
}

export const Playground: Story = {
  render: function Render(args) {
    const [activeIndex, setActiveIndex] = React.useState(args.activeIndex)

    React.useEffect(() => {
      setActiveIndex(args.activeIndex)
    }, [args.activeIndex])

    return (
      <CarouselPagination
        {...args}
        activeIndex={activeIndex}
        onChange={index => {
          setActiveIndex(index)
          args.onChange(index)
        }}
      />
    )
  },
}

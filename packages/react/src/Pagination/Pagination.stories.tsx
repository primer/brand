import type {Meta, StoryObj} from '@storybook/react'
import {Pagination} from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    pageCount: 5,
    currentPage: 1,
    marginPageCount: 1,
    surroundingPageCount: 2,
    showPages: true,
    onPageChange: e => {
      e.preventDefault()
      const target = e.target as HTMLElement
      // eslint-disable-next-line no-console
      console.log('pressed: ', target.textContent)
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    pageCount: 10,
    currentPage: 5,
  },
}

export const Playground: Story = {
  args: {
    pageCount: 100,
    currentPage: 2,
  },
}

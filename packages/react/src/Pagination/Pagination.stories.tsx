import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Pagination} from './Pagination'

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Pagination>

const Template: StoryFn<typeof Pagination> = ({onPageChange, ...args}) => (
  <main>
    <Pagination
      onPageChange={e => {
        e.preventDefault()
        const target = e.target as HTMLElement
        // eslint-disable-next-line no-console
        console.log('pressed: ', target.textContent)
      }}
      {...args}
    />
  </main>
)

export const Default = Template.bind({})
Default.args = {
  pageCount: 100,
  currentPage: 2,
}

export const Playground = Template.bind({})
Playground.args = {
  pageCount: 100,
  currentPage: 2,
  showPages: true,
}

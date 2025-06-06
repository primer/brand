import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Pagination} from './Pagination'
import baseMeta from './Pagination.stories'

const meta: Meta<typeof Pagination> = {
  ...baseMeta,
  title: 'Components/Pagination/Features',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
}
export default meta

type Story = StoryObj<typeof Pagination>

export const LargerPageCountMargin: Story = {
  args: {
    pageCount: 15,
    currentPage: 5,
    marginPageCount: 4,
  },
}

export const HidePageNumbers: Story = {
  args: {
    pageCount: 15,
    currentPage: 5,
    showPages: false,
  },
}

export const NarrowPageNumbersHiddenByDefault: Story = {
  args: {
    pageCount: 15,
    currentPage: 5,
    marginPageCount: 4,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonexr',
    },
  },
}

export const HigherSurroundingPageCount: Story = {
  args: {
    pageCount: 15,
    currentPage: 5,
    surroundingPageCount: 4,
  },
}

export const PageHandlers: Story = {
  render: () => {
    const PageHandlersComponent = () => {
      const [currentPage, setCurrentPage] = React.useState(5)
      const totalPages = 10

      const _handlePageChange = (e: React.MouseEvent, pageNumber: number) => {
        e.preventDefault()
        if (pageNumber === currentPage + 1 && currentPage < totalPages) {
          // Next page handler
          setCurrentPage(currentPage + 1)
        } else if (pageNumber === currentPage - 1 && currentPage > 1) {
          // Previous page handler
          setCurrentPage(currentPage - 1)
        } else if (pageNumber >= 1 && pageNumber <= totalPages) {
          setCurrentPage(pageNumber)
        }
      }

      // eslint-disable-next-line no-console
      console.log('currentPage: ', currentPage)

      return <Pagination pageCount={10} currentPage={currentPage} onPageChange={_handlePageChange} />
    }

    return <PageHandlersComponent />
  },
}

export const CustomAttributeForwarding: Story = {
  args: {
    pageCount: 15,
    currentPage: 5,
    surroundingPageCount: 4,
    pageAttributesBuilder: n => {
      return {
        'data-custom-attribute': `custom-attribute-${n}`,
      }
    },
  },
}

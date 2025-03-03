import React from 'react'
import {Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Pagination} from './Pagination'
import {Stack} from '../Stack'
import {Text} from '../Text'

export default {
  title: 'Components/Pagination/Features',
  component: Pagination,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof Pagination>

const handlePageChange = (e: React.MouseEvent, n: number) => {
  e.preventDefault()
  // eslint-disable-next-line no-console
  console.log('pressed: ', n)
}

export const LargerPageCountMargin = () => (
  <Pagination pageCount={15} currentPage={5} marginPageCount={4} onPageChange={handlePageChange} />
)

export const HidePageNumbers = () => (
  <Pagination pageCount={15} currentPage={5} showPages={false} onPageChange={handlePageChange} />
)

export const NarrowPageNumbersHiddenByDefault = () => (
  <Pagination pageCount={15} currentPage={5} marginPageCount={4} onPageChange={handlePageChange} />
)
NarrowPageNumbersHiddenByDefault.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const HigherSurroundingPageCount = () => (
  <Pagination pageCount={15} currentPage={5} surroundingPageCount={4} onPageChange={handlePageChange} />
)

export const PageHandlers = () => {
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

export const CustomAttributeForwarding = () => (
  <Pagination
    pageCount={15}
    currentPage={5}
    surroundingPageCount={4}
    pageAttributesBuilder={n => {
      return {
        'data-custom-attribute': `custom-attribute-${n}`,
      }
    }}
    onPageChange={handlePageChange}
  />
)

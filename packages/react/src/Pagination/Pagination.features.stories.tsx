import React from 'react'
import {Meta} from '@storybook/react'
import {Pagination} from './Pagination'
import {Stack} from '../Stack'
import {Text} from '../Text'

export default {
  title: 'Components/Pagination/Features',
  component: Pagination,
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

export const HidePageNumbersByViewport = () => (
  <Stack direction="vertical" alignItems="center" gap="spacious">
    <div>
      <Text as="p" align="center">
        Page numbers always hidden on all viewports.
      </Text>
      <Pagination
        pageCount={15}
        currentPage={5}
        showPages={{narrow: false, regular: false, wide: false}}
        onPageChange={handlePageChange}
      />
    </div>
    <div>
      <Text as="p" align="center">
        Page numbers are hidden on narrow viewports only.
      </Text>
      <Pagination
        pageCount={15}
        currentPage={5}
        showPages={{narrow: false, regular: true, wide: true}}
        onPageChange={handlePageChange}
      />
    </div>
    <div>
      <Text as="p" align="center">
        Page numbers are hidden on narrow and regular viewports only.
      </Text>
      <Pagination
        pageCount={15}
        currentPage={5}
        showPages={{narrow: false, regular: false, wide: true}}
        onPageChange={handlePageChange}
      />
    </div>
    <div>
      <Text as="p" align="center">
        Page numbers never hidden on any viewport.
      </Text>
      <Pagination
        pageCount={15}
        currentPage={5}
        showPages={{narrow: true, regular: true, wide: true}}
        onPageChange={handlePageChange}
      />
    </div>
  </Stack>
)

HidePageNumbersByViewport.parameters = {
  viewport: {
    defaultViewport: 'small',
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

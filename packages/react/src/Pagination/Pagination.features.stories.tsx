import React from 'react'
import {Meta} from '@storybook/react'
import {Pagination} from './Pagination'
import {Stack} from '../Stack'
import {Text} from '../Text'

export default {
  title: 'Components/Pagination/Features',
  component: Pagination,
} as Meta<typeof Pagination>

export const LargerPageCountMargin = () => (
  <Pagination pageCount={15} currentPage={5} marginPageCount={4} onPageChange={e => e.preventDefault()} />
)

export const HidePageNumbers = () => (
  <Pagination pageCount={15} currentPage={5} showPages={false} onPageChange={e => e.preventDefault()} />
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
        onPageChange={e => e.preventDefault()}
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
        onPageChange={e => e.preventDefault()}
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
        onPageChange={e => e.preventDefault()}
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
        onPageChange={e => e.preventDefault()}
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
  <Pagination pageCount={15} currentPage={5} surroundingPageCount={4} onPageChange={e => e.preventDefault()} />
)

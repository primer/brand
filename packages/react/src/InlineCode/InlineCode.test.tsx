import {createRef} from 'react'
import {cleanup, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {InlineCode} from './InlineCode'

expect.extend(toHaveNoViolations)

describe('InlineCode', () => {
  afterEach(cleanup)

  it('renders a native code element and forwards its props', () => {
    const ref = createRef<HTMLElement>()
    const {getByText} = render(
      <InlineCode ref={ref} className="custom-class" title="Command">
        /mcp
      </InlineCode>,
    )
    const inlineCodeText = getByText('/mcp')
    const inlineCode = inlineCodeText.closest('code')!

    expect(inlineCode.tagName).toBe('CODE')
    expect(inlineCode).toHaveClass('InlineCode', 'custom-class')
    expect(inlineCode).toHaveAttribute('title', 'Command')
    expect(ref.current).toBe(inlineCode)
    expect(inlineCodeText).toHaveClass('InlineCode__text')
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<InlineCode>/mcp</InlineCode>)

    expect(await axe(container)).toHaveNoViolations()
  })
})

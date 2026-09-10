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
        git status
      </InlineCode>,
    )
    const inlineCodeText = getByText('git status')
    const inlineCode = inlineCodeText.closest('code')!

    expect(inlineCode.tagName).toBe('CODE')
    expect(inlineCode).toHaveClass('InlineCode', 'custom-class')
    expect(inlineCode).not.toHaveClass('InlineCode--nowrap')
    expect(inlineCode).toHaveAttribute('title', 'Command')
    expect(ref.current).toBe(inlineCode)
    expect(inlineCodeText).toHaveClass('InlineCode__text')
  })

  it('can prevent short fragments from wrapping', () => {
    const {getByText} = render(<InlineCode wrap={false}>/mcp</InlineCode>)
    const inlineCode = getByText('/mcp').closest('code')!

    expect(inlineCode).toHaveClass('InlineCode--nowrap')
    expect(inlineCode).not.toHaveAttribute('wrap')
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<InlineCode>git status</InlineCode>)

    expect(await axe(container)).toHaveNoViolations()
  })
})

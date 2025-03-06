import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {GitMergeIcon} from '@primer/octicons-react'

import {Icon} from './Icon'

expect.extend(toHaveNoViolations)

describe('Icon', () => {
  afterEach(cleanup)

  it('has no a11y violations', async () => {
    const {container} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the specified icon', () => {
    const {getByLabelText} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" />)
    expect(getByLabelText('Git merge icon')).toBeInTheDocument()
  })

  it('forwards className to the wrapper element', () => {
    const {getByLabelText} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" className="custom-class" />)
    expect(getByLabelText('Git merge icon').parentElement).toHaveClass('custom-class')
  })

  it('sets the color of the icon', () => {
    const {getByLabelText} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" color="blue" />)
    expect(getByLabelText('Git merge icon').parentElement).toHaveClass('Icon--color-blue')
  })

  it('sets the size of the icon when `size` is a number', () => {
    const {getByLabelText} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" size={24} />)
    const icon = getByLabelText('Git merge icon')

    expect(icon.getAttribute('width')).toBe('24')
    expect(icon.getAttribute('height')).toBe('24')
  })

  it.each`
    namedSize   | size
    ${'small'}  | ${20}
    ${'medium'} | ${32}
    ${'large'}  | ${44}
  `('sets the size of the icon to $size when `size=$namedSize`', ({namedSize, size}) => {
    const {getByLabelText} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" size={namedSize} />)
    const icon = getByLabelText('Git merge icon')

    expect(icon.getAttribute('width')).toBe(size.toString())
    expect(icon.getAttribute('height')).toBe(size.toString())
  })
})

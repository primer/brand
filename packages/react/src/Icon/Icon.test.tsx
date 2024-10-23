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

  it('forwards className to the icon', () => {
    const {getByLabelText} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" className="custom-class" />)
    expect(getByLabelText('Git merge icon')).toHaveClass('custom-class')
  })

  it('sets the color of the icon', () => {
    const {getByLabelText} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" color="blue" />)
    expect(getByLabelText('Git merge icon')).toHaveClass('Icon--color-blue')
  })

  it('sets the size of the icon', () => {
    const {getByLabelText} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" size="large" />)
    const icon = getByLabelText('Git merge icon')

    expect(icon.getAttribute('width')).toBe('44')
    expect(icon.getAttribute('height')).toBe('44')
  })

  it('overrides the size of the icon to `small` when `hasBackground` is `true`', () => {
    const {getByLabelText} = render(<Icon icon={GitMergeIcon} aria-label="Git merge icon" size="large" hasBackground />)
    const icon = getByLabelText('Git merge icon')

    expect(icon.getAttribute('width')).toBe('20')
    expect(icon.getAttribute('height')).toBe('20')
  })
})

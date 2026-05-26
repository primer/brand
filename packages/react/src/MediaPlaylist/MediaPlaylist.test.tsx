import React from 'react'
import {fireEvent, render, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {MediaPlaylist, type MediaPlaylistProps} from '../'

expect.extend(toHaveNoViolations)

describe('MediaPlaylist', () => {
  const MockMedia = ({label}: {label: string}) => <img src="file.jpg" alt={label} />
  const itemLabels = ['Plan', 'Review', 'Ship', 'Scale', 'Learn']

  const renderExample = ({itemCount = 2, ...props}: Omit<MediaPlaylistProps, 'children'> & {itemCount?: number} = {}) =>
    render(
      <MediaPlaylist {...props}>
        <MediaPlaylist.Heading>Agent workflows</MediaPlaylist.Heading>

        {itemLabels.slice(0, itemCount).map(label => (
          <MediaPlaylist.Item key={label} thumbnail={<span data-testid={`${label.toLowerCase()}-thumbnail`} />}>
            <MediaPlaylist.ItemHeading title={label} description="10:57" />
            <MediaPlaylist.ItemContent>
              <p>{label} content</p>
            </MediaPlaylist.ItemContent>
            <MediaPlaylist.ItemMedia>
              <MockMedia label={`${label.toLowerCase()} media`} />
            </MediaPlaylist.ItemMedia>
          </MediaPlaylist.Item>
        ))}
      </MediaPlaylist>,
    )

  it('renders a labelled vertical tablist with thumbnails and counter', () => {
    const {getByRole, getByText} = renderExample()

    const tablist = getByRole('tablist')

    expect(tablist).toHaveAttribute('aria-orientation', 'vertical')
    expect(within(tablist).getByTestId('plan-thumbnail')).toBeInTheDocument()
    expect(getByText('1/2')).toBeInTheDocument()
  })

  it('allows non-h1 semantic heading levels', () => {
    const {getByRole} = render(
      <MediaPlaylist>
        <MediaPlaylist.Heading as="h4">Agent workflows</MediaPlaylist.Heading>
        <MediaPlaylist.Item>
          <MediaPlaylist.ItemHeading title="Plan" />
          <MediaPlaylist.ItemContent>
            <p>Plan content</p>
          </MediaPlaylist.ItemContent>
          <MediaPlaylist.ItemMedia>
            <MockMedia label="plan media" />
          </MediaPlaylist.ItemMedia>
        </MediaPlaylist.Item>
      </MediaPlaylist>,
    )

    expect(getByRole('heading', {level: 4, name: 'Agent workflows'})).toBeInTheDocument()
  })

  it('falls back to an aria-label when Heading is not provided', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const {getByRole} = render(
      <MediaPlaylist>
        <MediaPlaylist.Item thumbnail={<span />}>
          <MediaPlaylist.ItemHeading title="Plan" />
          <MediaPlaylist.ItemContent>
            <p>Plan content</p>
          </MediaPlaylist.ItemContent>
          <MediaPlaylist.ItemMedia>
            <MockMedia label="plan media" />
          </MediaPlaylist.ItemMedia>
        </MediaPlaylist.Item>
      </MediaPlaylist>,
    )

    const tablist = getByRole('tablist')
    expect(tablist).toHaveAttribute('aria-label', 'Media playlist')
    expect(tablist).not.toHaveAttribute('aria-labelledby')

    consoleWarnSpy.mockRestore()
  })

  it('supports controlled selectedIndex without calling onChange during parent updates', () => {
    const handleChange = jest.fn()
    const {getAllByRole, rerender} = renderExample({selectedIndex: 0, onChange: handleChange})

    expect(getAllByRole('tab')[0]).toHaveAttribute('aria-selected', 'true')

    rerender(
      <MediaPlaylist selectedIndex={1} onChange={handleChange}>
        <MediaPlaylist.Heading>Agent workflows</MediaPlaylist.Heading>
        {itemLabels.slice(0, 2).map(label => (
          <MediaPlaylist.Item key={label} thumbnail={<span />}>
            <MediaPlaylist.ItemHeading title={label} />
            <MediaPlaylist.ItemContent>
              <p>{label} content</p>
            </MediaPlaylist.ItemContent>
            <MediaPlaylist.ItemMedia>
              <MockMedia label={`${label.toLowerCase()} media`} />
            </MediaPlaylist.ItemMedia>
          </MediaPlaylist.Item>
        ))}
      </MediaPlaylist>,
    )

    expect(getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true')
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('keeps the selected tab within range when items change', () => {
    const {getAllByRole, rerender} = renderExample({defaultSelectedIndex: 4, itemCount: 5})

    expect(getAllByRole('tab')[4]).toHaveAttribute('aria-selected', 'true')

    rerender(
      <MediaPlaylist defaultSelectedIndex={4}>
        <MediaPlaylist.Heading>Agent workflows</MediaPlaylist.Heading>
        {itemLabels.slice(0, 2).map(label => (
          <MediaPlaylist.Item key={label} thumbnail={<span />}>
            <MediaPlaylist.ItemHeading title={label} />
            <MediaPlaylist.ItemContent>
              <p>{label} content</p>
            </MediaPlaylist.ItemContent>
            <MediaPlaylist.ItemMedia>
              <MockMedia label={`${label.toLowerCase()} media`} />
            </MediaPlaylist.ItemMedia>
          </MediaPlaylist.Item>
        ))}
      </MediaPlaylist>,
    )

    expect(getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true')
  })

  it('uses item heading title and description as a non-heading tab label', () => {
    const {getByRole} = renderExample()
    const tab = getByRole('tab', {name: /Plan 10:57/})

    expect(within(tab).getByText('Plan')).toBeInTheDocument()
    expect(within(tab).getByText('10:57')).toBeInTheDocument()
    expect(within(tab).queryByRole('heading')).not.toBeInTheDocument()
  })

  it('renders custom item heading children when structured props are not used', () => {
    const {getByRole} = render(
      <MediaPlaylist>
        <MediaPlaylist.Heading>Agent workflows</MediaPlaylist.Heading>
        <MediaPlaylist.Item>
          <MediaPlaylist.ItemHeading>
            <span data-testid="custom-heading">Custom heading</span>
          </MediaPlaylist.ItemHeading>
          <MediaPlaylist.ItemContent>
            <p>Plan content</p>
          </MediaPlaylist.ItemContent>
          <MediaPlaylist.ItemMedia>
            <MockMedia label="plan media" />
          </MediaPlaylist.ItemMedia>
        </MediaPlaylist.Item>
      </MediaPlaylist>,
    )

    expect(within(getByRole('tab')).getByTestId('custom-heading')).toBeInTheDocument()
  })

  it('forwards media wrapper props', () => {
    const {getByTestId} = render(
      <MediaPlaylist>
        <MediaPlaylist.Heading>Agent workflows</MediaPlaylist.Heading>
        <MediaPlaylist.Item>
          <MediaPlaylist.ItemHeading title="Plan" />
          <MediaPlaylist.ItemContent>
            <p>Plan content</p>
          </MediaPlaylist.ItemContent>
          <MediaPlaylist.ItemMedia data-testid="media" aria-label="Plan media">
            <MockMedia label="plan media" />
          </MediaPlaylist.ItemMedia>
        </MediaPlaylist.Item>
      </MediaPlaylist>,
    )

    expect(getByTestId('media')).toHaveClass('MediaPlaylist__media')
    expect(getByTestId('media')).toHaveAttribute('aria-label', 'Plan media')
  })

  it('supports vertical APG keyboard behavior', async () => {
    const user = userEvent.setup()

    const {getAllByRole} = renderExample({itemCount: 3})
    const tabs = getAllByRole('tab')
    const [tabOne, tabTwo, tabThree] = tabs

    await user.tab()
    expect(tabOne).toHaveFocus()
    expect(tabOne).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowDown}')
    expect(tabTwo).toHaveFocus()
    expect(tabOne).toHaveAttribute('aria-selected', 'false')
    expect(tabTwo).toHaveAttribute('aria-selected', 'true')
    expect(tabThree).toHaveAttribute('aria-selected', 'false')

    await user.keyboard('{ArrowUp}')
    expect(tabOne).toHaveFocus()
    expect(tabOne).toHaveAttribute('aria-selected', 'true')
    expect(tabTwo).toHaveAttribute('aria-selected', 'false')
  })

  it('updates the heading counter when the selected tab changes', () => {
    const {getAllByRole, getByText} = renderExample()

    expect(getByText('1/2')).toBeInTheDocument()

    fireEvent.click(getAllByRole('tab')[1])

    expect(getByText('2/2')).toBeInTheDocument()
  })

  it('marks only long lists as overflow lists', () => {
    const {getByRole, getByTestId, unmount} = renderExample({itemCount: 4})

    expect(getByTestId(MediaPlaylist.testIds.root)).toHaveClass('MediaPlaylist--overflowItems')
    expect(getByRole('navigation', {name: 'Media playlist items'})).toBeInTheDocument()

    unmount()

    const {getByTestId: getByTestIdWithoutOverflow, queryByRole} = renderExample({itemCount: 3})

    expect(getByTestIdWithoutOverflow(MediaPlaylist.testIds.root)).not.toHaveClass('MediaPlaylist--overflowItems')
    expect(queryByRole('navigation', {name: 'Media playlist items'})).not.toBeInTheDocument()
  })

  it('uses playlist pagination to select adjacent items from the active tab', () => {
    const {getAllByRole, getByRole} = renderExample({itemCount: 5})
    const tabs = getAllByRole('tab')
    const pagination = getByRole('navigation', {name: 'Media playlist items'})

    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(within(pagination).getByRole('button', {name: 'Previous video'})).toHaveAttribute('aria-disabled', 'true')

    fireEvent.click(within(pagination).getByRole('button', {name: 'Next video'}))

    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(within(pagination).getByRole('button', {name: 'Previous video'})).not.toHaveAttribute('aria-disabled')

    fireEvent.click(tabs[4])

    expect(within(pagination).getByRole('button', {name: 'Next video'})).toHaveAttribute('aria-disabled', 'true')

    fireEvent.click(within(pagination).getByRole('button', {name: 'Previous video'}))

    expect(tabs[3]).toHaveAttribute('aria-selected', 'true')
  })

  it('has no critical axe violations', async () => {
    const {container} = renderExample({itemCount: 5})

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

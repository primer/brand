import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import {ButtonGroup} from './ButtonGroup'
import {Button} from '../Button'
import {IconButton} from '../IconButton'
import {ActionMenu} from '../ActionMenu'
import {axe, toHaveNoViolations} from 'jest-axe'
import {DownloadIcon, KebabHorizontalIcon, ShareIcon} from '@primer/octicons-react'

expect.extend(toHaveNoViolations)

describe('ButtonGroup', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })
  })

  afterEach(cleanup)

  it('renders correctly into the document', () => {
    const expectedClass = 'ButtonGroup'
    const expectedTag = 'section'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <ButtonGroup data-testid={mockTestId}>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )
    const buttonGroupEl = getByTestId(mockTestId)
    expect(buttonGroupEl.tagName).toBe(expectedTag.toUpperCase())
    expect(buttonGroupEl.classList).toContain(expectedClass)
  })

  it('forwards a custom className alongside the default class', () => {
    const {getByTestId} = render(
      <ButtonGroup data-testid="test" className="custom-button-group">
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )

    const buttonGroupEl = getByTestId('test')
    expect(buttonGroupEl).toHaveClass('ButtonGroup')
    expect(buttonGroupEl).toHaveClass('custom-button-group')
  })

  it('renders buttons with the correct element type when buttonAs is set', () => {
    const expectedTag = 'a'

    const {getAllByRole} = render(
      <ButtonGroup buttonsAs={expectedTag}>
        <Button href="#">Primary Action</Button>
        <Button href="#">Secondary Action</Button>
      </ButtonGroup>,
    )
    const buttonEl = getAllByRole('link')[0]
    expect(buttonEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders buttons with the correct size class when buttonSize is set', () => {
    const expectedClass = 'Button--size-large'

    const {getAllByRole} = render(
      <ButtonGroup buttonSize={'large'}>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )
    const buttonEl = getAllByRole('button')[0]
    expect(buttonEl.classList).toContain(expectedClass)
  })

  it('applies primary variant automatically to the first button and secondary variant to second', () => {
    const {getAllByRole} = render(
      <ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )
    const buttons = getAllByRole('button')
    expect(buttons[0].classList).toContain('Button--primary')
    expect(buttons[1].classList).toContain('Button--secondary')
  })

  it('joins any number of IconButton children as secondary actions when requested', async () => {
    const {container, getAllByRole, getByTestId} = render(
      <ButtonGroup data-testid="icon-button-group" buttonSize="small" variant="joined">
        <IconButton icon={DownloadIcon} aria-label="Download" />
        <IconButton icon={ShareIcon} aria-label="Share" />
        <IconButton icon={KebabHorizontalIcon} aria-label="More actions" />
      </ButtonGroup>,
    )
    const group = getByTestId('icon-button-group')
    const buttons = getAllByRole('button')

    expect(group).toHaveClass('ButtonGroup--variant-joined')
    expect(group.children).toHaveLength(3)
    for (const button of buttons) {
      expect(button).toHaveClass('Button--secondary', 'Button--size-small', 'ButtonGroup__joinedButton')
    }
    expect(await axe(container)).toHaveNoViolations()
  })

  it('preserves explicit variants in a joined IconButton group', () => {
    const {getAllByRole} = render(
      <ButtonGroup variant="joined">
        <IconButton icon={DownloadIcon} aria-label="Download" variant="primary" />
        <IconButton icon={ShareIcon} aria-label="Share" />
      </ButtonGroup>,
    )
    const buttons = getAllByRole('button')

    expect(buttons[0]).toHaveClass('Button--primary')
    expect(buttons[1]).toHaveClass('Button--secondary')
  })

  it('uses the default variant for IconButton children', () => {
    const {getAllByRole, getByTestId} = render(
      <ButtonGroup data-testid="icon-button-group">
        <IconButton icon={DownloadIcon} aria-label="Download" />
        <IconButton icon={ShareIcon} aria-label="Share" />
        <IconButton icon={KebabHorizontalIcon} aria-label="More actions" />
      </ButtonGroup>,
    )
    const buttons = getAllByRole('button')

    expect(getByTestId('icon-button-group')).not.toHaveClass('ButtonGroup--variant-joined')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveClass('Button--primary')
    expect(buttons[1]).toHaveClass('Button--secondary')
  })

  it('joins regular Button children with a uniform secondary variant', () => {
    const {getAllByRole, getByTestId} = render(
      <ButtonGroup data-testid="button-group" variant="joined">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    )
    const buttons = getAllByRole('button')

    expect(getByTestId('button-group')).toHaveClass('ButtonGroup--variant-joined')
    expect(buttons).toHaveLength(3)
    for (const button of buttons) {
      expect(button).toHaveClass('Button--secondary', 'ButtonGroup__joinedButton')
    }
  })

  it('joins mixed Button and IconButton children when requested', () => {
    const {getAllByRole, getByTestId} = render(
      <ButtonGroup data-testid="mixed-button-group" variant="joined">
        <Button>Download</Button>
        <IconButton icon={ShareIcon} aria-label="Share" />
        <Button>More details</Button>
      </ButtonGroup>,
    )
    const buttons = getAllByRole('button')

    expect(getByTestId('mixed-button-group')).toHaveClass('ButtonGroup--variant-joined')
    expect(buttons).toHaveLength(3)
    for (const button of buttons) {
      expect(button).toHaveClass('Button--secondary', 'ButtonGroup__joinedButton')
    }
  })

  it('supports IconButton in a mixed non-joined group', () => {
    const {getAllByRole, getByTestId} = render(
      <ButtonGroup data-testid="mixed-button-group">
        <Button>Download</Button>
        <IconButton icon={ShareIcon} aria-label="Share" />
      </ButtonGroup>,
    )
    const buttons = getAllByRole('button')

    expect(getByTestId('mixed-button-group')).not.toHaveClass('ButtonGroup--variant-joined')
    expect(buttons[0]).toHaveClass('Button--primary')
    expect(buttons[1]).toHaveClass('Button--secondary')
  })

  it('supports conditionally rendered children', () => {
    const ConditionalButtonGroup = ({showOptionalAction}: {showOptionalAction: boolean}) => (
      <ButtonGroup>
        <Button>Primary Action</Button>
        {showOptionalAction && <Button>Optional Action</Button>}
        <Button>Secondary Action</Button>
      </ButtonGroup>
    )

    const {getAllByRole, queryByRole} = render(<ConditionalButtonGroup showOptionalAction={false} />)

    const buttons = getAllByRole('button')
    expect(queryByRole('button', {name: 'Optional Action'})).not.toBeInTheDocument()
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveClass('Button--primary')
    expect(buttons[1]).toHaveClass('Button--secondary')
  })

  it('does not render arrows on buttons by default', () => {
    const {container} = render(
      <ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )
    const arrows = container.querySelectorAll('svg')
    expect(arrows).toHaveLength(0)
  })

  it('allows variant to be overridden via child props', () => {
    const {getAllByRole} = render(
      <ButtonGroup>
        <Button variant="primary">Primary Action</Button>
        <Button variant="secondary">Secondary Action</Button>
      </ButtonGroup>,
    )
    const buttons = getAllByRole('button')
    expect(buttons[0].classList).toContain('Button--primary')
    expect(buttons[1].classList).toContain('Button--secondary')
  })

  it('renders ActionMenu as valid children', () => {
    const {getByRole} = render(
      <ButtonGroup>
        <Button>Primary Action</Button>
        <ActionMenu size="small">
          <ActionMenu.Button>More actions</ActionMenu.Button>
          <ActionMenu.Overlay aria-label="More actions">
            <ActionMenu.Item value="Contact sales">Contact sales</ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
      </ButtonGroup>,
    )

    const menuButton = getByRole('button', {name: 'More actions'})
    expect(menuButton).toHaveClass('Button--size-small')
    expect(menuButton).toHaveClass('Button--secondary')

    fireEvent.click(menuButton)

    expect(getByRole('menu', {name: 'More actions'})).toBeInTheDocument()
  })

  it.each([
    ['small', 'small'],
    ['medium', 'medium'],
    ['large', 'medium'],
  ] as const)('applies the %s group size to ActionMenu as %s', (buttonSize, expectedSize) => {
    const {getByRole} = render(
      <ButtonGroup buttonSize={buttonSize}>
        <ActionMenu>
          <ActionMenu.Button>More actions</ActionMenu.Button>
          <ActionMenu.Overlay aria-label="More actions">
            <ActionMenu.Item value="Contact sales">Contact sales</ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
      </ButtonGroup>,
    )

    expect(getByRole('button', {name: 'More actions'})).toHaveClass(`Button--size-${expectedSize}`)
  })

  it('applies variants automatically to ActionMenu children', () => {
    const {getByRole} = render(
      <ButtonGroup>
        <ActionMenu>
          <ActionMenu.Button>Primary actions</ActionMenu.Button>
          <ActionMenu.Overlay aria-label="Primary actions">
            <ActionMenu.Item value="Primary action">Primary action</ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
        <ActionMenu>
          <ActionMenu.Button>Secondary actions</ActionMenu.Button>
          <ActionMenu.Overlay aria-label="Secondary actions">
            <ActionMenu.Item value="Secondary action">Secondary action</ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
      </ButtonGroup>,
    )

    expect(getByRole('button', {name: 'Primary actions'})).toHaveClass('Button--primary')
    expect(getByRole('button', {name: 'Secondary actions'})).toHaveClass('Button--secondary')
  })

  it('allows ActionMenu.Button variants to override automatic variants', () => {
    const {getByRole} = render(
      <ButtonGroup>
        <ActionMenu>
          <ActionMenu.Button variant="secondary">More actions</ActionMenu.Button>
          <ActionMenu.Overlay aria-label="More actions">
            <ActionMenu.Item value="Contact sales">Contact sales</ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
      </ButtonGroup>,
    )

    expect(getByRole('button', {name: 'More actions'})).toHaveClass('Button--secondary')
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

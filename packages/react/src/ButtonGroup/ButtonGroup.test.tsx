import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import {ButtonGroup} from './ButtonGroup'
import {Button} from '../Button'
import {ActionMenu} from '../ActionMenu'
import {axe, toHaveNoViolations} from 'jest-axe'

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

  it('applies primary variant automatically to the first button and subtle variant to second', () => {
    const {getAllByRole} = render(
      <ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )
    const buttons = getAllByRole('button')
    expect(buttons[0].classList).toContain('Button--primary')
    expect(buttons[1].classList).toContain('Button--subtle')
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
    expect(menuButton).toHaveClass('Button--subtle')

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
    expect(getByRole('button', {name: 'Secondary actions'})).toHaveClass('Button--subtle')
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

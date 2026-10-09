import React, {useState} from 'react'
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {axe, toHaveNoViolations} from 'jest-axe'
import {KebabHorizontalIcon, MarkGithubIcon} from '@primer/octicons-react'

import {ActionMenu} from './ActionMenu'

expect.extend(toHaveNoViolations)

describe('ActionMenu', () => {
  afterEach(cleanup)

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })
  })

  it('has no a11y violations on initial render', async () => {
    const {container} = render(
      <ActionMenu onSelect={newValue => alert(newValue)}>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link" selected>
            Copy link
          </ActionMenu.Item>
          <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
          <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render the button into the document on load', () => {
    const {getByText} = render(
      <ActionMenu onSelect={jest.fn()}>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link" selected>
            Copy link
          </ActionMenu.Item>
          <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
          <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    expect(getByText('Open menu')).toBeInTheDocument()
  })

  it('renders an accessible icon button trigger', async () => {
    const {container, getByRole} = render(
      <ActionMenu>
        <ActionMenu.IconButton icon={KebabHorizontalIcon} aria-label="Repository actions" />
        <ActionMenu.Overlay aria-label="Repository actions">
          <ActionMenu.Item value="Copy link">Copy link</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    const button = getByRole('button', {name: 'Repository actions'})

    expect(button).toHaveAttribute('aria-haspopup', 'menu')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    expect(await axe(container)).toHaveNoViolations()
  })

  it('toggles the menu from an icon button trigger', async () => {
    const {getByRole, queryByRole} = render(
      <ActionMenu>
        <ActionMenu.IconButton icon={KebabHorizontalIcon} aria-label="Repository actions" />
        <ActionMenu.Overlay aria-label="Repository actions">
          <ActionMenu.Item value="Copy link">Copy link</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    const button = getByRole('button', {name: 'Repository actions'})

    await userEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(queryByRole('menu', {name: 'Repository actions'})).toBeInTheDocument()
  })

  it('supports keyboard activation and restores focus to the icon button trigger', async () => {
    const user = userEvent.setup()
    const {getByRole, queryByRole} = render(
      <ActionMenu>
        <ActionMenu.IconButton icon={KebabHorizontalIcon} aria-label="Repository actions" />
        <ActionMenu.Overlay aria-label="Repository actions">
          <ActionMenu.Item value="Copy link">Copy link</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    const button = getByRole('button', {name: 'Repository actions'})
    await user.tab()
    expect(button).toHaveFocus()

    await user.keyboard('{Enter}')
    await waitFor(() => expect(getByRole('menuitem', {name: 'Copy link'})).toHaveFocus())

    await user.keyboard('{Escape}')

    await waitFor(() => expect(button).toHaveFocus())
    expect(queryByRole('menu')).not.toBeInTheDocument()
  })

  it('should not show the menu on load', () => {
    const {queryByLabelText} = render(
      <ActionMenu onSelect={jest.fn()}>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link" selected>
            Copy link
          </ActionMenu.Item>
          <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
          <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    expect(queryByLabelText('Actions')).toBe(null)
  })

  it('should toggle visibility of the menu when the button is clicked', async () => {
    const {getByText, queryByLabelText} = render(
      <ActionMenu onSelect={jest.fn()}>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link" selected>
            Copy link
          </ActionMenu.Item>
          <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
          <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const button = getByText('Open menu')

    fireEvent.click(button)

    await waitFor(
      () => {
        expect(queryByLabelText('Actions')).toBeInTheDocument()
      },
      {timeout: 100},
    )

    fireEvent.click(button)

    await waitFor(
      () => {
        expect(queryByLabelText('Actions')).not.toBeInTheDocument()
      },
      {timeout: 100},
    )
  })

  it("should forward the user's onClick callback and toggle the menu", () => {
    const mockOnClick = jest.fn()
    const {getByRole, queryByLabelText} = render(
      <ActionMenu>
        <ActionMenu.Button onClick={mockOnClick}>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link">Copy link</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    fireEvent.click(getByRole('button', {name: 'Open menu'}))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(queryByLabelText('Actions')).toBeInTheDocument()
  })

  it("should not toggle the menu when the user's onClick callback prevents the default action", () => {
    const mockOnClick = jest.fn(event => event.preventDefault())
    const {getByRole, queryByLabelText} = render(
      <ActionMenu>
        <ActionMenu.Button onClick={mockOnClick}>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link">Copy link</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    fireEvent.click(getByRole('button', {name: 'Open menu'}))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(queryByLabelText('Actions')).not.toBeInTheDocument()
  })

  it('should apply the button variant in default mode', () => {
    const {getByRole} = render(
      <ActionMenu>
        <ActionMenu.Button variant="subtle">Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link">Copy link</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    expect(getByRole('button', {name: 'Open menu'})).toHaveClass('Button--subtle')
  })

  it('should use the secondary button variant by default in default mode', () => {
    const {getByRole} = render(
      <ActionMenu>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link">Copy link</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    expect(getByRole('button', {name: 'Open menu'})).toHaveClass('Button--secondary')
  })

  it('should render the leading visual in default mode', () => {
    const accessibleText = 'Test icon'
    const TestIcon = () => <svg aria-label={accessibleText} />
    const {getByLabelText} = render(
      <ActionMenu>
        <ActionMenu.Button leadingVisual={<TestIcon />}>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link">Copy link</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    expect(getByLabelText(accessibleText)).toBeInTheDocument()
  })

  it("should set aria-haspopup to 'true' and aria-expanded to 'false' by default", () => {
    const {getByRole} = render(
      <ActionMenu onSelect={jest.fn()}>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link" selected>
            Copy link
          </ActionMenu.Item>
          <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
          <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    const button = getByRole('button')

    expect(button).toHaveAttribute('aria-haspopup', 'true')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it("should set aria-expanded to 'true' on button click", () => {
    const {getByRole} = render(
      <ActionMenu onSelect={jest.fn()}>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link" selected>
            Copy link
          </ActionMenu.Item>
          <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
          <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const button = getByRole('button')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it("should set the menu role to 'menu'", async () => {
    const {getByText, getByLabelText} = render(
      <ActionMenu onSelect={jest.fn()}>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link" selected>
            Copy link
          </ActionMenu.Item>
          <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
          <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const button = getByText('Open menu')

    fireEvent.click(button)

    await waitFor(
      () => {
        const menu = getByLabelText('Actions')

        expect(menu).toHaveAttribute('role', 'menu')
      },
      {timeout: 100},
    )
  })

  it("should apply role='menuitem' to ActionMenu.Item by default", async () => {
    const {getByText, getByRole} = render(
      <ActionMenu onSelect={jest.fn()}>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link" selected>
            Copy link
          </ActionMenu.Item>
          <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
          <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const button = getByText('Open menu')

    fireEvent.click(button)

    await waitFor(
      () => {
        const menuitem = getByRole('menuitem', {name: /Copy link/})

        expect(menuitem).toBeInTheDocument()
      },
      {timeout: 100},
    )
  })

  it('should forward the selected value to the handler via onSelect', async () => {
    const handler = jest.fn()

    const {getByText, getByRole} = render(
      <ActionMenu onSelect={handler} selectionVariant="single">
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="Copy link" selected>
            Copy link
          </ActionMenu.Item>
          <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
          <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const button = getByText('Open menu')

    fireEvent.click(button)

    await waitFor(
      () => {
        const menuitem = getByRole('menuitemradio', {name: /Copy link/})
        fireEvent.click(menuitem)

        expect(handler).toHaveBeenCalledWith('Copy link')
      },
      {timeout: 100},
    )
  })

  it('can update the button text when a menu item is selected', async () => {
    const ActionMenuWrapper = () => {
      const [buttonLabel, setButtonLabel] = useState('Open menu')

      const handler = newValue => {
        if (newValue === 'Quote reply') {
          setButtonLabel('Quote reply')
        }
      }

      return (
        <ActionMenu onSelect={handler} selectionVariant="single">
          <ActionMenu.Button>{buttonLabel}</ActionMenu.Button>
          <ActionMenu.Overlay aria-label="Actions">
            <ActionMenu.Item value="Copy link" selected>
              Copy link
            </ActionMenu.Item>
            <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
            <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
      )
    }

    const {getByText, getByRole} = render(<ActionMenuWrapper />)

    const button = getByText('Open menu')
    fireEvent.click(button)

    const quoteReplyMenuItem = getByRole('menuitemradio', {name: /Quote reply/})
    fireEvent.click(quoteReplyMenuItem)

    const updatedButton = getByText('Quote reply')
    expect(updatedButton).toBeInTheDocument()
  })

  it('should close the menu when Escape key is pressed', async () => {
    const {getByText, queryByLabelText} = render(
      <ActionMenu>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="1">Option 1</ActionMenu.Item>
          <ActionMenu.Item value="2">Option 2</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const button = getByText('Open menu')
    const menu = queryByLabelText('Actions')

    fireEvent.click(button)

    await waitFor(
      () => {
        if (menu) {
          expect(menu).toHaveAttribute('role', 'menu')
        }
      },
      {timeout: 100},
    )

    if (menu) {
      fireEvent.keyDown(menu, {key: 'Escape', code: 'Escape'})
    }

    expect(menu).toBe(null)
  })

  it('can select a menu item using enter key', async () => {
    const ActionMenuWrapper = () => {
      const [buttonLabel, setButtonLabel] = useState('Open menu')

      const handler = newValue => {
        if (newValue === 'Quote reply') {
          setButtonLabel('Quote reply')
        }
      }

      return (
        <ActionMenu onSelect={handler} selectionVariant="single">
          <ActionMenu.Button>{buttonLabel}</ActionMenu.Button>
          <ActionMenu.Overlay aria-label="Actions">
            <ActionMenu.Item value="Copy link">Copy link</ActionMenu.Item>
            <ActionMenu.Item value="Quote reply">Quote reply</ActionMenu.Item>
            <ActionMenu.Item value="Edit comment">Edit comment</ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
      )
    }

    const {getByText, getByRole} = render(<ActionMenuWrapper />)

    const button = getByText('Open menu')
    fireEvent.click(button)

    const quoteReplyMenuItem = getByRole('menuitemradio', {name: /Quote reply/})
    fireEvent.keyDown(quoteReplyMenuItem, {key: 'Enter'})

    const updatedButton = getByText('Quote reply')
    expect(updatedButton).toBeInTheDocument()
  })

  it('should render with the correct size', async () => {
    const {getByTestId} = render(
      <ActionMenu size="small">
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="1" data-testid="option-1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item value="2">Option 2</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const button = getByTestId(ActionMenu.testIds.button)
    expect(button).toHaveClass('Button--size-small')

    fireEvent.click(button)

    await waitFor(
      () => {
        const menuitem = getByTestId('option-1')

        expect(menuitem).toHaveClass('ActionMenu__item--small')
      },
      {timeout: 100},
    )
  })

  it('should allow falsey items to be selected', () => {
    const mockOnSelect = jest.fn()

    const {getByRole} = render(
      <ActionMenu onSelect={mockOnSelect} selectionVariant="single">
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Actions">
          <ActionMenu.Item value="test">Test string</ActionMenu.Item>
          <ActionMenu.Item value="">Empty string</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    fireEvent.click(getByRole('button', {name: 'Open menu'}))
    fireEvent.click(getByRole('menuitemradio', {name: 'Empty string'}))

    expect(mockOnSelect).toHaveBeenCalledWith('')
  })

  /*
   * Split button mode
   */

  it('has no a11y violations on initial render in split-button mode', async () => {
    const {container} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render two actions when using split-button mode', () => {
    const {getByText, getByRole} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    // Check main action button exists
    expect(getByText('Primary Action')).toBeInTheDocument()

    // Check dropdown button exists
    expect(getByRole('button', {name: 'Additional options'})).toBeInTheDocument()
  })

  it('renders an icon link and independent menu trigger in split-button mode', async () => {
    const {container, getByRole, queryByRole} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.IconButton as="a" href="#repository" icon={MarkGithubIcon} aria-label="Open repository" />
        <ActionMenu.Overlay aria-label="Repository actions">
          <ActionMenu.Item as="a" href="#issues">
            Issues
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    const primaryAction = getByRole('link', {name: 'Open repository'})
    const menuButton = getByRole('button', {name: 'Repository actions'})

    expect(primaryAction.parentElement).toHaveClass('ActionMenu__button--split-button')
    expect(primaryAction).toHaveAttribute('href', '#repository')
    expect(menuButton).toHaveAttribute('aria-haspopup', 'menu')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(queryByRole('menu')).not.toBeInTheDocument()

    await userEvent.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('menu', {name: 'Repository actions'})).toBeInTheDocument()
    await waitFor(() => expect(getByRole('link', {name: 'Issues'})).toHaveFocus())
    expect(await axe(container)).toHaveNoViolations()
  })

  it('prevents activation of a disabled icon link in split-button mode', () => {
    const handleClick = jest.fn()
    const {getByRole} = render(
      <ActionMenu mode="split-button" disabled>
        <ActionMenu.IconButton
          as="a"
          href="#repository"
          icon={MarkGithubIcon}
          aria-label="Open repository"
          onClick={handleClick}
        />
        <ActionMenu.Overlay aria-label="Repository actions">
          <ActionMenu.Item as="a" href="#issues">
            Issues
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    const primaryAction = getByRole('link', {name: 'Open repository'})
    const clickEvent = new MouseEvent('click', {bubbles: true, cancelable: true})

    fireEvent(primaryAction, clickEvent)

    expect(primaryAction).toHaveAttribute('aria-disabled', 'true')
    expect(clickEvent.defaultPrevented).toBe(true)
    expect(handleClick).not.toHaveBeenCalled()
    expect(getByRole('button', {name: 'Repository actions'})).toBeDisabled()
  })

  it('should render the main button with correct href attribute', () => {
    const {getByText} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const mainButton = getByText('Primary Action').closest('a')
    expect(mainButton).toHaveAttribute('href', '#option1')
  })

  it('should forward custom attributes to the primary action in split-button mode', () => {
    const {getByRole} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button as="a" href="#option1" data-attribute="test">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    expect(getByRole('link', {name: 'Primary Action'})).toHaveAttribute('data-attribute', 'test')
    expect(getByRole('button', {name: 'Additional options'})).not.toHaveAttribute('data-attribute')
  })

  it('should toggle menu when clicking the chevron button', async () => {
    const {getByRole, queryByRole} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const chevronButton = getByRole('button', {name: 'Additional options'})

    // Initially, menu should not be visible
    expect(queryByRole('menu', {name: 'Additional options'})).not.toBeInTheDocument()

    // open the menu
    fireEvent.click(chevronButton)

    await waitFor(
      () => {
        expect(queryByRole('menu', {name: 'Additional options'})).toBeInTheDocument()
      },
      {timeout: 100},
    )

    expect(chevronButton).toHaveAttribute('aria-expanded', 'true')
    expect(chevronButton).toHaveAttribute('aria-label', 'Additional options')

    // close it
    fireEvent.click(chevronButton)

    await waitFor(
      () => {
        expect(queryByRole('menu', {name: 'Additional options'})).not.toBeInTheDocument()
      },
      {timeout: 100},
    )
  })

  it('should keep the primary and menu actions independent in split-button mode', async () => {
    const mockOnClick = jest.fn()
    const user = userEvent.setup()
    const {getByRole, queryByRole} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button onClick={mockOnClick}>Primary Action</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const primaryButton = getByRole('button', {name: 'Primary Action'})
    fireEvent.click(primaryButton)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(queryByRole('menu', {name: 'Additional options'})).not.toBeInTheDocument()

    await user.tab()
    expect(primaryButton).toHaveFocus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')

    expect(mockOnClick).toHaveBeenCalledTimes(3)
    expect(queryByRole('menu', {name: 'Additional options'})).not.toBeInTheDocument()

    fireEvent.click(getByRole('button', {name: 'Additional options'}))

    expect(mockOnClick).toHaveBeenCalledTimes(3)
    expect(queryByRole('menu', {name: 'Additional options'})).toBeInTheDocument()
  })

  it('should render items as links with correct href attribute', async () => {
    const {getByRole, getAllByRole} = render(
      <ActionMenu mode="split-button" open>
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )
    const menu = getByRole('menu', {name: 'Additional options'})
    expect(menu).toBeInTheDocument()

    const menuItems = getAllByRole('menuitem')
    expect(menuItems.length).toBe(2)

    let index = 1
    for (const item of menuItems) {
      const link = item.querySelector('a')

      expect(link).toHaveAttribute('href', `#option${index}`)
      index++
    }
  })

  it('should apply correct size class to split button', () => {
    const {container} = render(
      <ActionMenu mode="split-button" size="small">
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const buttonContainer = container.querySelector(`.ActionMenu__button--small`)
    expect(buttonContainer).toBeInTheDocument()
  })

  it('should apply a different, optional button variant to split button', () => {
    const {container} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button as="a" href="#option1" variant="subtle">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const variantButton = container.querySelector(`.ActionMenu__innerButton--subtle`)
    expect(variantButton).toBeInTheDocument()
  })

  it('should use the primary button variant by default in split-button mode', () => {
    const {getByRole} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    expect(getByRole('link', {name: 'Primary Action'})).toHaveClass('Button--primary')
    expect(getByRole('button', {name: 'Additional options'})).toHaveClass('Button--primary')
  })

  it('should not change main button href when menu is toggled', async () => {
    const {getByText, getByRole} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const mainButton = getByText('Primary Action').closest('a')
    expect(mainButton).toHaveAttribute('href', '#option1')

    const chevronButton = getByRole('button', {name: 'Additional options'})
    fireEvent.click(chevronButton)

    await waitFor(
      () => {
        expect(getByRole('menu', {name: 'Additional options'})).toBeInTheDocument()
      },
      {timeout: 100},
    )

    // Main button should still have the same href
    expect(mainButton).toHaveAttribute('href', '#option1')
  })

  it('should support disabled state in split-button mode', () => {
    const {getByText, getByRole} = render(
      <ActionMenu mode="split-button" disabled>
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const mainButtonLink = getByText('Primary Action').closest('a')
    expect(mainButtonLink).toHaveAttribute('aria-disabled', 'true')
    expect(mainButtonLink).toHaveClass('Button--disabled')

    const dropdownButton = getByRole('button', {name: 'Additional options'})
    expect(dropdownButton).toBeDisabled()
  })

  it('should render with leadingVisual in main button and menu items', () => {
    const accessibleText = 'Test icon'
    const TestIcon = () => <svg aria-label={accessibleText} />

    const {getByLabelText, getByRole} = render(
      <ActionMenu mode="split-button">
        <ActionMenu.Button as="a" href="#option1" leadingVisual={<TestIcon />}>
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1" leadingVisual={<TestIcon />}>
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2" leadingVisual={<TestIcon />}>
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const buttonIcon = getByLabelText(accessibleText)
    expect(buttonIcon).toBeInTheDocument()

    const chevronButton = getByRole('button', {name: 'Additional options'})
    fireEvent.click(chevronButton)

    const overlay = getByRole('menu', {name: 'Additional options'})
    const menuItemIcons = overlay.querySelectorAll(`[aria-label="${accessibleText}"]`)
    expect(menuItemIcons.length).toBe(2)
  })

  it('should support keyboard navigation in the menu', async () => {
    const {getByRole, getAllByRole} = render(
      <ActionMenu mode="split-button" open>
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option3">
            Option 3
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    // First item should be automatically focused
    await waitFor(
      () => {
        const [firstItem] = getAllByRole('menuitem')

        const linkEl = firstItem.querySelector('a')

        expect(document.activeElement).toBe(linkEl)
      },
      {timeout: 100},
    )

    // Second item should be focused when arrow down is pressed
    fireEvent.keyDown(document.activeElement as Element, {key: 'ArrowDown'})
    await waitFor(
      () => {
        const [, secondItem] = getAllByRole('menuitem')
        const linkEl = secondItem.querySelector('a')
        expect(document.activeElement).toBe(linkEl)
      },
      {timeout: 100},
    )

    fireEvent.keyDown(document.activeElement as Element, {key: 'ArrowUp'})
    fireEvent.keyDown(document.activeElement as Element, {key: 'ArrowUp'})
    await waitFor(
      () => {
        const [, , thirdItem] = getAllByRole('menuitem')

        const linkEl = thirdItem.querySelector('a')
        expect(document.activeElement).toBe(linkEl)
      },
      {timeout: 100},
    )

    // escaping the menu focus should return
    fireEvent.keyDown(document.activeElement as Element, {key: 'Escape'})
    await waitFor(
      () => {
        expect(document.activeElement).toBe(getByRole('button', {name: 'Additional options'}))
      },
      {timeout: 100},
    )
  })

  it('should respect menuAlignment prop in split-button mode', async () => {
    const {getByRole} = render(
      <ActionMenu mode="split-button" menuAlignment="end" open>
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1">
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    await waitFor(
      () => {
        const menu = getByRole('menu', {name: 'Additional options'})
        expect(menu).toHaveClass('ActionMenu__menu--pos-outside-bottom')
      },
      {timeout: 100},
    )
  })

  it('should call the onClick callback when an item is clicked in split-button mode when as="a"', async () => {
    const mockOnClick = jest.fn()

    const {getByRole} = render(
      <ActionMenu mode="split-button" open>
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1" onClick={mockOnClick}>
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const option1 = getByRole('menuitem', {name: 'Option 1'})
    fireEvent.click(option1)

    expect(mockOnClick).toHaveBeenCalled()
  })

  it('should call the onKeyDown callback when a key is pressed in split-button mode when as="a"', async () => {
    const mockOnKeyDown = jest.fn()

    const {getByRole} = render(
      <ActionMenu mode="split-button" open>
        <ActionMenu.Button as="a" href="#option1">
          Primary Action
        </ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Additional options">
          <ActionMenu.Item as="a" href="#option1" onKeyDown={mockOnKeyDown}>
            Option 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#option2">
            Option 2
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>,
    )

    const option1 = getByRole('menuitem', {name: 'Option 1'})
    fireEvent.focus(option1)

    fireEvent.keyDown(option1, {key: 'Enter'})

    expect(mockOnKeyDown).toHaveBeenCalled()
  })
})

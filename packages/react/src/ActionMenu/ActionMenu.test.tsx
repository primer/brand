import React, {useState} from 'react'
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {ActionMenu} from './ActionMenu'

expect.extend(toHaveNoViolations)

describe('ActionMenu', () => {
  afterEach(cleanup)

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
})

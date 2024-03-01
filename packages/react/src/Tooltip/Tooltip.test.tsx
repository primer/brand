import React from 'react'
import type {TooltipProps} from '../Tooltip'
import {Tooltip} from '../Tooltip'
import {render as HTMLRender} from '@testing-library/react'
import {Button, ActionMenu, ThemeProvider, Link} from '../..'
import {BookIcon, XIcon} from '@primer/octicons-react'

const TooltipComponent = (props: Omit<TooltipProps, 'text'> & {text?: string}) => (
  <Tooltip text="Tooltip text" {...props}>
    <Button>Button Text</Button>
  </Tooltip>
)

describe('Tooltip', () => {
  it('renders `data-direction="s"` by default', () => {
    const {getByText} = HTMLRender(<TooltipComponent />)
    expect(getByText('Tooltip text')).toHaveAttribute('data-direction', 's')
  })
  it('renders `data-direction` attribute with the correct value when the `direction` prop is specified', () => {
    const {getByText} = HTMLRender(<TooltipComponent direction="n" />)
    expect(getByText('Tooltip text')).toHaveAttribute('data-direction', 'n')
  })
  it('should label the trigger element by its tooltip when the tooltip type is label', () => {
    const {getByRole, getByText} = HTMLRender(<TooltipComponent type="label" />)
    const triggerEL = getByRole('button')
    const tooltipEl = getByText('Tooltip text')
    expect(triggerEL).toHaveAttribute('aria-labelledby', tooltipEl.id)
  })
  it('should render aria-hidden on the tooltip element when the tooltip is label type', () => {
    const {getByText} = HTMLRender(<TooltipComponent type="label" />)
    expect(getByText('Tooltip text')).toHaveAttribute('aria-hidden', 'true')
  })
  it('should describe the trigger element by its tooltip when the tooltip type is description (by default)', () => {
    const {getByRole, getByText} = HTMLRender(<TooltipComponent />)
    const triggerEL = getByRole('button')
    const tooltipEl = getByText('Tooltip text')
    expect(triggerEL).toHaveAttribute('aria-describedby', tooltipEl.id)
  })
  it('should render the tooltip element with role="tooltip" when the tooltip type is description (by default)', () => {
    const {getByText} = HTMLRender(<TooltipComponent />)
    expect(getByText('Tooltip text')).toHaveAttribute('role', 'tooltip')
  })
  it('should use the custom tooltip id (if present) to label the trigger element', () => {
    const {getByRole} = HTMLRender(
      <Tooltip id="custom-tooltip-id" text="Close feedback form" direction="nw" type="label">
        <Link
          aria-labelledby="custom-tooltip-id"
          href="https://github.com/primer/react/contributor-docs/CONTRIBUTING.md"
        >
          <BookIcon />
        </Link>
      </Tooltip>,
    )
    const triggerEL = getByRole('button')
    expect(triggerEL).toHaveAttribute('aria-labelledby', 'custom-tooltip-id')
  })
  it('should use the custom tooltip id (if present) to described the trigger element', () => {
    const {getByRole} = HTMLRender(
      <Tooltip text="This operation cannot be reverted" id="custom-tooltip-id">
        <Button>Delete</Button>
      </Tooltip>,
    )
    const triggerEL = getByRole('button')
    expect(triggerEL).toHaveAttribute('aria-describedby', 'custom-tooltip-id')
  })
})

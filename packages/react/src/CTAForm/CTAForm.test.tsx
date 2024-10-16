import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import {CTAForm, FormControl, TextInput, Checkbox} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('CTAForm', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(<CTAForm></CTAForm>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('allows and passes expected attributes to the form component', async () => {
    const expectedAction = 'my_redirect_url'
    const expectedMethod = 'POST'
    const expectedTarget = '_blank'
    const mockTestId = 'test'
    const expectedClass = 'test'

    const {getByTestId} = render(
      <CTAForm
        data-testid={mockTestId}
        className={expectedClass}
        action={expectedAction}
        method={expectedMethod}
        target={expectedTarget}
      >
        <CTAForm.Action>submit</CTAForm.Action>
      </CTAForm>,
    )
    const ctaFormEl = getByTestId(mockTestId)
    expect(ctaFormEl).toHaveAttribute('action', expectedAction)
    expect(ctaFormEl).toHaveAttribute('method', expectedMethod)
    expect(ctaFormEl).toHaveAttribute('target', expectedTarget)
    expect(ctaFormEl.classList).toContain(expectedClass)
  })

  it('submits the form correctly', () => {
    const expectedAction = 'https://www.github.com'
    const expectedMethod = 'POST'
    const expectedTarget = '_blank'
    const mockTestId = 'test'
    const expectedClass = 'test'
    const mockSubmit = jest.fn(e => e.preventDefault())
    const submitText = 'Submit'

    const {getByTestId} = render(
      <CTAForm
        className={expectedClass}
        action={expectedAction}
        method={expectedMethod}
        target={expectedTarget}
        onSubmit={mockSubmit}
      >
        <CTAForm.Action data-testid={mockTestId}>{submitText}</CTAForm.Action>
      </CTAForm>,
    )
    fireEvent(
      getByTestId(mockTestId),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(mockSubmit).toHaveBeenCalledTimes(1)
  })

  it('allows and passes expected attributes to the CTAForm.Input component', async () => {
    const mockTestId = 'test'
    const expectedClass = 'test'

    const {getByTestId} = render(<CTAForm.Input data-testid={mockTestId} className={expectedClass}></CTAForm.Input>)
    const ctaInputEl = getByTestId(mockTestId)
    expect(ctaInputEl.classList).toContain(expectedClass)
  })

  it('allows and passes expected attributes to FormControl within the CTAForm.Input component', async () => {
    const {container, getByRole} = render(
      <CTAForm.Input>
        <FormControl>
          <FormControl.Label>label</FormControl.Label>
          <TextInput />
        </FormControl>
      </CTAForm.Input>,
    )
    const labelEl = container.querySelector('label')
    const inputEl = getByRole('textbox')
    // Testing that the label has the required asterisk
    expect(labelEl?.textContent).toContain('*')
    // Testing that the input has the full width class
    expect(inputEl.classList).toContain('TextInput--fullWidth')
    // Testing that the label and input are set to the large size
    expect(inputEl.classList).toContain(`TextInput--medium`)
    expect(labelEl?.classList).toContain('FormControl-label--medium')
  })

  it('allows and passes expected attributes to the CTAForm.Confirm component', async () => {
    const mockTestId = 'test'
    const expectedClass = 'test'

    const {getByTestId} = render(<CTAForm.Confirm data-testid={mockTestId} className={expectedClass}></CTAForm.Confirm>)
    const ctaConfirmEl = getByTestId(mockTestId)
    expect(ctaConfirmEl.classList).toContain(expectedClass)
  })

  it('allows and passes expected attributes to FormControl within the CTAForm.Input component', async () => {
    const {container} = render(
      <CTAForm.Confirm>
        <FormControl>
          <FormControl.Label>Test label</FormControl.Label>
          <Checkbox />
        </FormControl>
      </CTAForm.Confirm>,
    )

    // This is required because currently `Checkbox` renders its own label, so we end up with 2 labels in the DOM
    const labelEl = Array.from(container.querySelectorAll('label')).find(el => el.textContent === 'Test label')

    const formControlEl = container.querySelector('section')
    // Testing that the FormControl has the full width class
    expect(formControlEl?.classList).toContain('FormControl--fullWidth')
    // Testing that the label is set to the large size
    expect(labelEl?.classList).toContain('FormControl-label--large')
  })

  it('allows and passes expected attributes to the CTAForm.Action component', async () => {
    const mockTestId = 'test'
    const expectedClass = 'test'
    const mockClick = jest.fn(e => e.preventDefault())

    const {getByTestId} = render(
      <CTAForm.Action data-testid={mockTestId} className={expectedClass} onClick={mockClick}>
        Submit
      </CTAForm.Action>,
    )
    const ctaButtonEl = getByTestId(mockTestId)
    expect(ctaButtonEl).toHaveAttribute('type', 'submit')
    fireEvent(
      getByTestId(mockTestId),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('renders an uncontrolled CTAForm.Action component correctly', () => {
    const sideEffectValue = 'mock value 2'

    const MockComponent = () => {
      const ref = React.useRef<HTMLButtonElement>(null)

      React.useEffect(() => {
        if (ref.current) {
          ref.current.value = sideEffectValue
        }
      }, [ref])

      return <CTAForm.Action ref={ref} />
    }

    const {getByRole} = render(<MockComponent />)
    const ctaFormActionElement = getByRole('button') as HTMLButtonElement
    expect(ctaFormActionElement.value).toBe(sideEffectValue)
  })
})

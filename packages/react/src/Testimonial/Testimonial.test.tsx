import React, {useEffect} from 'react'
import {act, fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {Testimonial, TestimonialQuoteMarkColors, type TestimonialProps} from './Testimonial'
import {testIds as textCursorAnimationTestIds} from '../TextCursorAnimation'

expect.extend(toHaveNoViolations)

describe('Testimonial', () => {
  const mockQuote = 'GitHub helps us ensure that we have our security controls baked into our pipelines.'
  const mockName = 'David Ross'
  const mockPosition = 'Staff Security Engineer'
  const mockAvatarSrc = '/images/avatar-mona.png'
  const mockAvatarAlt = 'David Ross avatar'
  const originalIntersectionObserver = window.IntersectionObserver

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
    window.IntersectionObserver = jest.fn(
      () => ({disconnect: jest.fn(), observe: jest.fn(), unobserve: jest.fn()} as unknown as IntersectionObserver),
    )
  })

  afterAll(() => {
    window.IntersectionObserver = originalIntersectionObserver
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  const DefaultTestimonial = () => (
    <Testimonial>
      <Testimonial.Quote>{mockQuote}</Testimonial.Quote>
      <Testimonial.Name position={mockPosition}>{mockName}</Testimonial.Name>
      <Testimonial.Avatar src={mockAvatarSrc} alt={mockAvatarAlt} />
    </Testimonial>
  )

  it('has no accessibility violations', async () => {
    const {container} = render(<DefaultTestimonial />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders with default props', () => {
    const {getByRole, getByText} = render(<DefaultTestimonial />)

    const figure = getByRole('figure')
    const quote = getByText(mockQuote)
    const name = getByText(mockName)
    const position = getByText(mockPosition)
    const avatar = getByRole('img', {name: mockAvatarAlt})

    expect(figure).toBeInTheDocument()
    expect(quote).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(position).toBeInTheDocument()
    expect(avatar).toBeInTheDocument()
  })

  it.each([undefined, '', 'custom-testimonial'])('uses the expected root test ID for %p', testId => {
    const {getByTestId, getByRole} = render(
      <Testimonial data-testid={testId}>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    expect(getByTestId(testId || Testimonial.testIds.root)).toBe(getByRole('figure'))
  })

  it('renders the default minimal presentation with a green quote mark', () => {
    const {getByTestId, getByRole} = render(<DefaultTestimonial />)

    const quoteMark = getByTestId(Testimonial.testIds.quoteMark)
    expect(quoteMark).toHaveClass('Testimonial__quoteMark--green')
    expect(quoteMark).toHaveClass('Testimonial__quoteMark')
    expect(getByRole('figure')).toHaveClass('Testimonial--variant-minimal')
  })

  it('allows forwarding of custom classes', () => {
    const {getByRole} = render(
      <Testimonial className="custom-testimonial">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    expect(figure).toHaveClass('custom-testimonial')
    expect(figure).toHaveClass('Testimonial')
  })

  it('merges part classes without replacing built-in styling classes', () => {
    const {getByTestId, getByRole} = render(
      <Testimonial quoteMarkClassName="custom-quote-mark" mediaClassName="custom-media">
        <Testimonial.Quote>Customer quote</Testimonial.Quote>
        <Testimonial.Avatar src={mockAvatarSrc} alt={mockAvatarAlt} className="custom-avatar" />
        <Testimonial.Name>Mona Lisa</Testimonial.Name>
      </Testimonial>,
    )

    expect(getByTestId(Testimonial.testIds.quoteMark)).toHaveClass('Testimonial__quoteMark', 'custom-quote-mark')
    expect(getByTestId(Testimonial.testIds.media)).toHaveClass('Testimonial__media', 'custom-media')
    expect(getByRole('img', {name: mockAvatarAlt}).parentElement).toHaveClass('Testimonial-avatar', 'custom-avatar')
  })

  it('supports RefObject for the root Testimonial component', () => {
    const MockComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null)

      useEffect(() => {
        if (ref.current) {
          ref.current.classList.add('test-class')
        }
      }, [ref])

      return (
        <Testimonial ref={ref}>
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>
      )
    }

    const {container} = render(<MockComponent />)

    const el = container.querySelector('.Testimonial')
    expect(el).toHaveClass('test-class')
  })

  it('supports functional ref for Testimonial component', () => {
    const mockRef = jest.fn()
    const {getByRole} = render(
      <Testimonial ref={mockRef}>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    expect(mockRef).toHaveBeenCalledWith(figure)
  })

  it.each(['minimal', 'default', 'subtle', 'expressive'] as const)('renders %s variant', variant => {
    const {getByRole} = render(
      <Testimonial variant={variant}>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    expect(figure).toHaveClass(`Testimonial--variant-${variant}`)
  })

  it.each(['small', 'large'] as const)('renders %s size', size => {
    const {getByRole} = render(
      <Testimonial size={size}>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    expect(figure).toHaveClass(`Testimonial--size-${size}`)
  })

  it('applies border class when hasBorder is true', () => {
    const {getByRole} = render(
      <Testimonial hasBorder>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    expect(figure).toHaveClass('Testimonial--border')
  })

  it('does not apply border class when hasBorder is false', () => {
    const {getByRole} = render(
      <Testimonial hasBorder={false}>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    expect(figure).not.toHaveClass('Testimonial--border')
  })

  it('applies custom quote mark color', () => {
    const {getByRole, getByTestId} = render(
      <Testimonial quoteMarkColor="blue">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteMark = getByTestId(Testimonial.testIds.quoteMark)
    expect(quoteMark).toHaveClass('Testimonial__quoteMark--blue')
    const figure = getByRole('figure')

    expect(figure).toHaveStyle({'--testimonial-accent-color': 'blue'})
  })

  it('applies the quote mark tile without requiring a testimonial group', () => {
    const {getByTestId} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteMark = getByTestId(Testimonial.testIds.quoteMark)
    expect(quoteMark).toHaveClass('Testimonial__quoteMark')
  })

  it.each(['blue-purple', 'green-blue', 'pink-blue', 'purple-red', 'red-orange', 'unsupported'])(
    'falls back to solid green for the unsupported quote mark color %s',
    quoteMarkColor => {
      const {getByTestId, getByRole} = render(
        <Testimonial quoteMarkColor={quoteMarkColor as TestimonialProps['quoteMarkColor']}>
          <Testimonial.Quote>Customer quote</Testimonial.Quote>
          <Testimonial.Name>Mona Lisa</Testimonial.Name>
        </Testimonial>,
      )

      expect(TestimonialQuoteMarkColors).not.toContain(quoteMarkColor)
      expect(getByTestId(Testimonial.testIds.quoteMark)).toHaveClass('Testimonial__quoteMark--green')
      expect(getByRole('figure')).toHaveStyle({'--testimonial-accent-color': 'green'})
    },
  )

  it.each(['minimal', 'default', 'subtle', 'expressive'] as const)(
    'uses the shared green quote mark presentation for the %s variant',
    variant => {
      const {getByTestId} = render(
        <Testimonial variant={variant}>
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>,
      )

      const quoteMark = getByTestId(Testimonial.testIds.quoteMark)
      expect(quoteMark).toHaveClass('Testimonial__quoteMark', 'Testimonial__quoteMark--green')
    },
  )

  it.each(TestimonialQuoteMarkColors)('preserves an explicit %s quote mark color', quoteMarkColor => {
    const {getByTestId} = render(
      <Testimonial variant="subtle" quoteMarkColor={quoteMarkColor}>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    expect(getByTestId(Testimonial.testIds.quoteMark)).toHaveClass(
      'Testimonial__quoteMark',
      `Testimonial__quoteMark--${quoteMarkColor}`,
    )
  })

  it('renders quote in blockquote element', () => {
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>{mockQuote}</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const blockquote = getByText(mockQuote).closest('blockquote')
    expect(blockquote).toBeInTheDocument()
  })

  it('forwards attributes and event handlers to the quote element', () => {
    const handleActivate = jest.fn()
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote
          id="customer-quote"
          lang="en"
          aria-label="Customer statement"
          style={{opacity: 0.5}}
          onClick={handleActivate}
        >
          Customer quote
        </Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )
    const quote = getByText('Customer quote').closest('blockquote')

    expect(quote).toHaveAttribute('id', 'customer-quote')
    expect(quote).toHaveAttribute('lang', 'en')
    expect(quote).toHaveAttribute('aria-label', 'Customer statement')
    expect(quote).toHaveStyle({opacity: 0.5})
    fireEvent.click(getByText('Customer quote'))
    expect(handleActivate).toHaveBeenCalledTimes(1)
  })

  it('renders bold text within the quote', () => {
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>
          This is <b>bold</b> text
        </Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    expect(getByText('bold').tagName).toBe('B')
  })

  it('renders emphasized text within the quote', () => {
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>
          This is <em>emphasized</em> text
        </Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    expect(getByText('emphasized').tagName).toBe('EM')
  })

  it('renders simple quote text without bold or emphasized elements', () => {
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>Simple quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteText = getByText('Simple quote text').closest('.Testimonial-quote')
    expect(quoteText?.querySelector('b')).toBeNull()
    expect(quoteText?.querySelector('em')).toBeNull()
  })

  it('supports RefObject for Testimonial.Quote component', () => {
    const refObject = React.createRef<HTMLElement>()
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote ref={refObject}>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const blockquote = getByText('Quote text').closest('blockquote')
    expect(refObject.current).toBe(blockquote)
  })

  it('supports functional ref for Testimonial.Quote component', () => {
    const mockRef = jest.fn()
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote ref={mockRef}>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const blockquote = getByText('Quote text').closest('blockquote')
    expect(mockRef).toHaveBeenCalledWith(blockquote)
  })

  it('renders name in figcaption element', () => {
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>{mockName}</Testimonial.Name>
      </Testimonial>,
    )

    const figcaption = getByText(mockName).closest('figcaption')
    expect(figcaption).toBeInTheDocument()
  })

  it('forwards attributes and event handlers to the name element', () => {
    const handleActivate = jest.fn()
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>Customer quote</Testimonial.Quote>
        <Testimonial.Name
          id="customer-name"
          lang="en"
          aria-label="Customer attribution"
          style={{opacity: 0.5}}
          onClick={handleActivate}
        >
          Hubot
        </Testimonial.Name>
      </Testimonial>,
    )
    const name = getByText('Hubot').closest('figcaption')

    expect(name).toHaveAttribute('id', 'customer-name')
    expect(name).toHaveAttribute('lang', 'en')
    expect(name).toHaveAttribute('aria-label', 'Customer attribution')
    expect(name).toHaveStyle({opacity: 0.5})
    fireEvent.click(getByText('Hubot'))
    expect(handleActivate).toHaveBeenCalledTimes(1)
  })

  it('renders name without position', () => {
    const {getByText, queryByText} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>{mockName}</Testimonial.Name>
      </Testimonial>,
    )

    const name = getByText(mockName)
    const position = queryByText(mockPosition)
    expect(name).toBeInTheDocument()
    expect(position).not.toBeInTheDocument()
  })

  it('renders name with position', () => {
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name position={mockPosition}>{mockName}</Testimonial.Name>
      </Testimonial>,
    )

    const name = getByText(mockName)
    const position = getByText(mockPosition)
    expect(name).toBeInTheDocument()
    expect(position).toBeInTheDocument()
  })

  it.each(['minimal', 'default', 'subtle'] as const)('does not animate the speaker name in the %s variant', variant => {
    const intersectionObserver = jest.spyOn(window, 'IntersectionObserver')

    const {getByText, container} = render(
      <Testimonial variant={variant}>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>{mockName}</Testimonial.Name>
      </Testimonial>,
    )

    expect(getByText(mockName)).toBeVisible()
    expect(container.querySelector('.TextCursorAnimation')).not.toBeInTheDocument()
    expect(intersectionObserver).not.toHaveBeenCalled()
  })

  it('scrambles the speaker name after it appears on screen and the delay elapses', () => {
    jest.useFakeTimers()
    jest.spyOn(performance, 'now').mockReturnValue(0)

    let intersectionObserverCallback: IntersectionObserverCallback
    const disconnect = jest.fn()
    jest.spyOn(window, 'IntersectionObserver').mockImplementation(callback => {
      intersectionObserverCallback = callback
      return {disconnect, observe: jest.fn(), unobserve: jest.fn()} as unknown as IntersectionObserver
    })

    let nextFrame: FrameRequestCallback | undefined
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      nextFrame = callback
      return 1
    })

    const {getByTestId, queryByTestId} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>{mockName}</Testimonial.Name>
      </Testimonial>,
    )
    const animatedName = getByTestId(textCursorAnimationTestIds.text)

    expect(animatedName).toHaveTextContent('')
    expect(queryByTestId(textCursorAnimationTestIds.cursor)).not.toBeInTheDocument()

    act(() => {
      intersectionObserverCallback([{isIntersecting: true} as IntersectionObserverEntry], {} as IntersectionObserver)
    })
    act(() => jest.advanceTimersByTime(499))
    expect(window.requestAnimationFrame).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))
    act(() => nextFrame?.(100))

    expect(animatedName).toHaveTextContent('Dav=')
    expect(animatedName.nextElementSibling).toBe(getByTestId(textCursorAnimationTestIds.cursor))
    expect(disconnect).toHaveBeenCalled()
  })

  it('applies custom className to name', () => {
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name className="custom-name">{mockName}</Testimonial.Name>
      </Testimonial>,
    )

    const figcaption = getByText(mockName).closest('figcaption')
    expect(figcaption).toHaveClass('custom-name')
  })

  it('supports RefObject for Testimonial.Name component', () => {
    const refObject = React.createRef<HTMLElement>()
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name ref={refObject}>{mockName}</Testimonial.Name>
      </Testimonial>,
    )

    const figcaption = getByText(mockName).closest('figcaption')
    expect(refObject.current).toBe(figcaption)
  })

  it('supports functional ref for Testimonial.Name component', () => {
    const mockRef = jest.fn()
    const {getByText} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name ref={mockRef}>{mockName}</Testimonial.Name>
      </Testimonial>,
    )

    const figcaption = getByText(mockName).closest('figcaption')
    expect(mockRef).toHaveBeenCalledWith(figcaption)
  })

  it('renders avatar image', () => {
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Avatar src={mockAvatarSrc} alt={mockAvatarAlt} />
      </Testimonial>,
    )

    const avatar = getByRole('img', {name: mockAvatarAlt})
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', mockAvatarSrc)
  })

  it('forwards an object ref to the avatar image', () => {
    const refObject = React.createRef<HTMLImageElement>()
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Avatar ref={refObject} src={mockAvatarSrc} alt={mockAvatarAlt} />
      </Testimonial>,
    )

    expect(refObject.current).toBe(getByRole('img', {name: mockAvatarAlt}))
  })

  it('forwards a callback ref to the avatar image', () => {
    const handleRef = jest.fn()
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Avatar ref={handleRef} src={mockAvatarSrc} alt={mockAvatarAlt} />
      </Testimonial>,
    )

    expect(handleRef).toHaveBeenCalledWith(getByRole('img', {name: mockAvatarAlt}))
  })

  it('renders the avatar with a size of 48px, regardless of the passed "size" prop', () => {
    const {getByAltText} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Avatar src={mockAvatarSrc} alt={mockAvatarAlt} size={64} />
      </Testimonial>,
    )

    const avatarContainer = getByAltText(mockAvatarAlt).parentElement
    expect(avatarContainer).toHaveClass('Avatar--size-48')
  })

  it('renders logo with img element and preserves its class name', () => {
    const logoSrc = '/logo.png'
    const logoAlt = 'Company logo'
    const logoClassName = 'custom-logo'

    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Logo>
          <img src={logoSrc} alt={logoAlt} className={logoClassName} />
        </Testimonial.Logo>
      </Testimonial>,
    )

    const logo = getByRole('img', {name: logoAlt})
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', logoSrc)
    expect(logo).toHaveClass('Testimonial-logo-image', logoClassName)
  })

  it('renders logo container', () => {
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Logo>
          <img src="/logo.png" alt="Logo" />
        </Testimonial.Logo>
      </Testimonial>,
    )

    const logoContainer = getByRole('img', {name: 'Logo'}).closest('div')
    expect(logoContainer).toBeInTheDocument()
  })

  it('preserves an image child object ref when no Logo ref is supplied', () => {
    const refObject = React.createRef<HTMLImageElement>()
    const {getByRole, unmount} = render(
      <Testimonial.Logo>
        <img ref={refObject} src="/logo.png" alt="Company logo" />
      </Testimonial.Logo>,
    )

    expect(refObject.current).toBe(getByRole('img', {name: 'Company logo'}))
    unmount()
    expect(refObject.current).toBeNull()
  })

  it('preserves an image child callback ref when no Logo ref is supplied', () => {
    const handleRef = jest.fn()
    const {getByRole, unmount} = render(
      <Testimonial.Logo>
        <img ref={handleRef} src="/logo.png" alt="Company logo" />
      </Testimonial.Logo>,
    )

    expect(handleRef).toHaveBeenCalledWith(getByRole('img', {name: 'Company logo'}))
    unmount()
    expect(handleRef.mock.lastCall?.[0]).toBeNull()
  })

  it('preserves an SVG child object ref when no Logo ref is supplied', () => {
    const refObject = React.createRef<SVGSVGElement>()
    const {getByRole, unmount} = render(
      <Testimonial.Logo>
        <svg ref={refObject} role="img" aria-label="Company logo" />
      </Testimonial.Logo>,
    )

    expect(refObject.current).toBe(getByRole('img', {name: 'Company logo'}))
    unmount()
    expect(refObject.current).toBeNull()
  })

  it('preserves an SVG child callback ref when no Logo ref is supplied', () => {
    const handleRef = jest.fn()
    const {getByRole, unmount} = render(
      <Testimonial.Logo>
        <svg ref={handleRef} role="img" aria-label="Company logo" />
      </Testimonial.Logo>,
    )

    expect(handleRef).toHaveBeenCalledWith(getByRole('img', {name: 'Company logo'}))
    unmount()
    expect(handleRef.mock.lastCall?.[0]).toBeNull()
  })

  it('renders an SVG logo, preserves its attributes and class, and forwards an object ref', () => {
    const refObject = React.createRef<SVGSVGElement>()
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Logo ref={refObject}>
          <svg role="img" aria-label="Company logo" viewBox="0 0 24 24" className="custom-logo">
            <title>Company logo</title>
          </svg>
        </Testimonial.Logo>
      </Testimonial>,
    )
    const logo = getByRole('img', {name: 'Company logo'})

    expect(logo).toHaveAttribute('viewBox', '0 0 24 24')
    expect(logo).toHaveClass('Testimonial-logo-image', 'custom-logo')
    expect(refObject.current).toBe(logo)
  })

  it('forwards a callback ref to an SVG logo', () => {
    const handleRef = jest.fn()
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Logo ref={handleRef}>
          <svg role="img" aria-label="Company logo">
            <title>Company logo</title>
          </svg>
        </Testimonial.Logo>
      </Testimonial>,
    )

    expect(handleRef).toHaveBeenCalledWith(getByRole('img', {name: 'Company logo'}))
  })

  it('supports RefObject for Testimonial.Logo component', () => {
    const refObject = React.createRef<HTMLImageElement>()
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Logo ref={refObject}>
          <img src="/logo.png" alt="Logo" />
        </Testimonial.Logo>
      </Testimonial>,
    )

    const img = getByRole('img', {name: 'Logo'})
    expect(refObject.current).toBe(img)
  })

  it('supports functional ref for Testimonial.Logo component', () => {
    const mockRef = jest.fn()
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Logo ref={mockRef}>
          <img src="/logo.png" alt="Logo" />
        </Testimonial.Logo>
      </Testimonial>,
    )

    const img = getByRole('img', {name: 'Logo'})
    expect(mockRef).toHaveBeenCalledWith(img)
  })

  it('renders quote before media section', () => {
    const {getByRole, getByText} = render(<DefaultTestimonial />)

    const figure = getByRole('figure')
    const quote = getByText(mockQuote)
    const name = getByText(mockName)

    const figureChildren = Array.from(figure.children)
    const quoteIndex = figureChildren.findIndex(child => child.contains(quote))
    const nameIndex = figureChildren.findIndex(child => child.contains(name))

    expect(quoteIndex).toBeLessThan(nameIndex)
  })

  it('uses semantic HTML structure', () => {
    const {getByRole, getByText} = render(<DefaultTestimonial />)

    const figure = getByRole('figure')
    const quote = getByText(mockQuote)
    const blockquote = quote.closest('blockquote')
    const name = getByText(mockName)
    const figcaption = name.closest('figcaption')

    expect(figure).toBeInTheDocument()
    expect(blockquote).toBeInTheDocument()
    expect(figcaption).toBeInTheDocument()
  })

  it('hides quote mark from screen readers', () => {
    const {getByTestId} = render(<DefaultTestimonial />)

    const quoteMark = getByTestId(Testimonial.testIds.quoteMark)
    expect(quoteMark).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders with only quote and name', () => {
    const {getByRole, getByText} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    const quote = getByText('Quote text')
    const name = getByText('Name')

    expect(figure).toBeInTheDocument()
    expect(quote).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })

  it("filters out children that aren't part of the Testimonial namespace", () => {
    const {getByText, queryByText} = render(
      <Testimonial>
        <div>Invalid child</div>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <span>Another invalid child</span>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quote = getByText('Quote text')
    const name = getByText('Name')
    const invalidChild = queryByText('Invalid child')
    const anotherInvalidChild = queryByText('Another invalid child')

    expect(quote).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(invalidChild).not.toBeInTheDocument()
    expect(anotherInvalidChild).not.toBeInTheDocument()
  })

  it('handles empty quote content', () => {
    const {getByRole, getByText} = render(
      <Testimonial>
        <Testimonial.Quote></Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    const name = getByText('Name')

    expect(figure).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })

  it('applies animation classes when animate prop is provided', () => {
    const {getByRole} = render(
      <Testimonial animate="fade-in">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    expect(figure).toHaveClass('Animation')
    expect(figure).toHaveClass('Animation--fade-in')
  })

  it('can render an expressive variant correctly', () => {
    const {getByRole} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const figure = getByRole('figure')
    expect(figure).toHaveClass('Testimonial--variant-expressive')
  })

  it('defaults quote mark color to green in expressive variant', () => {
    const {getByTestId} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteMark = getByTestId(Testimonial.testIds.quoteMark)
    expect(quoteMark).toHaveClass('Testimonial__quoteMark--green')
  })

  it('allows overriding the default quote mark color in expressive variant', () => {
    const {getByTestId} = render(
      <Testimonial variant="expressive" quoteMarkColor="blue">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteMark = getByTestId(Testimonial.testIds.quoteMark)
    expect(quoteMark).toHaveClass('Testimonial__quoteMark--blue')
    expect(quoteMark).not.toHaveClass('Testimonial__quoteMark--green')
  })

  it('uses the shared quote mark tile in the expressive variant', () => {
    const {getByTestId} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteMark = getByTestId(Testimonial.testIds.quoteMark)
    expect(quoteMark).toHaveClass('Testimonial__quoteMark', 'Testimonial__quoteMark--green')
  })

  it('renders quote section and attribution section in expressive variant', () => {
    const {getByTestId} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quote = getByTestId(Testimonial.testIds.quoteWrapper)
    const media = getByTestId(Testimonial.testIds.media)
    expect(quote).toBeInTheDocument()
    expect(media).toBeInTheDocument()
  })

  it('renders one Testimonial.Link after attribution in expressive variant', () => {
    const {getByRole, getByTestId} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const link = getByRole('link', {name: /read the full story/i})
    const quote = getByTestId(Testimonial.testIds.quoteWrapper)
    const media = getByTestId(Testimonial.testIds.media)

    expect(quote).not.toContainElement(link)
    expect(media.nextElementSibling).toBe(link)
  })

  it('keeps Testimonial.Link inside quote section in non-expressive variants', () => {
    const {getByRole, getByTestId} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const link = getByRole('link', {name: /read the full story/i})
    const quote = getByTestId(Testimonial.testIds.quoteWrapper)

    expect(quote).toContainElement(link)
  })

  it('has no accessibility violations in expressive variant', async () => {
    const {container} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
        <Testimonial.Name position="Engineer">Name</Testimonial.Name>
      </Testimonial>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders Testimonial.Link as an anchor with the provided href', () => {
    const {getByRole} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const link = getByRole('link', {name: /read the full story/i})
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/story')
  })

  it('renders an arrow in Testimonial.Link via the ExpandableArrow component', () => {
    const {getByRole} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const link = getByRole('link', {name: /read the full story/i})
    const arrow = link.querySelector('svg')
    expect(arrow).toBeInTheDocument()
  })

  it('applies the Testimonial-link class', () => {
    const {getByRole} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const link = getByRole('link', {name: /read the full story/i})
    expect(link).toHaveClass('Testimonial-link')
  })

  it('allows forwarding a custom className to Testimonial.Link', () => {
    const {getByRole} = render(
      <Testimonial variant="expressive">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Link href="/story" className="custom-link">
          Read more
        </Testimonial.Link>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const link = getByRole('link', {name: /read more/i})
    expect(link).toHaveClass('custom-link')
  })

  it('forwards an object ref to the Testimonial.Link anchor', () => {
    const refObject = React.createRef<HTMLAnchorElement>()
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Link ref={refObject} href="/story">
          Read the full story
        </Testimonial.Link>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    expect(refObject.current).toBe(getByRole('link', {name: 'Read the full story'}))
  })

  it('forwards a callback ref to the Testimonial.Link anchor', () => {
    const handleRef = jest.fn()
    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Link ref={handleRef} href="/story">
          Read the full story
        </Testimonial.Link>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    expect(handleRef).toHaveBeenCalledWith(getByRole('link', {name: 'Read the full story'}))
  })
})

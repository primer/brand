import React, {useEffect} from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {Testimonial} from './Testimonial'

expect.extend(toHaveNoViolations)

describe('Testimonial', () => {
  const mockQuote = 'GitHub helps us ensure that we have our security controls baked into our pipelines.'
  const mockName = 'David Ross'
  const mockPosition = 'Staff Security Engineer'
  const mockAvatarSrc = '/images/avatar-mona.png'
  const mockAvatarAlt = 'David Ross avatar'

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

  it('renders quote mark with default color', () => {
    const {container} = render(<DefaultTestimonial />)

    const quoteMark = container.querySelector('[aria-hidden="true"]')
    expect(quoteMark).toHaveClass('Testimonial__quoteMark--default')
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

  it.each(['minimal', 'default', 'subtle'] as const)('renders %s variant', variant => {
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
    const {getByRole, container} = render(
      <Testimonial quoteMarkColor="blue">
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteMark = container.querySelector('[aria-hidden="true"]')
    expect(quoteMark).toHaveClass('Testimonial__quoteMark--blue')
    const figure = getByRole('figure')

    expect(figure).toHaveStyle({'--testimonial-accent-color': 'blue'})
  })

  it('does not apply background class to quote mark by default', () => {
    const {container} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteMark = container.querySelector('[aria-hidden="true"]')
    expect(quoteMark).not.toHaveClass('Testimonial__quoteMark--hasBackground')
  })

  it('applies background class to quote mark when quoteMarkHasBackground is true', () => {
    const {container} = render(
      <Testimonial quoteMarkHasBackground={true}>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteMark = container.querySelector('[aria-hidden="true"]')
    expect(quoteMark).toHaveClass('Testimonial__quoteMark--hasBackground')
  })

  it('does not apply background class to quote mark when quoteMarkHasBackground is false', () => {
    const {container} = render(
      <Testimonial quoteMarkHasBackground={false}>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
      </Testimonial>,
    )

    const quoteMark = container.querySelector('[aria-hidden="true"]')
    expect(quoteMark).not.toHaveClass('Testimonial__quoteMark--hasBackground')
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

  it('renders logo with img element', () => {
    const logoSrc = '/logo.png'
    const logoAlt = 'Company logo'

    const {getByRole} = render(
      <Testimonial>
        <Testimonial.Quote>Quote text</Testimonial.Quote>
        <Testimonial.Name>Name</Testimonial.Name>
        <Testimonial.Logo>
          <img src={logoSrc} alt={logoAlt} />
        </Testimonial.Logo>
      </Testimonial>,
    )

    const logo = getByRole('img', {name: logoAlt})
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', logoSrc)
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
    const {container} = render(<DefaultTestimonial />)

    const quoteMark = container.querySelector('[aria-hidden="true"]')
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

  describe('layout prop', () => {
    it('applies wide layout class when layout is "wide"', () => {
      const {getByRole} = render(
        <Testimonial layout="wide">
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>,
      )

      const figure = getByRole('figure')
      expect(figure).toHaveClass('Testimonial--layout-wide')
    })

    it('does not apply wide layout class when layout is "default"', () => {
      const {getByRole} = render(
        <Testimonial layout="default">
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>,
      )

      const figure = getByRole('figure')
      expect(figure).not.toHaveClass('Testimonial--layout-wide')
    })

    it('renders quote section and attribution section in wide layout', () => {
      const {container} = render(
        <Testimonial layout="wide">
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>,
      )

      const quote = container.querySelector('.Testimonial__quoteWrapper')
      const media = container.querySelector('.Testimonial__media')
      expect(quote).toBeInTheDocument()
      expect(media).toBeInTheDocument()
    })

    it('renders Testimonial.Link inside quote section in wide layout', () => {
      const {getByRole, container} = render(
        <Testimonial layout="wide">
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>,
      )

      const link = getByRole('link', {name: /read the full story/i})
      const quote = container.querySelector('.Testimonial__quoteWrapper')
      expect(quote).toContainElement(link)
    })

    it('has no accessibility violations in wide layout', async () => {
      const {container} = render(
        <Testimonial layout="wide">
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
          <Testimonial.Name position="Engineer">Name</Testimonial.Name>
        </Testimonial>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Testimonial.Link', () => {
    it('renders an anchor element with the provided href', () => {
      const {getByRole} = render(
        <Testimonial layout="wide">
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>,
      )

      const link = getByRole('link', {name: /read the full story/i})
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/story')
    })

    it('renders an arrow via the ExpandableArrow component', () => {
      const {getByRole} = render(
        <Testimonial layout="wide">
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>,
      )

      const link = getByRole('link', {name: /read the full story/i})
      // ExpandableArrow renders an SVG inside the anchor
      const arrow = link.querySelector('svg')
      expect(arrow).toBeInTheDocument()
    })

    it('applies the Testimonial-link class', () => {
      const {getByRole} = render(
        <Testimonial layout="wide">
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Link href="/story">Read the full story</Testimonial.Link>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>,
      )

      const link = getByRole('link', {name: /read the full story/i})
      expect(link).toHaveClass('Testimonial-link')
    })

    it('allows forwarding a custom className', () => {
      const {getByRole} = render(
        <Testimonial layout="wide">
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

    it('can be used in default layout', () => {
      const {getByRole} = render(
        <Testimonial>
          <Testimonial.Quote>Quote text</Testimonial.Quote>
          <Testimonial.Link href="/story">Read the case study</Testimonial.Link>
          <Testimonial.Name>Name</Testimonial.Name>
        </Testimonial>,
      )

      const link = getByRole('link', {name: /read the case study/i})
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/story')
    })
  })
})

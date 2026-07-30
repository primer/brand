import React from 'react'
import {act, render, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {MinimalFooter} from './MinimalFooter'
import {Text} from '../'

expect.extend(toHaveNoViolations)

const socialLinkAccessibleNames = (
  ['X', 'GitHub', 'LinkedIn', 'YouTube', 'Facebook', 'Twitch', 'TikTok', 'Instagram'] as const
).map(socialName => `GitHub on ${socialName}`)

const isSocialLink = (accessibleName: string): boolean => socialLinkAccessibleNames.includes(accessibleName)

describe('MinimalFooter', () => {
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

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<MinimalFooter />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations in a fully-populated composition', async () => {
    const {container} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>Footnote text</Text>
        </MinimalFooter.Footnotes>
        <MinimalFooter.Content>
          <p>Custom content</p>
        </MinimalFooter.Content>
        <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
        <MinimalFooter.Link href="/link1">Link 1</MinimalFooter.Link>
        <MinimalFooter.Link href="/link2">Link 2</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders as a footer element', () => {
    const {getByRole} = render(<MinimalFooter />)
    const footer = getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders default copyright statement', () => {
    const {getByText} = render(<MinimalFooter />)
    const currentYear = new Date().getFullYear()
    const copyrightText = getByText(`© ${currentYear} GitHub. All rights reserved.`)
    expect(copyrightText).toBeInTheDocument()
  })

  it('renders custom copyright statement', () => {
    const customCopyright = 'Custom Copyright 2024'
    const {getByText} = render(<MinimalFooter copyrightStatement={customCopyright} />)
    const copyrightText = getByText(customCopyright)
    expect(copyrightText).toBeInTheDocument()
  })

  it('renders copyright statement as React element', () => {
    const customCopyright = <span>Custom Copyright 2024</span>
    const {getByText} = render(<MinimalFooter copyrightStatement={customCopyright} />)
    const copyrightText = getByText('Custom Copyright 2024')
    expect(copyrightText).toBeInTheDocument()
  })

  it('renders GitHub logo with default href', () => {
    const {getByRole} = render(<MinimalFooter />)
    const logoLink = getByRole('link', {name: 'GitHub'})
    expect(logoLink).toHaveAttribute('href', 'https://github.com')
  })

  it('renders GitHub logo with custom href', () => {
    const customHref = 'https://custom.github.com'
    const {getByRole} = render(<MinimalFooter logoHref={customHref} />)
    const logoLink = getByRole('link', {name: 'GitHub'})
    expect(logoLink).toHaveAttribute('href', customHref)
  })

  it('allows forwarding of custom classes', () => {
    const {getByRole} = render(<MinimalFooter className="custom-footer" />)
    const footer = getByRole('contentinfo')
    expect(footer).toHaveClass('Footer')
    expect(footer).toHaveClass('custom-footer')
  })

  it('renders all social links by default', () => {
    const {getAllByRole} = render(<MinimalFooter />)
    const socialLinks = getAllByRole('link', {name: isSocialLink})

    expect(socialLinks).toHaveLength(8)
  })

  it('can optionally render a subset of social links', () => {
    const {getByRole} = render(<MinimalFooter socialLinks={['x', 'github', 'linkedin']} />)
    const xLink = getByRole('link', {name: 'GitHub on X'})
    const githubLink = getByRole('link', {name: 'GitHub on GitHub'})
    const linkedinLink = getByRole('link', {name: 'GitHub on LinkedIn'})

    expect(xLink).toHaveAttribute('href', 'https://x.com/github')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/github')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/github')
  })

  it('renders no social links when socialLinks is false', () => {
    const {queryAllByRole} = render(<MinimalFooter socialLinks={false} />)
    const socialLinks = queryAllByRole('link', {name: isSocialLink})
    expect(socialLinks).toHaveLength(0)
  })

  it('renders social link icons with correct attributes', () => {
    const {container} = render(<MinimalFooter socialLinks={['x']} />)
    const xIcon = container.querySelector('img[src$="/x.svg"]')
    expect(xIcon).toHaveAttribute('src', 'https://github.githubassets.com/images/modules/site/icons/footer/x.svg')
    expect(xIcon).toHaveAttribute('width', '20')
    expect(xIcon).toHaveAttribute('height', '16')
    expect(xIcon).toHaveAttribute('loading', 'lazy')
    expect(xIcon).toHaveAttribute('decoding', 'async')
  })

  it('renders social links with analytics data attributes', () => {
    const {getByRole} = render(<MinimalFooter socialLinks={['x']} />)
    const xLink = getByRole('link', {name: 'GitHub on X'})
    expect(xLink).toHaveAttribute('data-analytics-event', '{"category":"Footer","action":"go to X","label":"text:x"}')
  })

  it('renders link children with maximum of 5 links', () => {
    const {getByRole, queryByRole} = render(
      <MinimalFooter>
        <MinimalFooter.Link href="/link1">Link 1</MinimalFooter.Link>
        <MinimalFooter.Link href="/link2">Link 2</MinimalFooter.Link>
        <MinimalFooter.Link href="/link3">Link 3</MinimalFooter.Link>
        <MinimalFooter.Link href="/link4">Link 4</MinimalFooter.Link>
        <MinimalFooter.Link href="/link5">Link 5</MinimalFooter.Link>
        <MinimalFooter.Link href="/link6">Link 6</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const link1 = getByRole('link', {name: 'Link 1'})
    const link2 = getByRole('link', {name: 'Link 2'})
    const link3 = getByRole('link', {name: 'Link 3'})
    const link4 = getByRole('link', {name: 'Link 4'})
    const link5 = getByRole('link', {name: 'Link 5'})
    const link6 = queryByRole('link', {name: 'Link 6'})

    expect(link1).toBeInTheDocument()
    expect(link2).toBeInTheDocument()
    expect(link3).toBeInTheDocument()
    expect(link4).toBeInTheDocument()
    expect(link5).toBeInTheDocument()
    expect(link6).not.toBeInTheDocument()
  })

  it('ignores non-Link children', () => {
    const {getByRole, queryByText} = render(
      <MinimalFooter>
        <div>Invalid child</div>
        <MinimalFooter.Link href="/valid">Valid Link</MinimalFooter.Link>
        <span>Another invalid child</span>
      </MinimalFooter>,
    )

    const validLink = getByRole('link', {name: 'Valid Link'})
    const invalidChild = queryByText('Invalid child')
    const anotherInvalidChild = queryByText('Another invalid child')

    expect(validLink).toBeInTheDocument()
    expect(invalidChild).not.toBeInTheDocument()
    expect(anotherInvalidChild).not.toBeInTheDocument()
  })

  it('renders footnotes section', () => {
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>Footnote 1</Text>
          <Text>Footnote 2</Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const footnote1 = getByText('Footnote 1')
    const footnote2 = getByText('Footnote 2')

    expect(footnote1).toBeInTheDocument()
    expect(footnote2).toBeInTheDocument()
  })

  it('renders footnotes with correct styling', () => {
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>Footnote text</Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const footnote = getByText('Footnote text')
    expect(footnote.tagName).toBe('P')
  })

  it('applies custom className to footnotes', () => {
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes className="custom-footnotes">
          <Text>Footnote text</Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const footnotesContainer = getByText('Footnote text').closest('div')
    expect(footnotesContainer).toHaveClass('custom-footnotes')
  })

  it('ignores non-Text children in footnotes', () => {
    const {getByText, queryByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <div>Non-text child</div>
          <Text>Valid text</Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const nonTextChild = queryByText('Non-text child')
    const validText = getByText('Valid text')

    expect(nonTextChild).not.toBeInTheDocument()
    expect(validText).toBeInTheDocument()
  })

  it('renders links with analytics data attributes', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.Link href="/test">Test Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const link = getByRole('link', {name: /Test Link/})
    expect(link).toHaveAttribute(
      'data-analytics-event',
      '{"category":"Footer","action":"go to /test","label":"text:Test Link"}',
    )
  })

  it('applies the link-text style hook to the link label', () => {
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Link href="/test">Test Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    expect(getByText('Test Link')).toHaveClass('Footer__link-text')
  })

  it('renders link as button element', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.Link as="button">Button Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const buttonLink = getByRole('button', {name: /Button Link/})
    expect(buttonLink).toBeInTheDocument()
  })

  it('does not add analytics data for button links', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.Link as="button">Button Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const button = getByRole('button', {name: /Button Link/})
    expect(button).not.toHaveAttribute('data-analytics-event')
  })

  it('renders link with custom props', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.Link href="/test" target="_blank" rel="noopener">
          External Link
        </MinimalFooter.Link>
      </MinimalFooter>,
    )

    const link = getByRole('link', {name: /External Link/})
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener')
  })

  it('renders GitHub logo with analytics data', () => {
    const {getByRole} = render(<MinimalFooter />)
    const logoLink = getByRole('link', {name: 'GitHub'})
    expect(logoLink).toHaveAttribute(
      'data-analytics-event',
      '{"category":"Footer","action":"go to home","label":"text:home"}',
    )
  })

  it('renders social links with visually hidden text', () => {
    const {getByText} = render(<MinimalFooter socialLinks={['x']} />)
    const hiddenText = getByText('GitHub on X')
    expect(hiddenText).toHaveClass('visually-hidden')
  })

  it('renders social icons as decorative with empty alt text', () => {
    const {container} = render(<MinimalFooter socialLinks={['x', 'github']} />)
    const xIcon = container.querySelector('img[src$="/x.svg"]')
    const githubIcon = container.querySelector('img[src$="/github-mark.svg"]')

    expect(xIcon).toHaveAttribute('alt', '')
    expect(githubIcon).toHaveAttribute('alt', '')
  })

  it('renders with all social link types', () => {
    const {getByRole} = render(
      <MinimalFooter
        socialLinks={['x', 'github', 'linkedin', 'youtube', 'facebook', 'twitch', 'tiktok', 'instagram']}
      />,
    )

    const xLink = getByRole('link', {name: 'GitHub on X'})
    const githubLink = getByRole('link', {name: 'GitHub on GitHub'})
    const linkedinLink = getByRole('link', {name: 'GitHub on LinkedIn'})
    const youtubeLink = getByRole('link', {name: 'GitHub on YouTube'})
    const facebookLink = getByRole('link', {name: 'GitHub on Facebook'})
    const twitchLink = getByRole('link', {name: 'GitHub on Twitch'})
    const tiktokLink = getByRole('link', {name: 'GitHub on TikTok'})
    const instagramLink = getByRole('link', {name: 'GitHub on Instagram'})

    expect(xLink).toHaveAttribute('href', 'https://x.com/github')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/github')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/github')
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/github')
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/GitHub')
    expect(twitchLink).toHaveAttribute('href', 'https://www.twitch.tv/github')
    expect(tiktokLink).toHaveAttribute('href', 'https://www.tiktok.com/@github')
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/github/')
  })

  it('forwards additional HTML attributes to the footer element', () => {
    const {getByRole} = render(
      <MinimalFooter data-testid="footer-test" aria-label="Site footer" aria-labelledby="footer-heading" />,
    )
    const footer = getByRole('contentinfo')
    expect(footer).toHaveAttribute('data-testid', 'footer-test')
    expect(footer).toHaveAttribute('aria-label', 'Site footer')
    expect(footer).toHaveAttribute('aria-labelledby', 'footer-heading')
  })

  it('handles empty footnotes section', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes />
      </MinimalFooter>,
    )

    const footer = getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders copyright text with correct styling', () => {
    const {getByText} = render(<MinimalFooter />)
    const copyrightText = getByText(/© \d{4} GitHub. All rights reserved./)
    expect(copyrightText.tagName).toBe('P')
  })

  it('applies correct props to Text component in footnotes', () => {
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text className="original-class">Footnote text</Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const footnote = getByText('Footnote text')
    expect(footnote).toHaveClass('original-class')
    expect(footnote.tagName).toBe('P')
  })

  it('overrides Text props in footnotes when provided', () => {
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text as="div" size="300">
            Footnote text
          </Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const footnote = getByText('Footnote text')
    expect(footnote.tagName).toBe('DIV')
  })

  it('renders social links in the supplied order', () => {
    const {getAllByRole} = render(<MinimalFooter socialLinks={['linkedin', 'x', 'github']} />)
    const socialLinks = getAllByRole('link', {name: isSocialLink})

    expect(socialLinks[0]).toHaveAttribute('href', 'https://www.linkedin.com/company/github')
    expect(socialLinks[1]).toHaveAttribute('href', 'https://x.com/github')
    expect(socialLinks[2]).toHaveAttribute('href', 'https://github.com/github')
  })

  it('renders footnotes above social links and footer links', () => {
    const {container} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>Footnote text</Text>
        </MinimalFooter.Footnotes>
        <MinimalFooter.Link href="/test">Footer Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(2)

    expect(sections[0]).toContainElement(container.querySelector('.Footer__terms'))

    const topSection = container.querySelector('.Footer__top')?.parentElement
    expect(topSection).toBeInTheDocument()
    expect(topSection).toHaveClass('Footer__section')
  })

  it('renders component with only footnotes', () => {
    const {getByText, getByRole, queryAllByRole} = render(
      <MinimalFooter socialLinks={false}>
        <MinimalFooter.Footnotes>
          <Text>Only footnotes</Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const footnoteText = getByText('Only footnotes')
    const githubLink = getByRole('link', {name: 'GitHub'})
    const socialLinks = queryAllByRole('link', {name: isSocialLink})

    expect(footnoteText).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
    expect(socialLinks).toHaveLength(0)
  })

  it('renders component with only social links', () => {
    const {getByRole, getAllByRole} = render(<MinimalFooter socialLinks={['x']} />)

    const githubLink = getByRole('link', {name: 'GitHub'})
    const socialLinks = getAllByRole('link', {name: isSocialLink})

    expect(githubLink).toBeInTheDocument()
    expect(socialLinks).toHaveLength(1)
  })

  it('identifies each social link with a matching data-social-link attribute', () => {
    const {container} = render(<MinimalFooter socialLinks={['x', 'github']} />)

    expect(container.querySelector('[data-social-link="x"]')).toBeInTheDocument()
    expect(container.querySelector('[data-social-link="github"]')).toBeInTheDocument()
  })

  it('renders component with only footer links', () => {
    const {getByRole} = render(
      <MinimalFooter socialLinks={false}>
        <MinimalFooter.Link href="/test">Single Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const singleLink = getByRole('link', {name: 'Single Link'})
    const githubLink = getByRole('link', {name: 'GitHub'})

    expect(singleLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
  })

  it('renders mixed content types in footnotes correctly', () => {
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>First footnote</Text>
          <Text>Second footnote</Text>
          <Text>Third footnote</Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const firstFootnote = getByText('First footnote')
    const secondFootnote = getByText('Second footnote')
    const thirdFootnote = getByText('Third footnote')

    expect(firstFootnote).toBeInTheDocument()
    expect(secondFootnote).toBeInTheDocument()
    expect(thirdFootnote).toBeInTheDocument()

    expect(firstFootnote.tagName).toBe('P')
    expect(secondFootnote.tagName).toBe('P')
    expect(thirdFootnote.tagName).toBe('P')
  })

  it('handles complex footnote content with links', () => {
    const {getByText, getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>
            For more information, see our <a href="/privacy">Privacy Policy</a>.
          </Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const footnoteText = getByText(/For more information, see our/)
    const privacyLink = getByRole('link', {name: 'Privacy Policy'})

    expect(footnoteText).toBeInTheDocument()
    expect(privacyLink).toHaveAttribute('href', '/privacy')
  })

  it('handles invalid React elements in children when looking for footnotes', () => {
    const {getByRole} = render(
      <MinimalFooter>
        Some text
        <div>Some other text</div>
        {null}
        <MinimalFooter.Link href="/test">Valid Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const footer = getByRole('contentinfo')
    const validLink = getByRole('link', {name: 'Valid Link'})

    expect(footer).toBeInTheDocument()
    expect(validLink).toBeInTheDocument()
  })

  it('handles invalid React elements in footnotes children', () => {
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          Some text
          <div>Some other text</div>
          {null}
          <Text>Valid footnote</Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    const validFootnote = getByText('Valid footnote')
    expect(validFootnote).toBeInTheDocument()
  })

  it('uses the semantic logo style hook', () => {
    const {getByRole} = render(<MinimalFooter />)
    expect(getByRole('link', {name: 'GitHub'})).toHaveClass('Footer__logo')
  })

  it('renders the GitHub logomark', () => {
    const {container} = render(<MinimalFooter />)
    expect(container.querySelector('svg.octicon-mark-github')).toBeInTheDocument()
    expect(container.querySelector('svg.octicon-logo-github')).not.toBeInTheDocument()
  })

  it('renders MinimalFooter.Content children', () => {
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Content>Custom content</MinimalFooter.Content>
      </MinimalFooter>,
    )

    expect(getByText('Custom content')).toBeInTheDocument()
  })

  it('forwards className and HTML attributes on MinimalFooter.Content', () => {
    const onClick = jest.fn()
    const {getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Content
          id="footer-content-id"
          className="custom-content"
          data-testid="footer-content"
          aria-label="Extra content"
          role="region"
          title="Footer content"
          onClick={onClick}
        >
          Custom content
        </MinimalFooter.Content>
      </MinimalFooter>,
    )

    const content = getByText('Custom content').closest('section')
    expect(content).toHaveAttribute('id', 'footer-content-id')
    expect(content).toHaveClass('custom-content')
    expect(content).toHaveAttribute('data-testid', 'footer-content')
    expect(content).toHaveAttribute('aria-label', 'Extra content')
    expect(content).toHaveAttribute('role', 'region')
    expect(content).toHaveAttribute('title', 'Footer content')

    content?.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not accept the animate prop on MinimalFooter.Content, unlike other BaseProps', () => {
    const {getByText} = render(
      <MinimalFooter>
        {/* @ts-expect-error `animate` is intentionally omitted from MinimalFooter.Content's props */}
        <MinimalFooter.Content animate="fade-in">Custom content</MinimalFooter.Content>
      </MinimalFooter>,
    )

    expect(getByText('Custom content')).toBeInTheDocument()
  })

  it('recognizes only the first MinimalFooter.Content when multiple are provided', () => {
    const {getByText, queryByText} = render(
      <MinimalFooter>
        <MinimalFooter.Content>First content</MinimalFooter.Content>
        <MinimalFooter.Content>Second content</MinimalFooter.Content>
      </MinimalFooter>,
    )

    expect(getByText('First content')).toBeInTheDocument()
    expect(queryByText('Second content')).not.toBeInTheDocument()
  })

  it('recognizes only the first MinimalFooter.Footnotes when multiple are provided', () => {
    const {getByText, queryByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>First footnotes</Text>
        </MinimalFooter.Footnotes>
        <MinimalFooter.Footnotes>
          <Text>Second footnotes</Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>,
    )

    expect(getByText('First footnotes')).toBeInTheDocument()
    expect(queryByText('Second footnotes')).not.toBeInTheDocument()
  })

  it('recognizes the first Footnotes, Content, and BackToTop, and the first five Links together, ignoring unsupported children', () => {
    const {getByText, getByRole, queryByRole, queryByText} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>Footnote text</Text>
        </MinimalFooter.Footnotes>
        <div>Unsupported child</div>
        <MinimalFooter.Content>Content text</MinimalFooter.Content>
        <MinimalFooter.Content>Second content, ignored</MinimalFooter.Content>
        <MinimalFooter.BackToTop>First back to top</MinimalFooter.BackToTop>
        <MinimalFooter.BackToTop>Second back to top, ignored</MinimalFooter.BackToTop>
        <MinimalFooter.Link href="/link1">Link 1</MinimalFooter.Link>
        <MinimalFooter.Link href="/link2">Link 2</MinimalFooter.Link>
        <MinimalFooter.Link href="/link3">Link 3</MinimalFooter.Link>
        <MinimalFooter.Link href="/link4">Link 4</MinimalFooter.Link>
        <MinimalFooter.Link href="/link5">Link 5</MinimalFooter.Link>
        <MinimalFooter.Link href="/link6">Link 6</MinimalFooter.Link>
      </MinimalFooter>,
    )

    expect(getByText('Footnote text')).toBeInTheDocument()
    expect(getByText('Content text')).toBeInTheDocument()
    expect(queryByText('Second content, ignored')).not.toBeInTheDocument()
    expect(queryByText('Unsupported child')).not.toBeInTheDocument()
    expect(getByRole('button', {name: 'First back to top'})).toBeInTheDocument()
    expect(queryByRole('button', {name: 'Second back to top, ignored'})).not.toBeInTheDocument()
    expect(getByRole('link', {name: 'Link 5'})).toBeInTheDocument()
    expect(queryByRole('link', {name: 'Link 6'})).not.toBeInTheDocument()
  })

  it('omits the content section when no Content is provided', () => {
    const {container} = render(<MinimalFooter />)

    const footer = container.querySelector('footer')
    expect(footer?.children[0]).toHaveClass('Footer__section')
    expect(footer?.children[0]).toContainElement(container.querySelector('.Footer__top'))
    expect(footer?.children[1]).toHaveClass('Footer__section--bottom')
  })

  it('renders top, content, and bottom sections in the approved order', () => {
    const {container, getByText} = render(
      <MinimalFooter>
        <MinimalFooter.Content>Custom content</MinimalFooter.Content>
      </MinimalFooter>,
    )

    const footer = container.querySelector('footer')
    expect(footer?.children[0]).toHaveClass('Footer__section')
    expect(footer?.children[0]).toContainElement(container.querySelector('.Footer__top'))
    expect(footer?.children[1]).toHaveClass('Footer__section--content')
    expect(footer?.children[2]).toHaveClass('Footer__section--bottom')
    expect(container.querySelector('.Footer__top .Footer__logo')).toBeInTheDocument()
    expect(getByText('Custom content').closest('.Footer__section--bottom')).not.toBeInTheDocument()
    expect(getByText('Custom content').closest('.Footer__section--content')).toBeInTheDocument()
  })

  it('places the logomark and Back to Top in the same top row', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    const logo = getByRole('link', {name: 'GitHub'})
    const backToTop = getByRole('button', {name: 'Back to top'})

    expect(logo.closest('.Footer__top-row')).toBe(backToTop.closest('.Footer__top-row'))
  })

  it('places footer links and social links in the bottom section', () => {
    const {getByRole} = render(
      <MinimalFooter socialLinks={['x']}>
        <MinimalFooter.Link href="/test">Test Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    expect(getByRole('link', {name: 'Test Link'}).closest('.Footer__section--bottom')).toBeInTheDocument()
    expect(getByRole('link', {name: 'GitHub on X'}).closest('.Footer__section--bottom')).toBeInTheDocument()
  })

  it('places Footnotes ahead of the mapped sections and preserves full section order when every optional child is present', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>Footnote text</Text>
        </MinimalFooter.Footnotes>
        <MinimalFooter.Content>Custom content</MinimalFooter.Content>
        <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
        <MinimalFooter.Link href="/test">Test Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const footer = getByRole('contentinfo')
    const topLevelSectionNames = Array.from(footer.children).map(element => {
      if (element.classList.contains('Footer__section--content')) return 'content'
      if (element.classList.contains('Footer__section--bottom')) return 'bottom'
      if (element.querySelector('.Footer__top')) return 'top'
      return 'footnotes'
    })

    expect(topLevelSectionNames).toEqual(['footnotes', 'top', 'content', 'bottom'])
  })

  it('does not impose internal layout on MinimalFooter.Content', () => {
    const {getByTestId} = render(
      <MinimalFooter>
        <MinimalFooter.Content>
          <div data-testid="consumer-layout">
            <span>Consumer-owned markup</span>
          </div>
        </MinimalFooter.Content>
      </MinimalFooter>,
    )

    // The section wrapper only positions Content within the footer; it does not alter or
    // wrap the consumer's own children.
    expect(getByTestId('consumer-layout').parentElement).toHaveClass('Footer__container')
  })

  it('keeps default social links, filtering, and the false opt-out working', () => {
    const {queryAllByRole, rerender} = render(<MinimalFooter />)
    expect(queryAllByRole('link', {name: isSocialLink})).toHaveLength(8)

    rerender(<MinimalFooter socialLinks={['x', 'github']} />)
    expect(queryAllByRole('link', {name: isSocialLink})).toHaveLength(2)

    rerender(<MinimalFooter socialLinks={false} />)
    expect(queryAllByRole('link', {name: isSocialLink})).toHaveLength(0)
  })

  it('applies a no-social modifier class to the bottom section', () => {
    const {container, rerender} = render(
      <MinimalFooter>
        <MinimalFooter.Link href="/test">Test Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    expect(container.querySelector('.Footer__bottom')).not.toHaveClass('Footer__bottom--no-social')

    rerender(<MinimalFooter socialLinks={false} />)
    expect(container.querySelector('.Footer__bottom')).toHaveClass('Footer__bottom--no-social')
  })

  it('preserves logo href, analytics, accessibility, and semantic styling', () => {
    const {getByRole} = render(<MinimalFooter logoHref="/custom-home" />)

    const logoLink = getByRole('link', {name: 'GitHub'})
    expect(logoLink).toHaveAttribute('href', '/custom-home')
    expect(logoLink).toHaveAttribute(
      'data-analytics-event',
      '{"category":"Footer","action":"go to home","label":"text:home"}',
    )

    expect(logoLink).toHaveClass('Footer__logo')
  })

  it('does not render Back to Top unless opted into as a child', () => {
    const {queryByRole} = render(<MinimalFooter />)
    expect(queryByRole('button', {name: 'Back to top'})).not.toBeInTheDocument()
  })

  it('requires consumers to provide a localized Back to Top label', () => {
    render(
      <MinimalFooter>
        {/* @ts-expect-error BackToTop requires a consumer-provided label */}
        <MinimalFooter.BackToTop />
      </MinimalFooter>,
    )
  })

  it('defaults Back to Top to type button inside a form', () => {
    const {getByRole} = render(
      <form>
        <MinimalFooter>
          <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
        </MinimalFooter>
      </form>,
    )

    expect(getByRole('button', {name: 'Back to top'})).toHaveAttribute('type', 'button')
  })

  it('forwards a ref to the Back to Top button', () => {
    const ref = React.createRef<HTMLButtonElement>()
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop ref={ref}>Back to top</MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    expect(ref.current).toBe(getByRole('button', {name: 'Back to top'}))
  })

  it('uses supplied localized children as the visible and accessible label', () => {
    const {getByRole, queryByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop>Retour en haut</MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    expect(getByRole('button', {name: 'Retour en haut'})).toBeInTheDocument()
    expect(queryByRole('button', {name: 'Back to top'})).not.toBeInTheDocument()
  })

  it('renders an upward-arrow Octicon inside the control', () => {
    const {container} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    expect(container.querySelector('button svg.octicon-arrow-up')).toBeInTheDocument()
  })

  it('recognizes only the first MinimalFooter.BackToTop when multiple are provided', () => {
    const {getByRole, queryByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop>First</MinimalFooter.BackToTop>
        <MinimalFooter.BackToTop>Second</MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    expect(getByRole('button', {name: 'First'})).toBeInTheDocument()
    expect(queryByRole('button', {name: 'Second'})).not.toBeInTheDocument()
  })

  it('renders Back to Top within the top section', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    const button = getByRole('button', {name: 'Back to top'})
    expect(button.closest('.Footer__section')).toBeInTheDocument()
  })

  it('forwards ARIA, data, analytics, and native button attributes', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop
          aria-label="Scroll to top"
          data-testid="footer-back-to-top"
          data-analytics-event='{"category":"Footer","action":"back to top"}'
          type="button"
          disabled={false}
        >
          Back to top
        </MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    const button = getByRole('button', {name: 'Scroll to top'})
    expect(button).toHaveAttribute('data-testid', 'footer-back-to-top')
    expect(button).toHaveAttribute('data-analytics-event', '{"category":"Footer","action":"back to top"}')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('does not activate Back to Top when disabled', async () => {
    const user = userEvent.setup()
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const onClick = jest.fn()

    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop disabled={true} onClick={onClick}>
          Back to top
        </MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    await user.click(getByRole('button', {name: 'Back to top'}))

    expect(onClick).not.toHaveBeenCalled()
    expect(scrollToSpy).not.toHaveBeenCalled()

    scrollToSpy.mockRestore()
  })

  it('calls the consumer onClick before scrolling', async () => {
    const user = userEvent.setup()
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const onClick = jest.fn()

    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop onClick={onClick}>Back to top</MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    await user.click(getByRole('button', {name: 'Back to top'}))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(scrollToSpy).toHaveBeenCalledTimes(1)
    expect(onClick.mock.invocationCallOrder[0]).toBeLessThan(scrollToSpy.mock.invocationCallOrder[0])

    scrollToSpy.mockRestore()
  })

  it('skips scrolling and focus transfer when the consumer calls event.preventDefault()', async () => {
    const user = userEvent.setup()
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const onClick = jest.fn(event => event.preventDefault())

    const {getByRole} = render(
      <>
        <main>
          <a href="#content">Content link</a>
        </main>
        <MinimalFooter>
          <MinimalFooter.BackToTop onClick={onClick}>Back to top</MinimalFooter.BackToTop>
        </MinimalFooter>
      </>,
    )

    const button = getByRole('button', {name: 'Back to top'})
    act(() => button.focus())
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(scrollToSpy).not.toHaveBeenCalled()
    expect(button).toHaveFocus()

    scrollToSpy.mockRestore()
  })

  it('scrolls the window to the top with smooth behavior by default when motion is not reduced', async () => {
    const user = userEvent.setup()
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    const button = getByRole('button', {name: 'Back to top'})
    await user.click(button)

    expect(scrollToSpy).toHaveBeenCalledWith({top: 0, behavior: 'smooth'})
    expect(button).toHaveFocus()

    scrollToSpy.mockRestore()
  })

  it('honors a custom scrollBehavior when motion is not reduced', async () => {
    const user = userEvent.setup()
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.BackToTop scrollBehavior="auto">Back to top</MinimalFooter.BackToTop>
      </MinimalFooter>,
    )

    await user.click(getByRole('button', {name: 'Back to top'}))

    expect(scrollToSpy).toHaveBeenCalledWith({top: 0, behavior: 'auto'})

    scrollToSpy.mockRestore()
  })

  it('uses an instant scroll when reduced motion is preferred, even with smooth root scrolling', async () => {
    const matchMediaMock = jest.mocked(window.matchMedia)
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
    document.documentElement.style.scrollBehavior = 'smooth'

    await matchMediaMock.withImplementation(
      query => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }),
      async () => {
        const user = userEvent.setup()
        const {getByRole} = render(
          <MinimalFooter>
            <MinimalFooter.BackToTop scrollBehavior="smooth">Back to top</MinimalFooter.BackToTop>
          </MinimalFooter>,
        )

        await user.click(getByRole('button', {name: 'Back to top'}))

        expect(scrollToSpy).toHaveBeenCalledWith({top: 0, behavior: 'instant'})
      },
    )

    document.documentElement.style.removeProperty('scroll-behavior')
    scrollToSpy.mockRestore()
  })

  it('moves keyboard focus to the main landmark so the next Tab continues from the top', async () => {
    const user = userEvent.setup()
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const {getByRole} = render(
      <>
        <a href="#before-main">Before main</a>
        <main>
          <a href="#main-content">Main content</a>
        </main>
        <MinimalFooter socialLinks={false}>
          <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
        </MinimalFooter>
      </>,
    )

    const button = getByRole('button', {name: 'Back to top'})
    const main = getByRole('main')

    act(() => button.focus())
    await user.keyboard('{Enter}')

    expect(scrollToSpy).toHaveBeenCalledWith({top: 0, behavior: 'smooth'})
    expect(main).toHaveFocus()

    await user.tab()
    expect(getByRole('link', {name: 'Main content'})).toHaveFocus()

    scrollToSpy.mockRestore()
  })

  it('moves keyboard focus to a custom semantic destination', async () => {
    const user = userEvent.setup()
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const {getByRole} = render(
      <>
        <header id="page-start">Page header</header>
        <main>Main content</main>
        <MinimalFooter>
          <MinimalFooter.BackToTop focusTargetId="page-start">Back to top</MinimalFooter.BackToTop>
        </MinimalFooter>
      </>,
    )

    act(() => getByRole('button', {name: 'Back to top'}).focus())
    await user.keyboard('{Enter}')

    expect(document.getElementById('page-start')).toHaveFocus()

    scrollToSpy.mockRestore()
  })
})

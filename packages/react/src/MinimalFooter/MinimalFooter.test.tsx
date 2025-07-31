import React from 'react'
import {render} from '@testing-library/react'
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
  it('has no accessibility violations', async () => {
    const {container} = render(<MinimalFooter />)
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

  it('renders empty footer without children', () => {
    const {getByRole} = render(<MinimalFooter />)
    const footer = getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
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

  it('passes through additional props to footer element', () => {
    const {getByRole} = render(<MinimalFooter data-testid="footer-test" aria-label="Site footer" />)
    const footer = getByRole('contentinfo')
    expect(footer).toHaveAttribute('data-testid', 'footer-test')
    expect(footer).toHaveAttribute('aria-label', 'Site footer')
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

  it('maintains proper HTML structure', () => {
    const {getByRole} = render(
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>Footnote</Text>
        </MinimalFooter.Footnotes>
        <MinimalFooter.Link href="/test">Test Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    const footer = getByRole('contentinfo')
    const sections = footer.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(2)
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

  it('renders social links in correct order', () => {
    const {getAllByRole} = render(<MinimalFooter socialLinks={['x', 'github', 'linkedin']} />)
    const socialLinks = getAllByRole('link', {name: isSocialLink})

    expect(socialLinks[0]).toHaveAttribute('href', 'https://x.com/github')
    expect(socialLinks[1]).toHaveAttribute('href', 'https://github.com/github')
    expect(socialLinks[2]).toHaveAttribute('href', 'https://www.linkedin.com/company/github')
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

    const logomarksSection = container.querySelector('.Footer__logomarks')
    expect(logomarksSection).toBeInTheDocument()
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

  it('calculates current year correctly for copyright', () => {
    const {getByText} = render(<MinimalFooter />)
    const currentYear = new Date().getFullYear()
    const expectedCopyright = `© ${currentYear} GitHub. All rights reserved.`

    const copyrightText = getByText(expectedCopyright)

    expect(copyrightText).toBeInTheDocument()
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

  it('forwards additional HTML attributes', () => {
    const {getByRole} = render(<MinimalFooter data-testid="custom-footer" aria-labelledby="footer-heading" />)

    const footer = getByRole('contentinfo')
    expect(footer).toHaveAttribute('data-testid', 'custom-footer')
    expect(footer).toHaveAttribute('aria-labelledby', 'footer-heading')
  })
})

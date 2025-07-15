import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {MinimalFooter} from './MinimalFooter'
import {Text} from '../'

expect.extend(toHaveNoViolations)

// Helper function to filter social links
const getSocialLinks = (links: HTMLElement[]) => {
  return links.filter(
    link =>
      link.getAttribute('href')?.includes('x.com') ||
      link.getAttribute('href')?.includes('github.com/github') ||
      link.getAttribute('href')?.includes('linkedin.com') ||
      link.getAttribute('href')?.includes('youtube.com') ||
      link.getAttribute('href')?.includes('facebook.com') ||
      link.getAttribute('href')?.includes('twitch.tv') ||
      link.getAttribute('href')?.includes('tiktok.com') ||
      link.getAttribute('href')?.includes('instagram.com'),
  )
}

describe('MinimalFooter', () => {
  it('has no accessibility violations', async () => {
    const {container} = render(<MinimalFooter />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders as a footer element', () => {
    const {getByRole} = render(<MinimalFooter />)
    expect(getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders default copyright statement', () => {
    const {getByText} = render(<MinimalFooter />)
    const currentYear = new Date().getFullYear()
    expect(getByText(`© ${currentYear} GitHub. All rights reserved.`)).toBeInTheDocument()
  })

  it('renders custom copyright statement', () => {
    const customCopyright = 'Custom Copyright 2024'
    const {getByText} = render(<MinimalFooter copyrightStatement={customCopyright} />)
    expect(getByText(customCopyright)).toBeInTheDocument()
  })

  it('renders copyright statement as React element', () => {
    const customCopyright = <span>Custom Copyright 2024</span>
    const {getByText} = render(<MinimalFooter copyrightStatement={customCopyright} />)
    expect(getByText('Custom Copyright 2024')).toBeInTheDocument()
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

  it('applies custom className', () => {
    const {getByRole} = render(<MinimalFooter className="custom-footer" />)
    expect(getByRole('contentinfo')).toHaveClass('custom-footer')
  })

  it('renders all social links by default', () => {
    const {getAllByRole} = render(<MinimalFooter />)
    const socialLinks = getSocialLinks(getAllByRole('link'))
    expect(socialLinks).toHaveLength(8)
  })

  it('renders specific social links when provided', () => {
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
    const socialLinks = getSocialLinks(queryAllByRole('link'))
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
    const {getByText, queryByText} = render(
      <MinimalFooter>
        <MinimalFooter.Link href="/link1">Link 1</MinimalFooter.Link>
        <MinimalFooter.Link href="/link2">Link 2</MinimalFooter.Link>
        <MinimalFooter.Link href="/link3">Link 3</MinimalFooter.Link>
        <MinimalFooter.Link href="/link4">Link 4</MinimalFooter.Link>
        <MinimalFooter.Link href="/link5">Link 5</MinimalFooter.Link>
        <MinimalFooter.Link href="/link6">Link 6</MinimalFooter.Link>
      </MinimalFooter>,
    )

    expect(getByText('Link 1')).toBeInTheDocument()
    expect(getByText('Link 2')).toBeInTheDocument()
    expect(getByText('Link 3')).toBeInTheDocument()
    expect(getByText('Link 4')).toBeInTheDocument()
    expect(getByText('Link 5')).toBeInTheDocument()
    expect(queryByText('Link 6')).not.toBeInTheDocument()
  })

  it('ignores non-Link children', () => {
    const {getByText, queryByText} = render(
      <MinimalFooter>
        <div>Invalid child</div>
        <MinimalFooter.Link href="/valid">Valid Link</MinimalFooter.Link>
        <span>Another invalid child</span>
      </MinimalFooter>,
    )

    expect(getByText('Valid Link')).toBeInTheDocument()
    expect(queryByText('Invalid child')).not.toBeInTheDocument()
    expect(queryByText('Another invalid child')).not.toBeInTheDocument()
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

    expect(getByText('Footnote 1')).toBeInTheDocument()
    expect(getByText('Footnote 2')).toBeInTheDocument()
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

    expect(queryByText('Non-text child')).not.toBeInTheDocument()
    expect(getByText('Valid text')).toBeInTheDocument()
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

    expect(getByRole('button', {name: /Button Link/})).toBeInTheDocument()
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
    expect(getByRole('contentinfo')).toBeInTheDocument()
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

    expect(getByRole('link', {name: 'GitHub on X'})).toHaveAttribute('href', 'https://x.com/github')
    expect(getByRole('link', {name: 'GitHub on GitHub'})).toHaveAttribute('href', 'https://github.com/github')
    expect(getByRole('link', {name: 'GitHub on LinkedIn'})).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/github',
    )
    expect(getByRole('link', {name: 'GitHub on YouTube'})).toHaveAttribute('href', 'https://www.youtube.com/github')
    expect(getByRole('link', {name: 'GitHub on Facebook'})).toHaveAttribute('href', 'https://www.facebook.com/GitHub')
    expect(getByRole('link', {name: 'GitHub on Twitch'})).toHaveAttribute('href', 'https://www.twitch.tv/github')
    expect(getByRole('link', {name: 'GitHub on TikTok'})).toHaveAttribute('href', 'https://www.tiktok.com/@github')
    expect(getByRole('link', {name: 'GitHub on Instagram'})).toHaveAttribute(
      'href',
      'https://www.instagram.com/github/',
    )
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

    expect(getByRole('contentinfo')).toBeInTheDocument()
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
    const socialLinks = getSocialLinks(getAllByRole('link'))

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

    expect(getByText('Only footnotes')).toBeInTheDocument()
    expect(getByRole('link', {name: 'GitHub'})).toBeInTheDocument()
    expect(getSocialLinks(queryAllByRole('link'))).toHaveLength(0)
  })

  it('renders component with only social links', () => {
    const {getByRole, getAllByRole} = render(<MinimalFooter socialLinks={['x']} />)

    expect(getByRole('link', {name: 'GitHub'})).toBeInTheDocument()
    expect(getSocialLinks(getAllByRole('link'))).toHaveLength(1)
  })

  it('renders component with only footer links', () => {
    const {getByText, getByRole} = render(
      <MinimalFooter socialLinks={false}>
        <MinimalFooter.Link href="/test">Single Link</MinimalFooter.Link>
      </MinimalFooter>,
    )

    expect(getByText('Single Link')).toBeInTheDocument()
    expect(getByRole('link', {name: 'GitHub'})).toBeInTheDocument()
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

    expect(getByText('First footnote')).toBeInTheDocument()
    expect(getByText('Second footnote')).toBeInTheDocument()
    expect(getByText('Third footnote')).toBeInTheDocument()

    expect(getByText('First footnote').tagName).toBe('P')
    expect(getByText('Second footnote').tagName).toBe('P')
    expect(getByText('Third footnote').tagName).toBe('P')
  })

  it('calculates current year correctly for copyright', () => {
    const {getByText} = render(<MinimalFooter />)
    const currentYear = new Date().getFullYear()
    const expectedCopyright = `© ${currentYear} GitHub. All rights reserved.`

    expect(getByText(expectedCopyright)).toBeInTheDocument()
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

    expect(getByText(/For more information, see our/)).toBeInTheDocument()
    expect(getByRole('link', {name: 'Privacy Policy'})).toHaveAttribute('href', '/privacy')
  })

  it('forwards additional HTML attributes', () => {
    const {getByRole} = render(<MinimalFooter data-testid="custom-footer" aria-labelledby="footer-heading" />)

    const footer = getByRole('contentinfo')
    expect(footer).toHaveAttribute('data-testid', 'custom-footer')
    expect(footer).toHaveAttribute('aria-labelledby', 'footer-heading')
  })
})

import React, {PropsWithChildren, useCallback} from 'react'
import {clsx} from 'clsx'
import {ArrowUpIcon, LogoGithubIcon, MarkGithubIcon} from '@primer/octicons-react'

import {Button, ColorModesEnum, Stack, Text, useTheme} from '../'
import {BaseProps} from '../component-helpers'
import {useReducedMotion} from '../hooks/useReducedMotion'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/footer/colors-with-modes.css'
/**
 * `--brand-control-minTarget-coarse` (used by the `gridline` variant's BackToTop hit-area)
 * isn't part of the shared stylesheet bundle. It's already imported transitively via
 * `Stack`, which this component always renders, but it's imported explicitly here too so
 * `MinimalFooter.module.css` doesn't depend on another component's import for its tokens.
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/size/size.css'

/**
 * Main Stylesheet (as a CSS Module)
 */
import styles from './MinimalFooter.module.css'

const socialLinkData = {
  x: {
    fullName: 'X',
    url: 'https://x.com/github',
    icon: 'https://github.githubassets.com/images/modules/site/icons/footer/x.svg',
    iconWidth: 20,
    iconHeight: 16,
  },
  github: {
    fullName: 'GitHub',
    url: 'https://github.com/github',
    icon: 'https://github.githubassets.com/images/modules/site/icons/footer/github-mark.svg',
    iconWidth: 20,
    iconHeight: 20,
  },
  linkedin: {
    fullName: 'LinkedIn',
    url: 'https://www.linkedin.com/company/github',
    icon: 'https://github.githubassets.com/images/modules/site/icons/footer/linkedin.svg',
    iconWidth: 19,
    iconHeight: 18,
  },
  youtube: {
    fullName: 'YouTube',
    url: 'https://www.youtube.com/github',
    icon: 'https://github.githubassets.com/images/modules/site/icons/footer/youtube.svg',
    iconWidth: 23,
    iconHeight: 16,
  },
  facebook: {
    fullName: 'Facebook',
    url: 'https://www.facebook.com/GitHub',
    icon: 'https://github.githubassets.com/images/modules/site/icons/footer/facebook.svg',
    iconWidth: 18,
    iconHeight: 18,
  },
  twitch: {
    fullName: 'Twitch',
    url: 'https://www.twitch.tv/github',
    icon: 'https://github.githubassets.com/images/modules/site/icons/footer/twitch.svg',
    iconWidth: 18,
    iconHeight: 18,
  },
  tiktok: {
    fullName: 'TikTok',
    url: 'https://www.tiktok.com/@github',
    icon: 'https://github.githubassets.com/images/modules/site/icons/footer/tiktok.svg',
    iconWidth: 18,
    iconHeight: 18,
  },
  instagram: {
    fullName: 'Instagram',
    url: 'https://www.instagram.com/github/',
    icon: 'https://github.githubassets.com/images/modules/site/icons/footer/instagram.svg',
    iconWidth: 24,
    iconHeight: 24,
  },
} as const

type SocialLinkName = keyof typeof socialLinkData
type SocialLink = (typeof socialLinkData)[SocialLinkName]

const socialLinkNames = Object.keys(socialLinkData) as SocialLinkName[]

/**
 * The layout variations available in MinimalFooter.
 * `gridline` groups output into `brand-social`, `content`, and `legal`
 * regions (each marked with a `data-footer-region` attribute), rendering
 * only the regions that have content, in that order, and applies the
 * tokenized `gridline` visual styling (gutters, dividers, typography, gaps,
 * etc.) defined in `MinimalFooter.module.css`. The `content` region is where
 * consumers can approximate the Figma reference's page-level chrome (utility
 * links, language/theme/status controls); see the "Structural scope" note atop
 * the `gridline` section of `MinimalFooter.module.css` for the full rationale.
 */
export const MinimalFooterVariants = ['default', 'gridline'] as const
export const defaultMinimalFooterVariant = MinimalFooterVariants[0]
export type MinimalFooterVariant = (typeof MinimalFooterVariants)[number]

/**
 * The GitHub logo variations available in MinimalFooter.
 */
export const MinimalFooterLogoVariants = ['logo', 'logomark'] as const
export const defaultMinimalFooterLogoVariant = MinimalFooterLogoVariants[0]
export type MinimalFooterLogoVariant = (typeof MinimalFooterLogoVariants)[number]

export type MinimalFooterProps = {
  /**
   * An array of social links to be displayed in the footer.
   */
  socialLinks?: SocialLinkName[] | false
  /**
   * The href for the GitHub logo.
   */
  logoHref?: string
  /**
   * The copyright statement to be displayed in the footer.
   * If not provided, the copyright statement will be the default GitHub copyright statement.
   */
  copyrightStatement?: string | React.ReactElement
  /**
   * The layout variant of the footer.
   */
  variant?: MinimalFooterVariant
  /**
   * The GitHub logo variant rendered in the footer.
   */
  logoVariant?: MinimalFooterLogoVariant
} & BaseProps<HTMLElement>

/**
 * Recognizes only the first `MinimalFooter.Footnotes`, the first `MinimalFooter.Content`,
 * the first `MinimalFooter.BackToTop`, and up to the first five `MinimalFooter.Link`
 * children. All other children - including duplicates of the single-instance children
 * and any Link children beyond the fifth - are ignored.
 */
function parseRootChildren(children: React.ReactNode) {
  let footnotes: React.ReactElement | undefined
  let content: React.ReactElement | undefined
  let backToTop: React.ReactElement | undefined
  const links: React.ReactElement[] = []

  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child)) {
      continue
    }

    if (child.type === Footnotes) {
      footnotes ??= child
    } else if (child.type === Content) {
      content ??= child
    } else if (child.type === BackToTop) {
      backToTop ??= child
    } else if (child.type === Link && links.length < 5) {
      links.push(child)
    }
  }

  return {footnotes, content, backToTop, links}
}

/**
 * The names of the `gridline` variant's top-level regions, in the approved
 * rendering order. `brand-social` and `legal` are always populated (the logo
 * and copyright are never empty), while `content` is only rendered when a
 * `MinimalFooter.Content` child is present.
 */
type FooterRegionName = 'brand-social' | 'content' | 'legal'

function Root({
  className,
  children,
  copyrightStatement,
  logoHref = 'https://github.com',
  logoVariant = defaultMinimalFooterLogoVariant,
  socialLinks,
  variant = defaultMinimalFooterVariant,
  ...rest
}: PropsWithChildren<MinimalFooterProps>) {
  const {footnotes, content, backToTop, links} = parseRootChildren(children)

  const currentYear = new Date().getFullYear()
  const isGridline = variant === 'gridline'

  const brandSocialRegion = (
    <>
      <SocialLogomarks socialLinks={socialLinks} logoHref={logoHref} logoVariant={logoVariant} />
      {backToTop}
    </>
  )

  const legalRegion = (
    <section>
      <div className={styles['Footer__legal-and-links']}>
        <div className={styles['Footer__container']}>
          <Stack
            direction={{narrow: 'vertical', regular: 'horizontal'}}
            gap={isGridline ? 20 : 'normal'}
            padding="none"
            justifyContent={isGridline ? 'flex-start' : 'space-between'}
          >
            <Stack
              padding="none"
              gap={isGridline ? 20 : 'condensed'}
              flexWrap={isGridline ? 'wrap' : undefined}
              justifyContent={{
                narrow: 'center',
                regular: 'flex-end',
              }}
              direction={{
                narrow: 'vertical',
                regular: 'horizontal',
              }}
              className={styles['Footer__links']}
            >
              <>{links}</>
            </Stack>
            <Text as="p" size="200" variant="muted" className={styles['Footer__copyright']}>
              {copyrightStatement ? copyrightStatement : `\u00A9 ${currentYear} GitHub. All rights reserved.`}
            </Text>
          </Stack>
        </div>
      </div>
    </section>
  )

  // Approved region order for the `gridline` variant: brand/social, content, legal.
  const regions: {name: FooterRegionName; node: React.ReactNode}[] = [
    {name: 'brand-social', node: brandSocialRegion},
    {name: 'content', node: content},
    {name: 'legal', node: legalRegion},
  ]

  return (
    <footer className={clsx(styles.Footer, className)} data-variant={variant} {...rest}>
      {footnotes}
      {isGridline
        ? regions
            .filter(region => Boolean(region.node))
            .map(region => (
              <div key={region.name} data-footer-region={region.name}>
                {region.node}
              </div>
            ))
        : regions.map(region => <React.Fragment key={region.name}>{region.node}</React.Fragment>)}
    </footer>
  )
}

type FootnoteProps = BaseProps<HTMLElement>

function Footnotes({children, className}: PropsWithChildren<FootnoteProps>) {
  const styledChildren = React.Children.map(children, child => {
    if (React.isValidElement<React.ComponentProps<typeof Text>>(child) && child.type === Text) {
      const textChild = child as React.ReactElement<React.ComponentProps<typeof Text>>
      const overrideProps: Partial<React.ComponentProps<typeof Text>> = {
        variant: 'muted',
        size: '100',
        className: clsx(styles['Footer__terms-item'], textChild.props.className),
      }

      if (!textChild.props.as) {
        overrideProps.as = 'p'
      }

      return React.cloneElement(textChild, overrideProps)
    }

    return null
  })

  return (
    <section className={styles.Footer__container}>
      <div className={clsx(styles.Footer__terms, className)}>{styledChildren}</div>
    </section>
  )
}

type MinimalFooterContentProps = React.HTMLAttributes<HTMLElement> & Omit<BaseProps<HTMLElement>, 'animate'>

function Content({children, className, ...rest}: PropsWithChildren<MinimalFooterContentProps>) {
  return (
    <section className={clsx(styles.Footer__container, className)} {...rest}>
      {children}
    </section>
  )
}

type SocialLinkProps = {name: SocialLinkName}

const SocialLink = ({name}: SocialLinkProps) => {
  const link = socialLinkData[name]
  return (
    <li key={name} data-social-link={name}>
      <a
        href={link.url}
        className={styles['Footer__social-link']}
        data-analytics-event={`{"category":"Footer","action":"go to ${link.fullName}","label":"text:${name}"}`}
      >
        <img
          className={styles['Footer__social-icon']}
          src={link.icon}
          height={link.iconHeight}
          width={link.iconWidth}
          loading="lazy"
          decoding="async"
          alt=""
        />
        <span className="visually-hidden">GitHub on {link.fullName}</span>
      </a>
    </li>
  )
}

type SocialLogomarksProps = {
  socialLinks?: SocialLinkName[] | false
  logoHref?: string
  logoVariant?: MinimalFooterLogoVariant
}

function SocialLogomarks({
  socialLinks = socialLinkNames,
  logoHref,
  logoVariant = defaultMinimalFooterLogoVariant,
}: SocialLogomarksProps) {
  const {colorMode} = useTheme()
  const LogoIcon = logoVariant === 'logomark' ? MarkGithubIcon : LogoGithubIcon

  return (
    <section className={clsx(styles['Footer__logomarks'])}>
      <div className={styles['Footer__container']}>
        <Stack
          alignItems="center"
          direction={{narrow: 'vertical', regular: 'horizontal'}}
          gap="normal"
          padding="none"
          justifyContent="space-between"
        >
          <div>
            <a
              href={logoHref}
              data-analytics-event='{"category":"Footer","action":"go to home","label":"text:home"}'
              aria-label="GitHub"
            >
              <LogoIcon fill={colorMode === ColorModesEnum.DARK ? 'white' : 'black'} size="medium" />
            </a>
          </div>
          {socialLinks ? (
            <ul className={styles['Footer__social-links']}>
              {socialLinks.map(name => (
                <SocialLink key={name} name={name} />
              ))}
            </ul>
          ) : null}
        </Stack>
      </div>
    </section>
  )
}

type LinkProps<C extends React.ElementType> = BaseProps<C> & {as?: 'a' | 'button'} & Omit<
    React.ComponentPropsWithoutRef<C>,
    keyof C
  >

const Link = <C extends React.ElementType = 'a'>({as, children, ...rest}: PropsWithChildren<LinkProps<C>>) => {
  const Component = as || 'a'
  return (
    <Component
      className={styles['Footer__link']}
      data-analytics-event={
        rest['href'] ? `{"category":"Footer","action":"go to ${rest['href']}","label":"text:${children}"}` : undefined
      }
      {...rest}
    >
      <Text variant="muted" size="200" className={styles['Footer__link-text']}>
        {children}
      </Text>
    </Component>
  )
}

/**
 * Public prop shape approved for `MinimalFooter.BackToTop` (see `td-92fab6`).
 *
 * - `children` supplies the visible, accessible label (mirrors Button's children-as-label convention)
 *   and defaults to "Back to top" only when omitted, so consumers can localize it.
 * - `onClick` runs before any built-in scrolling; built-in scrolling is skipped when
 *   `event.preventDefault()` is called, matching the `Accordion`/`NavList` handler-composition pattern.
 * - `scrollBehavior` lets consumers customize scrolling in the normal-motion case only. It is never
 *   used to force `smooth` scrolling when the user prefers reduced motion - the reduced-motion
 *   preference always wins.
 * - Rest props (ARIA, `data-*`, `data-analytics-event`, etc.) forward to the underlying `<button>`,
 *   consistent with `Button`'s prop-forwarding behavior.
 */
export type MinimalFooterBackToTopProps = {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  scrollBehavior?: ScrollBehavior
} & BaseProps<HTMLButtonElement> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>

/**
 * Opt-in control that scrolls the document back to the top. Recognized as a `MinimalFooter` child
 * the same way `Footnotes`/`Content`/`Link` are - only the first instance is rendered (see
 * `parseRootChildren`). Not rendered unless a consumer includes it.
 *
 * Consumer `onClick` handlers always run first; calling `event.preventDefault()` inside `onClick`
 * skips the built-in scroll entirely, leaving scrolling fully up to the consumer. Otherwise the
 * document/window is scrolled to the top. When the user prefers reduced motion, the scroll always
 * uses `behavior: 'auto'`, regardless of `scrollBehavior` - reduced motion can never be overridden
 * to `smooth`. Otherwise, `scrollBehavior` selects the behavior, defaulting to `smooth`.
 */
function BackToTop({children, onClick, scrollBehavior, ...rest}: MinimalFooterBackToTopProps) {
  const prefersReducedMotion = useReducedMotion()

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    event => {
      onClick?.(event)

      if (event.defaultPrevented) {
        return
      }

      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : scrollBehavior ?? 'smooth',
      })
    },
    [onClick, prefersReducedMotion, scrollBehavior],
  )

  return (
    <Button as="button" variant="subtle" size="small" leadingVisual={<ArrowUpIcon />} onClick={handleClick} {...rest}>
      {children ? children : 'Back to top'}
    </Button>
  )
}

/**
 * Use MinimalFooter to render a global footer on all GitHub pages.
 * @see https://primer.style/brand/components/MinimalFooter
 */
export const MinimalFooter = Object.assign(Root, {
  Footnotes,
  Content,
  Link,
  BackToTop,
})

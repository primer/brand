import React, {forwardRef, PropsWithChildren, useCallback} from 'react'
import {clsx} from 'clsx'
import {ArrowUpIcon, MarkGithubIcon} from '@primer/octicons-react'

import {Button, Text} from '../'
import {BaseProps} from '../component-helpers'
import {useReducedMotion} from '../hooks/useReducedMotion'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/footer/colors-with-modes.css'
/**
 * `--brand-control-minTarget-coarse` (used by the BackToTop hit-area) isn't part of
 * the shared stylesheet bundle, so it is imported explicitly here.
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
const socialLinkNames = Object.keys(socialLinkData) as SocialLinkName[]

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
 * The footer's top-level regions, in rendering order. `top` and `bottom`
 * are always populated, while `content` is only rendered when a
 * `MinimalFooter.Content` child is present.
 */
type FooterRegionName = 'top' | 'content' | 'bottom'

function Root({
  className,
  children,
  copyrightStatement,
  logoHref = 'https://github.com',
  socialLinks,
  ...rest
}: PropsWithChildren<MinimalFooterProps>) {
  const {footnotes, content, backToTop, links} = parseRootChildren(children)

  const currentYear = new Date().getFullYear()
  const resolvedSocialLinks = socialLinks === undefined ? socialLinkNames : socialLinks
  const renderedSocialLinks = resolvedSocialLinks === false ? [] : resolvedSocialLinks
  const hasSocialLinks = renderedSocialLinks.length > 0

  const topRegion = (
    <section className={styles.Footer__top}>
      <div className={styles.Footer__container}>
        <div className={styles['Footer__top-row']}>
          <LogoLink logoHref={logoHref} />
          {backToTop}
        </div>
      </div>
    </section>
  )

  const bottomRegion = (
    <section className={styles.Footer__bottom} data-footer-layout={hasSocialLinks ? 'social' : 'no-social'}>
      <div className={styles.Footer__container}>
        <div className={styles['Footer__bottom-row']}>
          <div className={styles['Footer__copyright-and-links']}>
            <Text as="p" size="200" variant="muted" className={styles['Footer__copyright']}>
              {copyrightStatement ? copyrightStatement : `\u00A9 ${currentYear} GitHub. All rights reserved.`}
            </Text>
            <div className={styles['Footer__links']}>{links}</div>
          </div>
          {hasSocialLinks ? <SocialLinks socialLinks={renderedSocialLinks} /> : null}
        </div>
      </div>
    </section>
  )

  const regions: {name: FooterRegionName; node: React.ReactNode}[] = [
    {name: 'top', node: topRegion},
    {name: 'content', node: content},
    {name: 'bottom', node: bottomRegion},
  ]

  return (
    <footer className={clsx(styles.Footer, className)} {...rest}>
      {footnotes}
      {regions
        .filter(region => Boolean(region.node))
        .map(region => (
          <div key={region.name} data-footer-region={region.name}>
            {region.node}
          </div>
        ))}
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

function LogoLink({logoHref}: {logoHref?: string}) {
  return (
    <a
      href={logoHref}
      className={styles.Footer__logo}
      data-analytics-event='{"category":"Footer","action":"go to home","label":"text:home"}'
      aria-label="GitHub"
    >
      <MarkGithubIcon size={24} />
    </a>
  )
}

function SocialLinks({socialLinks}: {socialLinks: SocialLinkName[]}) {
  return (
    <ul className={styles['Footer__social-links']}>
      {socialLinks.map(name => (
        <SocialLink key={name} name={name} />
      ))}
    </ul>
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
 * Props for the optional Back to top control.
 */
export type MinimalFooterBackToTopProps = {
  /**
   * The visible and accessible label.
   */
  children: React.ReactNode
  /**
   * The ID of the semantic top-of-page element that receives focus after keyboard activation.
   * Defaults to the first `<main>` element.
   */
  focusTargetId?: string
  /**
   * Runs before the built-in behavior. Call `event.preventDefault()` to cancel scrolling and focus transfer.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * The scrolling behavior used when reduced motion is not preferred.
   */
  scrollBehavior?: ScrollBehavior
} & BaseProps<HTMLButtonElement> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>

/**
 * Scrolls to the top and, after keyboard activation, moves focus to the configured top-of-page destination.
 */
const BackToTop = forwardRef<HTMLButtonElement, MinimalFooterBackToTopProps>(
  ({children, className, focusTargetId, onClick, scrollBehavior, type = 'button', ...rest}, ref) => {
    const prefersReducedMotion = useReducedMotion()

    const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      event => {
        onClick?.(event)

        if (event.defaultPrevented) {
          return
        }

        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'instant' : scrollBehavior ?? 'smooth',
        })

        if (event.detail === 0) {
          const focusTarget = focusTargetId
            ? document.getElementById(focusTargetId)
            : document.querySelector<HTMLElement>('main')

          if (!focusTarget) {
            if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
              // eslint-disable-next-line no-console
              console.warn(
                focusTargetId
                  ? `MinimalFooter.BackToTop: No element found with id "${focusTargetId}".`
                  : 'MinimalFooter.BackToTop: No main element found.',
              )
            }
            return
          }

          const hadTabIndex = focusTarget.hasAttribute('tabindex')

          if (!hadTabIndex) {
            focusTarget.tabIndex = -1
            focusTarget.addEventListener('blur', () => focusTarget.removeAttribute('tabindex'), {once: true})
          }

          focusTarget.focus({preventScroll: true})
        }
      },
      [focusTargetId, onClick, prefersReducedMotion, scrollBehavior],
    )

    return (
      <Button
        ref={ref}
        as="button"
        type={type}
        variant="subtle"
        size="small"
        className={clsx(styles.Footer__backToTop, className)}
        onClick={handleClick}
        {...rest}
      >
        <span className={styles['Footer__backToTop-content']}>
          <span>{children}</span>
          <span className={styles['Footer__backToTop-icon']} aria-hidden="true">
            <ArrowUpIcon />
          </span>
        </span>
      </Button>
    )
  },
)

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

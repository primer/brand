import React, {forwardRef, PropsWithChildren, useCallback} from 'react'
import {clsx} from 'clsx'
import {ArrowUpIcon, MarkGithubIcon} from '@primer/octicons-react'

import {Text} from '../'
import {BaseProps} from '../component-helpers'
import {useReducedMotion} from '../hooks/useReducedMotion'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/footer/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/footer/base.css'

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
   * An optional component rendered between the top and bottom sections.
   */
  centerComponent?: React.ReactElement
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

function Root({
  centerComponent,
  className,
  children,
  copyrightStatement,
  logoHref = 'https://github.com',
  socialLinks,
  ...rest
}: PropsWithChildren<MinimalFooterProps>) {
  let footnotes: React.ReactElement | undefined
  let backToTop: React.ReactElement | undefined
  const links: React.ReactElement[] = []

  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child)) {
      continue
    }

    if (child.type === Footnotes) {
      footnotes ??= child
    } else if (child.type === BackToTop) {
      backToTop ??= child
    } else if (child.type === Link && links.length < 5) {
      links.push(child)
    }
  }

  const currentYear = new Date().getFullYear()
  const resolvedSocialLinks = socialLinks === undefined ? socialLinkNames : socialLinks
  const renderedSocialLinks = resolvedSocialLinks === false ? [] : resolvedSocialLinks
  const hasSocialLinks = renderedSocialLinks.length > 0

  return (
    <footer className={clsx(styles.MinimalFooter, className)} {...rest}>
      {footnotes}
      <div className={styles.MinimalFooter__section}>
        <section className={styles.MinimalFooter__top}>
          <div className={styles.MinimalFooter__container}>
            <div className={styles['MinimalFooter__top-row']}>
              <LogoLink logoHref={logoHref} />
              {backToTop}
            </div>
          </div>
        </section>
      </div>
      {centerComponent ? (
        <div className={clsx(styles.MinimalFooter__section, styles['MinimalFooter__section--center'])}>
          <section className={styles.MinimalFooter__container}>{centerComponent}</section>
        </div>
      ) : null}
      <div className={clsx(styles.MinimalFooter__section, styles['MinimalFooter__section--bottom'])}>
        <section
          className={clsx(styles.MinimalFooter__bottom, !hasSocialLinks && styles['MinimalFooter__bottom--no-social'])}
        >
          <div className={styles.MinimalFooter__container}>
            <div className={styles['MinimalFooter__bottom-row']}>
              <div className={styles['MinimalFooter__copyright-and-links']}>
                <Text
                  as="p"
                  size="100"
                  font="monospace"
                  weight={{narrow: 'medium', wide: 'normal'}}
                  variant="muted"
                  className={styles.MinimalFooter__copyright}
                >
                  {copyrightStatement ? copyrightStatement : `\u00A9 ${currentYear} GitHub. All rights reserved.`}
                </Text>
                <div className={styles.MinimalFooter__links}>{links}</div>
              </div>
              {hasSocialLinks ? <SocialLinks socialLinks={renderedSocialLinks} /> : null}
            </div>
          </div>
        </section>
      </div>
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
        className: clsx(styles['MinimalFooter__terms-item'], textChild.props.className),
      }

      if (!textChild.props.as) {
        overrideProps.as = 'p'
      }

      return React.cloneElement(textChild, overrideProps)
    }

    return null
  })

  return (
    <section className={styles.MinimalFooter__container}>
      <div className={clsx(styles.MinimalFooter__terms, className)}>{styledChildren}</div>
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
        className={styles['MinimalFooter__social-link']}
        data-analytics-event={`{"category":"Footer","action":"go to ${link.fullName}","label":"text:${name}"}`}
      >
        <img
          className={styles['MinimalFooter__social-icon']}
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
      className={styles.MinimalFooter__logo}
      data-analytics-event='{"category":"Footer","action":"go to home","label":"text:home"}'
      aria-label="GitHub"
    >
      <MarkGithubIcon size={24} />
    </a>
  )
}

function SocialLinks({socialLinks}: {socialLinks: SocialLinkName[]}) {
  return (
    <ul className={styles['MinimalFooter__social-links']}>
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
      className={styles.MinimalFooter__link}
      data-analytics-event={
        rest['href'] ? `{"category":"Footer","action":"go to ${rest['href']}","label":"text:${children}"}` : undefined
      }
      {...rest}
    >
      <Text variant="muted" size="100" font="monospace" weight={{narrow: 'medium', wide: 'normal'}}>
        {children}
      </Text>
    </Component>
  )
}

export type MinimalFooterBackToTopProps = {
  /**
   * The visible and accessible label.
   */
  children: React.ReactNode
  /**
   * The ID of the semantic top-of-page element that receives focus after keyboard activation.
   * Defaults to the first `<main>` element, then falls back to `<body>`.
   */
  focusTargetId?: string
  /**
   * Runs before the built-in behavior. Call `event.preventDefault()` to cancel scrolling and focus transfer.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
} & BaseProps<HTMLButtonElement> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>

/**
 * Scrolls to the top and, after keyboard activation, moves focus to the configured top-of-page destination.
 */
const BackToTop = forwardRef<HTMLButtonElement, MinimalFooterBackToTopProps>(
  ({children, className, focusTargetId, onClick, type = 'button', ...rest}, ref) => {
    const prefersReducedMotion = useReducedMotion()

    const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      event => {
        onClick?.(event)

        if (event.defaultPrevented) {
          return
        }

        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'instant' : 'smooth',
        })

        if (event.detail === 0) {
          const focusTarget = focusTargetId
            ? document.getElementById(focusTargetId)
            : document.querySelector<HTMLElement>('main') ??
              document.querySelector<HTMLElement>('body') ??
              document.documentElement

          if (!focusTarget) {
            if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
              // eslint-disable-next-line no-console
              console.warn(`MinimalFooter.BackToTop: No element found with id "${focusTargetId}".`)
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
      [focusTargetId, onClick, prefersReducedMotion],
    )

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(styles.MinimalFooter__backToTop, className)}
        onClick={handleClick}
        {...rest}
      >
        <span className={styles['MinimalFooter__backToTop-content']}>
          <Text as="span" size="100" weight="medium">
            {children}
          </Text>
          <span className={styles['MinimalFooter__backToTop-icon']} aria-hidden="true">
            <ArrowUpIcon />
          </span>
        </span>
      </button>
    )
  },
)

/**
 * Use MinimalFooter to render a global footer on all GitHub pages.
 * @see https://primer.style/brand/components/MinimalFooter
 */
export const MinimalFooter = Object.assign(Root, {
  Footnotes,
  Link,
  BackToTop,
})

import React, {PropsWithChildren} from 'react'
import clsx from 'clsx'
import {LogoGithubIcon} from '@primer/octicons-react'

import {ColorModesEnum, Stack, Text, useTheme} from '../'
import {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/footer/colors-with-modes.css'

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
// biome-ignore lint/correctness/noUnusedVariables: TODO - Use or remove this type alias
type SocialLink = (typeof socialLinkData)[SocialLinkName]

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

function Root({
  className,
  children,
  copyrightStatement,
  logoHref = 'https://github.com',
  socialLinks,
  ...rest
}: PropsWithChildren<MinimalFooterProps>) {
  // find Footer.Footnotes children
  const footerFootnoteChild = () => {
    const footnotes = React.Children.toArray(children).find(child => {
      if (!React.isValidElement(child)) {
        return false
      }

      if (child.type && child.type === Footnotes) {
        return true
      }
    })
    return footnotes
  }

  /**
   * Renders a maximum of 5 links.
   * If more than 5 links are required, we should encourage usage of Footer instead.
   */
  const LinkChildren = React.Children.toArray(children)
    .filter(child => {
      // if not valid element
      if (React.isValidElement(child)) {
        if (child.type === Link) {
          return child
        }
      }
    })
    .slice(0, 5)

  const currentYear = new Date().getFullYear()

  return (
    <footer className={clsx(styles.Footer, className)} {...rest}>
      {footerFootnoteChild()}
      <SocialLogomarks socialLinks={socialLinks} logoHref={logoHref} />
      <section>
        <div className={styles['Footer__legal-and-links']}>
          <div className={styles['Footer__container']}>
            <Stack
              direction={{narrow: 'vertical', regular: 'horizontal'}}
              gap="normal"
              padding="none"
              justifyContent="space-between"
            >
              <Stack
                padding="none"
                gap="condensed"
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
                <>{LinkChildren}</>
              </Stack>
              <Text as="p" size="200" variant="muted" className={styles['Footer__copyright']}>
                {copyrightStatement ? copyrightStatement : `\u00A9 ${currentYear} GitHub. All rights reserved.`}
              </Text>
            </Stack>
          </div>
        </div>
      </section>
    </footer>
  )
}

type FootnoteProps = BaseProps<HTMLElement>

function Footnotes({children, className}: PropsWithChildren<FootnoteProps>) {
  const styledChildren = React.Children.map(children, child => {
    // if not valid element
    if (!React.isValidElement(child)) {
      return child
    }

    if (child.type && child.type === Text) {
      return React.cloneElement(child as React.ReactElement, {
        as: 'p',
        variant: 'muted',
        size: '100',
        className: clsx(styles['Footer__terms-item'], child.props.className),
        ...child.props, // allow overrides for escape hatch
      })
    }
  })

  return (
    <section className={styles.Footer__container}>
      <div className={clsx(styles.Footer__terms, className)}>{styledChildren}</div>
    </section>
  )
}

type SocialLinkProps = {name: SocialLinkName}

const SocialLink = ({name}: SocialLinkProps) => {
  const link = socialLinkData[name]
  return (
    <li key={name}>
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
}

function SocialLogomarks({socialLinks = socialLinkNames, logoHref}: SocialLogomarksProps) {
  const {colorMode} = useTheme()

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
              <LogoGithubIcon fill={colorMode === ColorModesEnum.DARK ? 'white' : 'black'} size="medium" />
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
      <Text variant="muted" size="200">
        {children}
      </Text>
    </Component>
  )
}

/**
 * Use MinimalFooter to render a global footer on all GitHub pages.
 * @see https://primer.style/brand/components/MinimalFooter
 */
export const MinimalFooter = Object.assign(Root, {
  Footnotes,
  Link,
})

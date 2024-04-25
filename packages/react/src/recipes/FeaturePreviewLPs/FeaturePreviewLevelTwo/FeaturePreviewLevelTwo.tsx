import {MoonIcon, SunIcon, ZapIcon} from '@primer/octicons-react'
import React, {useEffect} from 'react'
import {
  Box,
  Button,
  CTABanner,
  Card,
  ColorModesEnum,
  FAQ,
  FAQGroup,
  Grid,
  Heading,
  Hero,
  Image,
  Link,
  MinimalFooter,
  Pillar,
  River,
  RiverBreakout,
  SectionIntro,
  Stack,
  SubNav,
  SubdomainNavBar,
  Testimonial,
  Text,
  ThemeProvider,
  Timeline,
  IDE,
  LogoSuite,
} from '../../..'

import styles from './FeaturePreviewLevelTwo.module.css'

import emptyBrowser from '../fixtures/images/fg/empty-browser.png'
import emptyBrowserDark from '../fixtures/images/fg/empty-browser-dark.png'

import emptyBrowserLightFull from '../fixtures/images/fg/empty-browser-full-light.png'
import emptyBrowserDarkFull from '../fixtures/images/fg/empty-browser-full-dark.png'
import monaAvatar from '../../../fixtures/images/avatar-mona.png'
import {Themes, themeDetailsMap} from '../helpers'
import clsx from 'clsx'
import {files} from '../../../IDE/fixtures/content'

type FeaturePreviewLevelTwoProps = {
  gridOverlay?: boolean
  variant?: 'Maximum' | 'Minimum'
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  accentColor: Themes

  subNavVisible: boolean
  heroAlign: 'start' | 'center'
  heroBg: boolean
  showHeroVisual: boolean
  heroLabel: string
  heroTitle: string
  heroDescription: string
  heroCtaTextPrimary: string
  heroCtaTextSecondary: string
  heroLogoBarVisible: boolean

  sectionIntroAlign: 'start' | 'center'
  sectionIntroText: string | React.ReactElement[]
  sectionIntroVisible: boolean

  pillarVisibile: boolean
  pillarBackground: boolean

  riverOneVisible: boolean
  riverOneType: 'start' | 'end' | 'breakout'
  riverOneTitle: string
  riverOneDescription: string
  riverOneCtaText: string

  riverTwoVisible: boolean
  riverTwoType: 'start' | 'end' | 'breakout'
  riverTwoTitle: string
  riverTwoDescription: string
  riverTwoCtaText: string

  riverThreeVisible: boolean
  riverThreeType: 'start' | 'end' | 'breakout'
  riverThreeTitle: string
  riverThreeDescription: string
  riverThreeCtaText: string

  testimonialVisible: boolean
  testimonialQuantity: number

  logoSuiteVisible: boolean

  ctaBannerVisible: boolean
  ctaBannerShowBg: boolean

  faqVisible: boolean
  faqType: 'group' | 'single'

  cardsVisible: boolean
}

const Logos = () => (
  <>
    <svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 16" width="45" height="16">
      <title>GitHub</title>
      <path d="M8.81 7.35v5.74c0 .04-.01.11-.06.13 0 0-1.25.89-3.31.89-2.49 0-5.44-.78-5.44-5.92S2.58 1.99 5.1 2c2.18 0 3.06.49 3.2.58.04.05.06.09.06.14L7.94 4.5c0 .09-.09.2-.2.17-.36-.11-.9-.33-2.17-.33-1.47 0-3.05.42-3.05 3.73s1.5 3.7 2.58 3.7c.92 0 1.25-.11 1.25-.11v-2.3H4.88c-.11 0-.19-.08-.19-.17V7.35c0-.09.08-.17.19-.17h3.74c.11 0 .19.08.19.17Zm35.85 2.33c0 3.43-1.11 4.41-3.05 4.41-1.64 0-2.52-.83-2.52-.83s-.04.46-.09.52c-.03.06-.08.08-.14.08h-1.48c-.1 0-.19-.08-.19-.17l.02-11.11c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v3.77s.82-.53 2.02-.53l-.01-.02c1.2 0 2.97.45 2.97 3.88ZM27.68 2.43c.09 0 .17.08.17.17v11.11c0 .09-.08.17-.17.17h-2.13c-.09 0-.17-.08-.17-.17l.02-4.75h-3.31v4.75c0 .09-.08.17-.17.17h-2.13c-.08 0-.17-.08-.17-.17V2.6c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v4.09h3.31V2.6c0-.09.08-.17.17-.17Zm8.26 3.64c.11 0 .19.08.19.17l-.02 7.47c0 .09-.06.17-.17.17H34.6c-.07 0-.14-.04-.16-.09-.03-.06-.08-.45-.08-.45s-1.13.77-2.52.77c-1.69 0-2.92-.55-2.92-2.75V6.25c0-.09.08-.17.17-.17h2.14c.09 0 .17.08.17.17V11c0 .75.22 1.09.97 1.09s1.3-.39 1.3-.39V6.26c0-.11.06-.19.17-.19Zm-17.406 5.971h.005a.177.177 0 0 1 .141.179v1.5c0 .07-.03.14-.09.16-.1.05-.74.22-1.27.22-1.16 0-2.86-.25-2.86-2.69V8.13h-1.11c-.09 0-.17-.08-.17-.19V6.58c0-.08.05-.15.13-.17.07-.01 1.16-.28 1.16-.28V3.96c0-.08.05-.13.14-.13h2.16c.09 0 .14.05.14.13v2.11h1.59c.08 0 .16.08.16.17v1.7c0 .11-.07.19-.16.19h-1.59v3.131c0 .47.27.83 1.05.83.247 0 .481-.049.574-.05ZM12.24 6.06c.09 0 .17.08.17.17v7.37c0 .18-.05.27-.25.27h-1.92c-.17 0-.3-.07-.3-.27V6.26c0-.11.08-.2.17-.2Zm29.99 3.78c0-1.81-.73-2.05-1.5-1.97-.6.04-1.08.34-1.08.34v3.52s.49.34 1.22.36c1.03.03 1.36-.34 1.36-2.25ZM11.19 2.68c.75 0 1.36.61 1.36 1.38 0 .77-.61 1.38-1.36 1.38-.77 0-1.38-.61-1.38-1.38 0-.77.61-1.38 1.38-1.38Zm7.34 9.35v.001l.01.01h-.001l-.005-.001v.001c-.009-.001-.015-.011-.024-.011Z"></path>
    </svg>
    <svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 337.6 72">
      <title>Microsoft</title>
      <path
        fill="#737373"
        d="M140.4 14.4v43.2h-7.5V23.7h-.1l-13.4 33.9h-5l-13.7-33.9h-.1v33.9h-6.9V14.4h10.8l12.4 32h.2l13.1-32h10.2zm6.2 3.3c0-1.2.4-2.2 1.3-3 .9-.8 1.9-1.2 3.1-1.2 1.3 0 2.4.4 3.2 1.2s1.3 1.8 1.3 3-.4 2.2-1.3 3c-.9.8-1.9 1.2-3.2 1.2s-2.3-.4-3.1-1.2c-.8-.9-1.3-1.9-1.3-3zm8.1 8.9v31h-7.3v-31h7.3zm22.1 25.7c1.1 0 2.3-.2 3.6-.8 1.3-.5 2.5-1.2 3.6-2v6.8c-1.2.7-2.5 1.2-4 1.5-1.5.3-3.1.5-4.9.5-4.6 0-8.3-1.4-11.1-4.3-2.9-2.9-4.3-6.6-4.3-11 0-5 1.5-9.1 4.4-12.3 2.9-3.2 7-4.8 12.4-4.8 1.4 0 2.8.2 4.1.5 1.4.3 2.5.8 3.3 1.2v7c-1.1-.8-2.3-1.5-3.4-1.9-1.2-.4-2.4-.7-3.6-.7-2.9 0-5.2.9-7 2.8s-2.6 4.4-2.6 7.6c0 3.1.9 5.6 2.6 7.3 1.7 1.7 4 2.6 6.9 2.6zm27.9-26.2c.6 0 1.1 0 1.6.1s.9.2 1.2.3v7.4c-.4-.3-.9-.6-1.7-.8s-1.6-.4-2.7-.4c-1.8 0-3.3.8-4.5 2.3s-1.9 3.8-1.9 7v15.6h-7.3v-31h7.3v4.9h.1c.7-1.7 1.7-3 3-4 1.4-.9 3-1.4 4.9-1.4zm3.2 16.5c0-5.1 1.5-9.2 4.3-12.2 2.9-3 6.9-4.5 12-4.5 4.8 0 8.6 1.4 11.3 4.3s4.1 6.8 4.1 11.7c0 5-1.5 9-4.3 12-2.9 3-6.8 4.5-11.8 4.5-4.8 0-8.6-1.4-11.4-4.2-2.8-2.9-4.2-6.8-4.2-11.6zm7.6-.3c0 3.2.7 5.7 2.2 7.4s3.6 2.6 6.3 2.6c2.6 0 4.7-.8 6.1-2.6 1.4-1.7 2.1-4.2 2.1-7.6 0-3.3-.7-5.8-2.1-7.6-1.4-1.7-3.5-2.6-6-2.6-2.7 0-4.7.9-6.2 2.7-1.7 1.9-2.4 4.4-2.4 7.7zm35-7.5c0 1 .3 1.9 1 2.5.7.6 2.1 1.3 4.4 2.2 2.9 1.2 5 2.5 6.1 3.9 1.2 1.5 1.8 3.2 1.8 5.3 0 2.9-1.1 5.2-3.4 7-2.2 1.8-5.3 2.6-9.1 2.6-1.3 0-2.7-.2-4.3-.5-1.6-.3-2.9-.7-4-1.2v-7.2c1.3.9 2.8 1.7 4.3 2.2 1.5.5 2.9.8 4.2.8 1.6 0 2.9-.2 3.6-.7.8-.5 1.2-1.2 1.2-2.3 0-1-.4-1.8-1.2-2.6-.8-.7-2.4-1.5-4.6-2.4-2.7-1.1-4.6-2.4-5.7-3.8s-1.7-3.2-1.7-5.4c0-2.8 1.1-5.1 3.3-6.9 2.2-1.8 5.1-2.7 8.6-2.7 1.1 0 2.3.1 3.6.4s2.5.6 3.4.9V34c-1-.6-2.1-1.2-3.4-1.7-1.3-.5-2.6-.7-3.8-.7-1.4 0-2.5.3-3.2.8-.7.7-1.1 1.4-1.1 2.4zm16.4 7.8c0-5.1 1.5-9.2 4.3-12.2 2.9-3 6.9-4.5 12-4.5 4.8 0 8.6 1.4 11.3 4.3s4.1 6.8 4.1 11.7c0 5-1.5 9-4.3 12-2.9 3-6.8 4.5-11.8 4.5-4.8 0-8.6-1.4-11.4-4.2-2.7-2.9-4.2-6.8-4.2-11.6zm7.6-.3c0 3.2.7 5.7 2.2 7.4s3.6 2.6 6.3 2.6c2.6 0 4.7-.8 6.1-2.6 1.4-1.7 2.1-4.2 2.1-7.6 0-3.3-.7-5.8-2.1-7.6-1.4-1.7-3.5-2.6-6-2.6-2.7 0-4.7.9-6.2 2.7-1.6 1.9-2.4 4.4-2.4 7.7zm48.4-9.7H312v25h-7.4v-25h-5.2v-6h5.2v-4.3c0-3.2 1.1-5.9 3.2-8s4.8-3.1 8.1-3.1c.9 0 1.7.1 2.4.1s1.3.2 1.8.4V18c-.2-.1-.7-.3-1.3-.5-.6-.2-1.3-.3-2.1-.3-1.5 0-2.7.5-3.5 1.4-.8.9-1.2 2.4-1.2 4.2v3.7h10.9v-7l7.3-2.2v9.2h7.4v6h-7.4V47c0 1.9.4 3.2 1 4 .7.8 1.8 1.2 3.3 1.2.4 0 .9-.1 1.5-.3.6-.2 1.1-.4 1.5-.7v6c-.5.3-1.2.5-2.3.7-1.1.2-2.1.3-3.2.3-3.1 0-5.4-.8-6.9-2.4-1.5-1.6-2.3-4.1-2.3-7.4l.1-15.8z"
      />
      <path fill="#F25022" d="M0 0h34.2v34.2H0z" />
      <path fill="#7FBA00" d="M37.8 0H72v34.2H37.8z" />
      <path fill="#00A4EF" d="M0 37.8h34.2V72H0z" />
      <path fill="#FFB900" d="M37.8 37.8H72V72H37.8z" />
    </svg>
    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 291 79.46" width="291" height="79.46">
      <title>LinkedIn</title>
      <path
        d="M239.33 95.036c0 2.96 2.46 5.361 5.495 5.361h63.376c3.035 0 5.496-2.401 5.496-5.361V30.919c0-2.961-2.46-5.361-5.496-5.361h-63.376c-3.035 0-5.495 2.4-5.495 5.361v64.117z"
        style={{
          fill: 'inherit',
          fillOpacity: 1,
          fillRule: 'nonzero',
          stroke: 'none',
        }}
        transform="matrix(1.01883 0 0 -1.01883 -29.952 104.07)"
      />
      <path
        d="M31.152 37.709h31.035v10.189H42.383v38.874H31.152V37.709zM77.9 37.709v33.793H66.668V37.709H77.9zm-5.616 38.407c3.917 0 6.355 2.595 6.355 5.84-.073 3.315-2.438 5.837-6.28 5.837-3.843 0-6.355-2.522-6.355-5.837 0-3.245 2.437-5.84 6.207-5.84h.073zM83.115 37.709h11.233v18.872c0 1.01.073 2.019.37 2.741.811 2.017 2.66 4.107 5.763 4.107 4.065 0 5.69-3.1 5.69-7.64v-18.08h11.232v19.377c0 10.38-5.542 15.21-12.932 15.21-6.06 0-8.72-3.387-10.198-5.694h.075v4.9H83.116c.147-3.171 0-33.793 0-33.793zM133.249 86.772h-11.233V37.709h11.233v10.956l2.807 3.534 8.794-14.49h13.818l-14.779 20.977 12.932 14.272h-13.522s-9.237-12.769-10.05-14.283v28.097z"
        style={{
          fill: 'inherit',
          fillOpacity: 1,
          fillRule: 'evenodd',
          stroke: 'none',
        }}
        transform="matrix(1.01883 0 0 -1.01883 -29.952 104.07)"
      />
      <path
        d="M188.706 51.805c.148.868.37 2.533.37 4.415 0 8.736-4.435 17.604-16.11 17.604-12.488 0-18.252-9.877-18.252-18.835 0-11.08 7.02-18 19.287-18 4.877 0 9.384.72 13.08 2.234l-1.48 7.418c-3.029-1.005-6.132-1.507-9.974-1.507-5.247 0-9.828 2.153-10.198 6.743l23.277-.07zm-23.35 7.599c.295 2.884 2.216 7.138 7.02 7.138 5.097 0 6.28-4.543 6.28-7.138h-13.3zM216.801 86.772V69.788h-.147c-1.627 2.377-5.026 3.963-9.533 3.963-8.646 0-16.257-6.92-16.184-18.741 0-10.958 6.873-18.094 15.444-18.094 4.656 0 9.09 2.019 11.306 5.912h.222l.444-5.119h9.976c-.148 2.379-.297 6.488-.297 10.524v38.539h-11.231zm0-33.421c0-.864-.074-1.73-.222-2.45-.664-3.1-3.325-5.262-6.576-5.262-4.656 0-7.685 3.748-7.685 9.659 0 5.55 2.586 10.019 7.758 10.019 3.473 0 5.912-2.378 6.578-5.333.147-.65.147-1.371.147-2.019v-4.614z"
        style={{
          fill: 'inherit',
          fillOpacity: 1,
          fillRule: 'evenodd',
          stroke: 'none',
        }}
        transform="matrix(1.01883 0 0 -1.01883 -29.952 104.07)"
      />
      <path
        d="M261.873 37.749v33.794H250.64V37.749h11.233zm-5.617 38.408c3.917 0 6.355 2.595 6.355 5.838-.073 3.316-2.438 5.839-6.28 5.839-3.843 0-6.355-2.523-6.355-5.839 0-3.243 2.438-5.838 6.207-5.838h.073zM268.088 37.749h11.232v18.872c0 1.01.073 2.019.37 2.741.812 2.018 2.66 4.108 5.763 4.108 4.065 0 5.69-3.099 5.69-7.642V37.749h11.232v19.377c0 10.38-5.541 15.21-12.931 15.21-6.06 0-8.72-3.387-10.198-5.694h.075v4.901h-11.233c.148-3.171 0-33.794 0-33.794z"
        style={{
          fill: 'var(--brand-color-canvas-default)',
          fillOpacity: 1,
          fillRule: 'evenodd',
          stroke: 'none',
        }}
        transform="matrix(1.01883 0 0 -1.01883 -29.952 104.07)"
      />
    </svg>
  </>
)

export function FeaturePreviewLevelTwo({
  accentColor,
  variant,
  gridOverlay = false,
  colorMode,
  ...args
}: FeaturePreviewLevelTwoProps) {
  const [enableGridOverlay, setGridOverlay] = React.useState(gridOverlay)
  const [isLightMode, setIsLightMode] = React.useState(colorMode === ColorModesEnum.LIGHT)
  const selectedColorMode = isLightMode ? ColorModesEnum.LIGHT : ColorModesEnum.DARK
  const accentColorValue = themeDetailsMap[accentColor][selectedColorMode].color

  useEffect(() => {
    setGridOverlay(gridOverlay)
  }, [gridOverlay])

  useEffect(() => {
    setIsLightMode(colorMode === ColorModesEnum.LIGHT)
  }, [colorMode])

  const handleMode = e => {
    e.preventDefault()
    setIsLightMode(!isLightMode)
  }

  const renderPiller = () => (
    <Pillar>
      <Pillar.Icon icon={<ZapIcon />} />
      <Pillar.Heading>Here is a core value proposition of this new feature on one or two lines</Pillar.Heading>
      <Pillar.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id aliquam luctus sed turpis.
      </Pillar.Description>
    </Pillar>
  )

  const renderTestimonial = (num: FeaturePreviewLevelTwoProps['testimonialQuantity']) => {
    return (
      <Testimonial size={num === 1 ? 'large' : 'small'} quoteMarkColor="default">
        <Testimonial.Quote>
          <em>We&apos;ve used GitHub from the inception of Datadog. It&apos;s a high-quality product,</em> and a lot of
          our engineers contribute to open source so there&apos;s a sense of community there. GitHub is ingrained in the
          DNA of our engineering, it&apos;s become part of the culture.”
        </Testimonial.Quote>
        <Testimonial.Name position="Staff Software Engineer">David Ross</Testimonial.Name>
        <Testimonial.Avatar src={monaAvatar} alt="circular avatar for mona, GitHub's mascot" />
      </Testimonial>
    )
  }

  return (
    <ThemeProvider
      colorMode={selectedColorMode}
      style={{
        ['--brand-Testimonial-quoteMarkColor-default' as string]: accentColorValue,
        ['--brand-Pillar-icon-color-default' as string]: accentColorValue,
        ['--brand-Label-color-default' as string]: accentColorValue,
        ['--brand-color-accent-primary' as string]: accentColorValue,
        backgroundColor: 'var(--brand-color-canvas-default)',
      }}
    >
      <SubdomainNavBar title="" fixed={false} fullWidth>
        <SubdomainNavBar.SecondaryAction
          aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
          href="#"
          onClick={handleMode}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          variant="invisible"
        >
          {isLightMode ? <MoonIcon size={24} /> : <SunIcon size={24} />}
        </SubdomainNavBar.SecondaryAction>
      </SubdomainNavBar>
      {args.subNavVisible && (
        <SubNav>
          <SubNav.Heading href="#">Heading</SubNav.Heading>
          <SubNav.Link href="#">Link</SubNav.Link>
          <SubNav.Link href="#">Link</SubNav.Link>
          <SubNav.Link href="#">Link</SubNav.Link>
          <SubNav.Link href="#" aria-current="page">
            Link
            <SubNav.SubMenu>
              <SubNav.Link href="#">Link feature one</SubNav.Link>
              <SubNav.Link href="#">Link feature two</SubNav.Link>
              <SubNav.Link href="#">Link feature three</SubNav.Link>
              <SubNav.Link href="#">Link feature four</SubNav.Link>
            </SubNav.SubMenu>
          </SubNav.Link>
          <SubNav.Link href="#">Link</SubNav.Link>
          <SubNav.Link href="#">Link</SubNav.Link>
          <SubNav.Action href="#" variant="secondary">
            Optional CTA
          </SubNav.Action>
        </SubNav>
      )}
      <div className={styles.FeaturePreview}>
        <Box
          backgroundColor={args.heroBg ? 'subtle' : 'default'}
          className={args.heroBg ? styles['FeaturePreview__heroBg'] : ''}
          paddingBlockStart={28}
          paddingBlockEnd={args.heroBg ? 24 : 'none'}
          marginBlockEnd={args.heroBg ? 96 : 'none'}
        >
          <Grid enableOverlay={enableGridOverlay}>
            <Grid.Column>
              <Box paddingBlockEnd={{wide: 8}}>
                <Hero
                  align={args.heroAlign}
                  className={styles.Hero}
                  imageContainerClassName={styles.FeaturePreview__heroImageContainer}
                  imageContainerStyle={{
                    backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                  }}
                >
                  {args.heroLabel && <Hero.Label>{args.heroLabel}</Hero.Label>}
                  {args.heroTitle && <Hero.Heading>{args.heroTitle}</Hero.Heading>}
                  {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
                  {args.heroCtaTextPrimary && (
                    <Hero.PrimaryAction href="#">{args.heroCtaTextPrimary}</Hero.PrimaryAction>
                  )}
                  {args.heroCtaTextSecondary && (
                    <Hero.SecondaryAction href="#">{args.heroCtaTextSecondary}</Hero.SecondaryAction>
                  )}
                  {args.showHeroVisual && (
                    <Hero.Image
                      src={isLightMode ? emptyBrowser : emptyBrowserDark}
                      alt="placeholder, blank area with an off-white background color"
                    />
                  )}
                </Hero>
                {args.heroLogoBarVisible && (
                  <Box paddingBlockEnd="spacious">
                    <LogoSuite hasDivider={false}>
                      <LogoSuite.Heading visuallyHidden>Featured sponsors</LogoSuite.Heading>
                      <LogoSuite.Logobar marquee>
                        <Logos />
                      </LogoSuite.Logobar>
                    </LogoSuite>
                  </Box>
                )}
              </Box>
            </Grid.Column>
          </Grid>
        </Box>
        <Grid enableOverlay={enableGridOverlay}>
          <Grid.Column>
            <section>
              {args.sectionIntroText && args.sectionIntroVisible && (
                <Grid enableOverlay={enableGridOverlay}>
                  <Grid.Column
                    span={{medium: args.sectionIntroAlign === 'center' ? 8 : 9}}
                    start={{medium: args.sectionIntroAlign === 'center' ? 3 : 1}}
                  >
                    <Box marginBlockEnd={40}>
                      <SectionIntro fullWidth align={args.sectionIntroAlign}>
                        <SectionIntro.Heading>{args.sectionIntroText}</SectionIntro.Heading>
                      </SectionIntro>
                    </Box>
                  </Grid.Column>
                </Grid>
              )}
              {args.pillarVisibile && (
                <Box
                  marginBlockEnd={{
                    narrow: 16,
                    regular: 16,
                    wide: 48,
                  }}
                >
                  <Grid enableOverlay={enableGridOverlay}>
                    <Grid.Column span={{medium: 4}}>
                      {args.pillarBackground ? (
                        <Box
                          paddingInlineStart={32}
                          paddingInlineEnd={32}
                          paddingBlockStart={32}
                          paddingBlockEnd={8}
                          backgroundColor="subtle"
                          borderRadius="large"
                        >
                          {renderPiller()}
                        </Box>
                      ) : (
                        renderPiller()
                      )}
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      {args.pillarBackground ? (
                        <Box
                          paddingInlineStart={32}
                          paddingInlineEnd={32}
                          paddingBlockStart={32}
                          paddingBlockEnd={8}
                          backgroundColor="subtle"
                          borderRadius="large"
                        >
                          {renderPiller()}
                        </Box>
                      ) : (
                        renderPiller()
                      )}
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      {args.pillarBackground ? (
                        <Box
                          paddingInlineStart={32}
                          paddingInlineEnd={32}
                          paddingBlockStart={32}
                          paddingBlockEnd={8}
                          backgroundColor="subtle"
                          borderRadius="large"
                        >
                          {renderPiller()}
                        </Box>
                      ) : (
                        renderPiller()
                      )}
                    </Grid.Column>
                  </Grid>
                </Box>
              )}
            </section>
            <Box paddingBlockStart={48} paddingBlockEnd={80}>
              {args.riverOneVisible && (
                <>
                  {args.riverOneType === 'breakout' ? (
                    <RiverBreakout>
                      <RiverBreakout.A11yHeading as={args.sectionIntroVisible ? 'h3' : 'h2'}>
                        {args.riverOneTitle}
                      </RiverBreakout.A11yHeading>
                      <RiverBreakout.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </RiverBreakout.Visual>
                      <RiverBreakout.Content
                        trailingComponent={() => (
                          <Box>
                            <Timeline fullWidth>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                            </Timeline>
                          </Box>
                        )}
                      >
                        <Text>{args.riverOneDescription}</Text>
                        <Link href="#">{args.riverOneCtaText}</Link>
                      </RiverBreakout.Content>
                    </RiverBreakout>
                  ) : (
                    <River align={args.riverOneType}>
                      <River.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.riverVisualBgs[0]})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </River.Visual>
                      <River.Content className={clsx(args.riverOneType === 'end' && styles.RiverContent)}>
                        <Heading as={args.sectionIntroVisible ? 'h3' : 'h2'}>{args.riverOneTitle}</Heading>
                        <Text>{args.riverOneDescription}</Text>
                        <Link href="#">{args.riverOneCtaText}</Link>
                      </River.Content>
                    </River>
                  )}
                </>
              )}

              {args.riverTwoVisible && (
                <>
                  {args.riverTwoType === 'breakout' ? (
                    <RiverBreakout id="breakout-with-ide">
                      <RiverBreakout.A11yHeading as={args.sectionIntroVisible ? 'h3' : 'h2'}>
                        {args.riverTwoTitle}
                      </RiverBreakout.A11yHeading>
                      <RiverBreakout.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                        }}
                      >
                        <Box padding={48} paddingBlockEnd={4}>
                          <IDE
                            height={600}
                            variant="glass"
                            alternativeText="A code editor showing animated JavaScript appearing line-by-line, ending in a Copilot autosuggest"
                          >
                            <IDE.Editor files={files} />
                          </IDE>
                        </Box>
                      </RiverBreakout.Visual>
                      <RiverBreakout.Content
                        trailingComponent={() => (
                          <Box>
                            <Timeline fullWidth>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                            </Timeline>
                          </Box>
                        )}
                      >
                        <Text>{args.riverTwoDescription}</Text>
                        <Link href="#">{args.riverTwoCtaText}</Link>
                      </RiverBreakout.Content>
                    </RiverBreakout>
                  ) : (
                    <River align={args.riverTwoType}>
                      <River.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.riverVisualBgs[0]})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </River.Visual>
                      <River.Content className={clsx(args.riverTwoType === 'end' && styles.RiverContent)}>
                        <Heading as={args.sectionIntroVisible ? 'h3' : 'h2'}>{args.riverTwoTitle}</Heading>
                        <Text>{args.riverTwoDescription}</Text>
                        <Link href="#">{args.riverTwoCtaText}</Link>
                      </River.Content>
                    </River>
                  )}
                </>
              )}
              {args.riverThreeVisible && (
                <>
                  {args.riverThreeType === 'breakout' ? (
                    <RiverBreakout>
                      <RiverBreakout.A11yHeading as={args.sectionIntroVisible ? 'h3' : 'h2'}>
                        {args.riverThreeTitle}
                      </RiverBreakout.A11yHeading>
                      <RiverBreakout.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </RiverBreakout.Visual>
                      <RiverBreakout.Content
                        trailingComponent={() => (
                          <Box>
                            <Timeline fullWidth>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                            </Timeline>
                          </Box>
                        )}
                      >
                        <Text>{args.riverThreeDescription}</Text>
                        <Link href="#">{args.riverThreeCtaText}</Link>
                      </RiverBreakout.Content>
                    </RiverBreakout>
                  ) : (
                    <River align={args.riverThreeType}>
                      <River.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.riverVisualBgs[0]})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </River.Visual>
                      <River.Content className={clsx(args.riverThreeType === 'end' && styles.RiverContent)}>
                        <Heading as={args.sectionIntroVisible ? 'h3' : 'h2'}>{args.riverThreeTitle}</Heading>
                        <Text>{args.riverThreeDescription}</Text>
                        <Link href="#">{args.riverThreeCtaText}</Link>
                      </River.Content>
                    </River>
                  )}
                </>
              )}
            </Box>
          </Grid.Column>
        </Grid>
        <Box
          backgroundColor="subtle"
          paddingBlockStart={128}
          paddingBlockEnd={128}
          className={styles['FeaturePreview__trailingSection']}
        >
          <Grid enableOverlay={enableGridOverlay}>
            {args.testimonialVisible && (
              <>
                {args.testimonialQuantity === 1 ? (
                  <Grid.Column start={{medium: 2}} span={{medium: 10}}>
                    <Box marginBlockEnd={112}>{renderTestimonial(args.testimonialQuantity)}</Box>
                  </Grid.Column>
                ) : (
                  <>
                    <Grid.Column span={6}>
                      <Box marginBlockEnd={112}>{renderTestimonial(args.testimonialQuantity)}</Box>
                    </Grid.Column>
                    <Grid.Column span={6}>
                      <Box marginBlockEnd={112}>{renderTestimonial(args.testimonialQuantity)}</Box>
                    </Grid.Column>
                  </>
                )}
              </>
            )}
            {args.logoSuiteVisible && (
              <Grid.Column>
                <Box marginBlockEnd={128}>
                  <LogoSuite>
                    <LogoSuite.Heading>Build with us</LogoSuite.Heading>
                    <LogoSuite.Description>
                      We&apos;re trusted by the world&apos;s leading organizations
                    </LogoSuite.Description>
                    <LogoSuite.Logobar variant="emphasis">
                      <Logos />
                    </LogoSuite.Logobar>
                  </LogoSuite>
                  <LogoSuite>
                    <LogoSuite.Heading visuallyHidden>Other partners</LogoSuite.Heading>
                    <LogoSuite.Logobar marquee marqueeSpeed="slow">
                      <Logos />
                      <Logos />
                    </LogoSuite.Logobar>
                  </LogoSuite>
                </Box>
              </Grid.Column>
            )}

            <Grid.Column>
              {args.ctaBannerVisible && (
                <Grid.Column>
                  <Box>
                    <CTABanner
                      className={styles.FeaturePreview__ctaBanner}
                      align="center"
                      hasShadow={false}
                      hasBackground={args.ctaBannerShowBg ? false : true}
                      style={
                        args.ctaBannerShowBg
                          ? {
                              backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.ctaBannerBg})`,
                            }
                          : {}
                      }
                    >
                      <CTABanner.Heading>Get it, it&apos;s super nice</CTABanner.Heading>
                      <CTABanner.Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar.
                      </CTABanner.Description>
                      <CTABanner.ButtonGroup>
                        <Button>Primary Action</Button>
                        <Button>Secondary Action</Button>
                      </CTABanner.ButtonGroup>
                    </CTABanner>
                  </Box>
                </Grid.Column>
              )}
              {args.cardsVisible && (
                <Box marginBlockStart={args.ctaBannerVisible ? 128 : undefined}>
                  <Stack direction="vertical" padding="none" gap={64} alignItems="center">
                    <Heading as="h3" size="3">
                      Go further with these
                    </Heading>
                    <Grid>
                      <Grid.Column span={{medium: 4}}>
                        <Card href="#">
                          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                          <Card.Description>
                            Everything you need to know about getting started with GitHub Actions.
                          </Card.Description>
                        </Card>
                      </Grid.Column>
                      <Grid.Column span={{medium: 4}}>
                        <Card href="#">
                          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                          <Card.Description>
                            Everything you need to know about getting started with GitHub Actions.
                          </Card.Description>
                        </Card>
                      </Grid.Column>
                      <Grid.Column span={{medium: 4}}>
                        <Card href="#">
                          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                          <Card.Description>
                            Everything you need to know about getting started with GitHub Actions.
                          </Card.Description>
                        </Card>
                      </Grid.Column>
                    </Grid>
                  </Stack>
                </Box>
              )}
              {args.faqVisible && (
                <Box marginBlockStart={args.cardsVisible || args.ctaBannerVisible ? 128 : undefined}>
                  {args.faqType === 'single' ? (
                    <FAQ>
                      <FAQ.Heading>Frequently asked questions</FAQ.Heading>
                      <FAQ.Item>
                        <FAQ.Question>What is this feature?</FAQ.Question>
                        <FAQ.Answer>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                            Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                          </p>
                        </FAQ.Answer>
                      </FAQ.Item>
                      <FAQ.Item>
                        <FAQ.Question>When is it release planned?</FAQ.Question>
                        <FAQ.Answer>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                            Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                          </p>
                        </FAQ.Answer>
                      </FAQ.Item>
                      <FAQ.Item>
                        <FAQ.Question>Where is it available?</FAQ.Question>
                        <FAQ.Answer>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                            Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                          </p>
                        </FAQ.Answer>
                      </FAQ.Item>
                      <FAQ.Item>
                        <FAQ.Question>Who is it for?</FAQ.Question>
                        <FAQ.Answer>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                            Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                          </p>
                        </FAQ.Answer>
                      </FAQ.Item>
                      <FAQ.Item>
                        <FAQ.Question>What can I expect?</FAQ.Question>
                        <FAQ.Answer>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                            Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                          </p>
                        </FAQ.Answer>
                      </FAQ.Item>
                      <FAQ.Item>
                        <FAQ.Question>What&apos;s the difference between this & that?</FAQ.Question>
                        <FAQ.Answer>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                            Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                          </p>
                        </FAQ.Answer>
                      </FAQ.Item>
                      <FAQ.Item>
                        <FAQ.Question>Is this free?</FAQ.Question>
                        <FAQ.Answer>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                            Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                          </p>
                        </FAQ.Answer>
                      </FAQ.Item>
                      <FAQ.Item>
                        <FAQ.Question>Is this release invite-only?</FAQ.Question>
                        <FAQ.Answer>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                            Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                          </p>
                        </FAQ.Answer>
                      </FAQ.Item>
                    </FAQ>
                  ) : (
                    <FAQGroup>
                      <FAQGroup.Heading>
                        Frequently asked
                        <br />
                        questions
                      </FAQGroup.Heading>
                      <FAQ>
                        <FAQ.Heading>Using GitHub Enterprise</FAQ.Heading>
                        <FAQ.Item>
                          <FAQ.Question>What is GitHub Enterprise?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                        <FAQ.Item>
                          <FAQ.Question>How can GitHub Enterprise be deployed?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                        <FAQ.Item>
                          <FAQ.Question>What is GitHub Enterprise Cloud?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                      </FAQ>

                      <FAQ>
                        <FAQ.Heading>About GitHub Enterprise</FAQ.Heading>
                        <FAQ.Item>
                          <FAQ.Question>What is the difference between GitHub and GitHub Enterprise?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                        <FAQ.Item>
                          <FAQ.Question>Why should organizations use GitHub Enterprise?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                        <FAQ.Item>
                          <FAQ.Question>Who uses GitHub Enterprise?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                      </FAQ>
                    </FAQGroup>
                  )}
                </Box>
              )}
            </Grid.Column>
          </Grid>
        </Box>
      </div>
      <MinimalFooter>
        <MinimalFooter.Link href="https://github.com/organizations/enterprise_plan">
          Try GitHub for free
        </MinimalFooter.Link>
        <MinimalFooter.Link href="https://github.com/enterprise">Enterprise</MinimalFooter.Link>
        <MinimalFooter.Link href="https://github.com/enterprise/contact">Email us</MinimalFooter.Link>
      </MinimalFooter>
      {enableGridOverlay && (
        <Grid
          enableOverlay={enableGridOverlay}
          style={{
            zIndex: 1,
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, 0)',
            maxWidth: '1280px',
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
        </Grid>
      )}
    </ThemeProvider>
  )
}

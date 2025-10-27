import React, {useCallback, useEffect} from 'react'
import {MoonIcon, SunIcon} from '@primer/octicons-react'
import {
  AnimationProvider,
  Box,
  Button,
  Card,
  CTABanner,
  FAQ,
  FAQGroup,
  Grid,
  Heading,
  Image,
  Link,
  MinimalFooter,
  Prose,
  Section,
  SectionIntro,
  Stack,
  SubdomainNavBar,
  Text,
  TextRevealAnimation,
} from '../../../'

import {ColorModesEnum, ThemeProvider} from '../../../ThemeProvider'
import heroImageDark from '../../../fixtures/images/background-dark-collaboration.webp'
import heroImageLight from '../../../fixtures/images/background-light-collaboration.webp'

import {themeDetailsMap, Themes} from '../helpers'
import styles from './Article.module.css'
import {ArticleToC} from './ArticleToC'
import {contentMap} from './article-shared'

type ArticleProps = {
  heroTitle?: string
  lede?: string
  content: 'real-world' | 'system'
  gridOverlay?: boolean
  colorMode?: ColorModesEnum
  accentColor: Themes
  isLightHero?: boolean
}

export function Article({
  heroTitle,
  lede,
  content = 'real-world',
  gridOverlay = false,
  colorMode = ColorModesEnum.LIGHT,
  isLightHero = false,
  accentColor,
  ...args
}: ArticleProps) {
  const [enableGridOverlay, setGridOverlay] = React.useState(gridOverlay)
  const [isLightMode, setIsLightMode] = React.useState(colorMode === ColorModesEnum.LIGHT)
  const selectedColorMode = isLightMode ? ColorModesEnum.LIGHT : ColorModesEnum.DARK
  const pillarColors = themeDetailsMap[accentColor][selectedColorMode]

  const selectedContent = contentMap[content]

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'G') {
        setGridOverlay(!enableGridOverlay)
      }
    },
    [enableGridOverlay],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [enableGridOverlay, handleKeyPress])
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

  const brandAccentStyles: Record<string, string> = {
    '--brand-color-accent-primary': pillarColors.accent1,
    '--brand-color-accent-secondary': pillarColors.accent2,
  }

  const themeProviderStyles: Record<string, string> = {
    ...brandAccentStyles,
    '--brand-SubdomainNavBar-canvas-default': 'var(--brand-color-canvas-default)',
    backgroundColor: 'var(--brand-color-canvas-default)',
  }

  return (
    <ThemeProvider colorMode={selectedColorMode} style={themeProviderStyles} {...args}>
      <SubdomainNavBar title="" fixed={false}>
        <SubdomainNavBar.SecondaryAction
          aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
          href="#"
          onClick={handleMode}
          // @ts-ignore
          variant="invisible"
        >
          {isLightMode ? <MoonIcon size={24} /> : <SunIcon size={24} />}
        </SubdomainNavBar.SecondaryAction>
      </SubdomainNavBar>
      <main className={isLightHero ? styles.lightHero : styles.darkHero}>
        <section itemScope itemType="https://schema.org/Article">
          <AnimationProvider runOnce visibilityOptions={0.3}>
            <ThemeProvider colorMode={isLightHero ? 'light' : 'dark'} style={{...brandAccentStyles}}>
              <header className={styles.hero}>
                <div className={styles.parallax}>
                  <div className={styles.background}>
                    <Image
                      className={styles.heroImage}
                      animate="fade-in"
                      alt="placeholder image"
                      src={isLightHero ? heroImageLight : heroImageDark}
                    />
                    <div className={styles.heroImageOverlay}></div>
                  </div>
                  <Grid enableOverlay={enableGridOverlay} className={styles.foreground}>
                    <Grid.Column span={10} start={1}>
                      <Stack
                        className={styles.foregroundContents}
                        direction="vertical"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Link href="#" arrowDirection="start">
                          DevOps
                        </Link>
                        {heroTitle && (
                          <Box animate="fade-in" marginBlockEnd={64}>
                            <Heading as="h1" size="1" stretch="condensed" weight="semibold" font="hubot-sans">
                              <TextRevealAnimation itemProp="name">{heroTitle}</TextRevealAnimation>
                            </Heading>
                          </Box>
                        )}
                      </Stack>
                    </Grid.Column>
                  </Grid>
                </div>
              </header>
            </ThemeProvider>

            <Section
              as="div"
              backgroundColor="default"
              paddingBlockStart="none"
              paddingBlockEnd="none"
              className={styles.articleContents}
              rounded
            >
              <Grid enableOverlay={enableGridOverlay}>
                <Grid.Column span={12}>
                  <article itemProp="articleBody">
                    <Box marginBlockStart={80} marginBlockEnd={{narrow: 48}} paddingBlockEnd={{narrow: 48}}>
                      <Grid enableOverlay={enableGridOverlay}>
                        <Grid.Column
                          span={{xsmall: 12, large: 4}}
                          start={{xsmall: 1, large: 10}}
                          className={styles.asideCol}
                        >
                          <aside className={styles.aside}>
                            <ArticleToC content={content} />
                          </aside>
                        </Grid.Column>
                        <Grid.Column span={{xsmall: 12, large: 9}} className={styles.articleCol}>
                          {lede && (
                            <Grid enableOverlay={enableGridOverlay}>
                              <Grid.Column span={{xsmall: 12, large: 11}}>
                                <Box animate="fade-in" marginBlockEnd={{narrow: 24, wide: 48}}>
                                  <header itemProp="abstract">
                                    <Text as="p" className={styles.lede} size="500" font="hubot-sans" weight="medium">
                                      {lede}
                                    </Text>
                                  </header>
                                </Box>
                              </Grid.Column>
                            </Grid>
                          )}
                          <Box>
                            <AnimationProvider runOnce>
                              <Prose variant="editorial" html={selectedContent[0]} />
                            </AnimationProvider>
                          </Box>
                        </Grid.Column>
                      </Grid>
                      <Grid>
                        <Grid.Column span={12}>
                          <Box marginBlockStart={{narrow: 64, wide: 112}}>
                            <Section paddingBlockStart="none">
                              <CTABanner align="center" hasShadow={false} hasBorder>
                                <CTABanner.Heading>Check it out</CTABanner.Heading>
                                <CTABanner.Description>
                                  AI code generation uses machine learning models to write code from input that
                                  describes what the code should do, and the models provide context-based code
                                  suggestions along the way. AI generated code isn&apos;t always perfect, but it often
                                  gives developers a suitable starting point for writing code quickly and efficiently.
                                </CTABanner.Description>
                                <CTABanner.ButtonGroup>
                                  <Button>Contact sales</Button>
                                  <Button>Sign up</Button>
                                </CTABanner.ButtonGroup>
                              </CTABanner>
                              <Section>
                                <Stack direction="vertical" gap={64} padding="none">
                                  <SectionIntro align="center">
                                    <SectionIntro.Heading as="h2">More AI resources</SectionIntro.Heading>
                                  </SectionIntro>

                                  <Grid enableOverlay={enableGridOverlay}>
                                    <Grid.Column
                                      span={{
                                        xsmall: 12,
                                        medium: 6,
                                        large: 4,
                                      }}
                                    >
                                      <Box animate="scale-in-up">
                                        <Card href="https://github.com" hasBorder>
                                          <Card.Label>Limited</Card.Label>
                                          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                                          <Card.Description>
                                            Everything you need to know about getting started with GitHub Actions.
                                          </Card.Description>
                                        </Card>
                                      </Box>
                                    </Grid.Column>
                                    <Grid.Column
                                      span={{
                                        xsmall: 12,
                                        medium: 6,
                                        large: 4,
                                      }}
                                    >
                                      <Box animate="scale-in-up">
                                        <Card href="https://github.com" hasBorder>
                                          <Card.Label>Limited</Card.Label>
                                          <Card.Heading>GitHub Actions cheat sheet and more</Card.Heading>
                                          <Card.Description>
                                            In a recent study, 70% of organizations reported they had adopted DevOps.
                                          </Card.Description>
                                        </Card>
                                      </Box>
                                    </Grid.Column>
                                    <Grid.Column
                                      span={{
                                        xsmall: 12,
                                        medium: 6,
                                        large: 4,
                                      }}
                                    >
                                      <Box animate="scale-in-up">
                                        <Card href="https://github.com" hasBorder>
                                          <Card.Label>Limited</Card.Label>
                                          <Card.Heading>GitHub Actions cheat sheet and more</Card.Heading>
                                          <Card.Description>
                                            In a recent study, 70% of organizations reported they had adopted DevOps.
                                          </Card.Description>
                                        </Card>
                                      </Box>
                                    </Grid.Column>
                                  </Grid>
                                </Stack>
                              </Section>
                              <Section paddingBlockEnd="none">
                                <FAQGroup>
                                  <FAQGroup.Heading>
                                    Frequently asked <br /> questions
                                  </FAQGroup.Heading>
                                  <FAQ>
                                    <FAQ.Heading>Using GitHub Enterprise</FAQ.Heading>
                                    <FAQ.Item>
                                      <FAQ.Question>What is GitHub Enterprise?</FAQ.Question>
                                      <FAQ.Answer>
                                        <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit
                                          ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                        </p>
                                      </FAQ.Answer>
                                    </FAQ.Item>
                                    <FAQ.Item>
                                      <FAQ.Question>How can GitHub Enterprise be deployed?</FAQ.Question>
                                      <FAQ.Answer>
                                        <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit
                                          ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                        </p>
                                      </FAQ.Answer>
                                    </FAQ.Item>
                                    <FAQ.Item>
                                      <FAQ.Question>What is GitHub Enterprise Cloud?</FAQ.Question>
                                      <FAQ.Answer>
                                        <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit
                                          ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                        </p>
                                      </FAQ.Answer>
                                    </FAQ.Item>
                                  </FAQ>

                                  <FAQ>
                                    <FAQ.Heading>About GitHub Enterprise</FAQ.Heading>
                                    <FAQ.Item>
                                      <FAQ.Question>
                                        What is the difference between GitHub and GitHub Enterprise?
                                      </FAQ.Question>
                                      <FAQ.Answer>
                                        <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit
                                          ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                        </p>
                                      </FAQ.Answer>
                                    </FAQ.Item>
                                    <FAQ.Item>
                                      <FAQ.Question>Why should organizations use GitHub Enterprise?</FAQ.Question>
                                      <FAQ.Answer>
                                        <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit
                                          ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                        </p>
                                      </FAQ.Answer>
                                    </FAQ.Item>
                                    <FAQ.Item>
                                      <FAQ.Question>Who uses GitHub Enterprise?</FAQ.Question>
                                      <FAQ.Answer>
                                        <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit
                                          ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                        </p>
                                      </FAQ.Answer>
                                    </FAQ.Item>
                                  </FAQ>
                                </FAQGroup>
                              </Section>
                            </Section>
                          </Box>
                        </Grid.Column>
                      </Grid>
                    </Box>
                  </article>
                </Grid.Column>
              </Grid>
            </Section>
          </AnimationProvider>
        </section>
      </main>
      <MinimalFooter />
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

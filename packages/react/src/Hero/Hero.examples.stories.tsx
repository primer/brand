import React, {useCallback, useEffect, useState, useTransition} from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderBg from '../fixtures/images/dither-bg-landscape-green.png'
import posterImage from '../fixtures/images/example-poster.png'
import defaultPlaceholderImgae from '../fixtures/images/placeholder.png'

import renderUI1 from '../fixtures/images/copilot-vscode-agent-mode-1.png'
import renderUI2 from '../fixtures/images/copilot-vscode-agent-mode-2.png'
import renderUI3 from '../fixtures/images/copilot-vscode-agent-mode-3.png'

import {Hero} from '.'
import {Box} from '../Box'
import {VideoPlayer} from '../VideoPlayer'
import {Grid} from '../Grid'
import {Card} from '../Card'

import styles from './Hero.stories.module.css'
import {Text} from '../Text'
import {InlineLink} from '../InlineLink'
import {AnimationProvider, Animate} from '../animation'
import {Stack} from '../Stack'
import {Tabs} from '../Tabs'
import {Image} from '../Image'
import {ActionMenu} from '../ActionMenu'
import {CheckIcon, CopyIcon} from '@primer/octicons-react'
import {Button} from '../Button'
import {ThemeProvider} from '../ThemeProvider'

const meta = {
  title: 'Components/Hero/Examples',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Codespaces',
  render: () => (
    <Hero align="center">
      <Hero.Label>Codespaces</Hero.Label>
      <Hero.Heading>
        <>
          Blazing fast cloud
          <br />
          developer environments
        </>
      </Hero.Heading>
      <Hero.Description>Visual Studio Code backed by high performance VMs that start in seconds.</Hero.Description>
      <Hero.PrimaryAction href="#">Get started</Hero.PrimaryAction>
    </Hero>
  ),
}

export const CustomBackgroundBlockEndImage: Story = {
  name: 'Custom background (block-end image)',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Box paddingBlockEnd={24}>
        <Hero variant="gridline" align="center" imageContainerRef={imageRef} enableAnimation>
          <Hero.Label>Label</Hero.Label>
          <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>

          <Hero.Image src={renderUI3} alt="" enableBorder={false} />
        </Hero>
      </Box>
    )
  },
}

export const CustomBackgroundInlineEndPaddedImage: Story = {
  name: 'Custom background (inline-end-padded image)',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Hero variant="gridline" align="center" imageContainerRef={imageRef} enableAnimation>
        <Hero.Label>Label</Hero.Label>
        <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
        <Hero.Image position="inline-end-padded" src={renderUI3} alt="" enableBorder={false} />
      </Hero>
    )
  },
}

export const CustomBackgroundBlockEndVideo: Story = {
  name: 'Custom background (block-end video)',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Box paddingBlockEnd={24}>
        <Hero variant="gridline" align="center" imageContainerRef={imageRef} enableAnimation>
          <Hero.Label>Label</Hero.Label>
          <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>

          <Hero.Video enableBorder={false}>
            <VideoPlayer title="GitHub media player" poster={posterImage}>
              <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
              <VideoPlayer.Track src="./example.vtt" default />
            </VideoPlayer>
          </Hero.Video>
        </Hero>
      </Box>
    )
  },
}

export const CustomBackgroundInlineEndPaddedVideo: Story = {
  name: 'Custom background (inline-end-padded video)',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Hero variant="gridline" align="center" imageContainerRef={imageRef} enableAnimation>
        <Hero.Label>Label</Hero.Label>
        <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
        <Hero.Video position="inline-end-padded" enableBorder={false}>
          <VideoPlayer title="GitHub media player" poster={posterImage}>
            <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
            <VideoPlayer.Track src="./example.vtt" default />
          </VideoPlayer>
        </Hero.Video>
      </Hero>
    )
  },
}

export const WithCards: Story = {
  name: 'Hero with cards',
  render: function Render() {
    return (
      <Box
        marginBlockEnd={64}
        borderBlockEndWidth="thin"
        borderStyle="solid"
        borderColor="muted"
        backgroundColor="overlay"
        style={{'--brand-Hero-bgColor-gridlineGridInner': 'var(--brand-color-canvas-default)'} as React.CSSProperties}
        className={styles.heroWithCardsExample}
      >
        <Hero align="center" variant="gridline">
          <Hero.Label>Projects</Hero.Label>
          <Hero.Heading>Project planning for developers</Hero.Heading>
          <Hero.Description>
            Create issues, break them into tasks, track relationships, add custom fields, and have conversations.
            Visualize large projects as spreadsheets or boards, and automate everything with code.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Watch video</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">Start using project tables</Hero.SecondaryAction>
        </Hero>

        <Grid style={{paddingInline: 0}}>
          <Grid.Column>
            <Box
              backgroundColor="var(--customCardsBackgroundColor)"
              borderColor="muted"
              borderStyle="solid"
              borderBlockStartWidth="thin"
              borderInlineEndWidth={{regular: 'thin'}}
              borderInlineStartWidth={{regular: 'thin'}}
            >
              <Grid
                style={{
                  ['--brand-Grid-spacing-row' as string]: '0',
                  ['--brand-Grid-spacing-column-gap' as string]: '0',
                }}
              >
                <Grid.Column span={{xsmall: 12, large: 4}}>
                  <Box padding={{narrow: 32, regular: 48}}>
                    <Card href="#" variant="minimal" fullWidth>
                      <Card.Heading as="h2">Code search & code view</Card.Heading>
                      <Card.Description>
                        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
                      </Card.Description>
                      <Card.Image
                        position="block-end"
                        src={defaultPlaceholderImgae}
                        alt="placeholder, blank area with an gray background color"
                      />
                    </Card>
                  </Box>
                </Grid.Column>

                <Grid.Column span={{xsmall: 12, large: 4}}>
                  <Box
                    padding={{narrow: 32, regular: 48}}
                    borderColor="muted"
                    borderStyle="solid"
                    borderBlockEndWidth={{narrow: 'thin', wide: 'none'}}
                    borderBlockStartWidth={{narrow: 'thin', wide: 'none'}}
                    borderInlineEndWidth={{wide: 'thin'}}
                    borderInlineStartWidth={{wide: 'thin'}}
                  >
                    <Card href="#" variant="minimal" fullWidth>
                      <Card.Image
                        position="block-end"
                        src={defaultPlaceholderImgae}
                        alt="placeholder, blank area with an gray background color"
                      />
                      <Card.Heading as="h2">Code search & code view</Card.Heading>
                      <Card.Description>
                        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
                      </Card.Description>
                    </Card>
                  </Box>
                </Grid.Column>

                <Grid.Column span={{xsmall: 12, large: 4}}>
                  <Box padding={{narrow: 32, regular: 48}}>
                    <Card href="#" variant="minimal" fullWidth>
                      <Card.Image
                        position="block-end"
                        src={defaultPlaceholderImgae}
                        alt="placeholder, blank area with an gray background color"
                      />
                      <Card.Heading as="h2">Code search & code view</Card.Heading>
                      <Card.Description>
                        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
                      </Card.Description>
                    </Card>
                  </Box>
                </Grid.Column>
              </Grid>
            </Box>
          </Grid.Column>
        </Grid>
      </Box>
    )
  },
}

export const GridlineExpressiveBlockEndPaddedTrailingComponent: Story = {
  name: 'GitHub Copilot - expressive gridline',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Hero
        imageContainerRef={imageRef}
        enableAnimation
        variant="gridline-expressive"
        trailingComponent={() => (
          <Text>
            Already have Visual Studio Code? <InlineLink href="#">Open now</InlineLink>
          </Text>
        )}
      >
        <Hero.Label>GitHub Copilot</Hero.Label>
        <Hero.Heading>Command your craft</Hero.Heading>
        <Hero.Description>Your AI accelerator for every workflow, from the editor to the enterprise.</Hero.Description>
        <Hero.PrimaryAction href="#">Try Copilot now</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">See plans & pricing</Hero.SecondaryAction>
        <Hero.Image
          enableBorder={false}
          position="block-end"
          src={renderUI3}
          alt="placeholder image, blank with gray solid fill"
        />
      </Hero>
    )
  },
}

export const GridlineExpressiveWithImageCarousel: Story = {
  name: 'Image carousel',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    const [activeTab, setActiveTab] = useState<string>('0')

    const handleTabChange = useCallback((id: string) => {
      setActiveTab(id)
    }, [])

    return (
      <Box
        marginBlockEnd={64}
        borderBlockEndWidth="thin"
        borderStyle="solid"
        borderColor="muted"
        style={{'--brand-Hero-bgColor-gridlineGridInner': 'var(--brand-color-canvas-default)'} as React.CSSProperties}
        className={styles.heroWithCardsExample}
      >
        <Hero variant="gridline-expressive" enableAnimation>
          <Hero.Label>Projects</Hero.Label>
          <Hero.Heading>Project planning for developers</Hero.Heading>
          <Hero.Description>
            Create issues, break them into tasks, track relationships, add custom fields, and have conversations.
            Visualize large projects as spreadsheets or boards, and automate everything with code.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Watch video</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">Start using project tables</Hero.SecondaryAction>
        </Hero>

        <Box borderBlockStartWidth="thin" borderStyle="solid" borderColor="muted">
          <Grid style={{paddingInline: 0}}>
            <Grid.Column>
              <Box ref={imageRef} backgroundColor="var(--customCardsBackgroundColor)" borderColor="muted">
                <AnimationProvider autoStaggerChildren={false} animationTrigger="immediate" runOnce>
                  <Stack alignItems="center" padding="none">
                    <Box
                      paddingBlockStart={{
                        narrow: 'condensed',
                        regular: 'spacious',
                      }}
                      paddingInlineEnd="condensed"
                      paddingInlineStart="condensed"
                    >
                      <Box
                        id="panel-1-a"
                        aria-labelledby="tab-1"
                        role="tabpanel"
                        tabIndex={0}
                        hidden={activeTab !== '0'}
                      >
                        <Animate animate="slide-in-up">
                          <Image
                            borderRadius="medium"
                            src={renderUI1}
                            alt="placeholder, blank area with an orange background color and a white number 1 in the center"
                          />
                        </Animate>
                      </Box>
                      <Box
                        id="panel-2-a"
                        aria-labelledby="tab-2"
                        role="tabpanel"
                        tabIndex={0}
                        hidden={activeTab !== '1'}
                      >
                        <Animate animate="slide-in-up">
                          <Image
                            borderRadius="medium"
                            src={renderUI2}
                            alt="placeholder, blank area with an orange background color and a white number 1 in the center"
                          />
                        </Animate>
                      </Box>
                      <Box
                        id="panel-3-a"
                        aria-labelledby="tab-3"
                        role="tabpanel"
                        tabIndex={0}
                        hidden={activeTab !== '2'}
                      >
                        <Animate animate="slide-in-up">
                          <Image
                            borderRadius="medium"
                            src={renderUI3}
                            alt="placeholder, blank area with an orange background color and a white number 1 in the center"
                          />
                        </Animate>
                      </Box>
                    </Box>
                  </Stack>
                </AnimationProvider>
              </Box>
              <Box
                paddingBlockStart={{
                  narrow: 'condensed',
                  regular: 32,
                }}
                paddingBlockEnd={{
                  narrow: 'condensed',
                  regular: 32,
                }}
                paddingInlineStart={{
                  narrow: 'condensed',
                  regular: 48,
                }}
                paddingInlineEnd={{
                  narrow: 'condensed',
                  regular: 48,
                }}
                borderInlineStartWidth={{wide: 'thin'}}
                borderInlineEndWidth={{wide: 'thin'}}
                borderStyle="solid"
                borderColor="muted"
              >
                <Tabs variant="default" onChange={handleTabChange} aria-label="Software development lifecycle">
                  <Tabs.Item id="tab-1" aria-controls="panel-1-a panel-1-b">
                    Code
                  </Tabs.Item>
                  <Tabs.Item id="tab-2" aria-controls="panel-2-a panel-2-b">
                    Plan
                  </Tabs.Item>
                  <Tabs.Item id="tab-3" aria-controls="panel-3-a panel-3-b">
                    Collaborate
                  </Tabs.Item>
                </Tabs>

                <AnimationProvider autoStaggerChildren={false} animationTrigger="immediate" runOnce>
                  <Box padding="condensed">
                    <Box id="panel-1-b" aria-labelledby="tab-1" role="tabpanel" tabIndex={0} hidden={activeTab !== '0'}>
                      <Animate animate="slide-in-up">
                        <Text as="p" align="center">
                          Code quickly and more securely with GitHub Copilot embedded throughout your workflows.
                        </Text>
                      </Animate>
                    </Box>
                    <Box id="panel-2-b" aria-labelledby="tab-2" role="tabpanel" tabIndex={0} hidden={activeTab !== '1'}>
                      <Animate animate="slide-in-up">
                        <Text as="p" align="center">
                          Track and coordinate your work with GitHub Issues, GitHub Projects, and insights.
                        </Text>
                      </Animate>
                    </Box>
                    <Box id="panel-3-b" aria-labelledby="tab-3" role="tabpanel" tabIndex={0} hidden={activeTab !== '2'}>
                      <Animate animate="slide-in-up">
                        <Text as="p" align="center">
                          Collaborate in real time with your team and GitHub Copilot across GitHub Issues, GitHub
                          Discussions, and pull requests.
                        </Text>
                      </Animate>
                    </Box>
                  </Box>
                </AnimationProvider>
              </Box>
            </Grid.Column>
          </Grid>
        </Box>
      </Box>
    )
  },
}

/**
 * This is just an example, and will be replaced with a built-in fade effect in the
 * WebGL animations.
 */
function TempFadeInBackgroundEffect(element: HTMLDivElement, backgroundImageUrl: string, delay = 100) {
  element.style.position = 'relative'

  const bgDiv = document.createElement('div')
  bgDiv.style.cssText = `
    position: absolute;
    inset: 0;
    background-image: url(${backgroundImageUrl});
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.5s ease-out;
    z-index: 0;
  `
  element.insertBefore(bgDiv, element.firstChild)

  const children = element.children
  for (let i = 1; i < children.length; i++) {
    ;(children[i] as HTMLElement).style.position = 'relative'
    ;(children[i] as HTMLElement).style.zIndex = '1'
  }

  const timer = setTimeout(() => {
    bgDiv.style.opacity = '1'
  }, delay)

  return () => {
    clearTimeout(timer)
    bgDiv.remove()
  }
}

export const WithCustomInput: Story = {
  name: 'With a custom input',
  render: function Render() {
    const [hasCopied, setHasCopied] = useState(false)
    const [, startTransition] = useTransition()

    const handleCopy = useCallback(() => {
      setHasCopied(true)
      navigator.clipboard.writeText('curl -fsSL https://gh.io/copilot-install | bash')
    }, [])

    useEffect(() => {
      if (hasCopied) {
        const timer = setTimeout(() => {
          startTransition(() => setHasCopied(false))
        }, 2000)

        return () => clearTimeout(timer)
      }
    }, [hasCopied])

    const trailingComponent = useCallback(
      () => (
        <>
          <Box paddingBlockStart={16} className={styles['d-lg-none']}>
            <Stack padding="none" gap="condensed" direction={{narrow: 'vertical', regular: 'horizontal'}}>
              <Hero.PrimaryAction href="#">Try Copilot CLI</Hero.PrimaryAction>
              <Hero.SecondaryAction href="#">See documentation</Hero.SecondaryAction>
            </Stack>
          </Box>
          <Stack direction="vertical" padding="none" className={styles['d-none-d-lg-block']}>
            <Box className={styles.customInputContainer} marginBlockEnd={20}>
              <Stack
                padding="none"
                direction={{narrow: 'vertical', regular: 'horizontal'}}
                gap="none"
                alignItems="center"
              >
                <ActionMenu onSelect={newValue => alert(newValue)}>
                  <ActionMenu.Button>Get Copilot CLI</ActionMenu.Button>
                  <ActionMenu.Overlay aria-label="Get Copilot CLI options">
                    <ActionMenu.Item value="Get Copilot CLI" selected>
                      Get Copilot CLI
                    </ActionMenu.Item>
                    <ActionMenu.Item value="Option 1">See documentation</ActionMenu.Item>
                  </ActionMenu.Overlay>
                </ActionMenu>
                <Text as="span" font="monospace" size="100" className={styles.customInputCode}>
                  <span style={{color: 'var(--base-color-scale-purple-2)'}}>curl</span>{' '}
                  <span style={{color: 'var(--base-color-scale-blue-3)'}}>-fsSL</span>{' '}
                  <span style={{color: 'var(--base-color-scale-blue-1)'}}>https://gh.io/copilot-install</span>{' '}
                  <span style={{color: 'var(--base-color-scale-red-3)'}}>|</span>{' '}
                  <span style={{color: 'var(--base-color-scale-purple-2)'}}>bash</span>
                </Text>
                <Button
                  variant="accent"
                  className={styles.customInputCopyButton}
                  onClick={handleCopy}
                  aria-label="Copy installation command"
                >
                  {hasCopied ? (
                    <CheckIcon className={styles.customInputCopyIcon} />
                  ) : (
                    <CopyIcon className={styles.customInputCopyIcon} />
                  )}
                </Button>
              </Stack>
            </Box>
            <Text as="p" size="200" variant="muted">
              View <InlineLink href="#">the documentation</InlineLink>
            </Text>
          </Stack>
        </>
      ),
      [hasCopied, handleCopy],
    )

    return (
      <ThemeProvider colorMode="dark">
        <Box backgroundColor="default" className={styles.customInputExample}>
          <Grid>
            <Grid.Column>
              <Hero align="center" trailingComponent={trailingComponent}>
                <Hero.Label>Public preview</Hero.Label>
                <Hero.Heading>Your terminal&rsquo;s new sidekick</Hero.Heading>
                <Hero.Description>
                  GitHub Copilot CLI reads, writes, and runs code where you work. <br />
                  Code faster, smarter, together.
                </Hero.Description>
                <Hero.Image src={defaultPlaceholderImgae} alt="" />
              </Hero>
            </Grid.Column>
          </Grid>
        </Box>
      </ThemeProvider>
    )
  },
}

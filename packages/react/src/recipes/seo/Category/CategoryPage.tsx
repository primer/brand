import {MoonIcon, SunIcon} from '@primer/octicons-react'
import clsx from 'clsx'
import React, {PropsWithChildren, useCallback, useEffect} from 'react'
import {
  AnimationProvider,
  Box,
  Card,
  Grid,
  Heading,
  MinimalFooter,
  Pagination,
  Stack,
  SubdomainNavBar,
  Text,
} from '../../../'
import {BaseProps} from '../../../component-helpers'

import {ColorModesEnum, ThemeProvider} from '../../../ThemeProvider'
import cardCover1 from '../../../fixtures/images/background-light-enterprise-shape-1.png'
import cardCover2 from '../../../fixtures/images/background-light-enterprise-shape-2.png'
import cardCover3 from '../../../fixtures/images/background-light-enterprise-shape-3.png'
import cardCover4 from '../../../fixtures/images/background-light-enterprise-shape-4.png'
import cardCover5 from '../../../fixtures/images/background-light-enterprise-shape-5.png'
import cardCover6 from '../../../fixtures/images/background-light-enterprise-shape-6.png'
import cardCover7 from '../../../fixtures/images/background-light-enterprise-shape-7.png'

import styles from './CategoryPage.module.css'

const cardImagePlaceholders = [cardCover1, cardCover2, cardCover3, cardCover4, cardCover5, cardCover6, cardCover7]

const NavListHeading = ({children}) => (
  <Box borderBlockStartWidth="thin" borderStyle="solid" borderColor="subtle" paddingBlockStart={12}>
    <Heading as="h2" size="subhead-medium" font="monospace" className={styles.navListHeading} weight="medium">
      {children}
    </Heading>
  </Box>
)

const NavListItem = ({
  children,
  selected,
  href,
}: PropsWithChildren<{children: string; selected?: boolean; href: string} & BaseProps<HTMLAnchorElement>>) => (
  <a className={clsx(styles.navListItem, selected && styles.navListItemSelected)} href={href}>
    <Text size="200">{children}</Text>
  </a>
)

export function CategoryPage({accentColor, variant, gridOverlay = false, colorMode = ColorModesEnum.LIGHT, ...args}) {
  const [enableGridOverlay, setGridOverlay] = React.useState(gridOverlay)
  const [currentPage, setCurrentPage] = React.useState(5)
  const [isLightMode, setIsLightMode] = React.useState(colorMode === ColorModesEnum.LIGHT)
  const selectedColorMode = isLightMode ? ColorModesEnum.LIGHT : ColorModesEnum.DARK
  const totalPages = 10

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
    setIsLightMode(colorMode === ColorModesEnum.LIGHT)
  }, [colorMode])

  const handleMode = e => {
    e.preventDefault()
    setIsLightMode(!isLightMode)
  }

  const handlePageChange = (_, pageNumber) => {
    if (pageNumber === currentPage + 1 && currentPage < totalPages) {
      // Next page handler
      setCurrentPage(currentPage + 1)
    } else if (pageNumber === currentPage - 1 && currentPage > 1) {
      // Previous page handler
      setCurrentPage(currentPage - 1)
    } else if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  return (
    <ThemeProvider
      colorMode={selectedColorMode}
      style={{
        backgroundColor: 'var(--brand-color-canvas-default)',
      }}
      {...args}
    >
      <SubdomainNavBar title="" fixed={false}>
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
      <AnimationProvider runOnce visibilityOptions={0.2}>
        <Grid enableOverlay={enableGridOverlay}>
          <Grid.Column>
            <Box marginBlockStart={{narrow: 64, wide: 112}} marginBlockEnd={{narrow: 32, wide: 64}}>
              <Heading as="h1" size="1" stretch="condensed" weight="semibold" font="hubot-sans">
                DevOps
              </Heading>
            </Box>
          </Grid.Column>
          <Grid.Column span={{xsmall: 12, large: 3}}>
            <Stack direction="vertical" padding="none" gap={24}>
              <NavListHeading>Topics</NavListHeading>

              <nav>
                <ul className={styles.navList}>
                  <li value="AI">
                    <NavListItem href="#">AI</NavListItem>
                  </li>
                  <li value="DevOps">
                    <NavListItem href="#" selected>
                      DevOps
                    </NavListItem>
                  </li>
                  <li value="Security">
                    <NavListItem href="#">Security</NavListItem>
                  </li>
                  <li value="Developer productivity">
                    <NavListItem href="#">Developer productivity</NavListItem>
                  </li>
                  <li value="Infrastructure">
                    <NavListItem href="#">Infrastructure</NavListItem>
                  </li>
                  <li value="Networking">
                    <NavListItem href="#">Networking</NavListItem>
                  </li>
                  <li value="Data">
                    <NavListItem href="#">Data</NavListItem>
                  </li>
                  <li value="Containers">
                    <NavListItem href="#">Containers</NavListItem>
                  </li>
                  <li value="Machine learning">
                    <NavListItem href="#">Machine learning</NavListItem>
                  </li>
                </ul>
              </nav>
            </Stack>
          </Grid.Column>

          <Grid.Column span={{xsmall: 12, large: 9}}>
            <Box
              marginBlockEnd={{narrow: 48}}
              paddingBlockEnd={{narrow: 48}}
              borderBlockEndWidth="thin"
              borderColor="default"
              borderStyle="solid"
            >
              <Grid enableOverlay={enableGridOverlay} className={styles.cardGrid}>
                {Array.from({length: 6}).map((_, index) => (
                  <Grid.Column span={{xsmall: 12, medium: 6}} key={index}>
                    <ThemeProvider colorMode={selectedColorMode}>
                      <Box animate="scale-in-right">
                        <Card href="../?path=/story/recipes-seo-article-page--default" variant="minimal">
                          <Card.Image
                            src={cardImagePlaceholders[Math.floor(Math.random() * cardImagePlaceholders.length)]}
                            alt="placeholder, blank area with an gray background color"
                            aspectRatio="16:9"
                          />
                          <Card.Heading>Article page heading</Card.Heading>
                          <Card.Description>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                          </Card.Description>
                        </Card>
                      </Box>
                    </ThemeProvider>
                  </Grid.Column>
                ))}
              </Grid>
            </Box>
            <Pagination
              pageCount={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              showPages={{narrow: false, regular: true, wide: true}}
            />
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
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
      </AnimationProvider>
      <MinimalFooter />
    </ThemeProvider>
  )
}

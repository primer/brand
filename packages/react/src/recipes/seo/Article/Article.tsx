import {ChevronDownIcon, ChevronUpIcon, MoonIcon, SunIcon} from '@primer/octicons-react'
import clsx from 'clsx'
import React, {useCallback, useEffect, useState} from 'react'
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
  HeadingProps,
  Image,
  Link,
  MinimalFooter,
  Prose,
  SectionIntro,
  Stack,
  SubdomainNavBar,
  Text,
} from '../../../'

import {ColorModesEnum, ThemeProvider} from '../../../ThemeProvider'

import styles from './Article.module.css'

/**
 * This is an example of a remote content that can be fetched from a CMS or a markdown file,
 * and used to a) populate the article content, and b) generate a table of contents.
 */
const realWorldContent = [
  // eslint-disable-next-line github/unescaped-html-literal
  `<p>
    While DevOps is sometimes referred to as a methodology, it&apos;s better understood as a set of practices, 
    ideas, and methodologies that share a common philosophy: continuous value delivery. Put simply, there&apos;s no one-size-fits-all approach to DevOps—and successful examples of DevOps can look very different from one organization to another.
  </p>
  <p>
    At GitHub, we design tools for DevOps organizations and work with leading teams and companies. In doing so, we&apos;ve identified a number of common pain points people experience when adopting DevOps.
  </p>
  <hr />
  <h2 id="is-devops-a-methodology-or-a-process">Is DevOps a methodology or a process?</h2>
  <p>If you ask 10 people to define DevOps, you&apos;re likely to get at least five different answers. Some people might focus on the practical implementation of DevOps—CI/CD, test automation, and so on—and they&apos;ll call it a process. Others might call DevOps a methodology with a set of processes that work together under a coherent philosophy.</p>
  <p>But both of these definition miss the larger point: DevOps consists of a set of practices that are adaptable to each business that adopts them.</p>
  <p>At GitHub, we believe it&apos;s better to understand DevOps as a framework for thinking about how to deliver value through software. It&apos;s more than a single methodology or collection of processes. It&apos;s fundamentally a set of practices—both cultural and technological. Let&apos;s break that down.</p>
  `,
  // eslint-disable-next-line github/unescaped-html-literal
  `<h3 id="understanding-devops-as-a-framework">Understanding DevOps as a framework</h3>
  <p>For decades, people have promoted neatly defined ideas of how each step of the software development lifecycle should work. But what seems like genius in a whitepaper often falls apart in practice because each organization is different.</p>
  <p>DevOps acknowledges that. Rather than prescribe every detail, DevOps brings together a set of practices, cultural ideas, and tooling that work under a framework that's malleable for the needs of a given team and organization.</p>
  <p>At its core, DevOps seeks to get higher-quality software into the hands of end users as fast as possible. This commitment to continuously delivering value is foundational to any successful DevOps organization—and it&apos;s accomplish in three ways:</p>
  <ul>
    <li>
      <strong>Continuous improvement:</strong> Small changes are easier to manage and deliver value to users faster than large releases, which can and often do take longer to ship. In a DevOps practice, continuous improvement means shipping iterative changes fast. It also means looking for ways to improve the underlying software with future changes and the SDLC itself to facilitate faster value delivery.
    </li>
    <li>
      <strong>Shared ownership:</strong>  Everyone working on a product shares accountability for the product and its quality—not just their personal area of expertise. This means that every shares accountability and ownership for the end product they ship to end users.
    </li>
    <li>
      <strong>Automation:</strong> Anything that can be automated should be automated across the SDLC in a DevOps practice to deliver value to end users faster through new releases. Automation also helps organizations maximize the time spent building the product, while minimizing the chance for human error.
    </li>
  </ul>

  <h3 id="how-devops-differs-from-agile-and-friends">How DevOps differs from agile and friends</h3>
  <p>Agile, extreme programming, and other similar development methodologies were reactions to the conflict between traditional programming and software distribution through the web.</p>
  <p>Before those ideas became popular, one of the most popular development methodologies was the highly sequential waterfall methodology. In that system, each step had to be complete before the next could start. That often meant lots of paperwork and planning needed to happen before a single line of code could be written.</p>

  <figure>
    <blockquote>
      <p>In 16 months, we've gone from over 30 siloed software engineering groups to a largely cohesive team across McKesson.</p>
      <figcaption>VP, Developer Services and Technology Labs Denis Canty at McKesson</figcaption>
    </blockquote>
  </figure>
  <p>The creators of agile software development principles recognized that over-planning stifled the creativity of software developers—and without working code no one could know if the plans even worked. The Agile Manifesto, for example, said that working software was more important than excessive documentation. Being responsive to change was more valuable than sticking to a plan.</p>
  <p>In practice, the concepts behind the Agile Manifesto were revolutionary. It recognized that working code was the best way to understand and serve customer needs. But that focus on code also meant it had less to say about the rest of the SDLC.</p>
  <p>If agile was a reaction against the old ways, DevOps builds upon agile&apos;s core ideas and applies it to the entire software development life cycle. In fact, some people in the early 2010s called DevOps the second decade of agile.</p>
  <p>To understand the difference between DevOps and Agile, it helps to compare their core tenets:</p>
  <ul>
    <li>
      Fail fast vs. continuous improvement: Agile centers on small, fast iterations where failure is embraced because it shows the process is working. In DevOps, the emphasis is on iteration, automation, and deep collaboration across the entire SDLC to improve delivery speeds and software quality.
    </li>
    <li>
      Developer-centric vs. team-centric: Agile looks at how software developers can best serve customers, but has little to say about how code is tested, deployed, or maintained. In contrast, DevOps brings everyone in the SDLC together under a shared responsibility for delivering value to end users.
    </li>
    <li>
      Features vs. systems thinking: Agile focuses on the here and now of a particular feature, whereas DevOps looks holistically at software as a system.
    </li>
  </ul>
  <h2 id="what-is-the-goal-of-devops">What is the goal of DevOps?</h2>
  <p>The goal of DevOps is to match how we make software with the way the cloud enables us to use it. The cloud took us from an era of barriers—individual servers, software release dates, role-based silos—to an open world where software is ubiquitous.</p>
  `,
  `
  <p>In the past, software development had distinct stages and a final product that might be compared to a production line. This was understandable—in the era of physical media, software development was a far more regimented and linear process. After all, a final release actually was final in a sense since distributing updates meant restarting the linear production process from scratch.</p>
  <p>But the modern SDLC isn&apos;t a production line. Software as a service and other innovations in cloud-based technologies and platforms have made distinct releases as relevant today as punch cards and room-sized calculators.</p>
  <p>So, how does DevOps bring the SDLC closer to the always-on, always-up–to-date expectations of the cloud?</p>
  <figure>
    <img
      width="100%"
      src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
      alt="placeholder, blank area with an off-white background color"
    />
    <figcaption>Image caption</figcaption>
  </figure>
  <h3 id="how-your-organization-can-adopt-devops">How your organization can adopt DevOps</h3>
  <p>
    Successfully adopting DevOps can require some big changes. But rather than reworking all of your processes and tooling overnight, you can take relatively small steps to get started. This might entail making cultural changes to how often your development team integrates their code or automating small pieces of the SDLC in your organization.
  </p>`,
  `
  <p>No matter where you are on your DevOps journey, there are six key steps you should take to successfully adopt DevOps:</p>
  <ul>
    <li>Change the culture: Success in DevOps starts with deep collaboration between everyone responsible for building, testing, operating, and shipping a product. And that starts with making sure everyone is unified and working together across all stages of the SDLC. This can be a big change for organizations that have role-based siloes between different teams. In a DevOps practice, everyone comes together to deliver higher-quality software faster to customers—and that requires deep collaboration between different people to ensure code is optimized to operate in production environments and production environments are optimized to run the software.</li>
    <li>Focus on incremental builds: DevOps favors small changes that can be quickly delivered to customers and that means breaking features into small chunks that are easier to test, minimize the impact of bugs, and can be shipped to production as fast as possible. There are no hard-and-fast rules in DevOps about how many times a day developers should be integrating new code changes—but the most successful DevOps practices integrate and ship multiple code changes a day.</li>
    <li>Adopt the right tools: In DevOps, there&apos;s no one-size-fits-all approach to tooling. In fact, “DevOps tools” is a bit of an umbrella term with plenty of products and platforms that fall into this category. Picking the right tools and building the right DevOps toolchain starts with identifying what problems you&apos;re trying to solve and what DevOps capabilities you need to invest in. But there are a number of common areas where you&apos;ll need tooling. Speaking of which …</li>
    <li>Automate everything you can: The best DevOps environments think critically about their SDLC and look for places where automation can be applied to remove the need for human intervention—like repetitive tasks such as integrating, testing, and packaging code. By automating repetitive tasks, DevOps helps people make better use of their time and reduces the risk of human error (or people forgetting to run tests, import the right libraries, and so on). As a general rule of thumb, anything that can be automated should be automated in a DevOps practice.</li>
  </ul>
  <figure>
    <blockquote>
      <p>We have a slogan on our team: don't let a human do a machine's job. GitHub helps us achieve that.</p>
      <figcaption>Principal Software Engineer Gabriel Kohen at Blue Yonder</figcaption>
    </blockquote>
  </figure>
  <h4 id="the-move-towards-devsecops">The move towards DevSecOps</h4>
  <p>As a set of practices, DevOps is always evolving—and one of the most apparent evolutions today is through the move to DevSecOps. While DevOps was originally about sharing accountability for how code performs in production, DevSecOps builds on that and seeks to make everyone responsible for that code&apos;s security.</p>
  <p>In our connected world, software security is fundamental—and DevSecOps establishes robust processes to build security into every step of the SDLC. Adapting the DevOps idea of continuous improvement, DevSecOps makes improving security an ongoing process and one that begins as early in the SDLC as possible.</p>
 `,
]

const systemContent = [
  // eslint-disable-next-line github/unescaped-html-literal
  `<h2>Heading level 2</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.</p>
  <figure>
    <blockquote>
      <p>Nulla ac odio eu magna hendrerit porta. Donec nec eros quis tortor tincidunt vulputate. Aenean id pharetra diam, sit amet auctor leo. Aliquam erat volutpat.</p>
      <figcaption>Lisa Vanderschuit, Engineering Program Manager, Shopify</figcaption>
    </blockquote>
  </figure>
  <p>Integer pellentesque pretium nulla viverra molestie. Praesent quis pretium sapien. Sed convallis eget lectus et pulvinar:</p>
  <ul>
    <li>
      <strong>Vivamus</strong> eu risus nec lectus consequat rutrum at vel lacus.
    </li>
    <li><strong>Donec</strong> at dolor ut metus imperdiet congue vel porta nunc.
    </li>
    <li><strong>Quisque</strong> eu tortor suscipit, congue quam in, bibendum tellus.</li>
  </ul>`,
  // eslint-disable-next-line github/unescaped-html-literal
  `<h3>Heading level 3</h3>
  <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue. Ut malesuada, nisl vel dignissim mollis</p>
  `,
  `
  <h4>Heading level  4</h4>
  <p>
    Secure code as you write it. Automatically review every change to your codebase and identify vulnerabilities
    before they reach production. <a href="/#">Learn more here.</a>
  </p>
  <h5>Heading level 5</h5>
  <ol>
    <li>
      Vivamus eu risus nec lectus consequat rutrum at vel lacus.
    </li>
    <li>Donec at dolor ut metus imperdiet congue vel porta nunc.
    </li>
    <li>Quisque eu tortor suscipit, congue quam in, bibendum tellus.</li>
  </ol>
  <p><code>for-each-ref</code> is extremely useful for listing references, finding which references point at a given object (with <code>--points-at</code>), which references have been merged into a given branch (with <code>--merged</code>), or which references contain a given commit (with <code>--contains</code>).</p>    
  <h6>Heading level 6</h6>
  <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue.</p>
  <p>Nunc velit odio, posuere eu felis eget, consectetur fermentum nisi. Aenean tempor odio id ornare ultrices. Quisque blandit condimentum tellus, semper efficitur sapien dapibus nec. </p>
  `,
]

const contentMap = {
  'real-world': realWorldContent,
  system: systemContent,
}

const AsideHeading = ({as = 'h2', children}: HeadingProps) => (
  <Heading as={as} size="subhead-medium" font="monospace" className={styles.asideHeading} weight="medium">
    {children}
  </Heading>
)

const TableOfContents = ({content = 'real-world', active}) => {
  const allContent = contentMap[content]
  const [narrowMenuOpen, setNarrowMenuOpen] = useState(false)
  const [narrowScrolledPastHeading, setNarrowScrolledPastHeading] = useState(false)

  const mergedContent = allContent.join('')
  const headings = mergedContent.match(/<h[2-4].*?>(.*?)<\/h[2-6]>/g) || []
  const toc = headings.map(heading => {
    const level = parseInt(heading[2])
    const text = heading.replace(/<[^>]*>/g, '').replace(/[^\w\s-]/g, '')
    return {
      level,
      text,
      id: text.toLowerCase().replace(/\s+/g, '-'),
    }
  })

  const handleNarrowMenu = () => {
    setNarrowMenuOpen(!narrowMenuOpen)
  }

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setNarrowMenuOpen(false)
      }
    }

    if (narrowMenuOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => window.removeEventListener('keydown', handleEscape)
  }, [narrowMenuOpen])

  useEffect(() => {
    const threshold = 0
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      setNarrowScrolledPastHeading(scrollY > lastScrollY ? false : true)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkPress = useCallback(() => {
    setNarrowMenuOpen(!narrowMenuOpen)
  }, [setNarrowMenuOpen, narrowMenuOpen])

  return (
    <nav aria-label="Table of contents">
      <Stack
        direction="vertical"
        gap={64}
        padding="none"
        className={clsx(
          styles.asideContent,
          narrowMenuOpen && styles['asideContent--open'],
          narrowScrolledPastHeading && styles['asideContent--visible'],
        )}
      >
        <Stack direction="vertical" padding="none" gap={24}>
          <Stack direction="horizontal" padding="none" justifyContent="space-between" alignItems="center">
            <AsideHeading>Table of contents</AsideHeading>
            <button className={styles.tableOfContentsMenuToggle} onClick={handleNarrowMenu}>
              {narrowMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
          </Stack>
          <div className={clsx(styles.tableOfContentsNav, narrowMenuOpen && styles['tableOfContentsNav--visible'])}>
            <ol className={styles.tableOfContentsList}>
              {toc.map(({text, id}) => {
                return (
                  <li key={id}>
                    <a href={`#${id}`} onClick={handleLinkPress} aria-current={active === id ? 'location' : undefined}>
                      <Text
                        variant={active === id ? 'default' : 'muted'}
                        size="100"
                        weight={active === id ? 'bold' : 'normal'}
                      >
                        {text}
                      </Text>
                    </a>
                  </li>
                )
              })}
            </ol>
          </div>
        </Stack>

        <Box
          paddingBlockStart={8}
          borderBlockStartWidth="thin"
          borderStyle="solid"
          borderColor="muted"
          className={clsx(
            styles.tableOfContentsFeaturesBox,
            narrowMenuOpen && styles['tableOfContentsFeaturesBox--visible'],
          )}
        >
          <AsideHeading as="h3">Featured</AsideHeading>
          <Box marginBlockStart={24}>
            <Box marginBlockEnd={4}>
              <Heading as="h4" size="subhead-medium">
                GitHub Copilot
              </Heading>
            </Box>
            <Text as="p" size="100" variant="muted">
              AI coding assistant elevating developer workflows
            </Text>
          </Box>
          <Box marginBlockStart={16}>
            <Button size="small" variant="primary">
              Try Copilot
            </Button>
          </Box>
        </Box>
      </Stack>
    </nav>
  )
}

type ArticleProps = {
  content: 'real-world' | 'system'
  gridOverlay?: boolean
  colorMode?: ColorModesEnum
}

export function Article({
  content = 'real-world',
  gridOverlay = false,
  colorMode = ColorModesEnum.LIGHT,
  ...args
}: ArticleProps) {
  const [enableGridOverlay, setGridOverlay] = React.useState(gridOverlay)
  const [isLightMode, setIsLightMode] = React.useState(colorMode === ColorModesEnum.LIGHT)
  const [currVisibleHeading, setCurrVisibleHeading] = React.useState<string | undefined>()
  const selectedColorMode = isLightMode ? ColorModesEnum.LIGHT : ColorModesEnum.DARK

  const selectedContent = contentMap[content]

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrVisibleHeading(entry.target.id || undefined)
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.5,
      },
    )

    const headings = Array.from(document.querySelectorAll('h2, h3, h4'))
    for (const heading of headings) {
      observer.observe(heading)
    }
  }, [])

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
      <main className={styles.articlePageBody}>
        <Grid enableOverlay={enableGridOverlay}>
          <Grid.Column span={12}>
            <section>
              <AnimationProvider runOnce visibilityOptions={0.3}>
                <header>
                  <Box marginBlockStart={16}>
                    <Link href="#" arrowDirection="start">
                      Devops
                    </Link>
                  </Box>
                  <Box animate="fade-in" marginBlockStart={64} marginBlockEnd={32}>
                    <Heading as="h1" size="1" stretch="condensed" weight="semibold" font="hubot-sans">
                      Should we think of DevOps as a methodology?
                    </Heading>
                  </Box>
                </header>
                <article>
                  <Box marginBlockEnd={{narrow: 48}} paddingBlockEnd={{narrow: 48}}>
                    <Box borderRadius="large" className={styles.heroImageArea} marginBlockEnd={{narrow: 64, wide: 80}}>
                      <Image
                        borderRadius="xlarge"
                        animate="fade-in"
                        alt="placeholder image"
                        src="https://via.placeholder.com/1200x600/f5f5f5/f5f5f5"
                        className={styles.heroImage}
                      />
                    </Box>
                    <Grid enableOverlay={enableGridOverlay}>
                      <Grid.Column
                        span={{xsmall: 12, large: 4}}
                        start={{xsmall: 1, large: 10}}
                        className={styles.asideCol}
                      >
                        <aside className={styles.aside}>
                          <TableOfContents content={content} active={currVisibleHeading} />
                        </aside>
                      </Grid.Column>
                      <Grid.Column span={{xsmall: 12, large: 9}} className={styles.articleCol}>
                        <Grid enableOverlay={enableGridOverlay}>
                          <Grid.Column span={{xsmall: 12, large: 11}}>
                            <Box animate="slide-in-left">
                              <header>
                                <Text as="p" className={styles.lede} size="500" font="hubot-sans" weight="medium">
                                  There&apos;s one word that perfectly describes successful DevOps: flow. As
                                  individuals, we experience a state of flow when everything in our work comes together
                                  naturally and at the right time. DevOps enables that kind of flow at the
                                  organizational level through a combination of tooling, culture, and process.
                                </Text>
                              </header>
                            </Box>
                          </Grid.Column>
                        </Grid>
                        <Box marginBlockStart={{narrow: 24, wide: 48}}>
                          <AnimationProvider runOnce>
                            <Prose variant="editorial" html={selectedContent[0]} />
                            <Box marginBlockStart={{narrow: 24, wide: 48}}>
                              <Image
                                borderRadius="medium"
                                width="100%"
                                src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
                                alt="placeholder, blank area with an off-white background color"
                              />
                            </Box>
                            <Box marginBlockStart={{narrow: 24, wide: 48}}>
                              <Prose variant="editorial" html={selectedContent[1]} />
                            </Box>
                            {/*
                             * Interupt banner
                             */}
                            <Grid enableOverlay={enableGridOverlay}>
                              <Grid.Column span={{xsmall: 12, medium: 10}}>
                                <Box
                                  animate="scale-in-up"
                                  marginBlockStart={{narrow: 48, regular: 64, wide: 80}}
                                  marginBlockEnd={40}
                                  paddingBlockEnd={40}
                                  borderStyle="solid"
                                  borderColor="muted"
                                  borderBlockEndWidth="thin"
                                >
                                  <Box
                                    borderStyle="solid"
                                    borderColor="muted"
                                    borderBlockStartWidth="thin"
                                    paddingBlockStart={40}
                                  >
                                    <Stack
                                      padding="none"
                                      direction={{narrow: 'vertical', regular: 'horizontal'}}
                                      gap={48}
                                    >
                                      <Stack direction="vertical" padding="none" alignItems="flex-start">
                                        <Heading as="h3" size="6">
                                          Need some help moving to DevSecOps?
                                        </Heading>
                                        <Text as="p">
                                          Discover GitHub&apos;s AI coding assistant elevating developer workflows, for
                                          faster, happier devs.
                                        </Text>
                                        <Button size="small" as="a" href="/#" variant="primary">
                                          Try GitHub Copilot
                                        </Button>
                                      </Stack>
                                      <Image
                                        borderRadius="medium"
                                        src="https://via.placeholder.com/300x200/f5f5f5/f5f5f5.png"
                                        alt="placeholder, blank area with an off-white background color"
                                      />
                                    </Stack>
                                  </Box>
                                </Box>
                              </Grid.Column>
                            </Grid>
                            <Box marginBlockStart={{narrow: 24, wide: 48}}>
                              <Prose variant="editorial" html={selectedContent[2]} />
                            </Box>
                            {/*
                             * Interupt banner
                             */}
                            <Grid enableOverlay={enableGridOverlay}>
                              <Grid.Column span={{xsmall: 12, medium: 10}}>
                                <Box
                                  animate="scale-in-up"
                                  marginBlockStart={{narrow: 48, regular: 64, wide: 80}}
                                  marginBlockEnd={40}
                                  paddingBlockEnd={40}
                                  borderStyle="solid"
                                  borderColor="muted"
                                  borderBlockEndWidth="thin"
                                >
                                  <Box
                                    borderStyle="solid"
                                    borderColor="muted"
                                    borderBlockStartWidth="thin"
                                    paddingBlockStart={40}
                                  >
                                    <Stack
                                      padding="none"
                                      direction={{narrow: 'vertical', regular: 'horizontal'}}
                                      gap={48}
                                    >
                                      <Stack direction="vertical" padding="none" alignItems="flex-start">
                                        <Heading as="h4" size="6">
                                          Need some help moving to DevSecOps?
                                        </Heading>
                                        <Text as="p">
                                          Discover GitHub&apos;s AI coding assistant elevating developer workflows, for
                                          faster, happier devs.
                                        </Text>
                                        <Button size="small" as="a" href="/#" variant="primary">
                                          Try GitHub Copilot
                                        </Button>
                                      </Stack>
                                      <Image
                                        borderRadius="medium"
                                        src="https://via.placeholder.com/300x200/f5f5f5/f5f5f5.png"
                                        alt="placeholder, blank area with an off-white background color"
                                      />
                                    </Stack>
                                  </Box>
                                </Box>
                              </Grid.Column>
                            </Grid>
                            <Box marginBlockStart={{narrow: 24, wide: 48}}>
                              <Prose variant="editorial" html={selectedContent[3]} />
                            </Box>
                          </AnimationProvider>
                        </Box>
                      </Grid.Column>
                    </Grid>
                    <Grid>
                      <Grid.Column span={12}>
                        <Box marginBlockStart={{narrow: 64, wide: 112}}>
                          <Stack direction="vertical" gap={128} padding="none">
                            <CTABanner align="center" hasShadow={false} hasBorder>
                              <CTABanner.Heading>Check it out</CTABanner.Heading>
                              <CTABanner.Description>
                                AI code generation uses machine learning models to write code from input that describes
                                what the code should do, and the models provide context-based code suggestions along the
                                way. AI generated code isn&apos;t always perfect, but it often gives developers a
                                suitable starting point for writing code quickly and efficiently.
                              </CTABanner.Description>
                              <CTABanner.ButtonGroup>
                                <Button>Contact sales</Button>
                                <Button>Sign up</Button>
                              </CTABanner.ButtonGroup>
                            </CTABanner>
                            <section>
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
                            </section>
                            <section>
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
                            </section>
                          </Stack>
                        </Box>
                      </Grid.Column>
                    </Grid>
                  </Box>
                </article>
              </AnimationProvider>
            </section>
          </Grid.Column>
        </Grid>
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

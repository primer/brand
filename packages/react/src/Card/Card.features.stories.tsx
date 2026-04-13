import React from 'react'
import type {StoryFn, Meta} from '@storybook/react'
import {Card, CardIconColors} from '.'
import {Avatar} from '../Avatar'
import {Token} from '../Token'
import {Stack, Grid, ThemeProvider, Box, Section, Text} from '..'
import avatarMona from '../fixtures/images/avatar-mona.png'
import darkHorizontalBannerAlt from '../fixtures/images/dark-horizontal-banner-alt.png'
import placeholderImage from '../fixtures/images/placeholder.png'
import {CopilotIcon, RocketIcon, GitBranchIcon, ZapIcon} from '@primer/octicons-react'
import {MicrosoftLogo} from '../fixtures/third-party-logos/MicrosoftLogo'
import {IconProps} from '../Icon'
import './Card.stories.shared.css'

export default {
  title: 'Components/Card/Features',
  component: Card,
} as Meta<typeof Card>

export const Minimal: StoryFn<typeof Card> = () => {
  return (
    <Card href="https://github.com" variant="minimal">
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Label>Limited</Card.Label>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const MinimalDark: StoryFn<typeof Card> = (args, context) => Minimal(args, context)
MinimalDark.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <Box style={{backgroundColor: 'var(--base-color-scale-black-0)'}}>
        <Story />
      </Box>
    </ThemeProvider>
  ),
]

export const CTAText: StoryFn<typeof Card> = () => {
  return (
    <Card ctaText="Discover how" href="https://github.com">
      <Card.Heading>GitHub Actions cheat sheet</Card.Heading>
      <Card.Description>
        In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
      </Card.Description>
    </Card>
  )
}

export const CenterAligned: StoryFn<typeof Card> = () => {
  return (
    <>
      <Section backgroundColor="default">
        <Grid>
          <Grid.Column span={{xsmall: 12, medium: 6}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>Code search & code view</Card.Heading>
              <Card.Description>
                In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
              </Card.Description>
            </Card>
          </Grid.Column>
          <Grid.Column span={{xsmall: 12, medium: 6}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>Code search & code view</Card.Heading>
              <Card.Description>
                In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
              </Card.Description>
            </Card>
          </Grid.Column>
        </Grid>
      </Section>
      <Section backgroundColor="subtle">
        <Grid>
          <Grid.Column span={{xsmall: 12, medium: 4}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>Code search & code view</Card.Heading>
              <Card.Description>
                In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
              </Card.Description>
            </Card>
          </Grid.Column>
          <Grid.Column span={{xsmall: 12, medium: 4}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>Code search & code view</Card.Heading>
              <Card.Description>
                In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
              </Card.Description>
            </Card>
          </Grid.Column>
          <Grid.Column span={{xsmall: 12, medium: 4}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>Code search & code view</Card.Heading>
              <Card.Description>
                In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
              </Card.Description>
            </Card>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  )
}
CenterAligned.storyName = 'Align center'

export const FullWidth: StoryFn<typeof Card> = () => {
  return (
    <Section>
      <Grid>
        <Grid.Column>
          <Card href="https://github.com" fullWidth hasBorder>
            <Card.Image
              aspectRatio="16:10"
              src={placeholderImage}
              alt="placeholder, blank area with an gray background color"
            />
            <Card.Heading>GitHub Actions cheat sheet</Card.Heading>
            <Card.Description>
              Integer pellentesque lorem ex, et ultricies tellus commodo vitae. In fringilla facilisis odio et interdum.
              Nulla imperdiet facilisis erat, at gravida erat rutrum a. Nullam hendrerit est in arcu dapibus rhoncus. Ut
              a nisi massa. Suspendisse id interdum risus, pretium consectetur sapien. Nullam ac elit nisi. Vivamus
              justo libero, rutrum id semper ac, varius ut nisl. Nulla quis vehicula risus.
            </Card.Description>
          </Card>
        </Grid.Column>
      </Grid>
    </Section>
  )
}

export const Label: StoryFn<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Label>Limited</Card.Label>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const Icon: StoryFn<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Icon icon={RocketIcon} />
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const Border: StoryFn<typeof Card> = () => {
  return (
    <Card href="https://github.com" hasBorder>
      <Card.Icon icon={RocketIcon} />
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const IconColors: StoryFn<typeof Card> = () => {
  return (
    <Stack padding="none" direction="horizontal" gap="normal" style={{flexWrap: 'wrap'}}>
      {CardIconColors.map((color, id) => {
        return (
          <Card key={id} href="https://github.com">
            <Card.Icon icon={CopilotIcon} hasBackground color={color} />
            <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
            <Card.Description>
              This Card uses the <b>{color}</b> icon color
            </Card.Description>
          </Card>
        )
      })}
    </Stack>
  )
}

export const WithIconSVG = () => (
  <Card href="https://github.com">
    <Card.Icon
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          aria-label="Magnifying glass icon"
        >
          <path
            d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"
            fill="currentColor"
          ></path>
        </svg>
      }
      hasBackground
      color="purple"
    />
    <Card.Heading>Code search & code view</Card.Heading>
    <Card.Description>
      Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
    </Card.Description>
  </Card>
)
WithIconSVG.storyName = 'Icon (native)'

export const IconAndLabel: StoryFn<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Label color="blue-purple">Beta</Card.Label>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const IconAndLabelWithFragment: StoryFn<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <>
        <Card.Heading>Code search & code view</Card.Heading>
        <Card.Label color="blue-purple">Beta</Card.Label>
        <Card.Icon icon={ZapIcon} color="purple" hasBackground />
        <Card.Description>
          Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
        </Card.Description>
      </>
    </Card>
  )
}

export const Image: StoryFn<typeof Card> = () => {
  return (
    <Stack direction="horizontal">
      <Card href="https://github.com">
        <Card.Image src={placeholderImage} alt="placeholder, blank area with an gray background color" />
        <Card.Heading>Image at the top</Card.Heading>
        <Card.Description>
          Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
        </Card.Description>
      </Card>
      <Card href="https://github.com">
        <Card.Image
          position="block-end"
          as="picture"
          src={placeholderImage}
          alt="placeholder, blank area with an gray background color"
        />
        <Card.Heading>Image at the bottom</Card.Heading>
        <Card.Description>
          Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
        </Card.Description>
      </Card>
    </Stack>
  )
}

export const ImageAndLabel: StoryFn<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Image src={placeholderImage} alt="placeholder, blank area with an gray background color" />
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Label color="blue-purple">Beta</Card.Label>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}
export const ImageUsingPictureElement: StoryFn<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Image as="picture" src={placeholderImage} alt="placeholder, blank area with an gray background color" />
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const LeadingVisualWithArrowCTA: StoryFn<typeof Card> = () => {
  return (
    <Box style={{width: '27rem', minHeight: '25.4375rem'}}>
      <Card
        href="https://github.com"
        fullWidth
        ctaVariant="arrow"
        leadingVisual={<MicrosoftLogo />}
        style={{minHeight: '25.4375rem'}}
      >
        <Card.Heading>Microsoft creates a culture of empowerment while maintaining security.</Card.Heading>
        <Card.Description>Paulo Londra, Co-Founder &amp; CEO</Card.Description>
      </Card>
    </Box>
  )
}
LeadingVisualWithArrowCTA.storyName = 'Leading visual + arrow CTA'

export const WithTokens: StoryFn<typeof Card> = () => {
  return (
    <Box>
      <Card href="https://github.com" fullWidth hasBorder ctaVariant="arrow">
        <Card.Icon icon={CopilotIcon} hasBackground />
        <Card.Tokens>
          <Token>Topic</Token>
          <Token variant="outline">DEC.25</Token>
        </Card.Tokens>
        <Card.Heading>Choose your engine</Card.Heading>
        <Card.Description>
          Biweekly tips, best practices, and use cases delivered straight to your inbox.
        </Card.Description>
      </Card>
    </Box>
  )
}
WithTokens.storyName = 'With tokens'

export const WithBlockEndTokens: StoryFn<typeof Card> = () => {
  return (
    <Box style={{width: '22rem'}}>
      <Card href="https://github.com" fullWidth ctaVariant="none">
        <Card.Image src={darkHorizontalBannerAlt} alt="Abstract blue and green gradient illustration" />
        <Card.Heading>GitHub&apos;s Engineering Team has moved to Codespaces</Card.Heading>
        <Card.Description>
          Today, we&apos;re shipping improvements to Dependabot alerts that make them easier to understand and
          remediate.
        </Card.Description>
        <Card.Tokens position="block-end">
          <Token leadingVisual={<Avatar src={avatarMona} alt="Mona Lisa" size={32} />}>Mona Lisa</Token>
          <Token variant="outline">DEC.25</Token>
        </Card.Tokens>
      </Card>
    </Box>
  )
}
WithBlockEndTokens.storyName = 'With block-end tokens'

const stackedCardData: StackedCardData = [
  {
    href: 'https://github.com',
    icon: CopilotIcon,
    iconColor: 'green',
    tokens: [{label: 'White paper'}, {label: 'DEC.25', variant: 'outline'}],
    heading: 'Choose your engine',
    description: 'Biweekly tips, best practices, and use cases delivered straight to your inbox.',
  },
  {
    href: 'https://github.com',
    icon: RocketIcon,
    iconColor: 'teal',
    tokens: [{label: 'Guide'}, {label: 'MCP', variant: 'outline'}],
    heading: 'Connect your AI tools',
    description: 'Bring the rich context from your tools into GitHub Copilot and keep developers in flow.',
  },
  {
    href: 'https://github.com',
    icon: GitBranchIcon,
    iconColor: 'indigo',
    tokens: [{label: 'Open source'}, {label: 'Updated weekly', variant: 'outline'}],
    heading: 'Explore GitHub MCP Server',
    description: 'Find community-driven servers and clients for your agentic workflows and local tooling.',
  },
  {
    href: 'https://github.com',
    icon: RocketIcon,
    iconColor: 'orange',
    tokens: [{label: 'Webinar'}, {label: 'APR.30', variant: 'outline'}],
    heading: 'Scale platform delivery',
    description: 'Learn how teams standardize delivery workflows without slowing down product development.',
  },
  {
    href: 'https://github.com',
    icon: CopilotIcon,
    iconColor: 'purple',
    tokens: [{label: 'Case study'}, {label: 'Enterprise', variant: 'outline'}],
    heading: 'Ship secure AI workflows',
    description: 'See how organizations bring Copilot, policy controls, and review flows into one system.',
  },
  {
    href: 'https://github.com',
    icon: GitBranchIcon,
    iconColor: 'pink',
    tokens: [{label: 'Repository'}, {label: 'Starter', variant: 'outline'}],
    heading: 'Launch from a proven template',
    description: 'Start with a production-ready foundation for MCP servers, prompts, and developer tooling.',
  },
]

type StackedCardData = {
  href: string
  icon: IconProps['icon']
  iconColor?: (typeof CardIconColors)[number]
  tokens: {
    label: string
    variant?: 'default' | 'outline'
  }[]
  heading: string | React.ReactElement | React.ReactElement[]
  description: string | React.ReactElement | React.ReactElement[]
}[]

export const Stacked: StoryFn<typeof Card> = () => {
  return (
    <Box className="CardStoriesShared-gridFrame">
      <Box className="CardStoriesShared-gridContent">
        <Grid columnGap="none" rowGap="none" enableGutters={false}>
          {stackedCardData.map(({heading, description, href, icon, iconColor, tokens}, id) => {
            return (
              <Grid.Column key={id} span={{xsmall: 12, xlarge: 4}} className="CardStoriesShared-gridColumn">
                <Box className="CardStoriesShared-gridItem" padding="normal">
                  <Card href={href} fullWidth ctaVariant="arrow">
                    <Card.Icon icon={icon} hasBackground color={iconColor} />
                    <Card.Tokens>
                      {tokens.map(({label, variant}) => (
                        <Token key={label} variant={variant}>
                          {label}
                        </Token>
                      ))}
                    </Card.Tokens>
                    <Card.Heading>{heading}</Card.Heading>
                    <Card.Description>{description}</Card.Description>
                  </Card>
                </Box>
              </Grid.Column>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export const WithInlineCodeElement: StoryFn<typeof Card> = () => {
  return (
    <Stack direction="vertical" gap="spacious">
      <Stack direction={{narrow: 'vertical', wide: 'horizontal'}} gap="normal">
        <Stack direction="vertical" gap="normal">
          <Text as="p">Default:</Text>
          <Card href="https://github.com">
            <Card.Heading>
              Use any <code>/model</code> parallelize with <code>/fleet</code>
            </Card.Heading>
            <Card.Description>
              Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models
              at once.
            </Card.Description>
          </Card>
        </Stack>
        <Stack direction="vertical" gap="normal">
          <Text as="p">disableAnimation:</Text>
          <Card href="https://github.com" disableAnimation>
            <Card.Heading>
              Use any <code>/model</code> parallelize with <code>/fleet</code>
            </Card.Heading>
            <Card.Description>
              Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models
              at once.
            </Card.Description>
          </Card>
        </Stack>
        <Stack direction="vertical" gap="normal">
          <Text as="p">Minimal variant:</Text>
          <Card href="https://github.com" variant="minimal">
            <Card.Heading>
              Use any <code>/model</code> parallelize with <code>/fleet</code>
            </Card.Heading>
            <Card.Description>
              Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models
              at once.
            </Card.Description>
          </Card>
        </Stack>
      </Stack>
      <Stack direction={{narrow: 'vertical', wide: 'horizontal'}} gap="normal">
        <Stack direction="vertical" gap="normal">
          <Text as="p">Center aligned with icon:</Text>
          <Card href="https://github.com" hasBorder fullWidth align="center">
            <Card.Icon icon={CopilotIcon} color="purple" hasBackground />
            <Card.Heading>
              Use any <code>/model</code> parallelize with <code>/fleet</code>
            </Card.Heading>
            <Card.Description>
              Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models
              at once.
            </Card.Description>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  )
}

export const WithInlineCodeElementCustomDescriptionSize: StoryFn<typeof Card> = () => {
  return (
    <Stack direction={{narrow: 'vertical', wide: 'horizontal'}} gap="normal">
      <Stack direction="vertical" gap="normal">
        <Text as="p">Larger heading and description:</Text>
        <Card href="https://github.com">
          <Card.Heading size="5">
            Use any <code>/model</code> parallelize with <code>/fleet</code>
          </Card.Heading>
          <Card.Description>
            <Text size="400">
              Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models
              at once.
            </Text>
          </Card.Description>
        </Card>
      </Stack>
      <Stack direction="vertical" gap="normal">
        <Text as="p">Smaller heading and description:</Text>
        <Card href="https://github.com">
          <Card.Heading size="subhead-medium">
            Use any <code>/model</code> parallelize with <code>/fleet</code>
          </Card.Heading>
          <Card.Description>
            <Text size="100">
              Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models
              at once.
            </Text>
          </Card.Description>
        </Card>
      </Stack>
    </Stack>
  )
}
WithInlineCodeElementCustomDescriptionSize.storyName = 'With inline code element + non-standard size overrides'

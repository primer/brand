import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {Card, CardIconColors} from '.'
import {Stack, LabelColors, Grid, ThemeProvider, Box, Section} from '..'
import placeholderImage from '../fixtures/images/placeholder.png'
import {CopilotIcon, ZapIcon, RocketIcon, GitBranchIcon, HeartIcon} from '@primer/octicons-react'
import {IconProps} from '../Icon'

export default {
  title: 'Components/Card/features',
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

export const MinimalDark: StoryFn<typeof Card> = args => <Minimal {...args} />
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
        <Card.Heading>Code search & code view</Card.Heading>
        <Card.Description>
          Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
        </Card.Description>
      </Card>
      <Card href="https://github.com">
        <Card.Image as="picture" src={placeholderImage} alt="placeholder, blank area with an gray background color" />
        <Card.Heading>Code search & code view</Card.Heading>
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

const fixtureData: FixtureData = [
  {
    href: 'https://github.com',
    icon: CopilotIcon,
    iconColor: 'indigo',
    heading: 'Collaboration is the key to DevOps success',
    description: 'Everything you need to know about getting started with GitHub Actions.',
  },
  {
    href: 'https://github.com',
    icon: RocketIcon,
    iconColor: 'purple',
    heading: 'GitHub Actions cheat sheet and more',
    description: (
      <React.Fragment>
        In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
      </React.Fragment>
    ),
  },
  {
    href: 'https://github.com',
    icon: GitBranchIcon,
    iconColor: 'teal',
    heading: 'How healthy teams build better software',
    description: (
      <React.Fragment>Everything you need to know about getting started with GitHub Actions.</React.Fragment>
    ),
  },
  {
    href: 'https://github.com',
    icon: HeartIcon,
    iconColor: 'pink',
    heading: 'GitHub sponsors',
    description:
      'Financially support the open source projects your code depends. with a current GitHub for Startups partner.',
  },
]

type FixtureData = {
  href: string
  icon: IconProps['icon']
  iconColor?: (typeof CardIconColors)[number]
  label?: string
  labelColor?: (typeof LabelColors)[number]
  heading: string | React.ReactElement | React.ReactElement[]
  description: string | React.ReactElement | React.ReactElement[]
}[]

export const Stacked: StoryFn<typeof Card> = () => {
  return (
    <Grid>
      {fixtureData.map(({heading, description, href, icon, iconColor}, id) => {
        return (
          <Grid.Column key={id} span={{small: 6, medium: 6, large: 3, xlarge: 3}}>
            <Card key={id} href={href}>
              <Card.Icon icon={icon} hasBackground color={iconColor} />
              <Card.Heading>{heading}</Card.Heading>
              <Card.Description>{description}</Card.Description>
            </Card>
          </Grid.Column>
        )
      })}
    </Grid>
  )
}

export const TorchlightVariant = () => {
  return (
    <>
      <Stack
        direction={{
          narrow: 'vertical',
          regular: 'horizontal',
        }}
        gap={36}
      >
        <Card variant="torchlight" href="https://github.com">
          <Card.Icon icon={ZapIcon} hasBackground />
          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
          <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
        </Card>
        <Card
          variant="torchlight"
          href="https://github.com"
          style={{['--brand-color-accent-primary' as string]: 'var(--base-color-scale-indigo-2)'}}
        >
          <Card.Icon icon={CopilotIcon} hasBackground color="indigo" />
          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
          <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
        </Card>

        <Card
          variant="torchlight"
          href="https://github.com"
          style={{['--brand-color-accent-primary' as string]: 'var(--base-color-scale-yellow-2)'}}
        >
          <Card.Icon icon={GitBranchIcon} hasBackground color="yellow" />
          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
          <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
        </Card>
      </Stack>
      <Stack
        direction={{
          narrow: 'vertical',
          regular: 'horizontal',
        }}
        gap={36}
      >
        <Card
          variant="torchlight"
          href="https://github.com"
          style={{['--brand-color-accent-primary' as string]: 'var(--base-color-scale-red-2)'}}
        >
          <Card.Icon icon={HeartIcon} hasBackground color="red" />
          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
          <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
        </Card>

        <Card
          variant="torchlight"
          href="https://github.com"
          style={{['--brand-color-accent-primary' as string]: 'var(--base-color-scale-orange-2)'}}
        >
          <Card.Icon icon={ZapIcon} hasBackground color="orange" />
          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
          <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
        </Card>
        <Card
          variant="torchlight"
          href="https://github.com"
          style={{['--brand-color-accent-primary' as string]: 'var(--base-color-scale-lime-2)'}}
        >
          <Card.Icon icon={RocketIcon} hasBackground color="lime" />
          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
          <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
        </Card>
      </Stack>
    </>
  )
}

TorchlightVariant.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <Box backgroundColor="default">
        <Story />
      </Box>
    </ThemeProvider>
  ),
]

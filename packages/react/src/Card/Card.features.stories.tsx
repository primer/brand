import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {Card, CardIconColors} from '.'
import {Avatar} from '../Avatar'
import {Token} from '../Token'
import {Box, Grid, Section, Stack, Text, ThemeProvider} from '..'
import avatarMona from '../fixtures/images/avatar-mona.png'
import darkHorizontalBannerAlt from '../fixtures/images/dark-horizontal-banner-alt.png'
import placeholderImage from '../fixtures/images/placeholder.png'
import {CopilotIcon, GitBranchIcon, RocketIcon, ZapIcon} from '@primer/octicons-react'
import {MicrosoftLogo} from '../fixtures/third-party-logos/MicrosoftLogo'
import type {IconProps} from '../Icon'
import styles from './Card.stories.shared.module.css'

type StackedCardData = {
  href: string
  icon: IconProps['icon']
  iconColor?: (typeof CardIconColors)[number]
  tokens: {
    labelKey: string
    variant?: 'default' | 'outline'
  }[]
  headingKey: string
  descriptionKey: string
}[]

const stackedCardData: StackedCardData = [
  {
    href: 'https://github.com',
    icon: CopilotIcon,
    iconColor: 'green',
    tokens: [{labelKey: 'white_paper'}, {labelKey: 'dec_25', variant: 'outline'}],
    headingKey: 'choose_your_engine',
    descriptionKey: 'choose_your_engine_description',
  },
  {
    href: 'https://github.com',
    icon: RocketIcon,
    iconColor: 'teal',
    tokens: [{labelKey: 'guide'}, {labelKey: 'mcp', variant: 'outline'}],
    headingKey: 'connect_your_ai_tools',
    descriptionKey: 'connect_your_ai_tools_description',
  },
  {
    href: 'https://github.com',
    icon: GitBranchIcon,
    iconColor: 'indigo',
    tokens: [{labelKey: 'open_source'}, {labelKey: 'updated_weekly', variant: 'outline'}],
    headingKey: 'explore_github_mcp_server',
    descriptionKey: 'explore_github_mcp_server_description',
  },
  {
    href: 'https://github.com',
    icon: RocketIcon,
    iconColor: 'orange',
    tokens: [{labelKey: 'webinar'}, {labelKey: 'apr_30', variant: 'outline'}],
    headingKey: 'scale_platform_delivery',
    descriptionKey: 'scale_platform_delivery_description',
  },
  {
    href: 'https://github.com',
    icon: CopilotIcon,
    iconColor: 'purple',
    tokens: [{labelKey: 'case_study'}, {labelKey: 'enterprise', variant: 'outline'}],
    headingKey: 'ship_secure_ai_workflows',
    descriptionKey: 'ship_secure_ai_workflows_description',
  },
  {
    href: 'https://github.com',
    icon: GitBranchIcon,
    iconColor: 'pink',
    tokens: [{labelKey: 'repository'}, {labelKey: 'starter', variant: 'outline'}],
    headingKey: 'launch_from_a_proven_template',
    descriptionKey: 'launch_from_a_proven_template_description',
  },
]

export default {
  title: 'Components/Card/Features',
  component: Card,
} as Meta<typeof Card>

export const Minimal: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Card href="https://github.com" variant="minimal">
      <Card.Heading>{t('code_search_heading')}</Card.Heading>
      <Card.Label>{t('limited')}</Card.Label>
      <Card.Description>{t('code_search_description')}</Card.Description>
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
  const {t} = useTranslation('Card')

  return (
    <Card ctaText={t('discover_how')} href="https://github.com">
      <Card.Heading>{t('github_actions_cheat_sheet')}</Card.Heading>
      <Card.Description>{t('techtarget_devops_description')}</Card.Description>
    </Card>
  )
}

const ArrowCTALongLabelCard = ({testId}: {testId?: string}) => {
  const {t} = useTranslation('Card')

  return (
    <Box style={{width: '22rem'}}>
      <Card
        data-testid={testId}
        href="https://github.com"
        fullWidth
        ctaVariant="arrow"
        ctaText={t('read_the_quick_start_guide')}
      >
        <Card.Icon icon={CopilotIcon} color="green" hasBackground />
        <Card.Tokens>
          <Token>{t('developer_docs')}</Token>
        </Card.Tokens>
        <Card.Heading>{t('github_copilot_practice')}</Card.Heading>
        <Card.Description>{t('copilot_practice_description_short')}</Card.Description>
      </Card>
    </Box>
  )
}

export const ArrowCTALongLabel: StoryFn<typeof Card> = () => {
  return <ArrowCTALongLabelCard />
}
ArrowCTALongLabel.storyName = 'Arrow CTA with long label'

export const ArrowCTALongLabelHover: StoryFn<typeof Card> = () => {
  return <ArrowCTALongLabelCard testId="hover-enabled-card" />
}
ArrowCTALongLabelHover.storyName = 'Arrow CTA with long label hover'
ArrowCTALongLabelHover.parameters = {
  pseudo: {hover: ['[data-testid="hover-enabled-card"]']},
}

export const CenterAligned: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <>
      <Section backgroundColor="default">
        <Grid>
          <Grid.Column span={{xsmall: 12, medium: 6}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>{t('code_search_heading')}</Card.Heading>
              <Card.Description>{t('techtarget_devops_description')}</Card.Description>
            </Card>
          </Grid.Column>
          <Grid.Column span={{xsmall: 12, medium: 6}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>{t('code_search_heading')}</Card.Heading>
              <Card.Description>{t('techtarget_devops_description')}</Card.Description>
            </Card>
          </Grid.Column>
        </Grid>
      </Section>
      <Section backgroundColor="subtle">
        <Grid>
          <Grid.Column span={{xsmall: 12, medium: 4}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>{t('code_search_heading')}</Card.Heading>
              <Card.Description>{t('techtarget_devops_description')}</Card.Description>
            </Card>
          </Grid.Column>
          <Grid.Column span={{xsmall: 12, medium: 4}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>{t('code_search_heading')}</Card.Heading>
              <Card.Description>{t('techtarget_devops_description')}</Card.Description>
            </Card>
          </Grid.Column>
          <Grid.Column span={{xsmall: 12, medium: 4}}>
            <Card hasBorder fullWidth align="center" href="https://github.com">
              <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
              <Card.Heading>{t('code_search_heading')}</Card.Heading>
              <Card.Description>{t('techtarget_devops_description')}</Card.Description>
            </Card>
          </Grid.Column>
        </Grid>
      </Section>
    </>
  )
}
CenterAligned.storyName = 'Align center'

export const FullWidth: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Section>
      <Grid>
        <Grid.Column>
          <Card href="https://github.com" fullWidth hasBorder>
            <Card.Image aspectRatio="16:10" src={placeholderImage} alt={t('placeholder_alt')} />
            <Card.Heading>{t('github_actions_cheat_sheet')}</Card.Heading>
            <Card.Description>{t('full_width_description')}</Card.Description>
          </Card>
        </Grid.Column>
      </Grid>
    </Section>
  )
}

export const Label: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Card href="https://github.com">
      <Card.Heading>{t('code_search_heading')}</Card.Heading>
      <Card.Label>{t('limited')}</Card.Label>
      <Card.Description>{t('code_search_description')}</Card.Description>
    </Card>
  )
}

export const Icon: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Card href="https://github.com">
      <Card.Icon icon={RocketIcon} />
      <Card.Heading>{t('code_search_heading')}</Card.Heading>
      <Card.Description>{t('code_search_description')}</Card.Description>
    </Card>
  )
}

export const Border: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Card href="https://github.com" hasBorder>
      <Card.Icon icon={RocketIcon} />
      <Card.Heading>{t('code_search_heading')}</Card.Heading>
      <Card.Description>{t('code_search_description')}</Card.Description>
    </Card>
  )
}

export const IconColors: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Stack padding="none" direction="horizontal" gap="normal" style={{flexWrap: 'wrap'}}>
      {CardIconColors.map((color, id) => {
        return (
          <Card key={id} href="https://github.com">
            <Card.Icon icon={CopilotIcon} hasBackground color={color} />
            <Card.Heading>{t('default_heading')}</Card.Heading>
            <Card.Description>
              {t('this_card_uses_the')} <b>{color}</b> {t('icon_color')}
            </Card.Description>
          </Card>
        )
      })}
    </Stack>
  )
}

export const WithIconSVG = () => {
  const {t} = useTranslation('Card')

  return (
    <Card href="https://github.com">
      <Card.Icon
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            aria-label={t('magnifying_glass_icon')}
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
      <Card.Heading>{t('code_search_heading')}</Card.Heading>
      <Card.Description>{t('code_search_description')}</Card.Description>
    </Card>
  )
}
WithIconSVG.storyName = 'Icon (native)'

export const IconAndLabel: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Card href="https://github.com">
      <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
      <Card.Heading>{t('code_search_heading')}</Card.Heading>
      <Card.Label color="blue-purple">{t('beta')}</Card.Label>
      <Card.Description>{t('code_search_description')}</Card.Description>
    </Card>
  )
}

export const IconAndLabelWithFragment: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Card href="https://github.com">
      <>
        <Card.Heading>{t('code_search_heading')}</Card.Heading>
        <Card.Label color="blue-purple">{t('beta')}</Card.Label>
        <Card.Icon icon={ZapIcon} color="purple" hasBackground />
        <Card.Description>{t('code_search_description')}</Card.Description>
      </>
    </Card>
  )
}

export const Image: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Stack direction="horizontal">
      <Card href="https://github.com">
        <Card.Image src={placeholderImage} alt={t('placeholder_alt')} />
        <Card.Heading>{t('image_at_the_top')}</Card.Heading>
        <Card.Description>{t('code_search_description')}</Card.Description>
      </Card>
      <Card href="https://github.com">
        <Card.Image position="block-end" as="picture" src={placeholderImage} alt={t('placeholder_alt')} />
        <Card.Heading>{t('image_at_the_bottom')}</Card.Heading>
        <Card.Description>{t('code_search_description')}</Card.Description>
      </Card>
    </Stack>
  )
}

export const ImageAndLabel: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Card href="https://github.com">
      <Card.Image src={placeholderImage} alt={t('placeholder_alt')} />
      <Card.Heading>{t('code_search_heading')}</Card.Heading>
      <Card.Label color="blue-purple">{t('beta')}</Card.Label>
      <Card.Description>{t('code_search_description')}</Card.Description>
    </Card>
  )
}

export const ImageUsingPictureElement: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Card href="https://github.com">
      <Card.Image as="picture" src={placeholderImage} alt={t('placeholder_alt')} />
      <Card.Heading>{t('code_search_heading')}</Card.Heading>
      <Card.Description>{t('code_search_description')}</Card.Description>
    </Card>
  )
}

export const LeadingVisualWithArrowCTA: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Box style={{width: '27rem', minHeight: '25.4375rem'}}>
      <Card
        href="https://github.com"
        fullWidth
        ctaVariant="arrow"
        leadingVisual={<MicrosoftLogo />}
        style={{minHeight: '25.4375rem'}}
      >
        <Card.Heading>{t('microsoft_empowerment_heading')}</Card.Heading>
        <Card.Description>{t('paulo_londra_title')}</Card.Description>
      </Card>
    </Box>
  )
}
LeadingVisualWithArrowCTA.storyName = 'Leading visual + arrow CTA'

export const WithTokens: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Box>
      <Card href="https://github.com" fullWidth hasBorder ctaVariant="arrow">
        <Card.Icon icon={CopilotIcon} hasBackground />
        <Card.Tokens>
          <Token>{t('topic')}</Token>
          <Token variant="outline">{t('dec_25')}</Token>
        </Card.Tokens>
        <Card.Heading>{t('choose_your_engine')}</Card.Heading>
        <Card.Description>{t('choose_your_engine_description')}</Card.Description>
      </Card>
    </Box>
  )
}
WithTokens.storyName = 'With tokens'

export const WithBlockEndTokens: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Box style={{width: '22rem'}}>
      <Card href="https://github.com" fullWidth ctaVariant="none">
        <Card.Image src={darkHorizontalBannerAlt} alt={t('abstract_blue_green_gradient_illustration')} />
        <Card.Heading>{t('github_engineering_codespaces_heading')}</Card.Heading>
        <Card.Description>{t('dependabot_improvements_description')}</Card.Description>
        <Card.Tokens position="block-end">
          <Token leadingVisual={<Avatar src={avatarMona} alt={t('mona_lisa')} size={32} />}>{t('mona_lisa')}</Token>
          <Token variant="outline">{t('dec_25')}</Token>
        </Card.Tokens>
      </Card>
    </Box>
  )
}
WithBlockEndTokens.storyName = 'With block-end tokens'

export const Stacked: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Box className={styles.gridFrame}>
      <Box className={styles.gridContent}>
        <Grid columnGap="none" rowGap="none" enableGutters={false}>
          {stackedCardData.map(({headingKey, descriptionKey, href, icon, iconColor, tokens}, id) => {
            return (
              <Grid.Column key={id} span={{xsmall: 12, xlarge: 4}} className={styles.gridColumn}>
                <Box className={styles.gridItem} padding="normal">
                  <Card href={href} fullWidth ctaVariant="arrow">
                    <Card.Icon icon={icon} hasBackground color={iconColor} />
                    <Card.Tokens>
                      {tokens.map(({labelKey, variant}) => (
                        <Token key={labelKey} variant={variant}>
                          {t(labelKey)}
                        </Token>
                      ))}
                    </Card.Tokens>
                    <Card.Heading>{t(headingKey)}</Card.Heading>
                    <Card.Description>{t(descriptionKey)}</Card.Description>
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
  const {t} = useTranslation('Card')

  return (
    <Stack direction="vertical" gap="spacious">
      <Stack direction={{narrow: 'vertical', wide: 'horizontal'}} gap="normal">
        <Stack direction="vertical" gap="normal">
          <Text as="p">{t('default_label')}</Text>
          <Card href="https://github.com">
            <Card.Heading>
              {t('use_any')} <code>/model</code> {t('parallelize_with')} <code>/fleet</code>
            </Card.Heading>
            <Card.Description>
              {t('use')} <code>/model</code> {t('to_switch_then')} <code>/fleet</code> {t('to_execute_in_parallel')}
            </Card.Description>
          </Card>
        </Stack>
        <Stack direction="vertical" gap="normal">
          <Text as="p">{t('disable_animation_label')}</Text>
          <Card href="https://github.com" disableAnimation>
            <Card.Heading>
              {t('use_any')} <code>/model</code> {t('parallelize_with')} <code>/fleet</code>
            </Card.Heading>
            <Card.Description>
              {t('use')} <code>/model</code> {t('to_switch_then')} <code>/fleet</code> {t('to_execute_in_parallel')}
            </Card.Description>
          </Card>
        </Stack>
        <Stack direction="vertical" gap="normal">
          <Text as="p">{t('minimal_variant_label')}</Text>
          <Card href="https://github.com" variant="minimal">
            <Card.Heading>
              {t('use_any')} <code>/model</code> {t('parallelize_with')} <code>/fleet</code>
            </Card.Heading>
            <Card.Description>
              {t('use')} <code>/model</code> {t('to_switch_then')} <code>/fleet</code> {t('to_execute_in_parallel')}
            </Card.Description>
          </Card>
        </Stack>
      </Stack>
      <Stack direction={{narrow: 'vertical', wide: 'horizontal'}} gap="normal">
        <Stack direction="vertical" gap="normal">
          <Text as="p">{t('center_aligned_with_icon_label')}</Text>
          <Card href="https://github.com" hasBorder fullWidth align="center">
            <Card.Icon icon={CopilotIcon} color="purple" hasBackground />
            <Card.Heading>
              {t('use_any')} <code>/model</code> {t('parallelize_with')} <code>/fleet</code>
            </Card.Heading>
            <Card.Description>
              {t('use')} <code>/model</code> {t('to_switch_then')} <code>/fleet</code> {t('to_execute_in_parallel')}
            </Card.Description>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  )
}

export const WithInlineCodeElementCustomDescriptionSize: StoryFn<typeof Card> = () => {
  const {t} = useTranslation('Card')

  return (
    <Stack direction={{narrow: 'vertical', wide: 'horizontal'}} gap="normal">
      <Stack direction="vertical" gap="normal">
        <Text as="p">{t('larger_heading_and_description_label')}</Text>
        <Card href="https://github.com">
          <Card.Heading size="5">
            {t('use_any')} <code>/model</code> {t('parallelize_with')} <code>/fleet</code>
          </Card.Heading>
          <Card.Description>
            <Text size="400">
              {t('use')} <code>/model</code> {t('to_switch_then')} <code>/fleet</code> {t('to_execute_in_parallel')}
            </Text>
          </Card.Description>
        </Card>
      </Stack>
      <Stack direction="vertical" gap="normal">
        <Text as="p">{t('smaller_heading_and_description_label')}</Text>
        <Card href="https://github.com">
          <Card.Heading size="subhead-medium">
            {t('use_any')} <code>/model</code> {t('parallelize_with')} <code>/fleet</code>
          </Card.Heading>
          <Card.Description>
            <Text size="100">
              {t('use')} <code>/model</code> {t('to_switch_then')} <code>/fleet</code> {t('to_execute_in_parallel')}
            </Text>
          </Card.Description>
        </Card>
      </Stack>
    </Stack>
  )
}
WithInlineCodeElementCustomDescriptionSize.storyName = 'With inline code element + non-standard size overrides'

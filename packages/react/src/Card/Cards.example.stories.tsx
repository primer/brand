import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {clsx} from 'clsx'
import {BookIcon, CopilotIcon, ShieldCheckIcon} from '@primer/octicons-react'
import {useTranslation} from 'react-i18next'

import styles from './Card.stories.shared.module.css'
import {Card} from '.'
import {Avatar, Box, Grid, Section, SectionIntro, Stack, Token} from '..'
import avatarMona from '../fixtures/images/avatar-mona.png'
import darkHorizontalBannerAlt from '../fixtures/images/dark-horizontal-banner-alt.png'

type StoryProps = Record<string, never>

const meta = {
  title: 'Components/Card/Examples',
  component: Card as unknown as Meta<StoryProps>['component'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

const editorialCards = [
  {headingKey: 'github_engineering_codespaces_heading', descriptionKey: 'dependabot_improvements_description'},
  {headingKey: 'debug_code_with_github_copilot_heading', descriptionKey: 'dependabot_improvements_description'},
  {headingKey: 'supercharge_your_developer_career_heading', descriptionKey: 'dependabot_improvements_description'},
  {headingKey: 'github_engineering_codespaces_heading', descriptionKey: 'dependabot_improvements_description'},
  {headingKey: 'debug_code_with_github_copilot_heading', descriptionKey: 'dependabot_improvements_description'},
  {headingKey: 'supercharge_your_developer_career_heading', descriptionKey: 'dependabot_improvements_description'},
] as const

const relatedContentCards = [
  {
    href: 'https://github.com/skills/copilot',
    ctaTextKey: 'start',
    icon: CopilotIcon,
    tokenKey: 'developer_docs',
    headingKey: 'github_copilot_practice',
    descriptionKey: 'copilot_practice_description',
  },
  {
    href: 'https://github.com/advisories',
    ctaTextKey: 'explore_database',
    icon: ShieldCheckIcon,
    tokenKey: 'advisory',
    headingKey: 'github_advisory_database',
    descriptionKey: 'github_advisory_database_description',
  },
  {
    href: 'https://github.com/resources/articles',
    ctaTextKey: 'read_the_quick_start_guide',
    icon: BookIcon,
    tokenKey: 'blog',
    headingKey: 'quick_start_guides',
    descriptionKey: 'quick_start_guides_description',
  },
] as const

export const Editorial: Story = {
  render: function EditorialComponent() {
    const {t} = useTranslation('Card')

    return (
      <Section fullWidth paddingBlockStart="condensed" paddingBlockEnd="normal">
        <Stack direction="vertical" padding="none" gap="spacious">
          <SectionIntro align="center" fullWidth>
            <SectionIntro.Heading as="h2" size="3">
              {t('explore_ai_at_github')}
            </SectionIntro.Heading>
          </SectionIntro>

          <Box className={styles.gridFrame}>
            <Box className={clsx(styles.gridContent, styles.gridContentWide)}>
              <Grid columnGap="none" rowGap="none" enableGutters={false}>
                {editorialCards.map((card, index) => {
                  return (
                    <Grid.Column
                      key={`${card.headingKey}-${index}`}
                      span={{xsmall: 12, large: 4}}
                      className={styles.gridColumn}
                    >
                      <Box className={styles.gridItem} padding="normal">
                        <Card
                          href="https://github.com/resources/articles"
                          fullWidth
                          ctaVariant="none"
                          backgroundColor="none"
                        >
                          <Card.Image
                            src={darkHorizontalBannerAlt}
                            alt={t('abstract_blue_green_gradient_illustration')}
                            aspectRatio="16:10"
                          />
                          <Card.Heading>{t(card.headingKey)}</Card.Heading>
                          <Card.Description>{t(card.descriptionKey)}</Card.Description>
                          <Card.Tokens position="block-end">
                            <Token leadingVisual={<Avatar src={avatarMona} alt={t('mona_lisa')} size={32} />}>
                              {t('mona_lisa')}
                            </Token>
                            <Token variant="outline">{t('dec_25')}</Token>
                          </Card.Tokens>
                        </Card>
                      </Box>
                    </Grid.Column>
                  )
                })}
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Section>
    )
  },
}

export const RelatedContent: Story = {
  name: 'Related content',
  render: function RelatedContentComponent() {
    const {t} = useTranslation('Card')

    return (
      <Section fullWidth paddingBlockStart="condensed" paddingBlockEnd="normal">
        <Stack direction="vertical" padding="none" gap="spacious">
          <SectionIntro align="center" fullWidth>
            <SectionIntro.Heading as="h2" size="3">
              {t('get_the_most_out_of_github_copilot_in_your_ide')}
            </SectionIntro.Heading>
          </SectionIntro>

          <Box className={styles.gridFrame}>
            <Box className={clsx(styles.gridContent, styles.gridContentWide)}>
              <Grid columnGap="none" rowGap="none" enableGutters={false}>
                {relatedContentCards.map(card => {
                  return (
                    <Grid.Column
                      key={card.headingKey}
                      span={{xsmall: 12, large: 4}}
                      className={clsx(styles.gridColumn, styles.gridColumnArrowHover)}
                    >
                      <Box className={styles.gridItem} padding={24}>
                        <Card href={card.href} fullWidth ctaVariant="arrow" ctaText={t(card.ctaTextKey)}>
                          <Card.Icon icon={card.icon} color="green" hasBackground />
                          <Card.Tokens>
                            <Token>{t(card.tokenKey)}</Token>
                          </Card.Tokens>
                          <Card.Heading>{t(card.headingKey)}</Card.Heading>
                          <Card.Description>{t(card.descriptionKey)}</Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                  )
                })}
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Section>
    )
  },
}

export const CaseStudies: Story = {
  name: 'Case studies',
  render: function CaseStudiesComponent() {
    const {t} = useTranslation('Card')

    return (
      <Section fullWidth paddingBlockStart="condensed" paddingBlockEnd="normal">
        <Stack direction="vertical" padding="none" gap="spacious">
          <SectionIntro align="center" fullWidth>
            <SectionIntro.Heading as="h2" size="3">
              {t('adopted_by_worlds_leading_organizations')}
            </SectionIntro.Heading>
          </SectionIntro>

          <Box className={styles.gridFrame}>
            <Box className={clsx(styles.gridContent, styles.gridContentWide)}>
              <Grid columnGap="none" rowGap="none" enableGutters={false}>
                <Grid.Column
                  span={{xsmall: 12, large: 4}}
                  className={clsx(styles.gridColumn, styles.gridColumnArrowHover)}
                >
                  <Box className={styles.gridItem} padding={24} style={{minHeight: '21.125rem'}}>
                    <Card
                      href="https://github.com/customer-stories/microsoft"
                      fullWidth
                      ctaVariant="arrow"
                      ctaText={t('learn_more')}
                      leadingVisual={
                        <svg
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 41 41"
                          width="41"
                          height="41"
                          fill="none"
                        >
                          <title>{t('microsoft')}</title>
                          <path
                            fill="#57606A"
                            d="m.816 6.404 16.346-2.22.008 15.72-16.34.093L.817 6.404Zm16.339 15.311.012 15.733-16.339-2.24V21.61l16.327.106Zm1.981-17.82L40.811.74v18.963l-21.675.171V3.895Zm21.68 17.968L40.81 40.74l-21.675-3.05-.03-15.863 21.71.035Z"
                          />
                        </svg>
                      }
                    >
                      <Card.Heading>{t('microsoft_case_study_heading')}</Card.Heading>
                    </Card>
                  </Box>
                </Grid.Column>

                <Grid.Column
                  span={{xsmall: 12, large: 4}}
                  className={clsx(styles.gridColumn, styles.gridColumnArrowHover)}
                >
                  <Box className={styles.gridItem} padding={24} style={{minHeight: '21.125rem'}}>
                    <Card
                      href="https://github.com/customer-stories/shopify"
                      fullWidth
                      ctaVariant="arrow"
                      ctaText={t('learn_more')}
                      leadingVisual={
                        <svg
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 174 50"
                          width="174"
                          height="50"
                          fill="none"
                        >
                          <title>{t('shopify')}</title>
                          <path
                            fill="#57606A"
                            d="M60.128 27.374c-1.469-.812-2.242-1.469-2.242-2.397 0-1.198 1.044-1.933 2.706-1.933 1.933 0 3.634.812 3.634.812l1.353-4.137s-1.237-.966-4.91-.966c-5.103 0-8.66 2.938-8.66 7.036 0 2.32 1.663 4.098 3.866 5.374 1.779 1.005 2.397 1.74 2.397 2.783 0 1.122-.889 2.01-2.551 2.01-2.474 0-4.794-1.275-4.794-1.275l-1.43 4.137s2.164 1.43 5.76 1.43c5.258 0 9.008-2.59 9.008-7.23.077-2.551-1.856-4.33-4.137-5.644ZM81.082 18.676c-2.59 0-4.6 1.237-6.186 3.093l-.077-.04 2.242-11.752h-5.876l-5.683 29.885h5.838l1.933-10.207c.773-3.866 2.744-6.224 4.6-6.224 1.315 0 1.817.889 1.817 2.165 0 .812-.077 1.778-.27 2.59L77.216 39.9h5.838l2.28-12.062c.271-1.276.426-2.783.426-3.827.077-3.364-1.624-5.335-4.678-5.335ZM99.06 18.676c-7.037 0-11.715 6.34-11.715 13.415 0 4.523 2.784 8.196 8.041 8.196 6.921 0 11.56-6.186 11.56-13.415.038-4.214-2.397-8.196-7.887-8.196Zm-2.862 17.088c-2.01 0-2.822-1.701-2.822-3.828 0-3.363 1.74-8.814 4.91-8.814 2.088 0 2.745 1.778 2.745 3.518 0 3.634-1.74 9.124-4.833 9.124ZM121.946 18.676c-3.943 0-6.186 3.48-6.186 3.48h-.077l.348-3.132h-5.181c-.27 2.126-.734 5.335-1.198 7.77l-4.059 21.341h5.837l1.624-8.66h.116s1.199.773 3.441.773c6.881 0 11.366-7.036 11.366-14.15 0-3.904-1.74-7.422-6.031-7.422Zm-5.567 17.204c-1.508 0-2.397-.85-2.397-.85l.966-5.452c.696-3.634 2.591-6.07 4.601-6.07 1.778 0 2.32 1.663 2.32 3.21 0 3.75-2.243 9.162-5.49 9.162ZM136.328 10.286c-1.856 0-3.364 1.47-3.364 3.402 0 1.74 1.083 2.938 2.745 2.938h.077c1.817 0 3.402-1.237 3.441-3.402.039-1.74-1.121-2.938-2.899-2.938ZM128.132 39.862h5.876l3.982-20.722h-5.915l-3.943 20.722ZM152.836 19.1h-4.06l.194-.966c.347-2.01 1.507-3.788 3.479-3.788 1.044 0 1.856.309 1.856.309l1.159-4.562s-1.005-.503-3.17-.503c-2.087 0-4.136.58-5.721 1.933-2.011 1.701-2.939 4.137-3.402 6.611l-.155.967h-2.706l-.851 4.407h2.706l-3.092 16.353h5.837l3.093-16.353h4.021l.812-4.407ZM166.908 19.14s-3.673 9.2-5.297 14.227h-.077c-.116-1.624-1.43-14.227-1.43-14.227h-6.147l3.518 19.02c.077.426.038.696-.116.967-.696 1.314-1.817 2.59-3.17 3.518-1.083.812-2.32 1.315-3.286 1.662l1.623 4.949c1.199-.27 3.634-1.237 5.722-3.17 2.668-2.513 5.142-6.34 7.655-11.598l7.152-15.348h-6.147ZM29.354 5.686s-.54.154-1.43.425a11.31 11.31 0 0 0-.696-1.701c-1.005-1.933-2.513-2.977-4.291-2.977-.116 0-.232 0-.387.039-.038-.078-.116-.116-.154-.194C21.622.428 20.617.041 19.419.08c-2.32.077-4.64 1.74-6.495 4.716-1.315 2.088-2.32 4.717-2.59 6.766-2.668.812-4.524 1.392-4.562 1.43-1.353.426-1.392.464-1.547 1.74C4.11 15.699.552 42.915.552 42.915L29.78 47.98V5.647c-.232 0-.348.039-.426.039ZM22.59 7.773c-1.546.464-3.248 1.005-4.91 1.508.464-1.817 1.392-3.634 2.474-4.833.425-.425 1.005-.927 1.663-1.237.657 1.392.812 3.286.773 4.562Zm-3.17-6.108c.541 0 1.005.116 1.392.348-.62.31-1.238.812-1.817 1.392-1.47 1.585-2.59 4.059-3.055 6.417-1.392.425-2.783.85-4.059 1.237.85-3.711 3.982-9.317 7.539-9.394Zm-4.485 21.263c.155 2.474 6.688 3.015 7.075 8.853.27 4.6-2.436 7.732-6.34 7.964-4.717.31-7.307-2.474-7.307-2.474l1.005-4.253s2.59 1.972 4.678 1.817c1.353-.077 1.856-1.198 1.817-1.971-.193-3.248-5.528-3.054-5.876-8.39-.31-4.484 2.628-9.007 9.123-9.433 2.513-.154 3.79.464 3.79.464l-1.47 5.567s-1.662-.773-3.634-.618c-2.86.193-2.9 2.01-2.86 2.474Zm9.201-15.619c0-1.16-.154-2.822-.696-4.214 1.779.348 2.63 2.32 3.016 3.518-.696.194-1.47.426-2.32.696ZM30.669 47.903l12.14-3.016S37.588 9.59 37.55 9.358a.45.45 0 0 0-.426-.386c-.193 0-3.595-.078-3.595-.078s-2.088-2.01-2.861-2.783v41.792Z"
                          />
                        </svg>
                      }
                    >
                      <Card.Heading>{t('shopify_case_study_heading')}</Card.Heading>
                    </Card>
                  </Box>
                </Grid.Column>

                <Grid.Column
                  span={{xsmall: 12, large: 4}}
                  className={clsx(styles.gridColumn, styles.gridColumnArrowHover)}
                >
                  <Box className={styles.gridItem} padding={24} style={{minHeight: '21.125rem'}}>
                    <Card
                      href="https://github.com/customer-stories/twilio"
                      fullWidth
                      ctaVariant="arrow"
                      ctaText={t('learn_more')}
                      leadingVisual={
                        <svg
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 134 40"
                          width="134"
                          height="40"
                          fill="none"
                        >
                          <title>{t('twilio')}</title>
                          <path
                            fill="#57606A"
                            fillRule="evenodd"
                            d="M93.765 7.84h-7.04c-.16 0-.32.16-.32.32v4.08c0 .16.16.32.32.32h7.04c.16 0 .32-.16.32-.32V8.16c.08-.16-.08-.32-.32-.32Zm-.08 6.08h-13.6c-.16 0-.4.16-.48.32l-1.76 6.64-.08.32-2.08-7.12c-.08-.16-.24-.32-.48-.32h-5.28c-.16 0-.4.16-.48.32l-2 6.64-.08.32-.08-.16-.8-3.28-.88-3.28c-.08-.16-.24-.32-.48-.32h-10.64V8.24c0-.16-.24-.4-.48-.32L47.285 10c-.24.08-.32.16-.32.32v3.6h-1.76c-.16 0-.32.16-.32.32v5.12c0 .16.16.32.32.32h1.76v6.24c0 4.4 2.4 6.48 6.8 6.48 1.84 0 3.6-.4 4.8-1.04v-5.28c0-.24-.24-.32-.4-.32-.72.32-1.28.4-1.92.4-1.2 0-1.84-.48-1.84-1.84v-4.56h3.84c.16 0 .32-.16.32-.32v-4.32l5.04 16.72c.08.16.24.32.48.32h5.6c.16 0 .4-.16.48-.32l2.4-7.44 1.2 3.84 1.12 3.52c.08.16.24.32.48.32h5.6c.16 0 .4-.16.48-.32l5.12-16.8v16.8c0 .16.16.32.32.32h6.8c.16 0 .32-.16.32-.32V14.32c0-.24-.16-.4-.32-.4Zm8.96-6.08h-6.8c-.16 0-.32.16-.32.32v23.6c0 .16.16.32.32.32h6.8c.16 0 .32-.16.32-.32V8.16c0-.16-.16-.32-.32-.32Zm9.04 0h-7.04c-.16 0-.32.16-.32.32v4.08c0 .16.16.32.32.32h7.04c.16 0 .32-.16.32-.32V8.16c.08-.16-.08-.32-.32-.32Zm-.08 6.08h-6.8c-.16 0-.32.16-.32.32v17.52c0 .16.16.32.32.32h6.8c.16 0 .32-.16.32-.32V14.32c0-.24-.16-.4-.32-.4Zm11.28-.4c-6 0-10.24 4.4-10.24 9.52v.08c0 5.12 4.24 9.44 10.16 9.44 6 0 10.24-4.4 10.24-9.52v-.08c0-5.12-4.24-9.44-10.16-9.44Zm2.88 9.52c0 1.76-1.2 3.12-2.88 3.12s-2.96-1.44-2.96-3.2v-.08c0-1.76 1.2-3.12 2.88-3.12s2.96 1.44 2.96 3.28ZM20.085 0c-11.04 0-20 8.96-20 20s8.96 20 20 20 20-8.96 20-20-8.96-20-20-20Zm0 34.72c-8.16 0-14.72-6.56-14.72-14.72s6.56-14.72 14.72-14.72 14.72 6.56 14.72 14.72-6.56 14.72-14.72 14.72Zm4.96-15.52a4.16 4.16 0 1 0 0-8.32 4.16 4.16 0 0 0 0 8.32Zm4.16 5.76a4.16 4.16 0 1 1-8.32 0 4.16 4.16 0 0 1 8.32 0Zm-14.08 4.16a4.16 4.16 0 1 0 0-8.32 4.16 4.16 0 0 0 0 8.32Zm4.16-14.08a4.16 4.16 0 1 1-8.32 0 4.16 4.16 0 0 1 8.32 0Z"
                          />
                        </svg>
                      }
                    >
                      <Card.Heading>{t('twilio_case_study_heading')}</Card.Heading>
                    </Card>
                  </Box>
                </Grid.Column>
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Section>
    )
  },
}

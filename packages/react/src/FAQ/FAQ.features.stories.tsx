import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Trans, useTranslation} from 'react-i18next'
import {FAQ, FAQGroup} from '.'
import {Prose} from '..'
import {Container} from '../component-helpers'

const meta = {
  title: 'Components/FAQ/features',
  component: FAQ,
  parameters: {
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          /**
           * Disabling due to a flakey test.
           * Muted text color passing elsewhere, so this seems like a false positive.
           */
          {id: 'color-contrast', enabled: false},
        ],
      },
    },
  },
  globals: {
    viewport: {},
  },
} satisfies Meta<typeof FAQ>

export default meta
type Story = StoryObj<typeof meta>

type FixtureData = {
  question: string
  answer: React.ReactElement | React.ReactElement[]
}[]

const useFixtureData = (): FixtureData => {
  const {t} = useTranslation('FAQ')
  const textLink = (
    <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
      {t('here')}
    </a>
  )

  return [
    {
      question: t('fixture_question_first'),
      answer: (
        <p>
          <Trans t={t} i18nKey="fixture_answer" components={{textLink}} />
        </p>
      ),
    },
    {
      question: t('fixture_question_second'),
      answer: (
        <React.Fragment>
          <p>
            <Trans t={t} i18nKey="fixture_answer" components={{textLink}} />
          </p>
          <ol>
            <li>{t('must_be_associated')}</li>
            <li>{t('self_funded')}</li>
            <li>{t('not_current_customer')}</li>
            <li>{t('no_previous_credits')}</li>
          </ol>
        </React.Fragment>
      ),
    },
    {
      question: t('fixture_question_third'),
      answer: (
        <React.Fragment>
          <p>
            <Trans t={t} i18nKey="fixture_answer" components={{textLink}} />
          </p>
          <p>{t('fixture_answer_additional')}</p>
        </React.Fragment>
      ),
    },
  ]
}

export const AllClosed: Story = {
  render: function AllClosedComponent() {
    const {t} = useTranslation('FAQ')
    const fixtureData = useFixtureData()

    return (
      <Container>
        <FAQ>
          <FAQ.Heading>{t('heading')}</FAQ.Heading>
          <>
            {fixtureData.map(({question, answer}) => {
              return (
                <FAQ.Item key={question} name="faq" open={false}>
                  <FAQ.Question>{question}</FAQ.Question>
                  <FAQ.Answer>{answer}</FAQ.Answer>
                </FAQ.Item>
              )
            })}
          </>
        </FAQ>
      </Container>
    )
  },
}

export const AllOpen: Story = {
  render: function AllOpenComponent() {
    const {t} = useTranslation('FAQ')
    const fixtureData = useFixtureData()

    return (
      <Container>
        <FAQ>
          <FAQ.Heading>{t('heading')}</FAQ.Heading>
          <>
            {fixtureData.map(({question, answer}) => {
              return (
                <FAQ.Item key={question} open={true}>
                  <FAQ.Question>{question}</FAQ.Question>
                  <FAQ.Answer>{answer}</FAQ.Answer>
                </FAQ.Item>
              )
            })}
          </>
        </FAQ>
      </Container>
    )
  },
  parameters: {
    axe: {
      timeout: 5000,
    },
  },
}

export const Localized: Story = {
  name: 'Localized',
  render: function LocalizedContentComponent(args) {
    const {t} = useTranslation('FAQ')

    return (
      <Container>
        <FAQ {...args}>
          <FAQ.Item open>
            <FAQ.Question>{t('codespace_question')}</FAQ.Question>
            <FAQ.Answer>
              <p>{t('codespace_answer')}</p>
            </FAQ.Answer>
          </FAQ.Item>
        </FAQ>
      </Container>
    )
  },
}

export const ReversedToggles: Story = {
  render: function ReversedTogglesComponent() {
    const {t} = useTranslation('FAQ')
    const fixtureData = useFixtureData()

    return (
      <Container>
        <FAQ>
          <FAQ.Heading>{t('heading')}</FAQ.Heading>
          <>
            {fixtureData.map(({question, answer}, index) => {
              return (
                <FAQ.Item key={question} name="faq" open={index === 0}>
                  <FAQ.Question reversedToggles>{question}</FAQ.Question>
                  <FAQ.Answer>{answer}</FAQ.Answer>
                </FAQ.Item>
              )
            })}
          </>
        </FAQ>
      </Container>
    )
  },
  parameters: {
    axe: {
      timeout: 5000,
    },
  },
}

export const HeadingLeftAligned: Story = {
  render: function HeadingLeftAlignedComponent() {
    const {t} = useTranslation('FAQ')
    const fixtureData = useFixtureData()

    return (
      <Container>
        <FAQ>
          <FAQ.Heading align="start">{t('heading')}</FAQ.Heading>
          <>
            {fixtureData.map(({question, answer}, index) => {
              return (
                <FAQ.Item key={question} name="faq" open={index === 0}>
                  <FAQ.Question>{question}</FAQ.Question>
                  <FAQ.Answer>{answer}</FAQ.Answer>
                </FAQ.Item>
              )
            })}
          </>
        </FAQ>
      </Container>
    )
  },
}

export const WithSubheadings: Story = {
  render: function WithSubheadingsComponent() {
    const {t} = useTranslation('FAQ')
    const fixtureData = useFixtureData()

    return (
      <Container>
        <FAQ>
          <FAQ.Heading>{t('heading')}</FAQ.Heading>
          <FAQ.Subheading>{t('group_label')}</FAQ.Subheading>
          <>
            {fixtureData.map(({question, answer}, index) => {
              return (
                <FAQ.Item key={question} name="faq" open={index === 0}>
                  <FAQ.Question>{question}</FAQ.Question>
                  <FAQ.Answer>{answer}</FAQ.Answer>
                </FAQ.Item>
              )
            })}
          </>
          <FAQ.Subheading>{t('group_label')}</FAQ.Subheading>
          <>
            {fixtureData.map(({question, answer}) => {
              return (
                <FAQ.Item key={question} name="faq">
                  <FAQ.Question>{question}</FAQ.Question>
                  <FAQ.Answer>{answer}</FAQ.Answer>
                </FAQ.Item>
              )
            })}
          </>
        </FAQ>
      </Container>
    )
  },
}

const FAQGroupExample = ({variant}: {variant?: 'default' | 'gridline'}) => {
  const {t} = useTranslation('FAQ')
  const textLink = (
    <a href="/" target="_blank" rel="noreferrer">
      {t('here')}
    </a>
  )

  return (
    <FAQGroup variant={variant}>
      <FAQGroup.Heading>
        <Trans t={t} i18nKey="group_heading" components={{lineBreak: <br />}} />
      </FAQGroup.Heading>
      <FAQ variant={variant}>
        <FAQ.Heading>{t('using_enterprise')}</FAQ.Heading>
        <FAQ.Item name="faq-group-1" open>
          <FAQ.Question>{t('enterprise_question')}</FAQ.Question>
          <FAQ.Answer>
            <p>
              <Trans t={t} i18nKey="enterprise_answer_first" components={{textLink}} />
            </p>
          </FAQ.Answer>
        </FAQ.Item>
        <FAQ.Item name="faq-group-1">
          <FAQ.Question>{t('enterprise_deployment_question')}</FAQ.Question>
          <FAQ.Answer>
            <p>
              <Trans t={t} i18nKey="enterprise_answer_second" components={{textLink}} />
            </p>
          </FAQ.Answer>
        </FAQ.Item>
        <FAQ.Item name="faq-group-1">
          <FAQ.Question>{t('enterprise_cloud_question')}</FAQ.Question>
          <FAQ.Answer>
            <p>
              <Trans t={t} i18nKey="enterprise_answer_third" components={{textLink}} />
            </p>
          </FAQ.Answer>
        </FAQ.Item>
      </FAQ>

      <FAQ variant={variant}>
        <FAQ.Heading>{t('about_enterprise')}</FAQ.Heading>
        <FAQ.Item name="faq-group-2" open>
          <FAQ.Question>{t('enterprise_difference_question')}</FAQ.Question>
          <FAQ.Answer>
            <p>{t('enterprise_answer_plain')}</p>
          </FAQ.Answer>
        </FAQ.Item>
        <FAQ.Item name="faq-group-2">
          <FAQ.Question>{t('enterprise_why_question')}</FAQ.Question>
          <FAQ.Answer>
            <p>{t('enterprise_answer_plain')}</p>
          </FAQ.Answer>
        </FAQ.Item>
        <FAQ.Item name="faq-group-2">
          <FAQ.Question>{t('enterprise_users_question')}</FAQ.Question>
          <FAQ.Answer>
            <p>{t('enterprise_answer_plain')}</p>
          </FAQ.Answer>
        </FAQ.Item>
      </FAQ>
    </FAQGroup>
  )
}

export const Groups: Story = {
  render: () => <FAQGroupExample />,
}

export const GroupsGridline: Story = {
  name: 'Groups (gridline)',
  render: () => <FAQGroupExample variant="gridline" />,
}

export const GroupsNarrow: Story = {
  name: 'Group narrow view (mobile)',
  render: () => <FAQGroupExample />,
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const GroupsNarrowGridline: Story = {
  name: 'Group narrow view (mobile, gridline)',
  render: () => <FAQGroupExample variant="gridline" />,
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const DynamicDataExample: Story = {
  render: function DynamicDataExampleComponent() {
    const {t} = useTranslation('FAQ')

    const faqs = [
      {
        title: t('apply_question'),
        content: (
          <div>
            <p>{t('apply_answer')}</p>
            <p>{t('apply_requirements')}</p>

            <ul>
              <li>{t('apply_profile')}</li>
              <li>{t('apply_region')}</li>
              <li>{t('apply_employee')}</li>
            </ul>
          </div>
        ),
      },
      {
        title: t('selection_question'),
        content: (
          <div>
            <p>{t('selection_answer')}</p>
            <ul>
              <li>{t('selection_users')}</li>
              <li>{t('selection_growth')}</li>
              <li>{t('selection_fulltime')}</li>
            </ul>
          </div>
        ),
      },
      {
        title: t('benefits_question'),
        content: (
          <div>
            <ul>
              <li>{t('benefits_stipend')}</li>
              <li>{t('benefits_mentors')}</li>
            </ul>
          </div>
        ),
      },
      {
        title: t('duties_question'),
        content: (
          <div>
            <ul>
              <li>{t('duties_participation')}</li>
              <li>{t('duties_resources')}</li>
            </ul>
          </div>
        ),
      },
      {
        title: t('dates_question'),
        content: <p>{t('dates_answer')}</p>,
      },

      {
        title: t('sponsored_question'),
        content: (
          <div>
            <p>{t('sponsored_answer')}</p>
          </div>
        ),
      },
      {
        title: t('help_question'),
        content: (
          <div>
            <p>
              <Trans t={t} i18nKey="help_answer" components={{email: <a href="mailto:foo@bar.com">foo@bar.com</a>}} />
            </p>
          </div>
        ),
      },
      {
        title: t('contact_question'),
        content: (
          <div>
            <p>
              <Trans
                t={t}
                i18nKey="contact_answer"
                components={{email: <a href="mailto:foo@bar.com">foo@bar.com</a>}}
              />
            </p>
          </div>
        ),
      },
    ]

    return (
      <Container>
        <FAQ>
          <FAQ.Heading>{t('heading_plain')}</FAQ.Heading>
          {faqs.map((item, index) => {
            return (
              <FAQ.Item key={index} name="faq" open={index === 0}>
                <FAQ.Question>{item.title}</FAQ.Question>
                <FAQ.Answer>{item.content}</FAQ.Answer>
              </FAQ.Item>
            )
          })}
        </FAQ>
      </Container>
    )
  },
}

export const WithProse: Story = {
  render: function WithProseComponent() {
    const {t} = useTranslation('FAQ')

    return (
      <Container>
        <FAQ>
          <FAQ.Heading>{t('heading')}</FAQ.Heading>
          <FAQ.Item name="faq" open={true}>
            <FAQ.Question>{t('enterprise_question')}</FAQ.Question>
            <FAQ.Answer>
              <Prose
                html={`
<p>
  <a href="https://docs.github.com/en/enterprise-server@3.5/admin/overview/about-github-enterprise-server">GitHub Enterprise Server</a>
  ${t('server_intro')}
</p>
<p>${t('server_control')}</p>
<p>${t('server_compliance')}</p>
`}
              />
            </FAQ.Answer>
          </FAQ.Item>
          <FAQ.Item name="faq" open={true}>
            <FAQ.Question>{t('enterprise_security_question')}</FAQ.Question>
            <FAQ.Answer className="enterprise-faq-answer">
              <Prose
                html={`
<p>${t('security_intro')}</p>
<ol>
  <li>${t('security_authentication')}</li>
  <li>${t('security_encryption')}</li>
  <li>${t('security_scanning')}</li>
  <li>${t('security_audit')}</li>
  <li>${t('security_policies')}</li>
  <li>${t('security_updates')}</li>
</ol>
`}
              />
            </FAQ.Answer>
          </FAQ.Item>
          <FAQ.Item name="faq" open={true}>
            <FAQ.Question>{t('enterprise_cloud_question')}</FAQ.Question>
            <FAQ.Answer>
              <Prose
                html={`
<p>${t('enterprise_answer_plain')}</p>
<ul>
  <li>${t('security_authentication')}</li>
  <li>${t('security_encryption')}</li>
  <li>${t('security_scanning')}</li>
  <li>${t('security_audit')}</li>
  <li>${t('security_policies')}</li>
  <li>${t('security_updates')}</li>
</ul>
`}
              />
            </FAQ.Answer>
          </FAQ.Item>
        </FAQ>
      </Container>
    )
  },
}

export const GridlineVariant: Story = {
  render: function GridlineVariantComponent() {
    const {t} = useTranslation('FAQ')
    const fixtureData = useFixtureData()

    return (
      <FAQ variant="gridline">
        <FAQ.Heading>{t('heading')}</FAQ.Heading>
        <>
          {fixtureData.map(({question, answer}, index) => {
            return (
              <FAQ.Item key={question} name="faq" open={index === 0}>
                <FAQ.Question>{question}</FAQ.Question>
                <FAQ.Answer>{answer}</FAQ.Answer>
              </FAQ.Item>
            )
          })}
        </>
      </FAQ>
    )
  },
}

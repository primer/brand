import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {AiModelIcon, ZapIcon} from '@primer/octicons-react'
import {useTranslation} from 'react-i18next'

import {Image, Link, RiverBreakoutTabs, Section, Text} from '../..'
import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'

const meta = {
  title: 'Components/RiverBreakoutTabs/Features',
  component: RiverBreakoutTabs,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RiverBreakoutTabs>

export default meta

type Story = StoryObj<typeof RiverBreakoutTabs>

export const TwoItems: Story = {
  render: function TwoItemsRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const WithBackgroundVisual: Story = {
  render: function WithBackgroundVisualRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual imageBackgroundColor="subtle">
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual imageBackgroundColor="subtle">
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const WithoutActionLinks: Story = {
  render: function WithoutActionLinksRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const UncontrolledMode: Story = {
  render: function UncontrolledModeRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs defaultSelectedIndex={1}>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const ControlledMode: Story = {
  render: function ControlledModeRender() {
    const {t} = useTranslation('RiverBreakoutTabs')
    const [selectedIndex, setSelectedIndex] = useState(1)

    return (
      <Section>
        <RiverBreakoutTabs selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <RiverBreakoutTabs.A11yHeading>{t('controlled_selected_index_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const Narrow: Story = {
  name: 'Narrow viewport',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: function NarrowRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const Tablet: Story = {
  name: 'Tablet viewport',
  globals: {
    viewport: {value: 'ipad'},
  },
  render: function TabletRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

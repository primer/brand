import type {Meta, StoryObj} from '@storybook/react'
import {AiModelIcon, CloudIcon, ZapIcon} from '@primer/octicons-react'
import {useTranslation} from 'react-i18next'

import {Image, Link, RiverBreakoutTabs, Section, Text} from '../..'
import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'
import placeholder3 from '../../fixtures/images/placeholder-3.png'

const meta = {
  title: 'Components/RiverBreakoutTabs',
  component: RiverBreakoutTabs,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    defaultSelectedIndex: 0,
  },
  argTypes: {
    defaultSelectedIndex: {
      control: {
        type: 'number',
        min: 0,
        max: 2,
        step: 1,
      },
      table: {
        category: 'RiverBreakoutTabs',
      },
    },
    selectedIndex: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof RiverBreakoutTabs>

export default meta

type Story = StoryObj<typeof RiverBreakoutTabs>

export const Default: Story = {
  render: function DefaultStory(args) {
    const {t} = useTranslation('RiverBreakoutTabs')
    const storyKey = String(args.defaultSelectedIndex ?? 0)

    return (
      <Section>
        <RiverBreakoutTabs key={storyKey} {...args}>
          <RiverBreakoutTabs.A11yHeading>{t('default_a11y_heading')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('default_item_tasks_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('default_item_tasks_body')}</Text>
              <Link href="#">{t('cta_learn_more')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={CloudIcon} />
            <RiverBreakoutTabs.Heading>{t('default_item_review_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('default_item_review_body')}</Text>
              <Link href="#">{t('cta_explore_reviews')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('default_item_automate_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('default_item_automate_body')}</Text>
              <Link href="#">{t('cta_see_workflows')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder3} alt={t('alt_placeholder_3')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {getLocalizedFlexSuiteSecurityCategoryContent} from './FlexSuiteSecurityCategory.content'
import {FlexSuiteSecurityCategory, FlexSuiteSecurityCategoryTemplate} from './FlexSuiteSecurityCategory'

const meta = {
  title: 'Recipes/FlexSuite/Category',
  component: FlexSuiteSecurityCategory,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof FlexSuiteSecurityCategory>

export default meta

type Story = StoryObj<typeof FlexSuiteSecurityCategory>

export const Security: Story = {
  name: 'Security',
  render: function LocalizedFlexSuiteSecurityCategory() {
    const {t} = useTranslation('FlexSuiteSecurityCategory')

    return <FlexSuiteSecurityCategoryTemplate content={getLocalizedFlexSuiteSecurityCategoryContent(t)} />
  },
}

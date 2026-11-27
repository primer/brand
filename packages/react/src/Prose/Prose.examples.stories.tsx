import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {Box} from '../Box'
import {Prose} from './Prose'
import styles from './Prose.stories.module.css'

const meta = {
  title: 'Components/Prose/Examples',
  component: Prose,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Prose>

export default meta
type Story = StoryObj<typeof Prose>

export const EditorialArticle: Story = {
  render: function EditorialArticleStory() {
    const {t} = useTranslation('Prose')

    return (
      <Box backgroundColor="default" className={styles.articleCanvas}>
        <Prose
          variant="editorial"
          className={styles.article}
          html={`
      <p class="${styles.lead}">${t('devops_lead')}</p>
      <p>${t('devops_intro', {
        devopsLink: `
      <a href="https://github.com/resources/articles/devops">${t('devops_link')}</a>`,
      })}</p>
      <p>${t('devops_tools', {
        toolsLink: `
          <a href="https://github.com/resources/articles/devops-tools-comparison">${t('devops_tools_link')}</a>`,
      })}</p>
      <hr />
      <h2>${t('devops_methodology_heading')}</h2>
      <p>${t('devops_methodology_1')}</p>
      <p>${t('devops_methodology_2')}</p>
      <p>${t('devops_methodology_3')}</p>
      <p>${t('devops_permissions', {permission: ` <code>${t('devops_permission_name')}</code>`})}</p>
      <figure>
        <img src="data:image/svg+xml,${encodeURIComponent(
          `
    <svg xmlns="http://www.w3.org/2000/svg" width="660" height="431.25">
      <rect width="100%" height="100%" fill="#353d37" />
    </svg>`,
        )}" alt="${t('placeholder_alt_text')}" width="660" height="431" />
        <figcaption>${t('devops_image_caption')}</figcaption>
      </figure>
      <h3>${t('devops_framework_heading')}</h3>
      <p>${t('devops_framework_1')}</p>
      <p>${t('devops_framework_2')}</p>
      <p>${t('devops_framework_3')}</p>
      <ul>
        <li><strong>${t('devops_improvement_label')}</strong> ${t('devops_improvement_text')}</li>
        <li><strong>${t('devops_ownership_label')}</strong> ${t('devops_ownership_text')}</li>
        <li><strong>${t('devops_automation_label')}</strong> ${t('devops_automation_text')}</li>
      </ul>
      <pre><code>const myVariable = [1, 2, 3];
if (Array.isArray(myVariable)) {
  console.log('It is an array!');
} else {
  console.log('It is not an array.');
}</code></pre>
      <h3>${t('devops_agile_heading')}</h3>
      <p>${t('devops_agile_1')}</p>
      <p>${t('devops_agile_2')}</p>
      <blockquote>
        <p>${t('devops_quote_mckesson')}</p>
        <figcaption>${t('devops_quote_mckesson_attribution')}</figcaption>
      </blockquote>
      <p>${t('devops_agile_3')}</p>
      <p>${t('devops_agile_4')}</p>
      <p>${t('devops_agile_5')}</p>
      <p>${t('devops_agile_6')}</p>
      <ul>
        <li><strong>${t('devops_fail_fast_label')}</strong> ${t('devops_fail_fast_text')}</li>
        <li><strong>${t('devops_team_centric_label')}</strong> ${t('devops_team_centric_text')}</li>
        <li><strong>${t('devops_systems_label')}</strong> ${t('devops_systems_text')}</li>
        <li><strong>${t('devops_product_centric_label')}</strong> ${t('devops_product_centric_text')}</li>
      </ul>
      <h2>${t('devops_goal_heading')}</h2>
      <p>${t('devops_goal_1')}</p>
      <p>${t('devops_goal_2')}</p>
      <p>${t('devops_goal_3')}</p>
      <p>${t('devops_goal_4')}</p>
      <figure>
        <img src="data:image/svg+xml,${encodeURIComponent(
          `
    <svg xmlns="http://www.w3.org/2000/svg" width="660" height="431.25">
      <rect width="100%" height="100%" fill="#353d37" />
    </svg>`,
        )}" alt="${t('placeholder_alt_text')}" width="660" height="431" />
        <figcaption>${t('devops_image_caption')}</figcaption>
      </figure>
      <h3>${t('devops_adopt_heading')}</h3>
      <p>${t('devops_adopt_1')}</p>
      <p>${t('devops_adopt_2')}</p>
      <p>${t('devops_adopt_2')}</p>
      <ul>
        <li><strong>${t('devops_culture_label')}</strong> ${t('devops_culture_text')}</li>
        <li><strong>${t('devops_incremental_label')}</strong> ${t('devops_incremental_text')}</li>
        <li><strong>${t('devops_tools_label')}</strong> ${t('devops_tools_text')}</li>
        <li><strong>${t('devops_automate_label')}</strong> ${t('devops_automate_text')}</li>
      </ul>
      <blockquote>
        <p>${t('devops_quote_blue_yonder')}</p>
        <figcaption>${t('devops_quote_blue_yonder_attribution')}</figcaption>
      </blockquote>
      <h3>${t('devops_devsecops_heading')}</h3>
      <p>${t('devops_devsecops_1')}</p>
      <table>
        <thead>
          <tr>
            <th scope="col">${t('devops_table_country')}</th>
            <th scope="col">${t('devops_table_developers')}</th>
            <th scope="col">${t('devops_table_growth')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${t('devops_country_singapore')}</td>
            <td>${t('devops_developer_count', {amount: '1M'})}</td>
            <td>39%</td>
          </tr>
          <tr>
            <td>${t('devops_country_india')}</td>
            <td>${t('devops_developer_count', {amount: '13.2M'})}</td>
            <td>36%</td>
          </tr>
          <tr>
            <td>${t('devops_country_hong_kong')}</td>
            <td>${t('devops_developer_count', {amount: '1.6M'})}</td>
            <td>35%</td>
          </tr>
          <tr>
            <td>${t('devops_country_vietnam')}</td>
            <td>${t('devops_developer_count', {amount: '1.5M'})}</td>
            <td>34%</td>
          </tr>
          <tr>
            <td>${t('devops_country_indonesia')}</td>
            <td>${t('devops_developer_count', {amount: '2.9M'})}</td>
            <td>31%</td>
          </tr>
          <tr>
            <td>${t('devops_country_japan')}</td>
            <td>${t('devops_developer_count', {amount: '2.8M'})}</td>
            <td>31%</td>
          </tr>
          <tr>
            <td>${t('devops_country_philippines')}</td>
            <td>${t('devops_developer_count', {amount: '1.3M'})}</td>
            <td>25%</td>
          </tr>
        </tbody>
      </table>
      <p>${t('devops_devsecops_2')}</p>
  `}
        />
      </Box>
    )
  },
}

export const EditorialExampleDark: Story = {
  ...EditorialArticle,
  parameters: {
    colorMode: 'dark',
  },
}

import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Prose} from './Prose'
import placeholderImage from '../fixtures/images/placeholder.png'
import {ThemeProvider} from '../ThemeProvider'
import {Box} from '../Box'
import {useTranslation} from 'react-i18next'

export default {
  title: 'Components/Prose/Features',
  component: Prose,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta

const ExampleHtmlMarkup = (t: (key: string) => string) => `
    <h1>${t('heading_level_1')}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.</p>
    <h2>${t('heading_level_2')}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.</p>
    <figure>
      <blockquote>
        <p>Nulla ac odio eu magna hendrerit porta. Donec nec eros quis tortor tincidunt vulputate. Aenean id pharetra diam, sit amet auctor leo. Aliquam erat volutpat.</p>
        <figcaption>${t('lisa_vanderschuit_attribution')}</figcaption>
      </blockquote>
    </figure>
    <p>Integer pellentesque pretium nulla viverra molestie. Praesent quis pretium sapien. Sed convallis eget lectus et pulvinar:</p>
    <ul>
      <li> Vivamus eu risus nec lectus consequat rutrum at vel lacus.</li>
      <li>Donec at dolor ut metus imperdiet congue vel porta nunc.</li>
      <li>Quisque eu tortor suscipit, congue quam in, bibendum tellus.</li>
    </ul>
    <h3>${t('heading_level_3')}</h3>
    <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue. Ut malesuada, nisl vel dignissim mollis</p>
    <img
      src="${placeholderImage}"
      alt="${t('placeholder_alt_text')}"
      />
    <h4>${t('heading_level_4')}</h4>
    <p>
      ${t('secure_code_paragraph')} <a href="/#">${t('learn_more_here')}.</a>
    </p>
    <pre><code>const myVariable = [1, 2, 3];\nif (Array.isArray(myVariable)) {\n  console.log('It is an array!');\n} else {\n  console.log('It is not an array.');\n}</code></pre>
    <h5>${t('heading_level_5')}</h5>
    <ol>
      <li> Vivamus eu risus nec lectus consequat rutrum at vel lacus.</li>
      <li>Donec at dolor ut metus imperdiet congue vel porta nunc.</li>
      <li>Quisque eu tortor suscipit, congue quam in, bibendum tellus.</li>
    </ol>
    <h6>${t('heading_level_6')}</h6>
    <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue.</p>
    <p><code>for-each-ref</code> ${t('for_each_ref_paragraph')}</p>
    <p>Nunc velit odio, posuere eu felis eget, consectetur fermentum nisi. Aenean tempor odio id ornare ultrices. Quisque blandit condimentum tellus, semper efficitur sapien dapibus nec.</p>
`

export const FullWidth: StoryFn = () => {
  const {t} = useTranslation('Prose')
  return <Prose enableFullWidth html={ExampleHtmlMarkup(t)} />
}

export const NarrowViewFullWidth: StoryFn = () => {
  const {t} = useTranslation('Prose')
  return <Prose enableFullWidth html={ExampleHtmlMarkup(t)} />
}
NarrowViewFullWidth.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
NarrowViewFullWidth.storyName = 'Narrow view, full width (mobile)'

export const RegularViewFullWidth: StoryFn = () => {
  const {t} = useTranslation('Prose')
  return <Prose enableFullWidth html={ExampleHtmlMarkup(t)} />
}
RegularViewFullWidth.parameters = {
  viewport: {
    defaultViewport: 'ipad10p',
  },
}
RegularViewFullWidth.storyName = 'Regular view, full width (tablet)'

const UnorderedListHtmlMarkup = `
<ul>
  <li>
    Vivamus eu risus nec lectus consequat rutrum at vel lacus.
  </li>
  <li>
    Donec at dolor ut metus imperdiet congue vel porta nunc.
  </li>
  <li>
    Quisque eu tortor suscipit, congue quam in, bibendum tellus.
  </li>
</ul>
`
const UnorderedListStory: StoryFn = args => <Prose {...args} html={UnorderedListHtmlMarkup} />
export const UnorderedList = UnorderedListStory.bind({})
UnorderedList.args = {
  darkMode: true,
}
UnorderedList.argTypes = {
  colorMode: {
    darkMode: 'boolean',
  },
}
UnorderedList.decorators = [
  (Story, {args: {darkMode}}) => (
    <ThemeProvider colorMode={darkMode ? 'dark' : 'light'}>
      <Box backgroundColor="default">
        <Story />
      </Box>
    </ThemeProvider>
  ),
]

const proseMarkup = (t: (key: string) => string) => `
<h2>${t('heading')}</h2>
<p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue.</p>
<table>
  <caption>${t('developer_growth_caption')}</caption>
  <thead>
    <tr>
      <th scope="col">${t('country')}</th>
      <th scope="col">${t('number_of_developers')}</th>
      <th scope="col">${t('yoy_growth')}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${t('singapore')}</td>
      <td>>1M ${t('developers')}</td>
      <td>39%</td>
    </tr>
    <tr>
      <td>${t('india')}</td>
      <td>>13.2M ${t('developers')}</td>
      <td>36%</td>
    </tr>
    <tr>
      <td>${t('hong_kong_sar')}</td>
      <td>>1.6M ${t('developers')}</td>
      <td>35%</td>
    </tr>
    <tr>
      <td>${t('vietnam')}</td>
      <td>>1.5M ${t('developers')}</td>
      <td>34%</td>
    </tr>
    <tr>
      <td>${t('indonesia')}</td>
      <td>>2.9M ${t('developers')}</td>
      <td>31%</td>
    </tr>
    <tr>
      <td>${t('japan')}</td>
      <td>>2.8M ${t('developers')}</td>
      <td>31%</td>
    </tr>
    <tr>
      <td>${t('philippines')}</td>
      <td>>1.3M ${t('developers')}</td>
      <td>31%</td>
    </tr>
    <tr>
      <td>${t('thailand')}</td>
      <td>>857K ${t('developers')}</td>
      <td>25%</td>
    </tr>
    <tr>
      <td>${t('south_korea')}</td>
      <td>>1.9M ${t('developers')}</td>
      <td>22%</td>
    </tr>
    <tr>
      <td>${t('australia')}</td>
      <td>>1.4M ${t('developers')}</td>
      <td>21%</td>
    </tr>
  </tbody>
</table>
<p>Nunc velit odio, posuere eu felis eget, consectetur fermentum nisi. Aenean tempor odio id ornare ultrices. Quisque blandit condimentum tellus, semper efficitur sapien dapibus nec.</p>
`

export const DefaultTable = args => {
  const {t} = useTranslation('Prose')
  return <Prose html={proseMarkup(t)} {...args} />
}
DefaultTable.storyName = 'With a table (default)'

export const EditorialTable = () => {
  const {t} = useTranslation('Prose')
  return <Prose html={proseMarkup(t)} variant="editorial" />
}
EditorialTable.storyName = 'With a table (editorial variant)'

export const DefaultTableNarrowView = () => {
  const {t} = useTranslation('Prose')
  return <Prose html={proseMarkup(t)} enableFullWidth />
}
DefaultTableNarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
DefaultTableNarrowView.storyName = 'With a table (narrow)'

const dataLabelsMarkup = (t: (key: string) => string) => `
<h2>${t('vertically_stacked_layout')}</h2>
<p>${t('vertically_stacked_description')}</p>
<p><strong>${t('vertically_stacked_note')}</strong></p>
<table>
  <caption>${t('developer_growth_caption')}</caption>
  <thead>
    <tr>
      <th scope="col"><span class="visually-hidden">${t('country')}</span></th>
      <th scope="col">${t('number_of_developers')}</th>
      <th scope="col">${t('yoy_growth')}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${t('singapore')}</td>
      <td data-label="${t('number_of_developers')}">>${t('developers')}</td>
      <td data-label="${t('yoy_growth')}">39%</td>
    </tr>
    <tr>
      <td>${t('india')}</td>
      <td data-label="${t('number_of_developers')}">>${t('developers')}</td>
      <td data-label="${t('yoy_growth')}">36%</td>
    </tr>
    <tr>
      <td>${t('hong_kong_sar')}</td>
      <td data-label="${t('number_of_developers')}">>${t('developers')}</td>
      <td data-label="${t('yoy_growth')}">35%</td>
    </tr>
    <tr>
      <td>${t('vietnam')}</td>
      <td data-label="${t('number_of_developers')}">>${t('developers')}</td>
      <td data-label="${t('yoy_growth')}">34%</td>
    </tr>
  </tbody>
</table>
<p>Nunc velit odio, posuere eu felis eget, consectetur fermentum nisi. Aenean tempor odio id ornare ultrices. Quisque blandit condimentum tellus, semper efficitur sapien dapibus nec.</p>`

export const TableWithDataLabels = () => {
  const {t} = useTranslation('Prose')
  return <Prose html={dataLabelsMarkup(t)} />
}
TableWithDataLabels.storyName = 'With a vertically-stacked table'

export const TableWithDataLabelsNarrowView = () => {
  const {t} = useTranslation('Prose')
  return <Prose html={dataLabelsMarkup(t)} enableFullWidth />
}
TableWithDataLabelsNarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
TableWithDataLabelsNarrowView.storyName = 'With a vertically-stacked table (narrow)'

const stressTestMarkup = (t: (key: string) => string) => `
<p>${t('stress_test_intro')}</p>
<table>
  <caption>${t('stress_test_caption')}</caption>
  <thead>
    <tr>
      <th scope="col">${t('organization')}</th>
      <th scope="col">${t('key_metrics')}</th>
      <th scope="col">${t('key_performance_indicators')}</th>
      <th scope="col">${t('quality_assessment')}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="${t('organization')}">${t('acme_corp')}</td>
      <td data-label="${t('key_metrics')}">
        <ul>
          <li>12,847 ${t('repositories')}</li>
          <li>8,923 ${t('active_contributors')}</li>
          <li>156,789 ${t('monthly_commits')}</li>
          <li>2.3 ${t('hour_avg_pr_review_time')}</li>
        </ul>
      </td>
      <td data-label="${t('key_performance_indicators')}">
        <ul>
          <li>${t('build_success_rate')}: 96.8%</li>
          <li>${t('deploy_frequency')}: 847/${t('day')}</li>
          <li>${t('mttr')}: 14 ${t('minutes')}</li>
          <li>${t('incident_response')}: 12m ${t('avg')}</li>
        </ul>
      </td>
      <td data-label="${t('quality_assessment')}">
        <ul>
          <li>${t('code_coverage')}: 87.3%</li>
          <li>${t('security_alerts')}: 23 ${t('critical')}, 156 ${t('high')}</li>
          <li>${t('technical_debt')}: 12.3%</li>
          <li>${t('bug_density')}: 0.23/${t('kloc')}</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-label="${t('organization')}">${t('avocado_corp')}</td>
      <td data-label="${t('key_metrics')}">
        <ul>
          <li>9,234 ${t('repositories')}</li>
          <li>7,156 ${t('active_contributors')}</li>
          <li>198,456 ${t('monthly_commits')}</li>
          <li>1.8 ${t('hour_avg_pr_review_time')}</li>
        </ul>
      </td>
      <td data-label="${t('key_performance_indicators')}">
        <ul>
          <li>${t('build_success_rate')}: 98.2%</li>
          <li>${t('deploy_frequency')}: 1,234/${t('day')}</li>
          <li>${t('mttr')}: 8 ${t('minutes')}</li>
          <li>${t('incident_response')}: 6m ${t('avg')}</li>
        </ul>
      </td>
      <td data-label="${t('quality_assessment')}">
        <ul>
          <li>${t('code_coverage')}: 92.1%</li>
          <li>${t('security_alerts')}: 12 ${t('critical')}, 89 ${t('high')}</li>
          <li>${t('technical_debt')}: 8.9%</li>
          <li>${t('bug_density')}: 0.18/${t('kloc')}</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-label="${t('organization')}">${t('octopotatoes_corp')}</td>
      <td data-label="${t('key_metrics')}">
        <ul>
          <li>6,789 ${t('repositories')}</li>
          <li>5,234 ${t('active_contributors')}</li>
          <li>134,567 ${t('monthly_commits')}</li>
          <li>3.1 ${t('hour_avg_pr_review_time')}</li>
        </ul>
      </td>
      <td data-label="${t('key_performance_indicators')}">
        <ul>
          <li>${t('build_success_rate')}: 95.3%</li>
          <li>${t('deploy_frequency')}: 567/${t('day')}</li>
          <li>${t('mttr')}: 18 ${t('minutes')}</li>
          <li>${t('incident_response')}: 22m ${t('avg')}</li>
        </ul>
      </td>
      <td data-label="${t('quality_assessment')}">
        <ul>
          <li>${t('code_coverage')}: 84.7%</li>
          <li>${t('security_alerts')}: 8 ${t('critical')}, 67 ${t('high')}</li>
          <li>${t('technical_debt')}: 14.7%</li>
          <li>${t('bug_density')}: 0.31/${t('kloc')}</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-label="${t('organization')}">${t('cyberdyne_systems')}</td>
      <td data-label="${t('key_metrics')}">
        <ul>
          <li>8,456 ${t('repositories')}</li>
          <li>6,789 ${t('active_contributors')}</li>
          <li>145,234 ${t('monthly_commits')}</li>
          <li>2.7 ${t('hour_avg_pr_review_time')}</li>
        </ul>
      </td>
      <td data-label="${t('key_performance_indicators')}">
        <ul>
          <li>${t('build_success_rate')}: 95.1%</li>
          <li>${t('deploy_frequency')}: 623/${t('day')}</li>
          <li>${t('mttr')}: 16 ${t('minutes')}</li>
          <li>${t('incident_response')}: 18m ${t('avg')}</li>
        </ul>
      </td>
      <td data-label="${t('quality_assessment')}">
        <ul>
          <li>${t('code_coverage')}: 89.4%</li>
          <li>${t('security_alerts')}: 18 ${t('critical')}, 123 ${t('high')}</li>
          <li>${t('technical_debt')}: 11.8%</li>
          <li>${t('bug_density')}: 0.27/${t('kloc')}</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
`

export const MixedData = () => {
  const {t} = useTranslation('Prose')
  return <Prose html={stressTestMarkup(t)} />
}
MixedData.storyName = 'With a mixed data set table '

export const MixedDataNarrow = () => {
  const {t} = useTranslation('Prose')
  return <Prose html={stressTestMarkup(t)} enableFullWidth />
}
MixedDataNarrow.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
MixedDataNarrow.storyName = 'With a mixed data set table (narrow)'

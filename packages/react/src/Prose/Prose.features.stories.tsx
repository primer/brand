import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Prose} from './Prose'
import placeholderImage from '../fixtures/images/placeholder.png'
import {ThemeProvider} from '../ThemeProvider'
import {Box} from '../Box'

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

const ExampleHtmlMarkup = `
    <h1>Heading level 1</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.</p>
    <h2>Heading level 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.</p>
    <figure>
      <blockquote>
        <p>Nulla ac odio eu magna hendrerit porta. Donec nec eros quis tortor tincidunt vulputate. Aenean id pharetra diam, sit amet auctor leo. Aliquam erat volutpat.</p>
        <figcaption>Lisa Vanderschuit, Engineering Program Manager, Shopify</figcaption>
      </blockquote>
    </figure>
    <p>Integer pellentesque pretium nulla viverra molestie. Praesent quis pretium sapien. Sed convallis eget lectus et pulvinar:</p>
    <ul>
      <li>
        Vivamus eu risus nec lectus consequat rutrum at vel lacus.
      </li>
      <li>Donec at dolor ut metus imperdiet congue vel porta nunc.
      </li>
      <li>Quisque eu tortor suscipit, congue quam in, bibendum tellus.</li>
    </ul>
    <h3>Heading level 3</h3>
    <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue. Ut malesuada, nisl vel dignissim mollis</p>
    <img
      src="${placeholderImage}"
      alt="placeholder, blank area with a gray background color"
      />
    <h4>Heading level  4</h4>
    <p>
      Secure code as you write it. Automatically review every change to your codebase and identify vulnerabilities
      before they reach production. <a href="/#">Learn more here.</a>
    </p>
    <pre><code>const myVariable = [1, 2, 3];\nif (Array.isArray(myVariable)) {\n  console.log('It is an array!');\n} else {\n  console.log('It is not an array.');\n}</code></pre>
    <h5>Heading level 5</h5>
    <ol>
      <li>
        Vivamus eu risus nec lectus consequat rutrum at vel lacus.
      </li>
      <li>Donec at dolor ut metus imperdiet congue vel porta nunc.
      </li>
      <li>Quisque eu tortor suscipit, congue quam in, bibendum tellus.</li>
    </ol>
    <h6>Heading level 6</h6>
    <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue.</p>
    <p><code>for-each-ref</code> is extremely useful for listing references, finding which references point at a given object (with <code>--points-at</code>), which references have been merged into a given branch (with <code>--merged</code>), or which references contain a given commit (with <code>--contains</code>).</p>
    <p>Nunc velit odio, posuere eu felis eget, consectetur fermentum nisi. Aenean tempor odio id ornare ultrices. Quisque blandit condimentum tellus, semper efficitur sapien dapibus nec. </p>
`

export const FullWidth: StoryFn = () => <Prose enableFullWidth html={ExampleHtmlMarkup} />

export const NarrowViewFullWidth: StoryFn = () => <Prose enableFullWidth html={ExampleHtmlMarkup} />
NarrowViewFullWidth.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
NarrowViewFullWidth.storyName = 'Narrow view, full width (mobile)'

export const RegularViewFullWidth: StoryFn = () => <Prose enableFullWidth html={ExampleHtmlMarkup} />
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

const proseMarkup = `
<h2>Heading</h2>
<p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue.</p>
<table>
  <caption>Developer growth by total developers in 2023, % increase from 2022.</caption>
  <thead>
    <tr>
      <th scope="col">Country</th>
      <th scope="col"># of developers</th>
      <th scope="col">YoY growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Singapore</td>
      <td>>1M developers</td>
      <td>39%</td>
    </tr>
    <tr>
      <td>India</td>
      <td>>13.2M developers</td>
      <td>36%</td>
    </tr>
    <tr>
      <td>Hong Kong (SAR)</td>
      <td>>1.6M developers</td>
      <td>35%</td>
    </tr>
    <tr>
      <td>Vietnam</td>
      <td>>1.5M developers</td>
      <td>34%</td>
    </tr>
    <tr>
      <td>Indonesia</td>
      <td>>2.9M developers</td>
      <td>31%</td>
    </tr>
    <tr>
      <td>Japan</td>
      <td>>2.8M developers</td>
      <td>31%</td>
    </tr>
    <tr>
      <td>The Philippines</td>
      <td>>1.3M developers</td>
      <td>31%</td>
    </tr>
    <tr>
      <td>Thailand</td>
      <td>>857K developers</td>
      <td>25%</td>
    </tr>
    <tr>
      <td>South Korea</td>
      <td>>1.9M developers</td>
      <td>22%</td>
    </tr>
    <tr>
      <td>Australia</td>
      <td>>1.4M developers</td>
      <td>21%</td>
    </tr>
  </tbody>
</table>
<p>Nunc velit odio, posuere eu felis eget, consectetur fermentum nisi. Aenean tempor odio id ornare ultrices. Quisque blandit condimentum tellus, semper efficitur sapien dapibus nec. </p>
`

export const DefaultTable = args => <Prose html={proseMarkup} {...args} />
DefaultTable.storyName = 'With a table (default)'

export const DefaultTableNarrowView = () => <DefaultTable html={proseMarkup} enableFullWidth />
DefaultTableNarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
DefaultTableNarrowView.storyName = 'With a table (narrow)'

export const EditorialTable = () => <DefaultTable variant="editorial" />
EditorialTable.storyName = 'With a table (editorial variant)'

const dataLabelsMarkup = `
<h2>Tables in card layout on narrow viewports</h2>
<p>This is an opt-in layout, as it requires setting data-label attributes to the individual data cells.</p>
<p>Note that this layout is not suitable for all use-cases.</p>
<table>
  <caption>Developer growth by total developers in 2023, % increase from 2022.</caption>
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col"># of developers</th>
      <th scope="col">YoY growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Singapore</td>
      <td data-label="# of developers">>1M developers</td>
      <td data-label="YoY growth">39%</td>
    </tr>
    <tr>
      <td>India</td>
      <td data-label="# of developers">>13.2M developers</td>
      <td data-label="YoY growth">36%</td>
    </tr>
    <tr>
      <td>Hong Kong (SAR)</td>
      <td data-label="# of developers">>1.6M developers</td>
      <td data-label="YoY growth">35%</td>
    </tr>
    <tr>
      <td>Vietnam</td>
      <td data-label="# of developers">>1.5M developers</td>
      <td data-label="YoY growth">34%</td>
    </tr>
  </tbody>
</table>
<p>Nunc velit odio, posuere eu felis eget, consectetur fermentum nisi. Aenean tempor odio id ornare ultrices. Quisque blandit condimentum tellus, semper efficitur sapien dapibus nec. </p>`

export const TableWithDataLabels = () => <Prose html={dataLabelsMarkup} />

export const TableWithDataLabelsNarrowView = () => <Prose html={dataLabelsMarkup} enableFullWidth />
TableWithDataLabelsNarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
TableWithDataLabelsNarrowView.storyName = 'With data labels (narrow)'

const stressTestMarkup = `
<p>This comprehensive analysis covers repository statistics, contributor activity, and performance metrics across GitHub's enterprise platform in 2024.</p>
<table>
  <caption>Detailed repository metrics for enterprise organizations, including commit frequency, pull request velocity, and code quality indicators.</caption>
  <thead>
    <tr>
      <th scope="col">Organization</th>
      <th scope="col">Key Metrics</th>
      <th scope="col">Key Performance Indicators (KPI)</th>
      <th scope="col">Quality Assessment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Organization">ACME Corp</td>
      <td data-label="Key Metrics">
        <ul>
          <li>12,847 repositories</li>
          <li>8,923 active contributors</li>
          <li>156,789 monthly commits</li>
          <li>2.3 hour avg PR review time</li>
        </ul>
      </td>
      <td data-label="Key Performance Indicators (KPI)">
        <ul>
          <li>Build success rate: 96.8%</li>
          <li>Deploy frequency: 847/day</li>
          <li>MTTR: 14 minutes</li>
          <li>Incident response: 12m avg</li>
        </ul>
      </td>
      <td data-label="Quality Assessment">
        <ul>
          <li>Code coverage: 87.3%</li>
          <li>Security alerts: 23 critical, 156 high</li>
          <li>Technical debt: 12.3%</li>
          <li>Bug density: 0.23/KLOC</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-label="Organization">Avocado Corp</td>
      <td data-label="Key Metrics">
        <ul>
          <li>9,234 repositories</li>
          <li>7,156 active contributors</li>
          <li>198,456 monthly commits</li>
          <li>1.8 hour avg PR review time</li>
        </ul>
      </td>
      <td data-label="Key Performance Indicators (KPI)">
        <ul>
          <li>Build success rate: 98.2%</li>
          <li>Deploy frequency: 1,234/day</li>
          <li>MTTR: 8 minutes</li>
          <li>Incident response: 6m avg</li>
        </ul>
      </td>
      <td data-label="Quality Assessment">
        <ul>
          <li>Code coverage: 92.1%</li>
          <li>Security alerts: 12 critical, 89 high</li>
          <li>Technical debt: 8.9%</li>
          <li>Bug density: 0.18/KLOC</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-label="Organization">Octopotatoes Corp</td>
      <td data-label="Key Metrics">
        <ul>
          <li>6,789 repositories</li>
          <li>5,234 active contributors</li>
          <li>134,567 monthly commits</li>
          <li>3.1 hour avg PR review time</li>
        </ul>
      </td>
      <td data-label="Key Performance Indicators (KPI)">
        <ul>
          <li>Build success rate: 95.3%</li>
          <li>Deploy frequency: 567/day</li>
          <li>MTTR: 18 minutes</li>
          <li>Incident response: 22m avg</li>
        </ul>
      </td>
      <td data-label="Quality Assessment">
        <ul>
          <li>Code coverage: 84.7%</li>
          <li>Security alerts: 8 critical, 67 high</li>
          <li>Technical debt: 14.7%</li>
          <li>Bug density: 0.31/KLOC</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-label="Organization">Cyberdyne Systems</td>
      <td data-label="Key Metrics">
        <ul>
          <li>8,456 repositories</li>
          <li>6,789 active contributors</li>
          <li>145,234 monthly commits</li>
          <li>2.7 hour avg PR review time</li>
        </ul>
      </td>
      <td data-label="Key Performance Indicators (KPI)">
        <ul>
          <li>Build success rate: 95.1%</li>
          <li>Deploy frequency: 623/day</li>
          <li>MTTR: 16 minutes</li>
          <li>Incident response: 18m avg</li>
        </ul>
      </td>
      <td data-label="Quality Assessment">
        <ul>
          <li>Code coverage: 89.4%</li>
          <li>Security alerts: 18 critical, 123 high</li>
          <li>Technical debt: 11.8%</li>
          <li>Bug density: 0.27/KLOC</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
`

export const LargeMixedData = () => <Prose html={stressTestMarkup} />
LargeMixedData.storyName = 'Large, mixed-content data set'

export const LargeMixedDataNarrow = () => <Prose html={stressTestMarkup} enableFullWidth />
LargeMixedDataNarrow.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
LargeMixedDataNarrow.storyName = 'Large, mixed-content data set (narrow)'

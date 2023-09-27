import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Prose} from './Prose'
import placeholderImage from '../fixtures/images/placeholder-600x400.png'

export default {
  title: 'Components/Prose/Features',
  component: Prose,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as ComponentMeta<typeof Prose>

const ExampleHtmlMarkup = `
<h2>Heading level 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.</p>
    <blockquote>
      <p>Nulla ac odio eu magna hendrerit porta. Donec nec eros quis tortor tincidunt vulputate. Aenean id pharetra diam, sit amet auctor leo. Aliquam erat volutpat.</p>
      <figcaption>Lisa Vanderschuit, Engineering Program Manager, Shopify</figcaption>
    </blockquote>
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
      alt="placeholder, blank area with an off-white background color"
      />
    <h4>Heading level  4</h4>
    <p>
      Secure code as you write it. Automatically review every change to your codebase and identify vulnerabilities
      before they reach production. <a href="/#">Learn more here.</a>
    </p>
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

export const FullWidth: ComponentStory<typeof Prose> = () => <Prose enableFullWidth html={ExampleHtmlMarkup} />

export const NarrowViewFullWidth: ComponentStory<typeof Prose> = () => (
  <Prose enableFullWidth html={ExampleHtmlMarkup} />
)
NarrowViewFullWidth.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
NarrowViewFullWidth.storyName = 'Narrow view, full width (mobile)'

export const RegularViewFullWidth: ComponentStory<typeof Prose> = () => (
  <Prose enableFullWidth html={ExampleHtmlMarkup} />
)
RegularViewFullWidth.parameters = {
  viewport: {
    defaultViewport: 'ipad10p',
  },
}
RegularViewFullWidth.storyName = 'Regular view, full width (tablet)'

import type {Meta, StoryObj} from '@storybook/react'

import {Link, RiverAccordion, Text} from '../../'
import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'
import placeholder3 from '../../fixtures/images/placeholder-3.png'
import baseMeta, {type MetaProps} from './RiverAccordion.stories'

const meta: Meta<MetaProps> = {...baseMeta, title: 'Components/RiverAccordion/Features'}
export default meta

type Story = StoryObj<MetaProps>

export const AlignStart: Story = {
  args: {
    align: 'start',
  },
}

export const AlignEnd: Story = {
  args: {
    align: 'end',
  },
}

export const MultipleItems: Story = {
  name: 'Multiple items',
  render: () => {
    const multipleItemVisuals = [
      {src: placeholder1, alt: 'Orange placeholder with the number 1'},
      {src: placeholder2, alt: 'Purple placeholder with the number 2'},
      {src: placeholder3, alt: 'Green placeholder with the number 3'},
      {src: placeholder1, alt: 'Orange placeholder with the number 1'},
      {src: placeholder2, alt: 'Purple placeholder with the number 2'},
      {src: placeholder3, alt: 'Green placeholder with the number 3'},
      {src: placeholder1, alt: 'Orange placeholder with the number 1'},
      {src: placeholder2, alt: 'Purple placeholder with the number 2'},
      {src: placeholder3, alt: 'Green placeholder with the number 3'},
      {src: placeholder1, alt: 'Orange placeholder with the number 1'},
      {src: placeholder1, alt: 'Orange placeholder with the number 1'},
    ]
    return (
      <RiverAccordion variant="gridline">
        {multipleItemVisuals.map((visual, itemIndex) => (
          <RiverAccordion.Item key={itemIndex}>
            <RiverAccordion.Heading>Heading {itemIndex + 1}</RiverAccordion.Heading>
            <RiverAccordion.Content>
              <Text>Content for item {itemIndex + 1}.</Text>
              <Link href="#">Call to action</Link>
            </RiverAccordion.Content>
            <RiverAccordion.Visual>
              <img src={visual.src} alt={visual.alt} />
            </RiverAccordion.Visual>
          </RiverAccordion.Item>
        ))}
      </RiverAccordion>
    )
  },
}

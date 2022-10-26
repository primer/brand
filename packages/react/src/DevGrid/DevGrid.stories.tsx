import {ComponentMeta, ComponentStory} from '@storybook/react'
import {DevGrid} from '.'

export default {
  title: 'Components/DevGrid',
  component: DevGrid
} as ComponentMeta<typeof DevGrid>

const Template: ComponentStory<typeof DevGrid> = args => <DevGrid {...args} />

export const Default = Template.bind({})
Default.args = {}

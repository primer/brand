import {ComponentMeta, ComponentStory} from '@storybook/react'
import {DevGrid, Text} from '..'

export default {
  title: 'Components/DevGrid',
  component: DevGrid
} as ComponentMeta<typeof DevGrid>

const Template: ComponentStory<typeof DevGrid> = args => (
  <div style={{maxWidth: '76rem', margin: '80px auto 200px'}}>
    <Text>
      To show or hide the grid, click within the frame, then press&nbsp;
      <code
        style={{
          padding: '0.25rem 0.5rem',
          backgroundColor: 'var(--brand-color-canvas-subtle)'
        }}
      >
        ctrl + shift + L
      </code>
    </Text>
    <DevGrid {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}

export const CustomSize = Template.bind({})
CustomSize.args = {size: 8}

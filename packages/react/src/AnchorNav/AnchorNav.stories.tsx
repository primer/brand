import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {AnchorNav} from '.'
import {Heading, Text, Stack} from '../'

type MockData = {
  [key: string]: string
}

export default {
  title: 'Components/AnchorNav',
  component: AnchorNav,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    data: {
      ['GitHub vs Jenkins']: 'githubvsjenkins',
      ['GitHub vs GitLab']: 'githubvsgitlab',
      ['GitHub vs CircleCI']: 'githubvscircleci',
      ['GitHub vs BitBucket']: 'githubvsvsbitbucket',
      ['GitHub vs TravisCI']: 'githubvsvstravis'
    }
  },
  argTypes: {
    data: {
      name: 'Data',
      description: 'Test data',
      control: {
        type: 'object'
      }
    }
  }
} as ComponentMeta<typeof AnchorNav>

const Template: ComponentStory<typeof AnchorNav> = (data, args) => <AnchorNav {...args} />

export const Playground = Template.bind({})
export const Default = ({data, ...args}: {data: MockData}) => {
  return (
    <div style={{paddingTop: 1000}}>
      <AnchorNav {...args}>
        {Object.entries(data).map(([key, value], index) => (
          <AnchorNav.Link href={value}>{key}</AnchorNav.Link>
        ))}
        <AnchorNav.Action href="#">Sign up</AnchorNav.Action>
      </AnchorNav>
      {/**
       *  The following markup is provided for demonstration purposes only.
       *  It is not part of the AnchorNav component.
       */}
      <Stack direction="vertical" justifyContent="space-around" gap="none" style={{marginBottom: '100px'}}>
        {Object.entries(data).map(([key, value], index) => (
          <div key={value} id={value} style={{padding: '500px 0', backgroundColor: index % 2 == 0 ? 'red' : 'green'}}>
            <Heading>{key}</Heading>
            <Text as="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat neque a nibh hendrerit, nec
              viverra felis lobortis. Cras suscipit sagittis metus ac sodales. Praesent suscipit odio nisi, in posuere
              libero posuere sed. Vestibulum consequat pharetra justo, eget porta lectus elementum vel. Sed viverra
              mattis pellentesque. Nunc velit nisi, semper eu est at, iaculis lobortis odio. Sed nec purus non arcu
              finibus dapibus nec ac arcu.
            </Text>
          </div>
        ))}
      </Stack>
    </div>
  )
}

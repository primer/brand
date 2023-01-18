import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Card} from '.'
import {Link, Button} from '..'

export default {
  title: 'Components/Card',
  component: Card
} as ComponentMeta<typeof Card>

const variant = 'default'

export const Default = () => (
  <React.Fragment>
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginTop: '10vh'}}>
      <Card variant={variant}>
        <Card.Image
          src="https://user-images.githubusercontent.com/912236/213208795-ba61941e-a407-4973-86fd-d5b1697712bf.png"
          alt="Card image"
        />
        <Card.Heading size="4">Project planning for developers</Card.Heading>
        <Card.Description size="300">
          Create issues, break them into tasks, track relationships, add custom fields, and have conversations.
          Visualize large projects as spreadsheets or boards, and automate everything with code.
        </Card.Description>
        <Card.Action>
          {/* <Link href="#">Call to action</Link> */}
          <Button>Call to action</Button>
        </Card.Action>
      </Card>
      <Card variant={variant}>
        <Card.Image
          src="https://user-images.githubusercontent.com/912236/213208795-ba61941e-a407-4973-86fd-d5b1697712bf.png"
          alt="Card image"
        />
        <Card.Heading size="4">Project planning for developers</Card.Heading>
        <Card.Description size="300">
          Create issues, break them into tasks, track relationships, add custom fields, and have conversations.
          Visualize large projects as spreadsheets or boards, and automate everything with code.
        </Card.Description>
        <Card.Action>
          {/* <Link href="#">Call to action</Link> */}
          <Button>Call to action</Button>
        </Card.Action>
      </Card>
      <Card variant={variant}>
        <Card.Image
          src="https://user-images.githubusercontent.com/912236/213208795-ba61941e-a407-4973-86fd-d5b1697712bf.png"
          alt="Card image"
        />
        <Card.Heading size="4">Project planning for developers</Card.Heading>
        <Card.Description size="300">
          Create issues, break them into tasks, track relationships, add custom fields, and have conversations.
          Visualize large projects as spreadsheets or boards, and automate everything with code.
        </Card.Description>
        <Card.Action>
          {/* <Link href="#">Call to action</Link> */}
          <Button>Call to action</Button>
        </Card.Action>
      </Card>
    </div>
  </React.Fragment>
)

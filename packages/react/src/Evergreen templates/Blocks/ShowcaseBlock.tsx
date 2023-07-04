import React from 'react'
import {Grid, River, Stack, Image, Heading, Text} from '../..'

type ShowcaseBlockItem = {
  heading: string
  content: string
  imageSrc: string
  imageAlt: string
}

export type ShowcaseBlockProps = {
  items: ShowcaseBlockItem[]
}

export const ShowcaseBlock = ({items}: ShowcaseBlockProps) => {
  return (
    <Grid>
      <Grid.Column>
        <Stack padding="none" gap="none">
          {items.map(({heading, content, imageSrc, imageAlt}, i) => (
            <River key={i} align={i % 2 ? 'start' : 'end'}>
              <River.Content>
                <Heading as="h3">{heading}</Heading>
                <Text as="p">{content}</Text>
              </River.Content>

              <River.Visual hasShadow={false}>
                <Image src={imageSrc} alt={imageAlt} />
              </River.Visual>
            </River>
          ))}
        </Stack>
      </Grid.Column>
    </Grid>
  )
}

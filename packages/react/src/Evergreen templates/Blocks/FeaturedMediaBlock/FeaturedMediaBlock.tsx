import React from 'react'
import {Grid, Image, Text} from '../../..'

export type FeaturedMediaBlockProps = {
  type: 'image' | 'video' // Note that Video is not implemented yet
  caption?: string
  src: string
  alt: string
  dimensions: {
    width: number
    height: number
  }
}

export const FeaturedMediaBlock = ({type, caption, src, alt, dimensions}: FeaturedMediaBlockProps) => {
  return (
    <Grid>
      <Grid.Column>
        {type === 'image' && (
          <figure>
            <Image
              src={src}
              alt={alt}
              width={dimensions.width}
              height={dimensions.height}
              style={{maxWidth: '100%', height: 'auto'}}
            />
            {caption && (
              <figcaption>
                <Text size="200" variant="muted">
                  {caption}
                </Text>
              </figcaption>
            )}
          </figure>
        )}
      </Grid.Column>
    </Grid>
  )
}

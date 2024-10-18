import {Box as PRCBox, Heading, Text, ThemeProvider} from '@primer/react'
import React from 'react'
import {Container} from '@primer/gatsby-theme-doctocat'
import heroIllustration from '../primer-components-hero.svg'
import {version} from '../../../../../../packages/react/package'

export default function Hero() {
  return (
    <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
      <PRCBox bg="canvas.default" py={6}>
        <Container>
          <Heading
            sx={{
              color: 'accent.fg',
              fontSize: 7,
              lineHeight: 'condensed',
              pb: 3,
              m: 0,
            }}
          >
            Primer Brand UI
          </Heading>
          <Text
            as="p"
            fontFamily="mono"
            mt={0}
            mb={2}
            color="fg.muted"
            fontSize={2}
          >
            v{version}
          </Text>
          <img src={heroIllustration} alt="" width="100%" />
        </Container>
      </PRCBox>
    </ThemeProvider>
  )
}

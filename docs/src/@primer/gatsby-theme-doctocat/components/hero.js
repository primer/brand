import {Box, Heading, Text, ThemeProvider} from '@primer/react'
import React from 'react'
import {Container} from '@primer/gatsby-theme-doctocat'
import heroIllustration from '../primer-components-hero.svg'
import {version} from '../../../../../package'

export default function Hero() {
  return (
    <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
      <Box bg="canvas.default" py={6}>
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
            Primer Brand
          </Heading>
          <Text
            as="p"
            fontFamily="mono"
            mt={0}
            mb={2}
            color="var(--brand-color-text-default)"
            fontSize={2}
          >
            v{version}
          </Text>
          <img src={heroIllustration} alt="" width="100%" />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

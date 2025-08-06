import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {GlowVFX, GlowVFXSpectrum, GlowVFXIntensity, GlowVFXPosition} from './'
import {Box, Text, Stack} from '..'

export default {
  title: 'Components/GlowVFX',
  component: GlowVFX,
  args: {
    spectrum: 'aurora',
    intensity: 'medium',
    showFrame: false,
    animateEntry: false,
    animateAmbiance: false,
    position: 'center',
    inset: false,
  },
  argTypes: {
    spectrum: {
      control: {type: 'radio'},
      options: GlowVFXSpectrum,
      description: 'Color spectrum for the glow effect',
    },
    intensity: {
      control: {type: 'radio'},
      options: GlowVFXIntensity,
      description: 'Controls the glow intensity',
    },
    position: {
      control: {type: 'radio'},
      options: GlowVFXPosition,
      description: 'Position of the glow effect (9-point anchoring)',
    },
    inset: {
      control: {type: 'boolean'},
      description: 'Applies inset positioning',
    },
    showFrame: {
      control: {type: 'boolean'},
      description: 'Shows a frame around the glow',
    },
    animateEntry: {
      control: {type: 'boolean'},
      description: 'Animates the entry of the glow effect',
    },
    animateAmbiance: {
      control: {type: 'boolean'},
      description: 'Animates ambient glow movement',
    },
  },
} as Meta<typeof GlowVFX>

export const Default = () => (
  <GlowVFX>
    <Box
      padding="spacious"
      style={{
        backgroundColor: 'rgba(0, 0, 0, .8)',
        borderRadius: '16px',
      }}
    >
      <Stack>
        <Text size="300">Welcome to the future of design</Text>
      </Stack>
    </Box>
  </GlowVFX>
)

export const Playground: StoryFn<typeof GlowVFX> = args => (
  <Box
    padding="spacious"
    style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <GlowVFX {...args}>
      <Box
        padding="spacious"
        style={{
          display: 'grid',
          placeItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderRadius: '16px',
          height: 800,
          maxWidth: '100%',
          width: 1280,
        }}
      >
        <Stack>
          <Text size="300">GlowVFX demo</Text>
        </Stack>
      </Box>
    </GlowVFX>
  </Box>
)

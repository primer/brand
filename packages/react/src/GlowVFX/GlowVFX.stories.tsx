import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {GlowVFX, GlowVFXSpectrum, GlowVFXIntensity, GlowVFXPosition} from './'
import {Box, Text, Button} from '..'

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
    position: {
      control: {type: 'radio'},
      options: GlowVFXPosition,
      description: 'Position of the glow effect (9-point anchoring)',
    },
    inset: {
      control: {type: 'boolean'},
      description: 'Applies inset positioning',
    },
  },
} as Meta<typeof GlowVFX>

export const Default = () => (
  <Box padding="spacious" style={{minHeight: '400px', backgroundColor: '#1a1a1a'}}>
    <GlowVFX>
      <Box
        padding="normal"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Text size="300" style={{color: 'white'}}>
          Welcome to the future of design
        </Text>
        <br />
        <Button variant="primary" size="medium">
          Get started
        </Button>
      </Box>
    </GlowVFX>
  </Box>
)

export const Playground: StoryFn<typeof GlowVFX> = args => (
  <Box
    padding="spacious"
    style={{
      minHeight: '500px',
      backgroundColor: '#1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <GlowVFX {...args}>
      <Box
        padding="normal"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          minWidth: '300px',
        }}
      >
        <Text size="400" style={{color: 'white', fontWeight: 'bold'}}>
          GlowVFX Component
        </Text>
        <br />
        <Text size="200" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
          Adjust the controls to see different glow effects
        </Text>
        <br />
        <Button variant="primary" size="medium">
          Experience the glow
        </Button>
      </Box>
    </GlowVFX>
  </Box>
)

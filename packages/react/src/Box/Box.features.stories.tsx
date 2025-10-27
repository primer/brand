import React from 'react'
import type {Meta} from '@storybook/react'
import {Stack, Text, AnimationProvider} from '..'
import {
  Box,
  BoxBackgroundColors,
  BoxBorderColorOptions,
  BoxBorderRadiusOptions,
  BoxBorderWidthOptions,
  BoxSpacingValues,
} from './Box'

import {RedlineBackground} from '../component-helpers'
import styles from './Box.features.module.css'

export default {
  title: 'Components/Box/Features',
  component: Box,
} as Meta<typeof Box>

export const Padding = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <div className={styles.paddingItem} key={value}>
        <Box padding={value}>
          <Text size="100" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

export const DirectionalPaddingBlockStart = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <div className={styles.paddingItem} key={value}>
        <Box paddingBlockStart={value}>
          <Text size="100" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

DirectionalPaddingBlockStart.storyName = 'Directional Padding: Block start (top)'

export const DirectionalPaddingInlineEnd = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <div className={styles.paddingItem} key={value}>
        <Box paddingInlineEnd={value}>
          <Text size="100" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

DirectionalPaddingInlineEnd.storyName = 'Directional Padding: Inline end (right)'

export const DirectionalPaddingBlockEnd = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <div className={styles.paddingItem} key={value}>
        <Box paddingBlockEnd={value}>
          <Text size="100" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

DirectionalPaddingBlockEnd.storyName = 'Directional Padding: Block end (bottom)'

export const DirectionalPaddingInlineStart = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <div className={styles.paddingItem} key={value}>
        <Box paddingInlineStart={value}>
          <Text size="100" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

DirectionalPaddingInlineStart.storyName = 'Directional Padding: Inline start (left)'

export const Margin = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box margin={value}>
          <Text size="100" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

export const DirectionalMarginBlockStart = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box marginBlockStart={value}>
          <Text size="100" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

DirectionalMarginBlockStart.storyName = 'Directional Margin: Block start (top)'

export const DirectionalMarginRight = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box marginInlineEnd={value}>
          <Text size="100" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

DirectionalMarginRight.storyName = 'Directional Margin: Inline end (right)'

export const DirectionalMarginBottom = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box marginBlockEnd={value}>
          <Text size="100" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

DirectionalMarginBottom.storyName = 'Directional Margin: Block end (bottom)'

export const DirectionalMarginLeft = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box marginInlineStart={value}>
          <Text size="100" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

DirectionalMarginLeft.storyName = 'Directional Margin: Inline start (left)'

export const BackgroundColors = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxBackgroundColors.map(value => (
      <Box key={value} backgroundColor={value} padding="spacious">
        <Text size="100">{value}</Text>
      </Box>
    ))}
  </Stack>
)

export const BorderRadius = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxBorderRadiusOptions.map(value => (
      <Box key={value} borderRadius={value} padding="spacious" className={styles.borderRadiusItem}>
        <Text size="100">{value}</Text>
      </Box>
    ))}
  </Stack>
)

export const BorderWidth = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxBorderWidthOptions.map(value => (
      <Box key={value} borderWidth={value} borderColor="default" padding="spacious" borderStyle="solid">
        <Text size="100">{value}</Text>
      </Box>
    ))}
  </Stack>
)

export const DirectionalBorderWidth = () => (
  <>
    <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
      {BoxBorderWidthOptions.map(value => (
        <Box
          key={value}
          borderBlockStartWidth={value}
          borderColor="default"
          padding="spacious"
          borderStyle="solid"
          backgroundColor="subtle"
        >
          <Text size="100">{`block-start: ${value}`}</Text>
        </Box>
      ))}
    </Stack>
    <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
      {BoxBorderWidthOptions.map(value => (
        <Box
          key={value}
          borderInlineEndWidth={value}
          borderColor="default"
          padding="spacious"
          borderStyle="solid"
          backgroundColor="subtle"
        >
          <Text size="100">{`inline-end: ${value}`}</Text>
        </Box>
      ))}
    </Stack>
    <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
      {BoxBorderWidthOptions.map(value => (
        <Box
          key={value}
          borderBlockEndWidth={value}
          borderColor="default"
          padding="spacious"
          borderStyle="solid"
          backgroundColor="subtle"
        >
          <Text size="100">{`inline-end: ${value}`}</Text>
        </Box>
      ))}
    </Stack>
    <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
      {BoxBorderWidthOptions.map(value => (
        <Box
          key={value}
          borderInlineStartWidth={value}
          borderColor="default"
          padding="spacious"
          borderStyle="solid"
          backgroundColor="subtle"
        >
          <Text size="100">{`block-end: ${value}`}</Text>
        </Box>
      ))}
    </Stack>
  </>
)

export const BorderColor = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxBorderColorOptions.map(value => (
      <Box key={value} borderColor={value} borderWidth="thicker" padding="spacious" borderStyle="solid">
        <Text size="100">{value}</Text>
      </Box>
    ))}
  </Stack>
)

export const Animation = () => (
  <AnimationProvider>
    <Stack direction="horizontal" alignItems="center" justifyContent="center">
      <Box
        backgroundColor="inset"
        borderColor="default"
        borderWidth="thicker"
        borderStyle="solid"
        padding={128}
        animate="scale-in-right"
      />
      <Box
        backgroundColor="inset"
        borderColor="default"
        borderWidth="thicker"
        borderStyle="solid"
        padding={128}
        animate="scale-in-right"
      />
      <Box
        backgroundColor="inset"
        borderColor="default"
        borderWidth="thicker"
        borderStyle="solid"
        padding={128}
        animate="scale-in-right"
      />
    </Stack>
  </AnimationProvider>
)

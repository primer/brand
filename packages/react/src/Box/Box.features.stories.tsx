import React from 'react'
import {Meta} from '@storybook/react'
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
          <Text size="200" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

export const DirectionalPaddingTop = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <div className={styles.paddingItem} key={value}>
        <Box paddingBlockStart={value}>
          <Text size="200" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

DirectionalPaddingTop.storyName = 'Directional Padding: Top'

export const DirectionalPaddingRight = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <div className={styles.paddingItem} key={value}>
        <Box paddingInlineEnd={value}>
          <Text size="200" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

DirectionalPaddingRight.storyName = 'Directional Padding: Right'

export const DirectionalPaddingBottom = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <div className={styles.paddingItem} key={value}>
        <Box paddingBlockEnd={value}>
          <Text size="200" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

DirectionalPaddingBottom.storyName = 'Directional Padding: Bottom'

export const DirectionalPaddingLeft = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <div className={styles.paddingItem} key={value}>
        <Box paddingInlineStart={value}>
          <Text size="200" className={styles.paddingInnerItem}>
            {value}
          </Text>
        </Box>
      </div>
    ))}
  </Stack>
)

DirectionalPaddingLeft.storyName = 'Directional Padding: Left'

export const Margin = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box margin={value}>
          <Text size="200" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

export const DirectionalMarginTop = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box marginBlockStart={value}>
          <Text size="200" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

DirectionalMarginTop.storyName = 'Directional Margin: Top'

export const DirectionalMarginRight = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box marginInlineEnd={value}>
          <Text size="200" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

DirectionalMarginRight.storyName = 'Directional Margin: Right'

export const DirectionalMarginBottom = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box marginBlockEnd={value}>
          <Text size="200" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

DirectionalMarginBottom.storyName = 'Directional Margin: Bottom'

export const DirectionalMarginLeft = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxSpacingValues.map(value => (
      <RedlineBackground key={value} className={styles.marginOuterItem}>
        <Box marginInlineStart={value}>
          <Text size="200" className={styles.marginInnerItem}>
            {value}
          </Text>
        </Box>
      </RedlineBackground>
    ))}
  </Stack>
)

DirectionalMarginLeft.storyName = 'Directional Margin: Left'

export const BackgroundColors = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxBackgroundColors.map(value => (
      <Box key={value} backgroundColor={value} padding="spacious">
        <Text size="200">{value}</Text>
      </Box>
    ))}
  </Stack>
)

export const BorderRadius = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxBorderRadiusOptions.map(value => (
      <Box key={value} borderRadius={value} padding="spacious" className={styles.borderRadiusItem}>
        <Text size="200">{value}</Text>
      </Box>
    ))}
  </Stack>
)

export const BorderWidth = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxBorderWidthOptions.map(value => (
      <Box key={value} borderWidth={value} borderColor="default" padding="spacious" borderStyle="solid">
        <Text size="200">{value}</Text>
      </Box>
    ))}
  </Stack>
)

export const BorderColor = () => (
  <Stack direction="horizontal" alignItems="center" className={styles.spacingContainer}>
    {BoxBorderColorOptions.map(value => (
      <Box key={value} borderColor={value} borderWidth="thicker" padding="spacious" borderStyle="solid">
        <Text size="200">{value}</Text>
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

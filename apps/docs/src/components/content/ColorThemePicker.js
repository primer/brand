import {Box} from '@primer/react'
import React from 'react'
import {useColorTheme, availableModes} from './ColorThemeContext'
import globalFunctionalTokens from '@primer/brand-primitives/lib/design-tokens/js/module/tokens/base/colors/color-scales'

export function ColorThemePicker() {
  const [colorTheme, setColorTheme] = useColorTheme()
  return (
    <Box
      sx={{
        display: 'grid',
        gridGap: 3,
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      }}
    >
      {availableModes.map((key) => (
        <Box
          as="label"
          key={key}
          sx={{
            border: '1px solid',
            borderColor: key === colorTheme ? 'accent.fg' : 'border.default',
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <ColorThemePreview colorTheme={key} />
          <Box sx={{p: 2}}>
            <input
              type="radio"
              id={key}
              name="drone"
              value={key}
              checked={colorTheme === key}
              onChange={(event) => {
                setColorTheme(event.target.value)
              }}
            />
            <Box as="span" sx={{ml: 1, textTransform: 'capitalize'}}>
              {key}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

function ColorThemePreview() {
  return (
    <Box
      sx={{
        color: 'var(--brand-color-text-default)',
        bg: 'var(--brand-color-canvas-default)',
        display: 'flex',
        p: 3,
        borderBottom: '1px solid',
        borderColor: 'border.default',
        justifyContent: 'center',
      }}
    >
      {['gray', 'blue', 'green', 'orange', 'red', 'purple', 'pink'].map(
        (name) => (
          <Box
            key={name}
            sx={{
              width: 20,
              height: 20,
              bg: `hsl(${globalFunctionalTokens.base.color.scale[name][5].value
                .split(' ')
                .join(', ')})`,
              margin: '2px',
              borderRadius: 999,
            }}
          />
        ),
      )}
    </Box>
  )
}

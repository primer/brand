'use client'
import {Box as PRCBox} from '@primer/react'
import React from 'react'
import {useColorTheme, availableModes} from './ColorThemeContext'

export function ColorThemePicker() {
  const [colorTheme, setColorTheme] = useColorTheme()
  return (
    <PRCBox
      sx={{
        display: 'grid',
        gridGap: 3,
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      }}
    >
      {availableModes.map(key => (
        <PRCBox
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
          <PRCBox sx={{p: 2}}>
            <input
              type="radio"
              id={key}
              name="drone"
              value={key}
              checked={colorTheme === key}
              onChange={event => {
                setColorTheme(event.target.value)
              }}
            />
            <PRCBox as="span" sx={{ml: 1, textTransform: 'capitalize'}}>
              {key}
            </PRCBox>
          </PRCBox>
        </PRCBox>
      ))}
    </PRCBox>
  )
}

function ColorThemePreview({colorTheme}) {
  return (
    <PRCBox
      data-color-mode={colorTheme}
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
      {['gray', 'blue', 'green', 'orange', 'red', 'purple', 'pink'].map(name => (
        <PRCBox
          key={name}
          sx={{
            width: 20,
            height: 20,
            bg: `var(--base-color-scale-${name}-5)`,
            borderRadius: 999,
          }}
        />
      ))}
    </PRCBox>
  )
}

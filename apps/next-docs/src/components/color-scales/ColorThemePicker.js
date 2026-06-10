'use client'
import React from 'react'
import {useColorTheme, availableModes} from './ColorThemeContext'
import styles from './ColorScales.module.css'

export function ColorThemePicker() {
  const [colorTheme, setColorTheme] = useColorTheme()

  return (
    <div className={styles.themePickerGrid}>
      {availableModes.map(key => (
        <label
          htmlFor={`${key}-mode-toggle`}
          key={key}
          className={`${styles.themeCard} ${key === colorTheme ? styles.themeCardSelected : styles.themeCardDefault}`}
        >
          <ColorThemePreview colorTheme={key} />
          <div className={styles.themeCardContent}>
            <input
              key={`${key}-mode-toggle`}
              type="radio"
              id={`${key}-mode-toggle`}
              value={key}
              checked={colorTheme === key}
              onChange={event => {
                setColorTheme(event.target.value)
              }}
            />
            <span className={styles.themeLabel}>{key}</span>
          </div>
        </label>
      ))}
    </div>
  )
}

function ColorThemePreview({colorTheme}) {
  return (
    <div
      data-color-mode={colorTheme}
      className={styles.themePreview}
      style={{
        color: 'var(--brand-color-text-default)',
        backgroundColor: 'var(--brand-color-canvas-default)',
      }}
    >
      {['gray', 'blue', 'green', 'orange', 'red', 'purple', 'pink'].map(name => (
        <div key={name} className={styles.colorDot} style={{backgroundColor: `var(--base-color-scale-${name}-5)`}} />
      ))}
    </div>
  )
}

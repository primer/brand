module.exports = {
  brand: {
    Button: {
      background: {
        base: {
          value: 'var(--base-color-scale-black-0)',
          dark: 'var(--base-color-scale-white-0)'
        },
        overlay: {
          value: `linear-gradient(180deg, hsla(0, 0%, 100%, 0.15) 0, hsla(0, 0%, 100%, 0) 100%), var(--base-color-scale-black-0)`,
          dark: `linear-gradient(180deg, hsla(0,0%,100%,0.15) 0,hsla(0,0%,100%,0) 100%),var(--base-color-scale-white-0)`
        }
      },
      shadow: {
        default: {
          value: '0 0 0 1px var(--base-color-scale-black-0)',
          dark: '0 0 0 1px var(--base-color-scale-white-0)'
        },
        hover: {
          value:
            '0 3px 2px rgba(0, 0, 0, 0.07), 0 7px 5px rgba(0, 0, 0, 0.04), 0 12px 10px rgba(0, 0, 0, 0.03), 0 22px 18px rgba(0, 0, 0, 0.03), 0 42px 33px rgba(0, 0, 0, 0.02), 0 100px 80px rgba(0, 0, 0, 0.02)',
          dark: '0 4px 7px rgba(0, 0, 0, 0.15), 0 100px 80px rgba(255, 255, 255, 0.02), 0 42px 33px rgba(255, 255, 255, 0.024), 0 22px 18px rgba(255, 255, 255, 0.028), 0 12px 10px rgba(255, 255, 255, 0.034), 0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07)'
        },
        focus: {
          value: 'hsl(var(--base-color-scale-black-0-hsl) / 15%) 0 0 0 4px;',
          dark: 'hsl(var(--base-color-scale-white-0-hsl) / 25%) 0 0 0 4px;'
        }
      }
    }
  }
}

module.exports = {
  brand: {
    Button: {
      text: {
        primary: {
          value: "var(--brand-color-text-inverted)",
          darkValue: "var(--brand-color-text-inverted)"
        },
        secondary: {
          value: "var(--brand-color-text-primary)",
          darkValue: "var(--brand-color-text-primary)"
        }
      },
      border: {
        secondary: {
          idle: {
            value: "var(--brand-color-border-primary)",
            darkValue: "var(--brand-color-border-primary)"
          },
          hover: {
            value: "var(--brand-color-neutral-emphasisPlus)",
            darkValue: "var(--brand-color-neutral-emphasisPlus)"
          }
        }
      },
      background: {
        base: {
          value: "var(--base-color-scale-black-0)",
          darkValue: "var(--base-color-scale-white-0)"
        },
        overlay: {
          value: `linear-gradient(180deg, hsla(0, 0%, 100%, 0.15) 0, hsla(0, 0%, 100%, 0) 100%), var(--base-color-scale-black-0)`,
          darkValue: `linear-gradient(180deg, hsla(0,0%,100%,0.15) 0,hsla(0,0%,100%,0) 100%),var(--base-color-scale-white-0)`
        }
      },
      shadow: {
        idle: {
          value: "0 0 0 1px var(--base-color-scale-black-0)",
          darkValue: "0 0 0 1px var(--base-color-scale-white-0)"
        },
        hover: {
          value:
            "0 3px 2px rgba(0, 0, 0, 0.07), 0 7px 5px rgba(0, 0, 0, 0.04), 0 12px 10px rgba(0, 0, 0, 0.03), 0 22px 18px rgba(0, 0, 0, 0.03), 0 42px 33px rgba(0, 0, 0, 0.02), 0 100px 80px rgba(0, 0, 0, 0.02)",
          darkValue:
            "0 4px 7px rgba(0, 0, 0, 0.15), 0 100px 80px rgba(255, 255, 255, 0.02), 0 42px 33px rgba(255, 255, 255, 0.024), 0 22px 18px rgba(255, 255, 255, 0.028), 0 12px 10px rgba(255, 255, 255, 0.034), 0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07)"
        },
        focus: {
          value: "hsl(var(--base-color-scale-black-0-hsl) / 15%) 0 0 0 4px;",
          darkValue: "hsl(var(--base-color-scale-white-0-hsl) / 25%) 0 0 0 4px;"
        }
      }
    }
  }
}
